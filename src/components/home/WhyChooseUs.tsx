import {
  BadgeIndianRupee,
  Wrench,
  MessageCircle,
  CalendarClock,
  Compass,
  ShieldCheck,
} from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'

const REASONS = [
  {
    icon: BadgeIndianRupee,
    title: 'No Hidden Charges',
    body: 'The price we quote is the price you pay. No surprise fees, no fine print at the counter.',
  },
  {
    icon: Wrench,
    title: 'Well-Maintained Fleet',
    body: 'Every scooty and bike is serviced, cleaned and safety-checked before it reaches you.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Support',
    body: 'Book, extend or ask anything on WhatsApp. A real person replies, quickly.',
  },
  {
    icon: CalendarClock,
    title: 'Flexible Rentals',
    body: 'By the day, the week or the month — switch plans whenever your trip changes.',
  },
  {
    icon: Compass,
    title: 'Local Experts',
    body: 'Mangaluru riders who know the best beaches, Ghat routes and hidden detours.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe & Insured',
    body: 'Helmet, basic insurance and roadside assistance come standard with every ride.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="contour grain relative isolate border-y border-bark py-20 md:py-28">
      <div className="relative z-[2] mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why Planet Safari"
          title="Built for an easy ride"
          align="center"
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={i * 80}>
              <article className="journal-card group flex h-full flex-col gap-3 rounded-[var(--radius-card)] p-6 transition-transform hover:-translate-y-1">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/12 text-terracotta">
                  <r.icon size={22} strokeWidth={1.8} />
                </span>
                <h3 className="font-display text-xl font-semibold text-clay">
                  {r.title}
                </h3>
                <p className="text-sm leading-relaxed text-espresso/70">
                  {r.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
