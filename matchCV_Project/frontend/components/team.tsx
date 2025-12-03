import { Card, CardContent } from "@/components/ui/card"

const teamMembers = [
  {
    name: "Nguyễn Văn A",
    role: "CEO & Co-founder",
    description: "Chuyên gia HR Tech với 10 năm kinh nghiệm",
  },
  {
    name: "Trần Thị B",
    role: "CTO & Co-founder",
    description: "Lead Developer, AI/ML specialist",
  },
  {
    name: "Lê Minh C",
    role: "Product Manager",
    description: "Thiết kế trải nghiệm người dùng tối ưu",
  },
  {
    name: "Phạm Quốc D",
    role: "Lead Designer",
    description: "UI/UX Designer, Brand specialist",
  },
  {
    name: "Hoàng Thu E",
    role: "Data Scientist",
    description: "Machine Learning model optimization",
  },
]

export function Team() {
  return (
    <section id="team" className="w-full py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Nhóm phát triển</h2>
          <p className="text-muted-foreground text-lg text-balance max-w-2xl mx-auto">
            Những chuyên gia tằng sức mạnh cho MatchCV
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="border border-border hover:border-primary/30 transition-all hover:shadow-md">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent mb-4"></div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
