import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Zap, FileDown } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Drop in your JD or CV",
    description: "Paste the job description or upload your CV. PDF, Word, and text are supported.",
  },
  {
    icon: Zap,
    title: "AI analyzes & scores",
    description: "We parse the content, compare, and return a detailed match score in seconds.",
  },
  {
    icon: FileDown,
    title: "Refine & export",
    description: "Apply AI rewrite tips, edit sections, and export a polished file instantly.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">How it works</h2>
          <p className="text-muted-foreground text-lg text-balance max-w-2xl mx-auto">
            Three simple steps to optimize your CV for every role.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/30 to-primary/10"></div>
                )}

                <Card className="relative z-10 h-full border border-border hover:border-primary/30 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{step.description}</CardDescription>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
