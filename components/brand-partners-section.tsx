"use client"

import * as React from "react"
import Image from "next/image"
import { Plus, Building2, Coffee, Hammer, Cigarette } from "lucide-react"

/* =============================
 * TIPE & DATA
 * ============================= */
type PartnerCategory = "client" | "partner" | "supplier"

interface BrandPartner {
  id: string
  name: string
  logo_url?: string
  category: PartnerCategory
}

/* =============================
 * DATA TERGRUP
 * ============================= */
const groupedPartners: Record<string, BrandPartner[]> = {
  "Klien Perusahaan Umum": [
    { id: "sinar-jaya-inti", name: "PT. SINAR JAYA INTI", category: "client", logo_url: "/sinar-jaya-inti.jpg" },
    { id: "budi-risqi", name: "PT. BUDI RISQI", category: "client", logo_url: "/budi-risqi.jpg" },
    { id: "rumah-hijab-aisyah", name: "RUMAH HIJAB AISYAH", category: "client", logo_url: "/rumah-hijab-aisyah.jpg" },
    { id: "apotek-k24", name: "APOTEK K24", category: "client", logo_url: "/apotek-k24.png" },
    { id: "laundry-azka", name: "LAUNDRY AZKA", category: "client", logo_url: "/laundry-azka.jpg" },
    { id: "swalayan-karanganom", name: "SWALAYAN KARANGANOM", category: "client", logo_url: "/swalayan-karanganom.jpg" },
    { id: "wisco-ice", name: "WISCO ICE", category: "client", logo_url: "/wisco-ice.jpg" },
    { id: "warkop-wbs", name: "WARKOP WBS", category: "client", logo_url: "/warkop-wbs.jpg" },
  ],
  "Grup Industri Rokok": [
    { id: "djarum", name: "PT DJARUM", category: "client", logo_url: "/pt-djarum-logo.jpeg" },
    { id: "wikatama", name: "PT WIKATAMA INDAH SIGARET", category: "client", logo_url: "/wikatama-indah.jpeg" },
    { id: "sumber-cipta-multiniaga", name: "PT SUMBER CIPTA MULTINIAGA", category: "client", logo_url: "/pt-sumbercipta.jpeg" },
    { id: "maju-abadi-sigaret", name: "PT MAJU ABADI SIGARET", category: "client" },
    { id: "chandra-asri-mulia-abadi", name: "PT CHANDRA ASRI MULIA ABADI", category: "client", logo_url: "/candra-asri.jpeg" },
    { id: "roberto-prima-tobacco", name: "PT ROBERTO PRIMA TOBACCO", category: "client", logo_url: "/roberto-prima.jpeg" },
    { id: "mitra-pratama-integra", name: "PT MITRA PRATAMA INTEGRA", category: "client", logo_url: "/mitra-logo.jpeg" },
    { id: "jamrud khatulistiwa", name: "PT JAMRUD KHATULISTIWA TOBACCO", category: "client", logo_url: "/pt-jamrud.jpeg" },
    { id: "stevania ultra tobacco", name: "PT STEVANIA ULTRA TOBACCO", category: "client", logo_url: "/stevania-ultra.jpeg" },
    { id: "dian mulyo", name: "PR DIAN MULYO", category: "client", logo_url: "/dian-mulyo.jpeg" },
  ],
  "Vendor & Advertising Lokal": [
    { id: "advertindo", name: "CV ADVERTINDO JAYA MAKMUR DINAMIKA", category: "client" },
    { id: "prima-and-clear", name: "CV PRIMA AND CLEAR", category: "client" },
    { id: "multi-indo-perkasa", name: "CV MULTI INDO PERKASA", category: "client" },
  ],
  "Cafe & F&B": [
    { id: "madju-jaya-cafe", name: "MADJU JAYA CAFE", category: "client", logo_url: "/madju-djaja.jpg"},
    { id: "moro-moro-cafe", name: "MORO MORO CAFE", category: "client", logo_url: "/moro-moro.jpeg"},
    { id: "balok-kayu-cafe", name: "BALOK KAYU CAFE", category: "client",logo_url: "/balok-kayu-logo.jpeg"},
    { id: "ammor-coffee-and-space", name: "AMMOR COFFEE AND SPACE", category: "client", logo_url: "/ammor.jpeg"},
    { id: "ruang-luang", name: "RUANG LUANG", category: "client", logo_url: "/ruang-luang.jpeg"},
    { id: "jeruk-peras-qu", name: "JERUK PERAS QU", category: "client", logo_url: "/jeruk-peras.jpeg"},
    { id: "two d coffee", name: "TWO D COFFEE", category: "client", logo_url: "/two-darah.jpeg"},
    { id: "sobat es teh", name: "SOBAT ES TEH", category: "client", logo_url: "/sobat-es-teh.jpeg"},
  ],
}

/* =============================
 * UTIL WARNA PASTEL
 * ============================= */
function pastelFromName(name: string) {
  const i = Array.from(name).reduce((a, c) => a + c.charCodeAt(0), 0) % 6
  return [
    "bg-orange-50 text-orange-800",
    "bg-amber-50 text-amber-800",
    "bg-lime-50 text-lime-800",
    "bg-blue-50 text-blue-800",
    "bg-emerald-50 text-emerald-800",
    "bg-sky-50 text-sky-800",
  ][i]
}

/* =============================
 * IKON DEFAULT BERDASARKAN NAMA
 * ============================= */
function defaultIconFor(name: string) {
  if (/cafe|coffee|ruang|ammor|moro|jeruk/i.test(name))
    return <Coffee className="h-5 w-5 text-gray-500" />
  if (/rokok|sigaret|tobacco/i.test(name))
    return <Cigarette className="h-5 w-5 text-gray-500" />
  if (/advert|cv|vendor|multi/i.test(name))
    return <Hammer className="h-5 w-5 text-gray-500" />
  return <Building2 className="h-5 w-5 text-gray-500" />
}

/* =============================
 * TILE DENGAN LOGO ATAU FALLBACK
 * ============================= */
function PartnerTile({ name, logo_url }: { name: string; logo_url?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 ${pastelFromName(
        name
      )} p-4 shadow-sm transition-all hover:shadow-md text-center`}
      title={name}
      role="listitem"
    >
<div className="flex items-center justify-center">
  <div className="relative h-24 w-24 max-h-24 max-w-24">
    <Image
      src={logo_url}
      alt={name}
      fill
      className="object-contain"
    />
  </div>
</div>
      <span className="text-sm font-medium text-gray-900 leading-tight break-words max-w-[140px]">
        {name}
      </span>
    </div>
  )
}

/* =============================
 * SECTION UTAMA
 * ============================= */
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
            Kami menampilkan daftar mitra dan klien yang sudah puas dan percaya
            dengan kinerja tim kami yang profesional.
          </p>
        </div>

        {/* Ringkasan */}
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

        {/* === LOOP PER GRUP === */}
        {Object.entries(groupedPartners).map(([groupName, list]) => (
          <div key={groupName} className="mb-12">
            <h3 className="mb-4 text-lg font-semibold text-gray-800 border-l-4 border-orange-400 pl-3">
              {groupName}
            </h3>
            <div
              className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              role="list"
            >
              {list.map((p) => (
                <PartnerTile key={p.id} name={p.name} logo_url={p.logo_url} />
              ))}
            </div>
          </div>
        ))}

        {/* Pernyataan Mutu */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <h4 className="mb-2 text-lg font-semibold text-gray-900">
              Komitmen
            </h4>
            <p className="text-gray-700">
              Integritas, ketepatan waktu, dan hasil kerja yang presisi menjadi
              standar kami di setiap penugasan.
            </p>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h4 className="mb-2 text-lg font-semibold text-gray-900">
              Jaminan Kualitas
            </h4>
            <p className="text-gray-700">
              Prosedur kerja terdokumentasi, material terverifikasi, serta
              dukungan purna-jual memastikan pengalaman yang mulus bagi klien.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
