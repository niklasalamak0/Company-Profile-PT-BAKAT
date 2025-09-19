import { Navigation } from "@/components/navigation"
import { ContactSection } from "@/components/contact-form"
import { Footer } from "@/components/footer"

export const metadata = { title: "Kontak | PT. Bakti Karya Teknik" }

export default function KontakPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <ContactSection />
      <Footer />
    </main>
  )
}
