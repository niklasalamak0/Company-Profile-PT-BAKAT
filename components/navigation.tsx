"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // lock scroll body saat drawer open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  // tutup drawer saat route berubah
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navItems = [
    { href: "/", label: "Beranda" },
    { href: "/layanan", label: "Layanan" },
    { href: "/portofolio", label: "Portofolio" },
    { href: "/tentang", label: "Tentang Kami" },
    { href: "/testimoni", label: "Testimoni" },
    { href: "/partner", label: "Partner" },
    { href: "/kontak", label: "Kontak" },
  ]

  const linkClass = (href: string) =>
    `text-[15px] font-medium transition-colors ${
      pathname === href ? "text-orange-600" : "text-gray-700 hover:text-orange-500"
    }`

  return (
    <>
    {/* Top bar */}
    <div className="bg-orange-500 text-white px-4 py-2 text-[13px]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <a href="tel:+6281330602901" className="flex items-center gap-1.5 hover:opacity-90">
            <Phone className="h-4 w-4" />
            <span>0813-3060-2901</span> {/* ✅ teks selalu tampil */}
          </a>
          <a href="mailto:Bakti.karyateknik@gmail.com" className="flex items-center gap-1.5 hover:opacity-90">
            <Mail className="h-4 w-4" />
            <span>Bakti.karyateknik@gmail.com</span> {/* ✅ teks selalu tampil */}
          </a>
        </div>
        <div className="hidden md:block">
          <span>Melayani Trenggalek, Tulungagung &amp; sekitarnya</span>
        </div>
      </div>
    </div>


      {/* Main nav */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-4 min-w-0" aria-label="PT. Bakti Karya Teknik">
              <Image
                src="/logo-horizontal.png"
                alt="Logo PT. Bakti Karya Teknik"
                width={220}
                height={40}
                priority
                sizes="(max-width: 768px) 120px, 220px"
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                  {item.label}
                </Link>
              ))}
              <Link href="/kontak">
                <Button className="bg-orange-500 text-white hover:bg-orange-600">
                  Konsultasi Gratis
                </Button>
              </Link>
            </div>

            {/* Mobile trigger */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(true)}
                aria-label="Buka menu"
                className="text-gray-700"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== Overlay & Drawer dipindahkan ke luar <nav> agar tidak terpengaruh sticky/backdrop ===== */}

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[9998] bg-black/40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        className={`fixed right-0 top-0 z-[9999] h-full w-[88%] max-w-sm transform bg-white shadow-xl md:hidden transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/" className="flex items-center gap-4 min-w-0" onClick={() => setIsOpen(false)}>
            <Image
              src="/logo-horizontal.png"
              alt="Logo PT. Bakti Karya Teknik"
              width={200}
              height={40}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            aria-label="Tutup menu"
            className="text-gray-700"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex h-[calc(100%-4rem)] flex-col overflow-y-auto">
          <nav className="px-2 py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-md px-3 py-3 text-base font-medium hover:bg-orange-50 ${
                  pathname === item.href ? "text-orange-600" : "text-gray-800 hover:text-orange-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto border-t px-4 py-4">
            <Link href="/kontak" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">
                Konsultasi Gratis
              </Button>
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
