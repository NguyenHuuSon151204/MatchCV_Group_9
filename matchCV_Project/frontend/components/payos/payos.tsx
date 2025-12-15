import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import api from "@/src/api/axiosConfig";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import { Button } from '@/components/ui/button'

export default function PayOSHostedPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [orderCode, setOrderCode] = useState<string | null>(null);
  const [hasProPlan, setHasProPlan] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const authContext = useContext(AuthContext);

  if (!authContext) throw new Error("AuthContext must be used within AuthProvider");
  const { user } = authContext;

  const router = useNavigate();

  useEffect(() => {
    const checkPlan = async () => {
      try {
        const res = await api.get(`/license/plan/${user?.id}`);
        if (res.data?.plan === "Pro"){
          setHasProPlan("Pro");
        } else {
          setHasProPlan("Free");
        }
      } catch {
        setHasProPlan(null);
      }
    };

    checkPlan();
  }, [user?.id]);

  // -----------------------------------------------------
  // 1. Auto-check payment every 5 seconds
  // -----------------------------------------------------
  // Polling state

  useEffect(() => {
    if (!orderCode || hasProPlan==="Pro") return;

    let intervalId: NodeJS.Timeout;

    const pollStatus = async () => {
      try {
        const res = await api.get(`/payos/status/${orderCode}`);
        const status = res?.data?.data?.status;

        console.log("Payment status:", status);

        setPaymentStatus(status);

        if (status === "PAID") {
          await api.post(`/license/create/${user?.id}`);

          setStatusMsg("Thanh toán thành công. Cảm ơn bạn đã ủng hộ!");

          clearInterval(intervalId);

          setTimeout(() => {
            router(0);
          }, 2000);
        }
      } catch (err) {
        console.error("Error polling PayOS:", err);
        setStatusMsg("Không thể xác minh trạng thái thanh toán");
        clearInterval(intervalId);
      }
    };

    // poll immediately once
    pollStatus();

    // poll every 5 seconds
    intervalId = setInterval(pollStatus, 5000);

    // cleanup on unmount or orderCode change
    return () => clearInterval(intervalId);
  }, [orderCode, hasProPlan]);

  const closeQr = () => {
    setQrImage(null);        // hide QR
    setOrderCode(null);      // stop polling flow
    setPaymentStatus(null);  // clear status
  };



  // -----------------------------------------------------
  // 2. Create payment → show QR + redirect option
  // -----------------------------------------------------
  const startCheckout = async () => {
    if (isLoading || qrImage) return;
    setIsLoading(true);
    setQrImage(null);

    try {
      const response = await api.post(`/payos/create/${user?.id}`);

      console.log("PayOS create response:", response.data);

      const checkoutUrl = response.data.data.checkoutUrl;
      const orderCode = response.data.data.orderCode;
      setOrderCode(orderCode);
      const qrString = response.data.data.qrCode;

      if (!checkoutUrl) {
        alert("Không nhận được checkoutUrl từ PayOS");
        return;
      }

      // Generate QR image if qrCode exists
      if (qrString) {
        QRCode.toDataURL(qrString, {
          width: 300,
          margin: 2,
        })
          .then((url) => setQrImage(url))
          .catch((err) => console.error("QR error:", err));
      }
    } catch (err) {
      console.error("Failed to create payment", err);
      alert("Không tạo được link thanh toán");
    } finally {
      setIsLoading(false);
    }
  };

  // -----------------------------------------------------
  // 3. If we have a status message, show result page
  // -----------------------------------------------------
  if (statusMsg) {
    return (
      <div className="main-box" id="payos-main">
        <div className="checkout" id="payos-checkout">
          <p id="payos-status-msg" style={{ textAlign: "center", fontWeight: 600 }}>{statusMsg}</p>
        </div>
      </div>
    );
  }

  if (hasProPlan === null) {
    return (
      <div className="main-box">
        <div className="checkout">
          <p>Đang kiểm tra gói dịch vụ…</p>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------
  // 4. Payment start page UI
  // -----------------------------------------------------
  return (
    <div className="main-box" id="payos-main">
      <div className="checkout" id="payos-checkout">
        <div className="product" id="payos-product">
          <p id="payos-amount">
            <strong>Số tiền:</strong> 2000 VNĐ
            //Thêm quyền lợi gói Pro tại đây
          </p>
        </div>

        {/* User already has PRO */}
        {hasProPlan==="Pro" && (
          <p
            id="payos-already-pro"
            style={{ textAlign: "center", fontWeight: 600 }}
          >
            Bạn đã có gói Pro
          </p>
        )}

        {/* User does NOT have PRO */}
        {hasProPlan==="Free" && (
          <>
            {qrImage && (
              <div id="payos-qr-container" style={{ textAlign: "center", marginBottom: 20 }}>
                <p id="payos-qr-instruction">Quét mã để thanh toán</p>

                <img id="payos-qr-img" src={qrImage} alt="QR Code" />

                <Button
                  id="payos-close-btn"
                  onClick={closeQr}
                  className="mt-4"
                >
                  Đóng
                </Button>
              </div>
            )}

            {!isLoading && !qrImage ? (
              <Button id="payos-start-btn" onClick={startCheckout}>
                Thanh toán PayOS (Hosted)
              </Button>
            ) : isLoading ? (
              <div
                id="payos-loading"
                style={{ textAlign: "center", padding: 10, fontWeight: 600 }}
              >
                Đang tạo link…
              </div>
            ) : null}
          </>
        )}

      </div>
    </div>
  );
}
