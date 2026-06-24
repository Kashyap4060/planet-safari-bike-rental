'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import VehiclePlaceholder from './VehiclePlaceholder'

interface Props {
  images: string[]
  name: string
  type: 'scooty' | 'bike'
  index?: number
}

export default function VehicleCarousel({ images, name, type, index = 0 }: Props) {
  const [active, setActive] = useState(0)
  const count = images.length

  if (count === 0) {
    return (
      <div className="relative aspect-[4/3] w-full">
        <VehiclePlaceholder name={name} type={type} index={index} />
      </div>
    )
  }

  const go = (dir: number) =>
    setActive((a) => (a + dir + count) % count)

  return (
    <div className="group/car relative aspect-[4/3] w-full overflow-hidden bg-sand-deep">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${name} — photo ${i + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-opacity duration-500"
          style={{ opacity: i === active ? 1 : 0 }}
        />
      ))}

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 z-[2] -translate-y-1/2 rounded-full bg-paper/85 p-1.5 text-clay opacity-0 shadow transition group-hover/car:opacity-100 hover:bg-paper"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 z-[2] -translate-y-1/2 rounded-full bg-paper/85 p-1.5 text-clay opacity-0 shadow transition group-hover/car:opacity-100 hover:bg-paper"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-2.5 left-1/2 z-[2] flex -translate-x-1/2 gap-1.5">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`Go to photo ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? 'w-5 bg-paper' : 'w-1.5 bg-paper/60'
                }`}
              />
            ))}
          </div>

          <span className="absolute right-2.5 top-2.5 z-[2] rounded-full bg-clay/70 px-2 py-0.5 font-mono text-[0.62rem] text-paper">
            {active + 1}/{count}
          </span>
        </>
      )}
    </div>
  )
}
