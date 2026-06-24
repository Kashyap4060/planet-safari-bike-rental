'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { faqs } from '@/data/faqs'
import SectionHeading from '@/components/ui/SectionHeading'

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="mx-auto w-full max-w-3xl px-5 py-20 sm:px-8 md:py-28">
      <SectionHeading
        eyebrow="Good to know"
        title="Frequently asked questions"
        align="center"
      />

      <ul className="mt-12 divide-y divide-bark/60 border-y border-bark/60">
        {faqs.map((faq, i) => {
          const isOpen = open === i
          return (
            <li key={faq.question}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-display text-lg font-medium text-clay">
                  {faq.question}
                </span>
                <Plus
                  size={20}
                  className={`shrink-0 text-terracotta transition-transform duration-300 ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                />
              </button>
              <div
                className="grid transition-all duration-300 ease-out"
                style={{
                  gridTemplateRows: isOpen ? '1fr' : '0fr',
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="overflow-hidden">
                  <p className="pb-5 pr-8 leading-relaxed text-espresso/75">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
