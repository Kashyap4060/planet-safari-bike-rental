import type { Metadata } from 'next'
import Image from 'next/image'
import { Smile, Star, CalendarRange, ShieldCheck, Target, Compass } from 'lucide-react'
import { scanPageHero, scanGalleryImages } from '@/lib/fleet-images'
import { business } from '@/data/business'
import PageHeader from '@/components/ui/PageHeader'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Planet Safari Bike Rental is a locally-run two-wheeler rental in Hampankatta, Mangaluru — honest pricing, a well-kept fleet and riders who know the coast.',
  alternates: { canonical: '/about' },
}

const STATS = [
  { icon: Smile, value: '5,000+', label: 'Happy Riders' },
  { icon: Star, value: '4.8/5', label: 'Average Rating' },
  { icon: CalendarRange, value: '8+', label: 'Years on the Road' },
  { icon: ShieldCheck, value: '₹0', label: 'Hidden Charges' },
]

const GALLERY_LABELS = ['Panambur Beach', 'Western Ghats', 'Tannirbhavi', 'Coastal Road', 'Old Mangaluru', 'Sunset Point']
const GALLERY_BG = [
  'linear-gradient(150deg,#7cc7ab,#4fb28f)',
  'linear-gradient(150deg,#6f9d86,#515654)',
  'linear-gradient(150deg,#84c9af,#3a8a6c)',
  'linear-gradient(150deg,#57a98a,#515654)',
  'linear-gradient(150deg,#4fb28f,#3c403e)',
  'linear-gradient(150deg,#7cc7ab,#57a98a)',
]

export default function AboutPage() {
  const gallery = scanGalleryImages()
  // Prefer a dedicated /pages/about image; otherwise reuse a scenic gallery photo
  // so the intro card and page header never fall back to a bare gradient.
  const introImg = scanPageHero('about') ?? gallery[0] ?? null
  const cardImg = scanPageHero('about') ?? gallery[1] ?? gallery[0] ?? null

  return (
    <>
      <PageHeader
        eyebrow="Our Story · Since 2017"
        title="Locals who love the open road"
        subtitle="Planet Safari began with a single scooter and a simple idea — make exploring coastal Karnataka effortless and honest."
        image={introImg}
      />

      {/* Intro */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 md:py-28">
        <Reveal>
          <span className="eyebrow flex items-center gap-2 text-terracotta">
            <span className="inline-block h-px w-7 bg-terracotta/60" />
            Who we are
          </span>
          <h2 className="mt-4 text-balance text-[clamp(1.9rem,1.2rem+2.6vw,3rem)] font-semibold leading-[1.05] text-clay">
            Two wheels, zero hassle, all of Mangaluru
          </h2>
          <div className="mt-5 space-y-4 text-pretty leading-relaxed text-espresso/80">
            <p>
              From our store in Hampankatta, we hand out scooties and bikes to
              travellers, students and locals who want the freedom to roam on
              their own schedule — to Panambur at dawn or up into the Ghats for a
              weekend.
            </p>
            <p>
              We keep things refreshingly simple: a clean, well-serviced fleet,
              prices with nothing hidden, and a WhatsApp chat that an actual human
              answers. No counters, no queues, no surprises.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="grain relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] border border-bark">
            {cardImg ? (
              <Image
                src={cardImg}
                alt="Riding through coastal Mangaluru"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center"
                style={{ background: 'radial-gradient(120% 120% at 30% 10%, #7cc7ab, #4fb28f 55%, #3c403e)' }}
              >
                <Compass size={84} strokeWidth={1.2} className="text-paper/80" />
              </div>
            )}
            <span className="stamp absolute bottom-4 left-4 z-[2] bg-paper/90 px-3 py-1 text-[0.6rem] text-terracotta-deep">
              {business.location}
            </span>
          </div>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="contour grain relative isolate border-y border-bark py-16">
        <div className="relative z-[2] mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 px-5 sm:px-8 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="flex flex-col items-center gap-2 text-center">
                <s.icon size={26} className="text-terracotta" strokeWidth={1.7} />
                <span className="font-display text-4xl font-semibold text-clay">
                  {s.value}
                </span>
                <span className="font-mono text-[0.62rem] uppercase tracking-widest text-olive">
                  {s.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="mx-auto grid w-full max-w-6xl gap-6 px-5 py-20 sm:px-8 md:grid-cols-2 md:py-28">
        <Reveal>
          <article className="journal-card flex h-full flex-col gap-3 rounded-[var(--radius-card)] p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/12 text-terracotta">
              <Target size={22} />
            </span>
            <h3 className="font-display text-2xl font-semibold text-clay">Our Mission</h3>
            <p className="leading-relaxed text-espresso/75">
              To make every visitor and resident of Mangaluru a rider — with
              affordable, dependable two-wheelers and service so easy it feels like
              borrowing from a friend.
            </p>
          </article>
        </Reveal>
        <Reveal delay={100}>
          <article className="journal-card flex h-full flex-col gap-3 rounded-[var(--radius-card)] p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-olive/15 text-olive-deep">
              <Compass size={22} />
            </span>
            <h3 className="font-display text-2xl font-semibold text-clay">Our Vision</h3>
            <p className="leading-relaxed text-espresso/75">
              To be coastal Karnataka&apos;s most trusted rental — known for honest
              prices, spotless rides and a genuine love for showing people the best
              of the coast and the Ghats.
            </p>
          </article>
        </Reveal>
      </section>

      {/* Gallery */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
        <SectionHeading
          eyebrow="Out there"
          title="Where a Planet Safari ride can take you"
          align="center"
        />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {GALLERY_LABELS.map((label, i) => {
            const img = gallery[i]
            return (
              <Reveal key={label} delay={(i % 3) * 80}>
                <div className="grain relative aspect-square overflow-hidden rounded-2xl border border-bark">
                  {img ? (
                    <Image
                      src={img}
                      alt={label}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div
                      className="h-full w-full"
                      style={{ background: GALLERY_BG[i % GALLERY_BG.length] }}
                    >
                      <div className="contour absolute inset-0 opacity-20 mix-blend-overlay" />
                    </div>
                  )}
                  <span className="absolute bottom-3 left-3 z-[2] font-mono text-[0.6rem] uppercase tracking-widest text-paper drop-shadow">
                    {label}
                  </span>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>
    </>
  )
}
