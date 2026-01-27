import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

/* ========= TIPE ========= */

type Slug =
  | "dokumentasi-ac"
  | "dokumentasi-advertising"
  | "dokumentasi-kelistrikan"
  | "dokumentasi-maintenance-gedung"

type TopLevel = "advertising" | "building" | "maintenance"

type AdvertisingSubcategory =
  | "spanduk"
  | "baliho"
  | "visual-backwall"
  | "pju"
  | "vertical-banner"
  | "tinplate"
  | "panel-toko"
  | "shop-sign"
  | "road-sign"
  | "event"
  | "umbul-umbul"

interface DocItem {
  id: string
  url: string
  caption?: string
  lokasi: string
  tanggal: string // ISO (YYYY-MM-DD)
  subCategory?: AdvertisingSubcategory
}

interface DocPageData {
  title: string
  topLevel: TopLevel
  hero?: string
  items: DocItem[]
}

/* ========= SUB-KATEGORI LIST ========= */
const ADVERTISING_SUBCATEGORIES: { key: AdvertisingSubcategory; label: string }[] = [
  { key: "spanduk", label: "Spanduk" },
  { key: "baliho", label: "Baliho" },
  { key: "visual-backwall", label: "Visual Backwall" },
  { key: "pju", label: "PJU" },
  { key: "vertical-banner", label: "Vertical Banner" },
  { key: "tinplate", label: "Tinplate" },
  { key: "panel-toko", label: "Panel Toko" },
  { key: "shop-sign", label: "Shop Sign" },
  { key: "road-sign", label: "Road Sign" },
  { key: "event", label: "Event" },
  { key: "umbul-umbul", label: "Umbul-umbul" },
  { key: "promosi", label: "Promosi" },
]

/* ========= DATA DEMO (ganti ke Supabase nanti) ========= */
const db: Record<Slug, DocPageData> = {

  "dokumentasi-advertising": {
    title: "Dokumentasi Advertising",
    topLevel: "advertising",
    hero: "/iklan3.jpg",
    items: [

    // --- Advertising ---
    { 
      id: "ads-1", 
      url: "/advertising/banner-promosi.jpg", 
      lokasi: "Jakarta", 
      tanggal: "2024-08-12", 
      caption: "Banner Promosi", 
      subCategory: "promosi" 
    },
    { 
      id: "ads-2", 
      url: "/advertising/face-cade-tulisan-timbul-promosi.jpg", 
      lokasi: "Surabaya", 
      tanggal: "2024-08-13", 
      caption: "Face Cade Tulisan Timbul Promosi", 
      subCategory: "promosi" 
    },
    { 
      id: "ads-3", 
      url: "/advertising/nama-toko-promosi.jpg", 
      lokasi: "Bandung", 
      tanggal: "2024-08-14", 
      caption: "Nama Toko Promosi", 
      subCategory: "promosi" 
    },
    { 
      id: "ads-4", 
      url: "/advertising/neon-box-promosi.jpg", 
      lokasi: "Yogyakarta", 
      tanggal: "2024-08-15", 
      caption: "Neon Box Promosi", 
      subCategory: "promosi" 
    },
    { 
      id: "ads-5", 
      url: "/advertising/papan-nama-promosi2.jpg", 
      lokasi: "Malang", 
      tanggal: "2024-08-16", 
      caption: "Papan Nama Promosi", 
      subCategory: "promosi" 
    },
    { 
      id: "ads-6", 
      url: "/advertising/slow-down-dan-papan-nama-promosi2.jpg", 
      lokasi: "Semarang", 
      tanggal: "2024-08-17", 
      caption: "Slow Down dan Papan Nama Promosi", 
      subCategory: "promosi" 
    },

      // --- Baliho ---
      { id: "adv-1", url: "/baliho/baliho-gandusari.jpg", lokasi: "Tugu, Sukorejo, Kec. Gandusari, Trenggalek, Jawa Timur 66372", tanggal: "2025-07-28", caption: "Baliho 4 x 6 m", subCategory: "baliho" },
      { id: "adv-2", url: "/baliho/baliho-kranding.jpg", lokasi: "Jl. Raya Durenan No.16, Kranding, Bendorejo, Trenggalek 66371", tanggal: "2025-08-13", caption: "Baliho 4 x 6 m", subCategory: "baliho" },
      { id: "adv-3", url: "/baliho/baliho-4x6m-cita-rasa-nusantara.jpg", lokasi: "Jl. Raya Pantai Prigi, Tasikmadu, Watulimo, Trenggalek 66382", tanggal: "2025-08-01", caption: "Baliho 4 x 6 m", subCategory: "baliho" },
      { id: "adv-4", url: "/baliho/baliho-event.jpg", lokasi: "Tugu, Sukorejo, Kec. Gandusari, Trenggalek, Jawa Timur 66372", tanggal: "2025-07-28", caption: "Baliho 4 x 6 m Event Festival", subCategory: "baliho" },
      { id: "adv-5", url: "/baliho/baliho-event-futsal-rill.jpg", lokasi: "Jl. Raya Durenan No.16, Kranding, Bendorejo, Trenggalek 66371", tanggal: "2025-08-13", caption: "Baliho 4 x 6 m Event Futsal", subCategory: "baliho" },
      { id: "adv-6", url: "/baliho/baliho-sabilutaubah.jpg", lokasi: "Jl. Raya Pantai Prigi, Tasikmadu, Watulimo, Trenggalek 66382", tanggal: "2025-08-01", caption: "Baliho 4 x 6 m Event Sabilutaubah", subCategory: "baliho" },

      // --- Visual Backwall ---
      { id: "vbw-1", url: "/backwall/backlite-76mangga-fiks.jpg", lokasi: "Jl. Nasional, Tulungagung", tanggal: "2024-11-22", caption: "Backlite 76 Mangga", subCategory: "visual-backwall" },
      { id: "vbw-2", url: "/backwall/backlite-djarum-espresso-fiks.jpg", lokasi: "Jl. Raya Besar, Trenggalek", tanggal: "2024-11-23", caption: "Backlite Djarum Espresso", subCategory: "visual-backwall" },
      { id: "vbw-3", url: "/backwall/backlite-mld.jpg", lokasi: "Jl. Raya Pantai Prigi, Trenggalek", tanggal: "2024-11-24", caption: "Backlite MLD", subCategory: "visual-backwall" },

      // --- PJU ---
      { id: "pju-1", url: "/pju/pju-safari-fiks.jpg", lokasi: "Jl. Apel, Jakarta", tanggal: "2024-11-06", caption: "PJU DJARUM Safari", subCategory: "pju" },
      { id: "pju-2", url: "/pju/pju-trenggalek.jpg", lokasi: "Jl. Mangga, Jakarta", tanggal: "2024-11-07", caption: "PJU Trenggalek", subCategory: "pju" },
      { id: "pju-3", url: "/pju/pju-76mangga-fiks.jpg", lokasi: "Jl. Safari, Jakarta", tanggal: "2024-11-08", caption: "PJU 76 Mangga", subCategory: "pju" },
      { id: "pju-4", url: "/pju/pju-djarum.jpg", lokasi: "Jl. Apel, Jakarta", tanggal: "2024-11-06", caption: "PJU DJARUM Super", subCategory: "pju" },
      { id: "pju-5", url: "/pju/pju-laice.jpg", lokasi: "Jl. Mangga, Jakarta", tanggal: "2024-11-07", caption: "PJU LA Ice", subCategory: "pju" },
      { id: "pju-6", url: "/pju/pju-royal-fiks.jpg", lokasi: "Jl. Safari, Jakarta", tanggal: "2024-11-08", caption: "PJU 76 Mangga", subCategory: "pju" },

      // --- Road Sign ---
      { id: "roadsign-1", url: "/roadsign/road-sign-76mangga-fiks.jpg", lokasi: "Jl. Mangga, Jakarta", tanggal: "2024-11-10", caption: "Road Sign Djarum 76 Mangga", subCategory: "road-sign" },
      { id: "roadsign-2", url: "/roadsign/road-sign-mld-fiks.jpg", lokasi: "Jl. MLD, Jakarta", tanggal: "2024-11-14", caption: "Road Sign MLD", subCategory: "road-sign" },
      { id: "roadsign-3", url: "/roadsign/road-sign-raptor-fiks.jpg", lokasi: "Jl. Raptor, Jakarta", tanggal: "2024-11-15", caption: "Road Sign Raptor", subCategory: "road-sign" },
      { id: "roadsign-4", url: "/roadsign/klinik-kmu.jpg", lokasi: "Jl. Raptor, Jakarta", tanggal: "2024-11-15", caption: "Road Sign Klinik Mata KMU Trenggalek", subCategory: "road-sign" },

      // --- Panel Toko ---
      { id: "paneltoko-1", url: "/paneltoko/drp-ukuran-1x5m.jpg", lokasi: "Outlet Jakarta", tanggal: "2024-11-02", caption: "Panel Toko ukuran 1 x 5 m", subCategory: "panel-toko" },
      { id: "paneltoko-2", url: "/paneltoko/drp-ukuran-1x4m-fiks.jpg", lokasi: "Outlet Jakarta", tanggal: "2024-11-03", caption: "Panel Toko ukuran 1 x 4 m", subCategory: "panel-toko" },
      { id: "paneltoko-3", url: "/paneltoko/drp-ukuran-1x6m-fiks.jpg", lokasi: "Outlet Jakarta", tanggal: "2024-11-04", caption: "Panel Toko ukuran 1 x 6 m", subCategory: "panel-toko" },

      // --- Shop Sign ---
      { id: "shop-1", url: "/shopsign/shop-sign-djarum-safari-fiks.jpg", lokasi: "Mini Market Safari, Jakarta", tanggal: "2024-08-05", caption: "Shop Sign Djarum Safari", subCategory: "shop-sign" },
      { id: "shop-2", url: "/shopsign/shop-sign-raptor-fiks.jpg", lokasi: "Convenience Store, Jakarta", tanggal: "2024-08-10", caption: "Shop Sign LA", subCategory: "shop-sign" },
      { id: "shop-3", url: "/shopsign/shop-sign-mld.jpg", lokasi: "Supermarket MLD, Jakarta", tanggal: "2024-08-11", caption: "Shop Sign MLD", subCategory: "shop-sign" },

      // --- Spanduk ---
      { id: "spanduk-1", url: "/spanduk/spanduk-event-fiks.jpg", lokasi: "Outlet 76 Apel, Jakarta", tanggal: "2024-08-01", caption: "Spanduk Event", subCategory: "spanduk" },
      { id: "spanduk-2", url: "/spanduk/spanduk-indo.jpg", lokasi: "Outlet 76 Mangga, Jakarta", tanggal: "2024-08-02", caption: "Spanduk Indomaret", subCategory: "spanduk" },
      { id: "spanduk-3", url: "/spanduk/spanduk-hut.jpg", lokasi: "Outlet 76 Royal, Jakarta", tanggal: "2024-08-03", caption: "Spanduk 76 Royal", subCategory: "spanduk" },
      { id: "spanduk-4", url: "/spanduk/spanduk-selamat-datang.jpg", lokasi: "Outlet Bit, Jakarta", tanggal: "2024-08-04", caption: "Spanduk Selamat Datang", subCategory: "spanduk" },
      { id: "spanduk-5", url: "/spanduk/spanduk-djarum.jpg", lokasi: "Toko Safari, Jakarta", tanggal: "2024-08-05", caption: "Spanduk Djarum Super", subCategory: "spanduk" },
      { id: "spanduk-6", url: "/spanduk/spanduk-perusahaan.jpg", lokasi: "Mini Market Dongan, Jakarta", tanggal: "2024-08-06", caption: "Spanduk Perusahaan", subCategory: "spanduk" },
      { id: "spanduk-7", url: "/spanduk/spanduk-raptor.jpg", lokasi: "Outlet Raptor, Jakarta", tanggal: "2024-08-07", caption: "Spanduk Raptor", subCategory: "spanduk" },
      { id: "spanduk-8", url: "/spanduk/spanduk-smash-heppi.jpg", lokasi: "Outlet Smash Heppi, Jakarta", tanggal: "2024-08-08", caption: "Spanduk Event Smash Heppi", subCategory: "spanduk" },
      { id: "spanduk-9", url: "/spanduk/spanduk-kemerdekaan.jpg", lokasi: "Outlet Vipper, Jakarta", tanggal: "2024-08-09", caption: "Spanduk Kemerdekaan", subCategory: "spanduk" },

      // --- Tinplate ---
      { id: "tinplate-1", url: "/tinplate/tinplate-76-fiks.jpg", lokasi: "Outlet 76, Jakarta", tanggal: "2024-09-01", caption: "Tinplate 76", subCategory: "tinplate" },
      { id: "tinplate-2", url: "/tinplate/tinplate-raptor-fiks.jpg", lokasi: "Outlet Raptor, Jakarta", tanggal: "2024-09-03", caption: "Tinplate Raptor", subCategory: "tinplate" },
      { id: "tinplate-3", url: "/tinplate/tinplate-vip.jpg", lokasi: "Outlet VIP, Jakarta", tanggal: "2024-09-04", caption: "Tinplate VIP", subCategory: "tinplate" },

      // --- Vertical Banner (VB) ---
      { id: "vb-1", url: "/vb/vb-76apel-fiks.jpg", lokasi: "Event 76 Apel, Jakarta", tanggal: "2024-10-01", caption: "Vertical Banner 76 Apel", subCategory: "vertical-banner" },
      { id: "vb-2", url: "/vb/vb-event-grand-final.jpg", lokasi: "Event 76 Mangga, Jakarta", tanggal: "2024-10-02", caption: "Vertical Banner Event Grand Final Miss Otonomi Indonesia 2024", subCategory: "vertical-banner" },
      { id: "vb-3", url: "/vb/vb-76royal.jpg", lokasi: "Event 76 Royal, Jakarta", tanggal: "2024-10-03", caption: "Vertical Banner 76 Royal", subCategory: "vertical-banner" },
      { id: "vb-4", url: "/vb/vb-event-smash-heppii.jpg", lokasi: "Event Smash Heppi, Jakarta", tanggal: "2024-10-04", caption: "Vertical Banner EventSmash Heppi", subCategory: "vertical-banner" },
      { id: "vb-5", url: "/vb/vb-event-tag.jpg", lokasi: "Event Publik, Jakarta", tanggal: "2024-10-05", caption: "Vertical Banner Event Shining July Tulungagung", subCategory: "vertical-banner" },
      { id: "vb-6", url: "/vb/vb-vipper-fiks.jpg", lokasi: "Event Vipper, Jakarta", tanggal: "2024-10-06", caption: "Vertical Banner Vipper", subCategory: "vertical-banner" },

      // --- Event ---
      { id: "event-1", url: "/event/backdrop-event.jpg", lokasi: "Hall Jakarta Convention Center", tanggal: "2024-11-16", caption: "Backdrop Event", subCategory: "event" },
      { id: "event-2", url: "/event/board-event.jpg", lokasi: "Hall Jakarta Convention Center", tanggal: "2024-11-16", caption: "Board Event", subCategory: "event" },
      { id: "event-3", url: "/event/faskia-event.jpg", lokasi: "Hall Jakarta Convention Center", tanggal: "2024-11-17", caption: "Fascia Event", subCategory: "event" },
      { id: "event-4", url: "/event/panggung-event.jpg", lokasi: "Hall Jakarta Convention Center", tanggal: "2024-11-17", caption: "Panggung Event", subCategory: "event" },
      { id: "event-5", url: "/event/pintu-event.jpg", lokasi: "Hall Jakarta Convention Center", tanggal: "2024-11-18", caption: "Pintu Event", subCategory: "event" },
      { id: "event-6", url: "/event/spanduk-event.jpg", lokasi: "Hall Jakarta Convention Center", tanggal: "2024-11-18", caption: "Spanduk Event", subCategory: "event" },
      { id: "event-7", url: "/event/tenda-event.jpg", lokasi: "Outdoor Area Jakarta", tanggal: "2024-11-19", caption: "Tenda Event", subCategory: "event" },
      { id: "event-8", url: "/event/umbul-umbul-event.jpg", lokasi: "GOR Lembu Peteng Tulungagung", tanggal: "2024-11-20", caption: "Umbul-Umbul Event", subCategory: "event" },
      { id: "event-9", url: "/event/vb-event.jpg", lokasi: "Tulungagung", tanggal: "2024-11-21", caption: "Vertical Banner Event", subCategory: "event" },

      { id: "umbul-umbul-1", url: "/event/umbul-umbul-event.jpg", lokasi: "GOR Lembu Peteng Tulungagung", tanggal: "2024-11-20", caption: "Pemasangan Umbul-Umbul", subCategory: "umbul-umbul" },
      { id: "umbul-umbul-2", url: "/event/umbul-umbul-klinik-kmu.jpg", lokasi: "GOR Lembu Peteng Tulungagung", tanggal: "2024-11-20", caption: "Pemasangan Umbul-Umbul Klinik Mata KMU Trenggalek", subCategory: "umbul-umbul" },
    ],
  },
    
  "dokumentasi-pembangunan": {
    title: "Dokumentasi Pekerjaan Pembangunan",
    topLevel: "building",
    hero: "/bangunan.jpg", // bisa diganti dengan gambar hero lain
    items: [
      {
        id: "bangun-1",
        url: "/bangunan/bangun-kanopi-djarum.jpg",
        lokasi: "Outlet Djarum, Jakarta",
        tanggal: "2024-09-10",
        caption: "Pembangunan kanopi Djarum",
      },
      {
        id: "bangun-2",
        url: "/bangunan/bangun-sanyo.jpg",
        lokasi: "Perumahan Sanyo, Bekasi",
        tanggal: "2024-09-11",
        caption: "Pembangunan instalasi pompa air",
      },
      {
        id: "bangun-3",
        url: "/bangunan/bangun-tutup-saluran-air.jpg",
        lokasi: "Saluran Air, Jakarta",
        tanggal: "2024-09-12",
        caption: "Pembangunan penutup saluran drainase",
      },
      {
        id: "bangun-4",
        url: "/bangunan/bangun-booth-jualan.jpg",
        lokasi: "UMKM Area, Jakarta",
        tanggal: "2024-09-13",
        caption: "Pembuatan booth jualan portabel",
      },
      {
        id: "bangun-5",
        url: "/bangunan/bangun-kamar-mandi.jpg",
        lokasi: "Perumahan, Depok",
        tanggal: "2024-09-14",
        caption: "Renovasi pembangunan kamar mandi",
      },
      {
        id: "bangun-6",
        url: "/bangunan/bangun-panggung-tenda.jpg",
        lokasi: "Event Outdoor, Bandung",
        tanggal: "2024-09-15",
        caption: "Pembuatan panggung dan tenda event",
      },
      {
        id: "bangun-7",
        url: "/bangunan/bangun-partisi.jpg",
        lokasi: "Kantor Perusahaan, Jakarta",
        tanggal: "2024-09-16",
        caption: "Pemasangan partisi kantor",
      },
      {
        id: "bangun-8",
        url: "/bangunan/bangun-plafon.jpg",
        lokasi: "Gedung Pertemuan, Surabaya",
        tanggal: "2024-09-17",
        caption: "Pemasangan plafon gypsum",
      },
      {
        id: "bangun-9",
        url: "/bangunan/bangun-rak-gudang.jpg",
        lokasi: "Gudang Logistik, Bekasi",
        tanggal: "2024-09-18",
        caption: "Pembangunan rak penyimpanan gudang",
      },
      {
        id: "bangun-10",
        url: "/bangunan/bangun-sumur-bor.jpg",
        lokasi: "Perumahan Warga, Bogor",
        tanggal: "2024-09-20",
        caption: "Pembangunan sumur bor",
      },
      {
        id: "bangun-11",
        url: "/bangunan/bangun-swalayan.jpg",
        lokasi: "Swalayan Modern, Semarang",
        tanggal: "2024-09-21",
        caption: "Pembangunan area swalayan",
      },
      {
        id: "bangun-12",
        url: "/bangunan/bangun-warkop.jpg",
        lokasi: "Workshop UMKM, Malang",
        tanggal: "2024-09-22",
        caption: "Pembangunan warung kopi (warkop)",
      },
      {
        id: "bangun-13",
        url: "/bangunan/bangun-lantai.jpg",
        lokasi: "Workshop UMKM, Malang",
        tanggal: "2024-09-22",
        caption: "Pembangunan lantai teras Indomaret",
      },
      {
        id: "bangun-14",
        url: "/bangunan/bangun-lantai-tambahan.jpg",
        lokasi: "Workshop UMKM, Malang",
        tanggal: "2024-09-22",
        caption: "Pembangunan lantai tambahan swalayan",
      },
      {
        id: "bangun-15",
        url: "/bangunan/kanopi-apotek.jpg",
        lokasi: "Workshop UMKM, Malang",
        tanggal: "2024-09-22",
        caption: "Pembangunan kanopi apotek",
      },
    ],
  },

  /** ===== L I S T R I K ===== */
  "dokumentasi-kelistrikan": {
    title: "Dokumentasi Pekerjaan Kelistrikan",
    topLevel: "maintenance",
    hero: "/listrik2.jpg",
    items: [
      {
        id: "listrik-1",
        url: "/listrik/bangun-ac.jpg",
        lokasi: "Area Billboard Utama, Jakarta",
        tanggal: "2024-09-01",
        caption: "Pemasangan AC",
      },
      {
        id: "listrik-2",
        url: "/listrik/maintenance-lampu.jpg",
        lokasi: "Gedung Perkantoran, Jakarta",
        tanggal: "2024-09-02",
        caption: "Penggantian armatur & lampu hemat energi",
      },
      {
        id: "listrik-3",
        url: "/listrik/maintenance-lan.jpg",
        lokasi: "Pusat Data, Jakarta",
        tanggal: "2024-09-03",
        caption: "Penataan & pengetesan instalasi LAN",
      },
      {
        id: "listrik-4",
        url: "/listrik/maintenance-panel.jpg",
        lokasi: "Ruang Panel, Jakarta",
        tanggal: "2024-09-05",
        caption: "Perapihan kabel & inspeksi panel utama",
      },
      {
        id: "listrik-5",
        url: "/listrik/maintenance-panel2.jpg",
        lokasi: "Ruang Panel, Jakarta",
        tanggal: "2024-09-06",
        caption: "Pembersihan, pengencangan koneksi MCB",
      },
      {
        id: "listrik-6",
        url: "/listrik/maintenance-stop-kontak.jpg",
        lokasi: "Area Layanan Pelanggan, Jakarta",
        tanggal: "2024-09-08",
        caption: "Penambahan & pengetesan stop-kontak",
      },
      {
        id: "listrik-7",
        url: "/listrik/maintenance-cctv2.jpg",
        lokasi: "Ruang Panel, Jakarta",
        tanggal: "2024-09-06",
        caption: "Pemasangan CCTV rumah",
      },
      {
        id: "listrik-8",
        url: "/listrik/maintenance-panel-thermograph.jpg",
        lokasi: "Area Layanan Pelanggan, Jakarta",
        tanggal: "2024-09-08",
        caption: "Maintenance dan perawatan panel thermograph",
      },
      {
        id: "listrik-9",
        url: "/listrik/maintenance-penambahan-lampu.jpg",
        lokasi: "Area Layanan Pelanggan, Jakarta",
        tanggal: "2024-09-08",
        caption: "Penambahan lampu apotek",
      },
    ],
  },

  /** ===== M A I N T E N A N C E ===== */
  "dokumentasi-maintenance": {
    title: "Dokumentasi Pekerjaan Maintenance",
    topLevel: "maintenance",
    hero: "/maintenance2.jpg",
    items: [
      {
        id: "mt-1",
        url: "/maintenance/maintenance-atap.jpg",
        lokasi: "Gedung Operasional, Jakarta",
        tanggal: "2024-10-01",
        caption: "Perbaikan & sealing atap bocor",
      },
      {
        id: "mt-2",
        url: "/maintenance/maintenance-atap2.jpg",
        lokasi: "Gudang Logistik, Bekasi",
        tanggal: "2024-10-02",
        caption: "Penggantian lembaran atap & flashing",
      },
      {
        id: "mt-3",
        url: "/maintenance/maintenance-kebocoran.jpg",
        lokasi: "Lantai 3 – Area Toilet, Jakarta",
        tanggal: "2024-10-03",
        caption: "Tracing & penanganan kebocoran air",
      },
      {
        id: "mt-4",
        url: "/maintenance/maintenance-brankas.jpg",
        lokasi: "Kantor Pusat, Jakarta",
        tanggal: "2024-10-04",
        caption: "Perbaikan brankas",
      },
      {
        id: "mt-5",
        url: "/maintenance/maintenance-plafon.jpg",
        lokasi: "Lobby Utama, Jakarta",
        tanggal: "2024-10-06",
        caption: "Perbaikan plafon gypsum & pengecatan",
      },
      {
        id: "mt-6",
        url: "/maintenance/maintenance-plafon2.jpg",
        lokasi: "Koridor Lantai 2, Jakarta",
        tanggal: "2024-10-07",
        caption: "Penggantian rangka plafon & panel",
      },
      {
        id: "mt-7",
        url: "/maintenance/maintenance-saluran-air.jpg",
        lokasi: "Area Servis, Jakarta",
        tanggal: "2024-10-08",
        caption: "Pembersihan & re-routing saluran air",
      },
      {
        id: "mt-8",
        url: "/maintenance/maintenance-sealer-jendela.jpg",
        lokasi: "Ruang Meeting, Jakarta",
        tanggal: "2024-10-09",
        caption: "Penyegelan ulang kaca/jendela luar",
      },
      {
        id: "mt-9",
        url: "/maintenance/maintenance-talang.jpg",
        lokasi: "Atap Gedung, Jakarta",
        tanggal: "2024-10-10",
        caption: "Perbaikan talang dan pipa downspout",
      },
    ],
  },
};


/* ========= PAGE ========= */

export default function DocCategoryPage({
  params,
  searchParams,
}: {
  params: { slug: Slug }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {

  const data = db[params.slug]
  if (!data) return notFound()

  const badgeClass =
    data.topLevel === "advertising"
      ? "bg-orange-500 text-white"
      : data.topLevel === "building"
      ? "bg-blue-500 text-white"
      : "bg-emerald-500 text-white"

  // Ambil sub-kategori dari query (?sub=)
  const selectedSub =
    data.topLevel === "advertising" && typeof searchParams?.sub === "string"
      ? (searchParams.sub as AdvertisingSubcategory)
      : null

  // Bangun URL untuk pill filter
  const makeSubUrl = (key?: AdvertisingSubcategory) =>
    key ? `/portofolio/${params.slug}?sub=${key}` : `/portofolio/${params.slug}`

  // Filter item bila advertising & ada sub terpilih
  const items =
    data.topLevel === "advertising" && selectedSub
      ? data.items.filter((it) => it.subCategory === selectedSub)
      : data.items

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 flex items-center gap-3">
          <Link href="/portofolio" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Portofolio
          </Link>
          <Badge className={badgeClass}>
            {data.topLevel === "advertising" ? "Periklanan" : data.topLevel === "building" ? "Building" : "Maintenance"}
          </Badge>
        </div>

        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
          <p className="mt-2 text-gray-600">
            Seluruh pekerjaan kami terdokumentasi rapi, menampilkan bukti vial pengerjaan untuk menjaga standar profesionalismkerja tim kami.
            </p>

        </div>

{data.hero && (
  <div
    className="
      relative mb-8 w-full overflow-hidden rounded-2xl shadow-lg
      aspect-[4/3] sm:aspect-[25/10]
      bg-white
    "
  >
    <Image
      src={data.hero}
      fill
      className="object-contain p-3"
      sizes="(max-width:640px) 100vw, 80vw"
      alt="Hero Portofolio"
    />
  </div>
)}


        {/* Filter sub-kategori khusus advertising */}
        {data.topLevel === "advertising" && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <p className="text-sm text-gray-700 leading-relaxed">
                Eksplorasi dokumentasi portofolio kami yang tertata secara sistematis, mencakup berbagai kategori pekerjaan 
                seperti <span className="font-medium text-gray-900">Spanduk,Media Promosi, Baliho, Visual Backwall, PJU, Vertical Banner, Tinplate, Panel Toko, Shop Sign, Road Sign, Penanganan Event,</span> 
                hingga <span className="font-medium text-gray-900">Umbul-umbul</span>.  
                <br /><br />
              </p>
            </div>

              <Link
                href={makeSubUrl(undefined)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  !selectedSub ? "border-orange-500 bg-orange-500 text-white" : "bg-white text-gray-700 hover:bg-orange-50"
                }`}
              >
                Semua
              </Link>
              {ADVERTISING_SUBCATEGORIES.map((s) => (
                <Link
                  key={s.key}
                  href={makeSubUrl(s.key)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    selectedSub === s.key ? "border-orange-500 bg-orange-500 text-white" : "bg-white text-gray-700 hover:bg-orange-50"
                  }`}
                >
                  {s.label}
                </Link>
              ))}
            </div>

          </div>
        )}

        {/* --- INFO BOX: BUILDING --- */}
        {data.topLevel === "building" && (
          <div className="mb-8">
            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <p className="text-sm text-gray-700 leading-relaxed">
                Dokumentasi <span className="font-medium text-gray-900">pekerjaan pembangunan</span> kami
                meliputi pekerjaan struktur, plumbing, roofing, besi/kanopi, serta pekerjaan arsitektural
                dan finishing. Setiap entri dilengkapi <span className="font-medium">foto progres</span>,
                <span className="font-medium"> lokasi</span>, dan <span className="font-medium">tanggal
                pengerjaan</span> untuk memastikan akuntabilitas dan kendali mutu di lapangan.
              </p>
            </div>
          </div>
        )}

        {/* --- INFO BOX: MAINTENANCE --- */}
        {data.topLevel === "maintenance" && (
          <div className="mb-8">
            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <p className="text-sm text-gray-700 leading-relaxed">
                Dokumentasi <span className="font-medium text-gray-900">maintenance preventif &amp; korektif</span>
                mencakup sistem <span className="font-medium">AC</span>, <span className="font-medium">kelistrikan</span>,
                <span className="font-medium"> plumbing</span>, hingga perawatan fasad/atap. Setiap pekerjaan kami catat
                secara sistematis dengan <span className="font-medium">bukti visual</span>, <span className="font-medium">
                lokasi</span>, dan <span className="font-medium">waktu pengerjaan</span>—selaras dengan komitmen SLA dan
                standar keselamatan kerja.
              </p>
            </div>
          </div>
        )}


{/* Galeri */}
{items.length === 0 ? (
  <div className="rounded-xl border bg-white p-10 text-center text-gray-600">
    Belum ada dokumentasi pada kategori ini. Silakan pilih kategori lain.
  </div>
) : (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {items.map((it) => (
      <div
        key={it.id}
        className="overflow-hidden rounded-xl bg-white shadow-sm flex flex-col"
      >
        {/* Wrapper gambar */}
        <div className="relative w-full aspect-[4/3] bg-gray-100"> 
          <Image
            src={it.url || "/placeholder.svg"}
            alt={it.caption || data.title}
            fill
            className="object-cover" // ✅ penuh & seragam
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          />
        </div>

        {/* Konten */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          {it.caption && (
            <p className="mb-1 text-sm font-medium text-gray-900">
              {it.caption}
            </p>
          )}

          {"subCategory" in it && it.subCategory && (
            <div className="mb-2">
              <Badge
                variant="secondary"
                className="bg-orange-50 text-orange-700"
              >
                {ADVERTISING_SUBCATEGORIES.find(
                  (s) => s.key === it.subCategory
                )?.label ?? it.subCategory}
              </Badge>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
)}


      </div>

      <Footer />
    </main>
  )
}
