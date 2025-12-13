import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Target, Sparkles, Download } from "lucide-react"

const features = [
  {
    icon: Target,
    title: "AI Phân tích JD",
    description: "Phân tích chi tiết Job Description và xác định các từ khóa quan trọng",
  },
  {
    icon: Sparkles,
    title: "Match CV – JD",
    description: "Tính điểm match tự động và hiển thị mức độ phù hợp chi tiết",
  },
  {
    icon: FileText,
    title: "Gợi ý Rewrite",
    description: "Nhận gợi ý optimize nội dung CV từ AI để tăng điểm match",
  },
  {
    icon: Download,
    title: "Xuất PDF & Docx",
    description: "Xuất CV theo template chuyên nghiệp với một click",
  },
  {
    icon: Target,
    title: "Tracking Dashboard",
    description: "Theo dõi lịch sử match và phân tích xu hướng ứng tuyển",
  },
  {
    icon: Sparkles,
    title: "Recruiter Tools",
    description: "Công cụ quản lý ứng viên và lọc CV cho nhà tuyển dụng",
  },
]

export function Features() {
  return (
    <section id="features" className="w-full py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Tính năng chính</h2>
          <p className="text-muted-foreground text-lg text-balance max-w-2xl mx-auto">
            Tất cả những gì bạn cần để tối ưu CV và tìm được công việc phù hợp
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="border border-border hover:border-primary/30 transition-colors group">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
