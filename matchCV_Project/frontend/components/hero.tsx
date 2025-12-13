import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
              Tối ưu hóa CV của bạn với <span className="text-primary">AI</span>
            </h1>

            <p className="text-lg text-muted-foreground text-balance leading-relaxed">
              Nâng cao tỷ lệ match với job description, nhận gợi ý rewrite thông minh và xuất CV chuyên nghiệp chỉ trong
              vài phút.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/auth/register" className="flex items-center gap-2">
                  Bắt đầu ngay
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                <Link href="#" className="flex items-center gap-2">
                  Xem demo dashboard
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
              <div>
                <div className="text-2xl font-bold text-primary">95%</div>
                <p className="text-sm text-muted-foreground">Tỷ lệ match cải thiện</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">50K+</div>
                <p className="text-sm text-muted-foreground">Ứng viên đã sử dụng</p>
              </div>
            </div>
          </div>

          {/* Right - Dashboard Preview */}
          <div className="relative h-96 md:h-full min-h-96 rounded-xl overflow-hidden border border-border bg-card shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
              <div className="text-center space-y-4 px-6">
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
                  <span className="text-sm font-medium text-primary">Dashboard Preview</span>
                </div>
                <p className="text-muted-foreground text-balance">
                  Giao diện trực quan và dễ sử dụng cho cả ứng viên và nhà tuyển dụng
                </p>
                <div className="pt-4 space-y-2">
                  <div className="h-2 bg-muted rounded-full w-3/4 mx-auto"></div>
                  <div className="h-2 bg-muted rounded-full w-1/2 mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
