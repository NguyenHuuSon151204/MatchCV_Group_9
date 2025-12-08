import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Team } from "@/components/team"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="w-full">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Team />
      <Footer />
    </main>
  )
}
