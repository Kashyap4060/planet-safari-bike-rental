import type { Metadata } from 'next'
import { ShieldCheck, BadgeCheck, Wallet, Info } from 'lucide-react'
import { vehicles } from '@/data/vehicles'
import { scanPageHero } from '@/lib/fleet-images'
import { weeklySavings, monthlySavings, formatINR } from '@/lib/pricing'
import { buildVehicleWhatsAppUrl } from '@/lib/whatsapp'
import PageHeader from '@/components/ui/PageHeader'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Transparent daily, weekly and monthly rental rates for scooties and bikes in Mangaluru. No hidden charges. Fully refundable deposits.',
  alternates: { canonical: '/pricing' },
}

const INCLUDED = [
  'Helmet for the rider',
  'Roadside assistance',
  'Unlimited kilometres',
  'Basic insurance',
  'Clean, serviced vehicle',
  'WhatsApp support',
]

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing · Mangaluru"
        title="Honest, all-in rates"
        subtitle="What you see is what you pay. Cross a week or a month and the cheaper rate applies automatically."
        image={scanPageHero('pricing')}
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 md:py-20">
        {/* No hidden charges banner */}
        <Reveal>
          <div className="flex items-center gap-3 rounded-full border border-olive/40 bg-olive/10 px-5 py-3 text-olive-deep">
            <Info size={18} className="shrink-0" />
            <p className="text-sm font-medium">
              No hidden charges. Fuel is on the rider; everything else is included.
            </p>
          </div>
        </Reveal>

        {/* Pricing table */}
        <Reveal delay={80}>
          <div className="journal-card mt-8 overflow-hidden rounded-[var(--radius-card)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="bg-espresso text-paper">
                    {[
                      'Vehicle',
                      'Type',
                      'Per Day',
                      'Per Week',
                      'Per Month',
                      'Deposit',
                      '',
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3.5 font-mono text-[0.68rem] uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((v, i) => (
                    <tr
                      key={v.slug}
                      className={`border-t border-bark/60 ${i % 2 ? 'bg-sand/40' : 'bg-paper'}`}
                    >
                      <td className="px-4 py-4">
                        <span className="font-display text-base font-semibold text-clay">
                          {v.name}
                        </span>
                        <span className="block font-mono text-[0.62rem] uppercase tracking-widest text-olive">
                          {v.brand} · {v.engine}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="stamp px-2.5 py-0.5 text-[0.58rem] text-terracotta-deep">
                          {v.type === 'bike' ? 'Bike' : 'Scooty'}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-semibold text-clay">
                        {formatINR(v.priceDay)}
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-semibold text-clay">
                          {formatINR(v.priceWeek)}
                        </span>
                        <span className="ml-1.5 rounded-full bg-terracotta/12 px-1.5 py-0.5 text-[0.62rem] font-medium text-terracotta-deep">
                          save {weeklySavings(v)}%
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-semibold text-clay">
                          {formatINR(v.priceMonth)}
                        </span>
                        <span className="ml-1.5 rounded-full bg-terracotta/12 px-1.5 py-0.5 text-[0.62rem] font-medium text-terracotta-deep">
                          save {monthlySavings(v)}%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-espresso/80">
                        {formatINR(v.deposit)}
                      </td>
                      <td className="px-4 py-4">
                        <a
                          href={buildVehicleWhatsAppUrl(v.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-wa px-4 py-2 text-xs"
                        >
                          <WhatsAppIcon size={14} />
                          Book
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        {/* Included + deposit policy */}
        <div className="mt-14">
          <SectionHeading eyebrow="The fine print, unhidden" title="What every rental includes" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="journal-card h-full rounded-[var(--radius-card)] p-7">
                <div className="flex items-center gap-2 text-terracotta-deep">
                  <BadgeCheck size={20} />
                  <h3 className="font-display text-xl font-semibold text-clay">
                    What&apos;s included
                  </h3>
                </div>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {INCLUDED.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-espresso/80">
                      <ShieldCheck size={15} className="shrink-0 text-olive" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="journal-card h-full rounded-[var(--radius-card)] p-7">
                <div className="flex items-center gap-2 text-terracotta-deep">
                  <Wallet size={20} />
                  <h3 className="font-display text-xl font-semibold text-clay">
                    Deposit policy
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-espresso/75">
                  A small, fully refundable security deposit is collected at pickup
                  and returned in full when you bring the vehicle back undamaged
                  with the same fuel level.
                </p>
                <dl className="mt-5 space-y-2.5 text-sm">
                  <div className="flex items-center justify-between border-b border-bark/50 pb-2.5">
                    <dt className="text-espresso/70">Scooties</dt>
                    <dd className="font-semibold text-clay">{formatINR(500)}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-espresso/70">Bikes</dt>
                    <dd className="font-semibold text-clay">
                      {formatINR(1500)} – {formatINR(2000)}
                    </dd>
                  </div>
                </dl>
                <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-widest text-olive">
                  100% refundable
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  )
}
