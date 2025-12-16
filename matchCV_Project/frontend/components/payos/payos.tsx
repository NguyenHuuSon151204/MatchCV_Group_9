import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import QRCode from 'qrcode'
import { ShieldCheck, Zap, Clock3, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AuthContext } from '@/contexts/AuthContext'
import api from '@/src/api/axiosConfig'

type PlanStatus = 'Pro' | 'Free' | null

export default function PayOSHostedPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [statusMsg, setStatusMsg] = useState('')
  const [qrImage, setQrImage] = useState<string | null>(null)
  const [orderCode, setOrderCode] = useState<string | null>(null)
  const [hasProPlan, setHasProPlan] = useState<PlanStatus>(null)
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null)
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)

  const authContext = useContext(AuthContext)
  if (!authContext) throw new Error('AuthContext must be used within AuthProvider')
  const { user } = authContext
  const router = useNavigate()

  // Load current plan
  useEffect(() => {
    const checkPlan = async () => {
      try {
        const res = await api.get(`/license/plan/${user?.id}`)
        setHasProPlan(res.data?.plan === 'Pro' ? 'Pro' : 'Free')
      } catch {
        setHasProPlan(null)
      }
    }
    checkPlan()
  }, [user?.id])

  // Poll payment status
  useEffect(() => {
    if (!orderCode || hasProPlan === 'Pro') return
    let intervalId: NodeJS.Timeout

    const pollStatus = async () => {
      try {
        const res = await api.get(`/payos/status/${orderCode}`)
        const status = res?.data?.data?.status
        setPaymentStatus(status)
        if (status === 'PAID') {
          await api.post(`/license/create/${user?.id}`)
          setStatusMsg('Thanh toán thành công. Bạn đã được nâng cấp Pro.')
          clearInterval(intervalId)
          setTimeout(() => router(0), 2000)
        }
      } catch (err) {
        console.error('Error polling PayOS:', err)
        setStatusMsg('Không thể xác minh trạng thái thanh toán.')
        clearInterval(intervalId)
      }
    }

    pollStatus()
    intervalId = setInterval(pollStatus, 5000)
    return () => clearInterval(intervalId)
  }, [orderCode, hasProPlan, router, user?.id])

  const closeQr = () => {
    setQrImage(null)
    setOrderCode(null)
    setCheckoutUrl(null)
    setPaymentStatus(null)
  }

  const startCheckout = async () => {
    if (isLoading || qrImage) return
    setIsLoading(true)
    setQrImage(null)
    setCheckoutUrl(null)

    try {
      const response = await api.post(`/payos/create/${user?.id}`)
      const checkoutUrlRes = response.data.data.checkoutUrl
      const order = response.data.data.orderCode
      setOrderCode(order)
      setCheckoutUrl(checkoutUrlRes)
      const qrString = response.data.data.qrCode

      if (!checkoutUrlRes) {
        alert('Không nhận được checkoutUrl từ PayOS')
        return
      }

      if (qrString) {
        QRCode.toDataURL(qrString, { width: 320, margin: 1 })
          .then((url) => setQrImage(url))
          .catch((err) => console.error('QR error:', err))
      }
    } catch (err) {
      console.error('Failed to create payment', err)
      alert('Không tạo được link thanh toán')
    } finally {
      setIsLoading(false)
    }
  }

  if (statusMsg) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <div className="rounded-2xl border border-border bg-card/80 p-6 text-center shadow-lg">
          <p className="text-lg font-semibold text-card-foreground">{statusMsg}</p>
        </div>
      </div>
    )
  }

  if (hasProPlan === null) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <div className="rounded-2xl border border-border bg-card/80 p-6 text-center shadow">
          <p className="text-sm text-muted-foreground">Đang kiểm tra gói dịch vụ...</p>
        </div>
      </div>
    )
  }

  const benefitItems = [
    { icon: <ShieldCheck className="h-4 w-4 text-primary" />, text: 'Không giới hạn JD Analyzer & Rewrite' },
    { icon: <Zap className="h-4 w-4 text-primary" />, text: 'Xử lý nhanh hơn và ưu tiên hàng đợi' },
    { icon: <Clock3 className="h-4 w-4 text-primary" />, text: 'Hỗ trợ ưu tiên trong giờ làm việc' },
  ]

  return (
    <div className="mx-auto max-w-5xl p-6 space-y-6">
      <div className="rounded-3xl border border-border bg-card/90 p-6 shadow-xl shadow-primary/10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Nâng cấp Pro</p>
            <h1 className="text-2xl font-bold text-card-foreground">PayOS Checkout</h1>
            <p className="text-sm text-muted-foreground mt-1">Quét QR hoặc mở link thanh toán để nâng cấp tức thì.</p>
          </div>
          <div className="rounded-2xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary">
            <p className="font-semibold">Gói hiện tại: {hasProPlan === 'Pro' ? 'Pro' : 'Free'}</p>
            {orderCode && <p className="text-xs text-primary/80">Mã đơn: {orderCode}</p>}
            {paymentStatus && <p className="text-xs text-primary/80">Trạng thái: {paymentStatus}</p>}
          </div>
        </div>

        {hasProPlan === 'Pro' ? (
          <div className="mt-6 rounded-2xl border border-border/60 bg-background/70 p-4 text-center text-sm text-muted-foreground">
            Bạn đã ở gói Pro. Cảm ơn vì đã ủng hộ!
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Số tiền</p>
                <p className="text-3xl font-bold text-card-foreground">2.000 VNĐ</p>
                <p className="text-xs text-muted-foreground">Kích hoạt Pro ngay lập tức</p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/70 p-4 md:col-span-2">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Lợi ích Pro</p>
                <div className="flex flex-wrap gap-3">
                  {benefitItems.map((item) => (
                    <div key={item.text} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-3 py-2 text-sm">
                      {item.icon}
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-border/60 bg-background/80 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-card-foreground">Thanh toán</p>
                  {orderCode && <span className="text-xs text-muted-foreground">Mã đơn: {orderCode}</span>}
                </div>
                {qrImage ? (
                  <div className="space-y-3 text-center">
                    <img src={qrImage} alt="QR Code" className="mx-auto h-64 w-64 rounded-xl border border-border/60 bg-white p-4 shadow" />
                    <p className="text-sm text-muted-foreground">Quét mã bằng app ngân hàng để hoàn tất.</p>
                    <div className="flex justify-center gap-3">
                      {checkoutUrl && (
                        <Button asChild variant="outline" className="rounded-full">
                          <a href={checkoutUrl} target="_blank" rel="noreferrer">Mở link PayOS</a>
                        </Button>
                      )}
                      <Button onClick={closeQr} variant="ghost" className="rounded-full">Hủy</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 text-center">
                    <p className="text-sm text-muted-foreground">Bấm “Tạo thanh toán” để nhận mã QR và link PayOS.</p>
                    <Button onClick={startCheckout} disabled={isLoading} className="rounded-full px-6">
                      {isLoading ? 'Đang tạo...' : 'Tạo thanh toán'}
                    </Button>
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-border/60 bg-background/80 p-5 space-y-3">
                <div className="flex items-center gap-2 text-card-foreground">
                  <Info className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold">Hướng dẫn nhanh</p>
                </div>
                <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
                  <li>Bấm “Tạo thanh toán” để nhận mã QR và link PayOS.</li>
                  <li>Quét mã hoặc mở link để thanh toán 2.000 VNĐ.</li>
                  <li>Sau khi thanh toán, hệ thống sẽ tự nâng cấp Pro.</li>
                </ol>
                <div className="rounded-xl border border-border/60 bg-background/70 p-3 text-xs text-muted-foreground">
                  Nếu gặp sự cố, liên hệ hỗ trợ: support@matchcv.vn
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
