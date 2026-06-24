import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import { vehicles } from '@/data/vehicles'
import { formatINR } from '@/lib/pricing'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'

const minDay = Math.min(...vehicles.map((v) => v.priceDay))
const minWeek = Math.min(...vehicles.map((v) => v.priceWeek))
const minMonth = Math.min(...vehicles.map((v) => v.priceMonth))

const PACKAGES = [
  {
    name: 'Daily',
    unit: '/ day',
    from: minDay,
    note: 'Perfect for a beach hop or an airport run.',
    perks: ['Helmet included', 'Unlimited kilometres', 'Same-day pickup'],
    featured: false,
  },
  {
    name: 'Weekly',
    unit: '/ week',
    from: minWeek,
    note: 'Our most popular plan for short trips.',
    perks: [
      'Everything in Daily',
      'Best value per day',
      'Free plan switch on extend',
    ],
    featured: true,
  },
  {
    name: 'Monthly',
    unit: '/ month',
    from: minMonth,
    note: 'For long stays and remote workers.',
    perks: [
      'Everything in Weekly',
      'Lowest daily rate',
      'Priority servicing',
    ],
    featured: false,
  },
]

export default function RentalPackages() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      <SectionHeading
        eyebrow="Rental plans"
        title="Pick a pace that suits your trip"
        intro="Rates start as low as below. Cross a threshold and the cheaper rate applies automatically — no haggling."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {PACKAGES.map((p, i) => (
          <Reveal key={p.name} delay={i * 100}>
            <article
              className={`relative flex h-full flex-col rounded-[var(--radius-card)] p-7 transition-transform hover:-translate-y-1 ${
                p.featured
                  ? 'bg-espresso text-paper shadow-xl'
                  : 'journal-card text-clay'
              }`}
            >
              {p.featured && (
                <span className="stamp absolute -top-3 right-6 bg-amber px-3 py-1 text-[0.6rem] text-clay">
                  Most Popular
                </span>
              )}
              <h3
                className={`font-display text-2xl font-semibold ${p.featured ? 'text-paper' : 'text-clay'}`}
              >
                {p.name}
              </h3>
              <p
                className={`mt-1 text-sm ${p.featured ? 'text-paper/70' : 'text-espresso/65'}`}
              >
                {p.note}
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span
                  className={`font-mono text-xs uppercase tracking-widest ${p.featured ? 'text-amber' : 'text-olive'}`}
                >
                  from
                </span>
                <span className="font-display text-4xl font-semibold">
                  {formatINR(p.from)}
                </span>
                <span
                  className={`text-sm ${p.featured ? 'text-paper/60' : 'text-espresso/55'}`}
                >
                  {p.unit}
                </span>
              </div>

              <ul className="mt-6 space-y-3">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2.5 text-sm">
                    <Check
                      size={16}
                      className={p.featured ? 'text-amber' : 'text-terracotta'}
                    />
                    {perk}
                  </li>
                ))}
              </ul>

              <Link
                href="/pricing"
                className={`btn mt-8 w-full py-2.5 text-sm ${
                  p.featured ? 'btn-wa' : 'btn-ghost'
                }`}
              >
                See full pricing
                <ArrowRight size={16} />
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
