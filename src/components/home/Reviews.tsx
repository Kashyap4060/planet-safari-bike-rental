import { Star, Quote } from 'lucide-react'
import { reviews } from '@/data/reviews'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={15}
          className={i < rating ? 'fill-amber text-amber' : 'text-bark'}
        />
      ))}
    </div>
  )
}

export default function Reviews() {
  const avg = (
    reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
  ).toFixed(1)

  return (
    <section className="bg-sand-deep py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Rider stories"
            title="Loved by travellers & locals"
          />
          <Reveal delay={120}>
            <div className="flex items-center gap-3 rounded-full bg-paper px-5 py-2.5 shadow-sm">
              <Stars rating={5} />
              <span className="font-display text-lg font-semibold text-clay">
                {avg}
              </span>
              <span className="text-sm text-espresso/60">
                · {reviews.length}+ reviews
              </span>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {reviews.map((r, i) => (
            <Reveal key={`${r.name}-${i}`} delay={(i % 3) * 90}>
              <figure className="journal-card break-inside-avoid rounded-[var(--radius-card)] p-6">
                <Quote size={26} className="text-terracotta/30" />
                <blockquote className="mt-2 text-pretty leading-relaxed text-espresso/85">
                  {r.text}
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-between border-t border-bark/60 pt-4">
                  <div>
                    <p className="font-display text-base font-semibold text-clay">
                      {r.name}
                    </p>
                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-olive">
                      {r.location} · {r.date}
                    </p>
                  </div>
                  <Stars rating={r.rating} />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
