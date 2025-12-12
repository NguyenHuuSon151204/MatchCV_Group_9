import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Target, Sparkles, Download } from "lucide-react"

const features = [
  {
    icon: Target,
    title: "AI JD Analysis",
    description: "Break down job descriptions and surface the critical skills, keywords, and priorities.",
  },
  {
    icon: Sparkles,
    title: "Match CV to JD",
    description: "Score every CV against a JD and show detailed fit insights instantly.",
  },
  {
    icon: FileText,
    title: "Smart Rewrite",
    description: "Get AI rewrite suggestions to optimize each section and boost match scores.",
  },
  {
    icon: Download,
    title: "Export PDF & Docx",
    description: "Export polished CVs with one click using professional templates.",
  },
  {
    icon: Target,
    title: "Tracking Dashboard",
    description: "Track match history and hiring trends across roles you apply to.",
  },
  {
    icon: Sparkles,
    title: "Recruiter Tools",
    description: "Manage candidates, filter CVs, and collaborate with hiring teams.",
  },
]

export function Features() {
  return (
    <section id="features" className="w-full py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Key features</h2>
          <p className="text-muted-foreground text-lg text-balance max-w-2xl mx-auto">
            Everything you need to optimize your CV and land the right role faster.
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
