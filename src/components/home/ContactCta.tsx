import Link from 'next/link'
import { Phone, ArrowUpRight } from 'lucide-react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import Reveal from '@/components/ui/Reveal'
import { business } from '@/data/business'
import { buildBookingWhatsAppUrl, telLink } from '@/lib/whatsapp'

export default function ContactCta() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
      <Reveal>
        <div className="grain relative isolate overflow-hidden rounded-[2rem] bg-terracotta px-6 py-14 text-paper sm:px-12 md:py-20">
          <div className="contour absolute inset-0 opacity-[0.18] mix-blend-overlay" />
          <div className="relative z-[2] flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <span className="eyebrow text-paper/80">Ready when you are</span>
              <h2 className="mt-3 text-balance text-[clamp(2rem,1.2rem+3vw,3.4rem)] font-semibold leading-[1.02]">
                Message us and ride out today
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-paper/85">
                Tell us your dates and where you&apos;re headed. We&apos;ll confirm
                your ride on WhatsApp in minutes.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto">
              <a
                href={buildBookingWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa px-7 py-3.5 text-base"
              >
                <WhatsAppIcon size={20} />
                Book on WhatsApp
              </a>
              <a
                href={telLink}
                className="btn border-2 border-paper/80 px-7 py-3.5 text-base text-paper hover:bg-paper hover:text-terracotta-deep"
              >
                <Phone size={18} />
                {business.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1 text-sm font-medium text-paper/80 hover:text-paper"
              >
                Visit our Hampankatta store
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
