import { Navigation } from "@/components/navigation"
import { PortfolioSection } from "@/components/portfolio-section"
import { Footer } from "@/components/footer"

export const metadata = { title: "Portofolio | PT. Bakti Karya Teknik" }

export default function PortofolioPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PortfolioSection />
      <Footer />
    </main>
  )
}
