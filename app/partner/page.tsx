import { Navigation } from "@/components/navigation"
import { BrandPartnersSection } from "@/components/brand-partners-section"
import { Footer } from "@/components/footer"

export const metadata = { title: "Partner | PT. Bakti Karya Teknik" }

export default function PartnerPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <BrandPartnersSection />
      <Footer />
    </main>
  )
}
