"use client"

import * as React from "react"
import { Plus } from "lucide-react"

/** ==============================
 * TIPE & DATA
 * (logo_url dihapus—kita tidak pakai gambar)
 * ============================== */
type PartnerCategory = "client" | "partner" | "supplier"

interface BrandPartner {
  id: string
  name: string
  category: PartnerCategory
}

const partners: BrandPartner[] = [
  { id: "sinar-jaya-inti", name: "PT. SINAR JAYA INTI", category: "client" },
  { id: "budi-risqi", name: "PT. BUDI RISQI", category: "client" },
  { id: "rumah-hijab-aisah", name: "RUMAH HIJAB AISAH", category: "client" },
  { id: "apotik-k24", name: "APOTIK K24", category: "client" },
  { id: "laundry-azka", name: "LAUNDRY AZKA", category: "client" },
  { id: "swalayan-karanganom", name: "SWALAYAN KARANGANOM", category: "client" },
  { id: "wisco-ice", name: "WISCO ICE", category: "client" },
  { id: "warkop-wbs", name: "WARKOP WBS", category: "client" },

  // grup perusahaan rokok
  { id: "djarum", name: "PT DJARUM", category: "client" },
  { id: "wikatama", name: "PT WIKATAMA INDAH SIGARET INDONESIA", category: "client" },
  { id: "candra-asri-mulia", name: "PT CANDRA ASRI MULIA ABADI", category: "client" },
  { id: "roberta-prima", name: "PT ROBERTA PRIMA TOBACCO", category: "client" },

  // tambahan baru
  { id: "ruang-luang-cofee", name: "RUANG LUANG COFEE", category: "client" },
  { id: "ammor-coffee-and-space", name: "AMMOR COFFEE AND SPACE", category: "client" },
  { id: "madju-jaya-cafe", name: "MADJU JAYA CAFE", category: "client" },
  { id: "jeruk-peras-qu", name: "JERUK PERAS QU", category: "client" },
  { id: "pt-maju-abadi-sigaret", name: "PT MAJU ABADI SIGARET", category: "client"},
]


/** ==============================
 * UTIL: warna pastel konsisten dari nama
 * ============================== */
function pastelFromName(name: string) {
  const i = Array.from(name).reduce((a, c) => a + c.charCodeAt(0), 0) % 6
  return [
    "bg-gray-50 text-gray-800",
    "bg-zinc-50 text-zinc-800",
    "bg-slate-50 text-slate-800",
    "bg-stone-50 text-stone-800",
    "bg-neutral-50 text-neutral-800",
    "bg-gray-100 text-gray-800",
  ][i]
}

/** ==============================
 * TILE TANPA GAMBAR (tipografi saja)
 * ============================== */
function NameTile({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .map((s) => s[0])
    .join("")
    .slice(0, 3)
    .toUpperCase()

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border border-gray-200 ${pastelFromName(
        name
      )} p-4 shadow-sm transition-all hover:shadow-md`}
      title={name}
      role="listitem"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/80 text-sm font-semibold">
        {initials}
      </div>
      <span className="line-clamp-1 text-sm font-medium tracking-wide">
        {name}
      </span>
    </div>
  )
}

/** ==============================
 * SECTION UTAMA (elegan & profesional)
 * ============================== */
export function BrandPartnersSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
            Partner & Klien
          </div>
          <h2 className="text-balance text-3xl font-bold text-gray-900 md:text-4xl">
            Dipercaya oleh Perusahaan Terkemuka
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-lg text-gray-600">
            Kami menampilkan daftar mitra dan klien yang sudah puas dan percaya dengan kinerja tim kami yang profesional.
          </p>
        </div>

        {/* Ringkasan singkat */}
        <div className="mb-10 rounded-2xl border border-gray-100 bg-gradient-to-r from-orange-50 to-white p-6 shadow-sm">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-2xl font-bold text-orange-500">50+</div>
              <div className="text-gray-700">Klien Puas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">200+</div>
              <div className="text-gray-700">Proyek Selesai</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">3+</div>
              <div className="text-gray-700">Tahun Pengalaman</div>
            </div>
          </div>
        </div>

        {/* Grid partner/klien tipografi */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Klien & Mitra yang Percaya</h3>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              {partners.length} entri
            </span>
          </div>

          <div
            className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            role="list"
            aria-label="Daftar partner dan klien"
          >
            {partners.map((p) => (
              <NameTile key={p.id} name={p.name} />
            ))}
            
            {/* ✅ New element for the "more" icon, inside the grid */}
            <div
              className="flex items-center justify-center rounded-xl bg-gray-100 p-4 shadow-sm transition-all hover:shadow-md"
              role="listitem"
            >
              <div className="flex flex-col items-center justify-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-gray-500">
                  <Plus className="h-6 w-6" />
                </div>
                <p className="mt-2 text-sm text-gray-600">Dan Banyak Lagi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pernyataan mutu */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <h4 className="mb-2 text-lg font-semibold text-gray-900">Komitmen</h4>
            <p className="text-gray-700">
              Integritas, ketepatan waktu, dan hasil kerja yang presisi menjadi standar kami di setiap penugasan.
            </p>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h4 className="mb-2 text-lg font-semibold text-gray-900">Jaminan Kualitas</h4>
            <p className="text-gray-700">
              Prosedur kerja terdokumentasi, material terverifikasi, serta dukungan purna-jual memastikan pengalaman
              yang mulus bagi klien.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
