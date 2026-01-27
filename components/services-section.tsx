"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Megaphone,
  Building2,
  Wind,
  Zap,
  ArrowRight,
  CheckCircle,
  Wrench,
  Paintbrush,
  Lightbulb,
} from "lucide-react"

const iconMap = {
  Building2,
  Wind,
  Zap,
  Megaphone,
  Wrench,
  Paintbrush,
  Lightbulb,
}

interface Service {
  id: string
  title: string
  description: string
  category: "all" | "advertising" | "building_me" | "renovation" | "interior" | "others"
  icon: keyof typeof iconMap
  features: string[]
  image_url?: string // Menambahkan image_url untuk portofolio
}

/** ===============================
 * DATA LAYANAN & PORTOFOLIO – disesuaikan
 * =============================== */
const services: Service[] = [
  {
    id: "advertising",
    title: "Advertising & Signage",
    description: "Solusi periklanan untuk visibilitas maksimal: dari desain fasad hingga produksi media luar ruang.",
    category: "advertising",
    icon: "Megaphone",
    features: [
      "Pembuatan & perawatan: Neon box, Billboard, Papan nama",
      "Perbaikan signage: Neon sign, Acrylic, dll",
      "Desain fasad bangunan & road sign",
      "Spanduk & umbul-umbul",
    ],
    image_url: "/path/to/advertising-image.jpg"
  },
  {
    id: "building-care",
    title: "Perawatan & Perbaikan Bangunan",
    description: "Perawatan & perbaikan menyeluruh untuk menjaga tampilan, fungsi, dan keamanan bangunan Anda.",
    category: "building_me",
    icon: "Building2",
    features: [
      "Perbaikan atap & anti bocor",
      "Perawatan saluran air bersih & kotor",
      "Perbesian/las & sarana penunjang",
      "Perbaikan struktur: pondasi, dinding, cor",
    ],
    image_url: "/path/to/building-care-image.jpg"
  },
  {
    id: "renovation",
    title: "Renovasi Bangunan & Interior",
    description: "Layanan renovasi untuk memperbarui dan mengoptimalkan fungsi ruang sesuai kebutuhan Anda.",
    category: "renovation",
    icon: "Building2", // Bisa disesuaikan dengan icon yang lebih cocok
    features: [
      "Renovasi bangunan & Rompak/bongkar pasang",
      "Pengecatan & perbaikan cat",
      "Pemasangan partisi & plafond",
      "Renovasi toilet/kamar mandi",
    ],
    image_url: "/path/to/renovation-image.jpg"
  },
  {
    id: "electrical",
    title: "Mekanik & Elektrik",
    description: "Instalasi, perawatan, dan penanganan gangguan kelistrikan dengan standar keselamatan tinggi.",
    category: "building_me",
    icon: "Zap",
    features: [
      "Penanganan gangguan listrik darurat",
      "Perawatan & perbaikan instalasi listrik",
      "Pemasangan & setting panel baru",
      "Audit energi & efisiensi",
    ],
    image_url: "/path/to/electrical-image.jpg"
  },
  {
    id: "ac",
    title: "AC & Ventilasi",
    description: "Layanan AC terintegrasi: konsultasi, pemasangan, perawatan, hingga daur ulang unit.",
    category: "building_me",
    icon: "Wind",
    features: [
      "Perawatan & perbaikan AC (split & central)",
      "Pemasangan AC baru",
      "Konsultasi & daur ulang AC",
      "Pemasangan kipas & ventilasi",
    ],
    image_url: "/path/to/ac-image.jpg"
  },
  {
    id: "lampu",
    title: "Lampu & Penerangan",
    description: "Instalasi dan perbaikan lampu untuk kebutuhan pencahayaan yang optimal di dalam maupun luar ruangan.",
    category: "others",
    icon: "Lightbulb",
    features: [
      "Pemasangan lampu indoor & outdoor",
      "Perbaikan lampu jalan & tiang lampu",
      "Penggantian komponen lampu",
    ],
    image_url: "/path/to/lampu-image.jpg"
  },
  {
    id: "cat",
    title: "Pengecatan",
    description: "Layanan pengecatan profesional untuk mempercantik tampilan bangunan Anda.",
    category: "interior",
    icon: "Paintbrush",
    features: [
      "Pengecatan dinding, plafond, dan eksterior",
      "Perbaikan cat lama",
      "Konsultasi warna & material cat",
    ],
    image_url: "/path/to/cat-image.jpg"
  },
  {
    id: "plafond",
    title: "Pemasangan Plafond",
    description: "Solusi pemasangan dan perbaikan plafond untuk interior yang rapi dan menarik.",
    category: "interior",
    icon: "Building2",
    features: [
      "Pemasangan plafond gypsum & PVC",
      "Perbaikan plafond yang rusak",
      "Desain plafond custom",
    ],
    image_url: "/path/to/plafond-image.jpg"
  }
]

export function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const filteredServices =
    activeCategory === "all" ? services : services.filter((service) => service.category === activeCategory)

  // Tambahkan kategori baru ke dalam tombol
  const categories = [
    { name: "Semua Layanan", value: "all" },
    { name: "Advertising", value: "advertising", icon: Megaphone },
    { name: "Building ME", value: "building_me", icon: Building2 },
    { name: "Renovasi", value: "renovation", icon: Wrench },
    { name: "Interior", value: "interior", icon: Paintbrush },
    { name: "Lainnya", value: "others", icon: Lightbulb },
  ];

  return (
    <section id="layanan" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-4">
            Layanan Kami
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
            Solusi Lengkap untuk Kebutuhan Bisnis Anda
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            PT. Bakti Karya Teknik menyediakan layanan terpadu di bidang Periklanan dan Building Mechanical Electrical
            dengan standar kualitas tinggi dan tim profesional berpengalaman.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={activeCategory === cat.value ? "default" : "ghost"}
              onClick={() => setActiveCategory(cat.value)}
              className={activeCategory === cat.value ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}
            >
              {cat.icon && <cat.icon className="w-4 h-4 mr-2" />}
              {cat.name}
            </Button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {filteredServices.map((service) => {
            const IconComponent = iconMap[service.icon]
            const isAdvertising = service.category === "advertising"
            const isBuildingME = service.category === "building_me"

            return (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
                      isAdvertising ? "bg-orange-100" : isBuildingME ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    <IconComponent className={`h-6 w-6 ${isAdvertising ? "text-orange-500" : isBuildingME ? "text-blue-500" : "text-gray-500"}`} />
                  </div>

                  <Badge
                    variant="secondary"
                    className={`mb-3 ${isAdvertising ? "bg-orange-50 text-orange-700" : isBuildingME ? "bg-blue-50 text-blue-700" : "bg-gray-50 text-gray-700"}`}
                  >
                    {service.category === "advertising" ? "Periklanan" : service.category === "building_me" ? "Building ME" : "Lainnya"}
                  </Badge>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>

                  <div className="mb-6 space-y-2">
                    {service.features.slice(0, 5).map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-blue-500 p-8 text-white">
            <h3 className="mb-4 text-2xl font-bold">Butuh Konsultasi untuk Proyek Anda?</h3>
            <p className="mb-6 text-lg opacity-90">
              Tim ahli kami siap membantu merencanakan solusi terbaik sesuai kebutuhan dan budget Anda.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" className="group bg-orange-500 text-white hover:bg-orange-600" asChild>
                <Link href="/kontak">
                  Konsultasi Gratis
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="bg-transparent hover:border-orange-500 hover:text-orange-500"
                asChild
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
