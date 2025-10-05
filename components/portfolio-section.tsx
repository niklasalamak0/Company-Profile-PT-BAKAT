"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type TopLevel = "advertising" | "building" | "maintenance"

interface DocCategory {
  slug: string
  title: string
  summary: string
  topLevel: TopLevel
  cover_url: string
  tags: string[]
  items_count: number
}

const docCategories: DocCategory[] = [
  {
    slug: "dokumentasi-advertising",
    title: "Dokumentasi Pekerjaan Advertising",
    summary:
      "Pekerjaan billboard, neon box, shop sign, branding fasad, hingga eksekusi lapangan.",
    topLevel: "advertising",
    cover_url: "/modern-billboard-mall-jakarta.jpg",
    // ✅ pakai nama layanan resmi
    tags: ["Advertising & Signage", "Lampu & Penerangan"],
    items_count: 124,
  },
  {
    slug: "dokumentasi-kelistrikan",
    title: "Dokumentasi Pekerjaan Kelistrikan",
    summary:
      "Instalasi panel listrik, MCB, grounding, emergency lighting, audit energi, dan SLO.",
    topLevel: "maintenance",
    cover_url: "/apartment-electrical-system-installation.jpg",
    // ✅ pakai nama layanan resmi
    tags: ["Mekanik & Elektrik", "Lampu & Penerangan"],
    items_count: 57,
  },
  {
    slug: "dokumentasi-pembangunan",
    title: "Dokumentasi Pekerjaan Pembangunan",
    summary:
      "Pekerjaan konstruksi gedung termasuk struktur, plumbing, roofing, dan cleaning.",
    topLevel: "building",
    cover_url: "/maintenance-perbaikan.jpg",
    // ✅ pakai nama layanan resmi
    tags: [
      "Perawatan & Perbaikan Bangunan",
      "Renovasi Bangunan & Interior",
      "Pemasangan Plafond",
      "Pengecatan",
    ],
    items_count: 73,
  },
  {
    slug: "dokumentasi-maintenance",
    title: "Dokumentasi Pekerjaan Maintenance",
    summary:
      "Preventive & corrective maintenance meliputi struktur, plumbing, roofing, hingga cleaning.",
    topLevel: "maintenance",
    cover_url: "/luxury-hotel-building-maintenance.jpg",
    // ✅ pakai nama layanan resmi
    tags: [
      "Perawatan & Perbaikan Bangunan",
      "Mekanik & Elektrik",
      "AC & Ventilasi",
    ],
    items_count: 73,
  },
]



export function PortfolioSection() {
  const [filter, setFilter] = useState<"all" | TopLevel>("all")
  const filtered = filter === "all" ? docCategories : docCategories.filter(d => d.topLevel === filter)

  const tab = (label: string, val: "all" | TopLevel, activeCls: string) => (
    <Button
      key={val}
      variant={filter === val ? "default" : "ghost"}
      className={filter === val ? activeCls : ""}
      onClick={() => setFilter(val)}
    >
      {label}
    </Button>
  )

  return (
    <section id="portofolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            Dokumentasi Proyek
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Pilih Kategori Dokumentasi
          </h2>
        </div>

        <div className="flex justify-center mb-10">
          <div className="bg-white rounded-xl p-1 shadow-sm">
            {tab("Semua", "all", "bg-gray-900 text-white")}
            {tab("Periklanan", "advertising", "bg-orange-500 text-white hover:bg-orange-600")}
            {tab("Building", "building", "bg-blue-500 text-white hover:bg-blue-600")}
            {tab("Maintenance", "maintenance", "bg-emerald-500 text-white hover:bg-emerald-600")}
          </div>
        </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(cat => (
          <div
            key={cat.slug}
            className="bg-white rounded-2xl shadow-lg overflow-hidden group 
                      hover:shadow-xl transition-all border border-orange-200 hover:border-orange-500"
          >
            {/* Cover Image */}
            <div className="relative h-48">
              <Image
                src={cat.cover_url || "/placeholder.svg"}
                alt={cat.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4">
                <Badge
                  variant="secondary"
                  className={
                    cat.topLevel === "advertising"
                      ? "bg-orange-500 text-white"
                      : cat.topLevel === "building"
                      ? "bg-blue-500 text-white"
                      : "bg-emerald-500 text-white"
                  }
                >
                  {cat.topLevel === "advertising"
                    ? "Periklanan"
                    : cat.topLevel === "building"
                    ? "Building"
                    : "Maintenance"}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-orange-500 transition-colors">
                {cat.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{cat.summary}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {cat.tags.map(t => (
                  <Badge key={t} variant="outline" className="text-xs">
                    {t}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                
                <Link href={`/portofolio/${cat.slug}`}>
                  <Button
                    variant="outline"
                    className="bg-transparent group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 w-auto"
                  >
                    Lihat Detail
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>


      </div>
    </section>
  )
}
