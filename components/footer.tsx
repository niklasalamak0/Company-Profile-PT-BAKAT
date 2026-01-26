import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  // === Layanan mengikuti ServicesSection (id & nama sinkron) ===
  const services = [
    { name: "Advertising & Signage", href: "/layanan#advertising" },
    { name: "Perawatan & Perbaikan Bangunan", href: "/layanan#building-care" },
    { name: "Renovasi Bangunan & Interior", href: "/layanan#renovation" },
    { name: "Mekanik & Elektrik", href: "/layanan#electrical" },
    { name: "AC & Ventilasi", href: "/layanan#ac" },
    { name: "Lampu & Penerangan", href: "/layanan#lampu" },
    { name: "Pengecatan", href: "/layanan#cat" },
    { name: "Pemasangan Plafond", href: "/layanan#plafond" },
  ]

  // === Menu cepat mengikuti navbar ===
  const quickLinks = [
    { name: "Tentang Kami", href: "/tentang" },
    { name: "Layanan", href: "/layanan" },
    { name: "Portofolio", href: "/portofolio" },
    { name: "Testimoni", href: "/testimoni" },
    { name: "Partner", href: "/partner" },
    { name: "Kontak", href: "/kontak" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 pt-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/logo-horizontal.png"
                alt="Logo PT. Bakti Karya Teknik"
                width={150}
                height={40}
                priority
                className="object-contain"
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Solusi terpadu periklanan dan building mechanical electrical dengan pengalaman lebih dari 7 tahun sejak 2018,
              melayani berbagai klien di Trenggalek, Tulungagung dan sekitarnya.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Layanan Kami</h3>
            <ul className="space-y-2">
              {services.map(s => (
                <li key={s.href}>
                  <Link href={s.href} className="text-gray-300 hover:text-orange-500 transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Menu Cepat</h3>
            <ul className="space-y-2">
              {quickLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-300 hover:text-orange-500 transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hubungi Kami</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">03/01 Bendorejo, Pogalan,Trenggalek. JATIM 500 m Selatan Perempatan Polsek Pogalan Selatan Bidan Kasihin</p>
                  <p className="text-gray-300">Jawa Timur, Indonesia</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <p className="text-gray-300">0813-3060-2901</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <p className="text-gray-300">Bakti.karyateknik@gmail.com</p>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Senin – Sabtu: 08:00 – 17:00</p>
                  <p className="text-gray-300">Emergency: 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} PT. Bakti Karya Teknik. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">Terms of Service</Link>
              <Link href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
