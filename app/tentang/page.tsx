import { Navigation } from "@/components/navigation"
import { AboutSection } from "@/components/about-section"
import { WorkflowSection } from "@/components/workflow-section"
import { Footer } from "@/components/footer"

export const metadata = { title: "Tentang Kami | PT. Bakti Karya Teknik" }

export default function TentangPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <AboutSection />
      <WorkflowSection />
      <Footer />
    </main>
  )
}
