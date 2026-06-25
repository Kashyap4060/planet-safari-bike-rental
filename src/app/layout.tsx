import type { Metadata } from 'next'
import { Fraunces, Hanken_Grotesk, Spline_Sans_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp'
import MobileBookingBar from '@/components/layout/MobileBookingBar'
import { business } from '@/data/business'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
})

const splineMono = Spline_Sans_Mono({
  subsets: ['latin'],
  variable: '--font-spline-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `${business.name} — Scooty & Bike Rentals in Mangaluru`,
    template: `%s — ${business.name}`,
  },
  description: business.blurb,
  keywords: [
    'bike rental mangaluru',
    'scooty rental mangaluru',
    'two wheeler rental mangaluru',
    'activa rental mangalore',
    'royal enfield rental mangalore',
    'self drive bike mangaluru',
    'bike rental hampankatta',
  ],
  authors: [{ name: business.name }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: business.name,
    title: `${business.name} — Scooty & Bike Rentals in Mangaluru`,
    description: business.blurb,
    url: business.siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${business.name} — Scooty & Bike Rentals in Mangaluru`,
    description: business.blurb,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hanken.variable} ${splineMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-sand text-clay">
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <MobileBookingBar />
        <Analytics />
      </body>
    </html>
  )
}
