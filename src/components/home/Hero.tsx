'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, MapPin, ArrowRight } from 'lucide-react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { buildBookingWhatsAppUrl } from '@/lib/whatsapp'
import { business } from '@/data/business'

/** Designed fallback slides used when no real hero photos are present. */
const FALLBACK_SLIDES = [
  {
    label: 'The Coast',
    bg: 'radial-gradient(120% 130% at 20% 10%, #e3a73f 0%, #b5532a 55%, #8f3f1d 100%)',
  },
  {
    label: 'The Ghats',
    bg: 'radial-gradient(120% 130% at 80% 0%, #8a8a4e 0%, #50502a 55%, #2c1e12 100%)',
  },
  {
    label: 'The Open Road',
    bg: 'radial-gradient(120% 130% at 50% 100%, #d98b5f 0%, #b5532a 50%, #3a2a1b 100%)',
  },
]

const AUTOPLAY_MS = 5000

export default function Hero({ images }: { images: string[] }) {
  const hasPhotos = images.length > 0
  const slideCount = hasPhotos ? images.length : FALLBACK_SLIDES.length
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = useCallback(
    (dir: number) => setActive((a) => (a + dir + slideCount) % slideCount),
    [slideCount],
  )

  useEffect(() => {
    if (paused || slideCount <= 1) return
    const id = setInterval(() => setActive((a) => (a + 1) % slideCount), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, slideCount])

  return (
    <section
      className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden text-paper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        {hasPhotos
          ? images.map((src, i) => (
              <div
                key={src}
                className="absolute inset-0 transition-opacity duration-[1200ms]"
                style={{ opacity: i === active ? 1 : 0 }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className={`object-cover ${i === active ? 'animate-ken-burns' : ''}`}
                />
              </div>
            ))
          : FALLBACK_SLIDES.map((s, i) => (
              <div
                key={s.label}
                className="absolute inset-0 transition-opacity duration-[1200ms]"
                style={{ background: s.bg, opacity: i === active ? 1 : 0 }}
              >
                <div className="contour absolute inset-0 opacity-[0.16] mix-blend-overlay" />
              </div>
            ))}
        <div className="absolute inset-0 bg-gradient-to-t from-clay via-clay/40 to-clay/10" />
      </div>

      {/* Foreground content */}
      <div className="relative z-[2] mx-auto w-full max-w-6xl px-5 pb-28 pt-32 sm:px-8 md:pb-32">
        <span className="eyebrow inline-flex items-center gap-2 text-amber animate-fade-up">
          <MapPin size={15} />
          {business.location}
        </span>

        <h1
          className="mt-5 max-w-4xl text-balance text-[clamp(2.8rem,1.2rem+7vw,6.5rem)] font-semibold leading-[0.95] animate-fade-up"
          style={{ animationDelay: '120ms' }}
        >
          Ride the Mangaluru
          <br />
          coast &amp; the{' '}
          <span className="italic text-amber">Western Ghats</span>
        </h1>

        <p
          className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-paper/85 animate-fade-up"
          style={{ animationDelay: '240ms' }}
        >
          {business.blurb}
        </p>

        <div
          className="mt-9 flex flex-wrap items-center gap-3 animate-fade-up"
          style={{ animationDelay: '360ms' }}
        >
          <Link href="/fleet" className="btn btn-primary px-6 py-3 text-base">
            View the Fleet
            <ArrowRight size={18} />
          </Link>
          <a
            href={buildBookingWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa px-6 py-3 text-base"
          >
            <WhatsAppIcon size={19} />
            Book on WhatsApp
          </a>
        </div>
      </div>

      {/* Controls */}
      {slideCount > 1 && (
        <div className="absolute bottom-8 right-5 z-[2] flex items-center gap-3 sm:right-8">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(-1)}
            className="rounded-full border border-paper/40 p-2 text-paper transition hover:bg-paper hover:text-clay"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: slideCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? 'w-6 bg-amber' : 'w-1.5 bg-paper/50'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(1)}
            className="rounded-full border border-paper/40 p-2 text-paper transition hover:bg-paper hover:text-clay"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </section>
  )
}
