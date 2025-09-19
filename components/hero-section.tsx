"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * HeroSection Component
 *
 * Komponen ini menampilkan bagian hero dari halaman utama,
 * termasuk judul, deskripsi, statistik, dan tombol call-to-action.
 */
export function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative flex min-h-[70vh] items-start overflow-hidden bg-gradient-to-br from-orange-50 to-white scroll-mt-24"
    >
      {/* Background decoration with blur effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute right-10 h-72 w-72 rounded-full bg-orange-200 opacity-20 blur-3xl" />
      <div className="absolute bottom-20 left-10 h-96 w-96 rounded-full bg-blue-200 opacity-15 blur-3xl" />

      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content (Text & Buttons) */}
          <div className="animate-fade-in-up space-y-8 relative z-10"> {/* ✅ Tambahkan relative dan z-10 di sini */}
            <div className="space-y-4">
              <div className="space-y-4">
                <h1 className="flex flex-wrap items-center gap-3 text-4xl font-bold text-gray-900 md:text-5xl leading-tight">
                  Solusi Lengkap untuk Kebutuhan Advertising dan Mechanical Electrical Anda
                </h1>
                <p className="text-lg text-gray-600">
                  Kami adalah mitra terpercaya yang siap membantu bisnis Anda bersinar melalui solusi visual dan fungsional yang inovatif.
                </p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">200+</div>
                <div className="text-sm text-gray-600">Proyek Selesai</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">3+</div>
                <div className="text-sm text-gray-600">Tahun Pengalaman</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">50+</div>
                <div className="text-sm text-gray-600">Klien Puas</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
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

          {/* Right Content (Image) */}
          <div className="relative h-[300px] w-full animate-slide-in-right md:h-[480px] lg:h-[560px]">
            <Image
              src="/hero-content.jpg"
              alt="PT. Bakti Karya Teknik — Hero"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
