import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { business } from '@/data/business'
import { buildBookingWhatsAppUrl, telLink, mailLink } from '@/lib/whatsapp'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/fleet', label: 'Fleet' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="grain relative isolate overflow-hidden border-t-2 border-terracotta bg-espresso text-paper">
      <div className="contour absolute inset-0 opacity-[0.12]" />
      <div className="relative z-[2] mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.3fr_1fr_1.4fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-paper/70">
            {business.tagline}. Self-drive scooties &amp; bikes from the heart of
            Hampankatta, Mangaluru.
          </p>
          <a
            href={buildBookingWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa mt-6 px-5 py-2.5 text-sm"
          >
            <WhatsAppIcon size={17} />
            Book on WhatsApp
          </a>
        </div>

        <div>
          <h3 className="eyebrow text-amber">Explore</h3>
          <ul className="mt-4 space-y-2.5">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-paper/75 transition-colors hover:text-amber"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-amber">Find Us</h3>
          <ul className="mt-4 space-y-3.5 text-sm text-paper/80">
            <li className="flex gap-3">
              <MapPin size={17} className="mt-0.5 shrink-0 text-terracotta-soft" />
              <span>{business.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone size={17} className="shrink-0 text-terracotta-soft" />
              <a href={telLink} className="hover:text-amber">
                {business.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail size={17} className="shrink-0 text-terracotta-soft" />
              <a href={mailLink} className="hover:text-amber">
                {business.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock size={17} className="shrink-0 text-terracotta-soft" />
              <span>{business.openingHours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative z-[2] border-t border-paper/15">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-paper/55 sm:flex-row sm:px-8">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-[0.2em]">
            Mangaluru · Karnataka · India
          </p>
        </div>
      </div>
    </footer>
  )
}
