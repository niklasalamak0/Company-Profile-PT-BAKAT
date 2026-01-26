"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

/* =========================
   Types & Sample Data
   ========================= */
interface Testimonial {
  id: string
  client_name: string
  client_position: string
  client_company: string
  testimonial: string
  rating: number // 1..5
  avatar_url?: string
  service_category: "advertising" | "building_me" | "both"
  is_featured: boolean
  project_scope?: string
  location?: string
  date_str?: string
}

const testimonials: Testimonial[] = [
  // =============================
  // CUSTOMER UMUM / UMKM
  // =============================
  {
    id: "umkm-1",
    client_name: "APOTEK K24",
    client_position: "Manajemen Cabang",
    client_company: "APOTEK K24",
    testimonial:
      "Signage dan neon box dikerjakan rapi serta sesuai identitas brand. Tampilan outlet jadi lebih jelas dan mudah dikenali dari jalan utama.",
    rating: 5,
    service_category: "advertising",
    is_featured: true,
    project_scope: "Neon box & signage outlet",
    location: "Jawa Timur",
    date_str: "Jan 2025",
  },
  {
    id: "umkm-2",
    client_name: "SWALAYAN KARANGANOM",
    client_position: "Owner",
    client_company: "SWALAYAN KARANGANOM",
    testimonial:
      "Branding toko terlihat lebih modern dan profesional. Banyak pelanggan baru yang bilang toko kami sekarang lebih mudah ditemukan.",
    rating: 5,
    service_category: "advertising",
    is_featured: false,
    project_scope: "Branding toko & shop sign",
    location: "Trenggalek",
    date_str: "Des 2024",
  },
  {
    id: "umkm-3",
    client_name: "LAUNDRY AZKA",
    client_position: "Owner",
    client_company: "LAUNDRY AZKA",
    testimonial:
      "Desain sederhana tapi efektif. Signage baru membuat usaha kami terlihat lebih terpercaya dan rapi.",
    rating: 5,
    service_category: "advertising",
    is_featured: false,
    project_scope: "Branding usaha laundry",
    location: "Trenggalek",
    date_str: "Nov 2024",
  },
  {
    id: "umkm-4",
    client_name: "RUMAH HIJAB AISYAH",
    client_position: "Founder",
    client_company: "RUMAH HIJAB AISYAH",
    testimonial:
      "Branding visual membantu meningkatkan kepercayaan pembeli. Tampilan toko dan materi promosi jadi lebih konsisten.",
    rating: 5,
    service_category: "advertising",
    is_featured: false,
    project_scope: "Branding UMKM fashion",
    location: "Jawa Timur",
    date_str: "Okt 2024",
  },

  // =============================
  // CAFE & F&B (CUSTOM CUP)
  // =============================
  {
    id: "cafe-1",
    client_name: "MADJU JAYA CAFE",
    client_position: "Management",
    client_company: "MADJU JAYA CAFE",
    testimonial:
      "Custom cup minuman sangat membantu membangun identitas brand. Desainnya clean dan cocok dengan konsep cafe kami.",
    rating: 5,
    service_category: "advertising",
    is_featured: true,
    project_scope: "Custom cup minuman",
    location: "Trenggalek",
    date_str: "Jan 2025",
  },
  {
    id: "cafe-2",
    client_name: "BALOK KAYU CAFE",
    client_position: "Owner",
    client_company: "BALOK KAYU CAFE",
    testimonial:
      "Cup branding membuat produk terlihat lebih premium. Banyak pelanggan mengunggah minuman kami ke media sosial.",
    rating: 5,
    service_category: "advertising",
    is_featured: false,
    project_scope: "Cup minuman & branding visual",
    location: "Trenggalek",
    date_str: "Des 2024",
  },
  {
    id: "cafe-3",
    client_name: "AMMOR COFFEE AND SPACE",
    client_position: "Brand Team",
    client_company: "AMMOR COFFEE AND SPACE",
    testimonial:
      "Desain cup relevan dengan market kami. Branding terasa konsisten dan meningkatkan kesan profesional.",
    rating: 5,
    service_category: "advertising",
    is_featured: false,
    project_scope: "Custom cup coffee",
    location: "Jawa Timur",
    date_str: "Nov 2024",
  },
  {
    id: "cafe-4",
    client_name: "RUANG LUANG",
    client_position: "Owner",
    client_company: "RUANG LUANG",
    testimonial:
      "Cup minuman membantu memperkuat karakter brand kami. Simple tapi mudah diingat pelanggan.",
    rating: 5,
    service_category: "advertising",
    is_featured: false,
    project_scope: "Cup minuman cafe",
    location: "Trenggalek",
    date_str: "Okt 2024",
  },
  {
    id: "cafe-5",
    client_name: "SOBAT ES TEH",
    client_position: "Operational Team",
    client_company: "SOBAT ES TEH",
    testimonial:
      "Produksi cup stabil dan kualitas konsisten. Sangat membantu operasional harian outlet kami.",
    rating: 5,
    service_category: "advertising",
    is_featured: false,
    project_scope: "Cup minuman F&B",
    location: "Jawa Timur",
    date_str: "Sep 2024",
  },
];

/* =========================
   Helpers
   ========================= */
function Initials({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
      {initials}
    </div>
  )
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

/* =========================
   Component
   ========================= */
export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState<"all" | "advertising" | "building_me">("all")

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? testimonials
        : testimonials.filter(
            (t) => t.service_category === activeCategory || t.service_category === "both",
          ),
    [activeCategory],
  )

  const featured = useMemo(() => filtered.filter((t) => t.is_featured), [filtered])
  const display = featured.length > 0 ? featured : filtered.slice(0, Math.min(3, filtered.length))

  // Reset slide saat filter berubah
  useEffect(() => setCurrentIndex(0), [activeCategory])

  const avgRating = useMemo(
    () => (filtered.length ? (filtered.reduce((a, b) => a + b.rating, 0) / filtered.length).toFixed(1) : "0.0"),
    [filtered],
  )

  const next = () => setCurrentIndex((i) => (i + 1) % display.length)
  const prev = () => setCurrentIndex((i) => (i - 1 + display.length) % display.length)

  const active = display[currentIndex]

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center md:mb-12">
          <div className="mb-4 inline-flex items-center rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800">
            Testimoni Klien
          </div>
          <h2 className="text-balance text-3xl font-bold text-gray-900 md:text-4xl">
            Apa Kata Klien Tentang Layanan Kami
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-lg text-gray-600">
            Kami menjaga kualitas eksekusi—dari periklanan (signage, branding) hingga Building ME (AC, kelistrikan,
            maintenance). Berikut pengalaman klien yang sudah bekerja sama.
          </p>

          {/* meta rating */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700">
            <Stars rating={5} />
            <span className="ml-2 font-medium">{avgRating}</span>
            <span className="text-gray-400">/ 5.0 •</span>
            <span className="text-gray-600">{filtered.length} ulasan terverifikasi</span>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-12 flex justify-center">
          <div className="rounded-xl bg-gray-100 p-1">
            <Button
              variant={activeCategory === "all" ? "default" : "ghost"}
              onClick={() => setActiveCategory("all")}
              className={activeCategory === "all" ? "bg-white shadow-sm" : ""}
            >
              Semua
            </Button>
            <Button
              variant={activeCategory === "advertising" ? "default" : "ghost"}
              onClick={() => setActiveCategory("advertising")}
              className={activeCategory === "advertising" ? "bg-orange-500 text-white hover:bg-orange-600" : ""}
            >
              Periklanan
            </Button>
            <Button
              variant={activeCategory === "building_me" ? "default" : "ghost"}
              onClick={() => setActiveCategory("building_me")}
              className={activeCategory === "building_me" ? "bg-blue-500 text-white hover:bg-blue-600" : ""}
            >
              Building ME
            </Button>
          </div>
        </div>

        {/* Featured / Carousel */}
        {display.length > 0 && (
          <div className="relative mb-16">
            <Card className="mx-auto max-w-4xl shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="text-center" itemScope itemType="https://schema.org/Review">
                  <Quote className="mx-auto mb-6 h-12 w-12 text-orange-500" aria-hidden="true" />
                  <blockquote className="mx-auto max-w-3xl text-balance text-xl leading-relaxed text-gray-700 md:text-2xl italic">
                    “<span itemProp="reviewBody">{active.testimonial}</span>”
                  </blockquote>

                  <div className="mt-6 flex items-center justify-center gap-3">
                    <Stars rating={active.rating} />
                    <meta itemProp="reviewRating" content={`${active.rating}`} />
                  </div>

                  <div className="mt-6 flex flex-col items-center gap-3">
                    <div className="flex items-center gap-3">
                      <Initials name={active.client_name} />
                      <div className="text-left">
                        <div className="font-semibold text-gray-900" itemProp="author" itemScope itemType="https://schema.org/Person">
                          <span itemProp="name">{active.client_name}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {active.client_position} • {active.client_company}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <Badge
                        variant="secondary"
                        className={
                          active.service_category === "advertising"
                            ? "bg-orange-50 text-orange-700"
                            : "bg-blue-50 text-blue-700"
                        }
                      >
                        {active.service_category === "advertising" ? "Layanan Periklanan" : "Building ME"}
                      </Badge>
                      {active.project_scope && <Badge variant="outline">{active.project_scope}</Badge>}
                      {active.location && <Badge variant="outline">{active.location}</Badge>}
                      {active.date_str && (
                        <Badge variant="outline" className="text-gray-500">
                          {active.date_str}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {display.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prev}
                  aria-label="Sebelumnya"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:bg-gray-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={next}
                  aria-label="Berikutnya"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:bg-gray-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>

                <div className="mt-6 flex justify-center gap-2">
                  {display.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      aria-label={`Slide ${i + 1}`}
                      className={`h-2.5 w-2.5 rounded-full transition-colors ${
                        i === currentIndex ? "bg-orange-500" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Grid ringkas */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, 6).map((t) => (
            <Card key={t.id} className="transition-shadow shadow-lg hover:shadow-xl">
              <CardContent className="p-6">
                <div className="mb-4 flex items-start justify-between gap-2">
                  <Stars rating={t.rating} />
                  <Badge
                    variant="secondary"
                    className={t.service_category === "advertising" ? "bg-orange-50 text-orange-700" : "bg-blue-50 text-blue-700"}
                  >
                    {t.service_category === "advertising" ? "Periklanan" : "Building ME"}
                  </Badge>
                </div>

                <blockquote className="mb-4 text-gray-700 leading-relaxed">“{t.testimonial}”</blockquote>

                <div className="mt-4 border-t pt-4">
                  <div className="mb-2 flex items-center gap-3">
                    <Initials name={t.client_name} />
                    <div>
                      <div className="font-semibold text-gray-900">{t.client_name}</div>
                      <div className="text-sm text-gray-600">
                        {t.client_position} • {t.client_company}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {t.project_scope && <Badge variant="outline">{t.project_scope}</Badge>}
                    {t.location && <Badge variant="outline">{t.location}</Badge>}
                    {t.date_str && (
                      <Badge variant="outline" className="text-gray-500">
                        {t.date_str}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="rounded-2xl bg-gradient-to-r from-orange-50 to-blue-50 p-8">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">Bergabung dengan Klien Puas Kami</h3>
            <p className="mb-6 text-lg text-gray-600">
              Konsultasikan kebutuhan periklanan atau Building ME Anda—tim kami siap menyusun solusi yang efektif dan terukur.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-orange-500 text-white hover:bg-orange-600">
                <Link href="/kontak">Mulai Proyek Anda</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-orange-500 text-orange-600 hover:bg-orange-50"
              >
                <Link href="/portofolio">Lihat Portofolio</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
