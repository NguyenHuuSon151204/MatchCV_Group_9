import { Card, CardContent } from "@/components/ui/card"

const teamMembers = [
  {
    name: "Alex Nguyen",
    role: "CEO & Co-founder",
    description: "HR tech specialist with 10+ years of experience.",
  },
  {
    name: "Tracy Tran",
    role: "CTO & Co-founder",
    description: "Lead developer focused on AI/ML systems.",
  },
  {
    name: "Minh Le",
    role: "Product Manager",
    description: "Designs intuitive, conversion-friendly user journeys.",
  },
  {
    name: "Quoc Pham",
    role: "Lead Designer",
    description: "Crafts bold visual systems and brand experiences.",
  },
  {
    name: "Thu Hoang",
    role: "Data Scientist",
    description: "Optimizes models for faster, more accurate matching.",
  },
]

export function Team() {
  return (
    <section id="team" className="w-full py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Meet the team</h2>
          <p className="text-muted-foreground text-lg text-balance max-w-2xl mx-auto">
            Experts building the AI toolkit to supercharge your job search.
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
