import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { vehicles } from '@/data/vehicles'
import { business } from '@/data/business'
import { scanPageHero } from '@/lib/fleet-images'
import { telLink, mailLink, buildBookingWhatsAppUrl } from '@/lib/whatsapp'
import PageHeader from '@/components/ui/PageHeader'
import ContactForm from '@/components/contact/ContactForm'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

export const metadata: Metadata = {
  title: 'Contact & Location',
  description:
    'Visit Planet Safari Bike Rental in Hampankatta, Mangaluru, or message us on WhatsApp. Phone, email, address, opening hours and map.',
  alternates: { canonical: '/contact' },
}

const INFO = [
  {
    icon: Phone,
    label: 'Call us',
    value: business.phone,
    href: telLink,
  },
  {
    icon: Mail,
    label: 'Email',
    value: business.email,
    href: mailLink,
  },
  {
    icon: Clock,
    label: 'Open',
    value: business.openingHours,
  },
]

export default function ContactPage() {
  const vehicleNames = vehicles.map((v) => v.name)

  return (
    <>
      <PageHeader
        eyebrow="Get in touch · Hampankatta"
        title="Come say hello"
        subtitle="Drop by the store, give us a call, or just message on WhatsApp — whatever's easiest. We're happy to help you pick the right ride."
        image={scanPageHero('contact')}
      />

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.1fr_1fr] md:py-20">
        {/* Left: info + WhatsApp */}
        <div className="flex flex-col gap-6">
          <div className="journal-card rounded-[var(--radius-card)] p-6 sm:p-8">
            <span className="eyebrow flex items-center gap-2 text-terracotta">
              <span className="inline-block h-px w-7 bg-terracotta/60" />
              Find the store
            </span>
            <div className="mt-4 flex gap-3">
              <MapPin size={20} className="mt-0.5 shrink-0 text-terracotta" />
              <p className="leading-relaxed text-espresso/85">{business.address}</p>
            </div>

            <div className="route-divider my-6" />

            <ul className="grid gap-4 sm:grid-cols-2">
              {INFO.map((i) => (
                <li key={i.label} className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta/12 text-terracotta">
                    <i.icon size={18} />
                  </span>
                  <span>
                    <span className="block font-mono text-[0.6rem] uppercase tracking-widest text-olive">
                      {i.label}
                    </span>
                    {i.href ? (
                      <a href={i.href} className="text-sm font-medium text-clay hover:text-terracotta">
                        {i.value}
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-clay">{i.value}</span>
                    )}
                  </span>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-wa/15 text-wa-deep">
                  <WhatsAppIcon size={18} />
                </span>
                <span>
                  <span className="block font-mono text-[0.6rem] uppercase tracking-widest text-olive">
                    WhatsApp
                  </span>
                  <a
                    href={buildBookingWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-clay hover:text-terracotta"
                  >
                    Chat with us
                  </a>
                </span>
              </li>
            </ul>

            <a
              href={buildBookingWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa mt-7 w-full py-3"
            >
              <WhatsAppIcon size={18} />
              Book on WhatsApp
            </a>
          </div>

          {/* Map */}
          <div className="grain relative overflow-hidden rounded-[var(--radius-card)] border border-bark">
            <iframe
              title={`Map to ${business.name}`}
              src={business.mapEmbedUrl}
              width="100%"
              height="320"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block"
            />
          </div>
        </div>

        {/* Right: form */}
        <ContactForm vehicleNames={vehicleNames} />
      </div>
    </>
  )
}
