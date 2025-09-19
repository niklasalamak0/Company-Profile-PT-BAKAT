import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { WorkflowSection } from "@/components/workflow-section"
import { Footer } from "@/components/footer"

export const metadata = { title: "Beranda | PT. Bakti Karya Teknik" }

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <WorkflowSection />
      <Footer />
    </main>
  )
}
