"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react"

/** ======== Service types harus sama persis dengan yang disimpan ke DB ======== */
type ServiceType =
  | "advertising"          // Advertising & Signage
  | "building_care"        // Perawatan & Perbaikan Bangunan
  | "renovation"           // Renovasi Bangunan & Interior
  | "electrical"           // Mekanik & Elektrik
  | "ac_ventilation"       // AC & Ventilasi
  | "lighting"             // Lampu & Penerangan
  | "painting"             // Pengecatan
  | "ceiling"              // Pemasangan Plafond

const SERVICE_OPTIONS: { value: ServiceType; label: string }[] = [
  { value: "advertising",    label: "Advertising & Signage" },
  { value: "building_care",  label: "Perawatan & Perbaikan Bangunan" },
  { value: "renovation",     label: "Renovasi Bangunan & Interior" },
  { value: "electrical",     label: "Mekanik & Elektrik" },
  { value: "ac_ventilation", label: "AC & Ventilasi" },
  { value: "lighting",       label: "Lampu & Penerangan" },
  { value: "painting",       label: "Pengecatan" },
  { value: "ceiling",        label: "Pemasangan Plafond" },
]

interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  service_type: ServiceType | ""
  message: string
  website?: string // honeypot
}

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service_type: "",
    message: "",
    website: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isEmailValid = useMemo(() => /\S+@\S+\.\S+/.test(formData.email), [formData.email])
  const isPhoneValid = useMemo(() => /^[0-9+\s()-]{8,}$/.test(formData.phone), [formData.phone])
  const isReady =
    !!formData.name &&
    !!formData.email &&
    !!formData.phone &&
    !!formData.service_type &&
    !!formData.message &&
    isEmailValid &&
    isPhoneValid

  const onChange = (k: keyof ContactFormData, v: string) =>
    setFormData((p) => ({ ...p, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isSubmitting) return
    setError(null)

    // honeypot (anti bot)
    if (formData.website) return

    if (!isReady) {
      setError("Mohon lengkapi data wajib dan pastikan email/telepon valid.")
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          company: formData.company?.trim() || null, // null agar cocok dengan skema DB
          service_type: formData.service_type,       // string persis sesuai tipe
          message: formData.message.trim(),
        }),
      })

      // Upayakan parse JSON aman
      let payload: any = {}
      try { payload = await res.json() } catch { /* ignore */ }

      if (!res.ok) {
        throw new Error(payload?.error || "Gagal mengirim pesan")
      }

      // success (201 dari API)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service_type: "",
        message: "",
        website: "",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan, coba lagi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    { icon: Phone, title: "Telepon", value: "0813-3060-2901", description: "Senin–Sabtu, 08.00–17.00" },
    { icon: Mail, title: "Email", value: "Bakti.karyateknik@gmail.com", description: "Respon ≤ 24 jam" },
    { icon: MapPin, title: "Alamat", value: "Bendorejo, Pogalan, Trenggalek", description: "RT 03/RW 01" },
    { icon: Clock, title: "Operasional", value: "08.00–17.00 WIB", description: "Emergency 24/7" },
  ]

  if (isSubmitted) {
    return (
      <section id="kontak" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="shadow-xl">
              <CardContent className="p-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Terima kasih!</h3>
                <p className="text-lg text-gray-600">
                  Pesan Anda sudah kami terima. Kami akan menghubungi ≤ 24 jam.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Kirim Pesan Lain
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="kontak" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-4">
            Hubungi Kami
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Siap Memulai Proyek Anda?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-3">
            Konsultasi layanan Periklanan (signage, branding) atau Building ME (AC, kelistrikan, maintenance).
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Konsultasi Gratis</CardTitle>
              <p className="text-gray-600">Isi data berikut, kami segera menghubungi Anda.</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* honeypot */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={(e) => onChange("website", e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => onChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Perusahaan</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => onChange("company", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => onChange("email", e.target.value)}
                      required
                      aria-invalid={!!formData.email && !isEmailValid}
                    />
                    {!isEmailValid && formData.email && (
                      <p className="text-sm text-red-600">Email tidak valid.</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telepon/WhatsApp *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => onChange("phone", e.target.value)}
                      required
                      aria-invalid={!!formData.phone && !isPhoneValid}
                    />
                    {!isPhoneValid && formData.phone && (
                      <p className="text-sm text-red-600">Nomor tidak valid.</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Jenis Layanan *</Label>
                  <Select
                    value={formData.service_type}
                    onValueChange={(v) => onChange("service_type", v as ServiceType)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih layanan" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICE_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Detail Kebutuhan *</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => onChange("message", e.target.value)}
                    placeholder="Ceritakan kebutuhan Anda (lokasi, ukuran/kapasitas, jumlah titik, target jadwal, dsb.)"
                    required
                  />
                </div>

                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting || !isReady}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  {isSubmitting ? "Mengirim…" : <>Kirim Pesan <Send className="w-4 h-4 ml-2" /></>}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info samping */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Informasi Kontak</h3>
              <div className="grid gap-6">
                {contactInfo.map((info, i) => {
                  const Icon = info.icon
                  return (
                    <div key={i} className="flex items-start gap-4">
                      <div className="bg-orange-100 p-3 rounded-xl">
                        <Icon className="h-6 w-6 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{info.title}</h4>
                        <p className="text-gray-700">{info.value}</p>
                        <p className="text-sm text-gray-500">{info.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <Card className="overflow-hidden">
              <div className="relative h-64 sm:h-80">
                <iframe
                  title="Lokasi PT. Bakti Karya Teknik"
                  src="https://www.google.com/maps/embed?pb=!4v1757582088138!6m8!1m7!1smVUwwmiZholAgsYs65A9EA!2m2!1d-8.097551775663405!2d111.7478182940659!3f338.73788942480724!4f-12.184788472723397!5f0.7820865974627469"
                  className="absolute inset-0 h-full w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href="https://maps.app.goo.gl/rgoSXEeynbCDjTVv5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2 right-2 rounded-md bg-white px-3 py-1 text-sm font-medium text-orange-600 shadow hover:bg-orange-50"
                >
                  Buka di Google Maps
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
