import { Navigation } from "@/components/navigation"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export const metadata = { title: "Testimoni | PT. Bakti Karya Teknik" }

export default function TestimoniPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
