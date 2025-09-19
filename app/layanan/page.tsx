import { Navigation } from "@/components/navigation"
import { ServicesSection } from "@/components/services-section"
import { Footer } from "@/components/footer"

export const metadata = { title: "Layanan | PT. Bakti Karya Teknik" }

export default function LayananPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <ServicesSection />
      <Footer />
    </main>
  )
}
