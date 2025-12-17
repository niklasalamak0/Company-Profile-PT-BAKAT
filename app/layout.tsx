import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "PT. Bakti Karya Teknik - Solusi Terpadu Periklanan & Building ME",
  description:
    "Perusahaan terpercaya untuk layanan periklanan (billboard, neon box, signage) dan building mechanical electrical (AC, listrik, maintenance) di Jakarta dan sekitarnya.",
  icons: {
    icon: "/cuma-logo.jpg", // atau favicon.png
    shortcut: "/cuma-logo.jpg",
    apple: "/cuma-logo.jpg",
  },
  keywords: "periklanan, billboard, neon box, signage, building maintenance, AC, electrical, mechanical, Jakarta",
  authors: [{ name: "PT. Bakti Karya Teknik" }],
  openGraph: {
    title: "PT. Bakti Karya Teknik - Solusi Terpadu Periklanan & Building ME",
    description: "Perusahaan terpercaya untuk layanan periklanan dan building mechanical electrical di Jakarta",
    type: "website",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`font-sans ${inter.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
