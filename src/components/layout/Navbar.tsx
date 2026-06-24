'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { buildBookingWhatsAppUrl } from '@/lib/whatsapp'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/fleet', label: 'Fleet' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-bark/70 bg-sand/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <Link href="/" aria-label="Planet Safari home">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'text-terracotta-deep'
                      : 'text-espresso/80 hover:text-terracotta'
                  }`}
                >
                  {l.label}
                  {active && (
                    <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-terracotta" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={buildBookingWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary hidden px-4 py-2 text-sm sm:inline-flex"
          >
            <WhatsAppIcon size={16} />
            Book Now
          </a>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="rounded-full border border-bark bg-paper p-2 text-clay md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div
          className={`grain absolute inset-x-0 top-16 origin-top border-b border-bark bg-paper px-5 pb-6 pt-2 shadow-xl transition-all duration-300 ${
            open ? 'opacity-100 translate-y-0' : '-translate-y-3 opacity-0'
          }`}
        >
          <ul className="relative z-[2] flex flex-col">
            {LINKS.map((l) => {
              const active = pathname === l.href
              return (
                <li key={l.href} className="border-b border-bark/50 last:border-0">
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between py-3.5 font-display text-xl ${
                      active ? 'text-terracotta-deep' : 'text-clay'
                    }`}
                  >
                    {l.label}
                    <span className="font-mono text-xs text-olive">0{LINKS.indexOf(l) + 1}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
          <a
            href={buildBookingWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa relative z-[2] mt-5 w-full py-3"
          >
            <WhatsAppIcon size={18} />
            Book on WhatsApp
          </a>
        </div>
      </div>
    </header>
  )
}
