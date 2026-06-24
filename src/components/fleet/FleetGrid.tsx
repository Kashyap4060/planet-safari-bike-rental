'use client'

import { useMemo, useState } from 'react'
import { SlidersHorizontal, MapPinned } from 'lucide-react'
import { formatINR } from '@/lib/pricing'

export interface FleetItem {
  slug: string
  name: string
  type: 'scooty' | 'bike'
  brand: string
  priceDay: number
  card: React.ReactNode
}

const PRICE_MIN = 200
const PRICE_MAX = 1000

export default function FleetGrid({
  items,
  brands,
}: {
  items: FleetItem[]
  brands: string[]
}) {
  const [type, setType] = useState<'all' | 'scooty' | 'bike'>('all')
  const [brand, setBrand] = useState<string>('all')
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX)

  const filtered = useMemo(
    () =>
      items.filter(
        (v) =>
          (type === 'all' || v.type === type) &&
          (brand === 'all' || v.brand === brand) &&
          v.priceDay <= maxPrice,
      ),
    [items, type, brand, maxPrice],
  )

  const reset = () => {
    setType('all')
    setBrand('all')
    setMaxPrice(PRICE_MAX)
  }

  const typeTabs = [
    { key: 'all', label: 'All' },
    { key: 'scooty', label: 'Scooty' },
    { key: 'bike', label: 'Bike' },
  ] as const

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 md:py-20">
      {/* Filter panel */}
      <div className="journal-card rounded-[var(--radius-card)] p-5 sm:p-7">
        <div className="flex items-center gap-2 text-terracotta-deep">
          <SlidersHorizontal size={17} />
          <span className="eyebrow">Find your ride</span>
        </div>

        <div className="mt-5 grid gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-end">
          {/* Type */}
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-espresso/60">
              Type
            </label>
            <div className="inline-flex rounded-full border border-bark bg-sand p-1">
              {typeTabs.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setType(t.key)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    type === t.key
                      ? 'bg-terracotta text-paper shadow'
                      : 'text-espresso/70 hover:text-terracotta'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Brand */}
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-espresso/60">
              Brand
            </label>
            <div className="flex flex-wrap gap-2">
              <BrandChip active={brand === 'all'} onClick={() => setBrand('all')}>
                All
              </BrandChip>
              {brands.map((b) => (
                <BrandChip
                  key={b}
                  active={brand === b}
                  onClick={() => setBrand(b)}
                >
                  {b}
                </BrandChip>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="lg:w-56">
            <label className="mb-2 flex items-center justify-between text-xs font-medium uppercase tracking-wider text-espresso/60">
              Max / day
              <span className="font-mono text-terracotta-deep">
                {formatINR(maxPrice)}
              </span>
            </label>
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={20}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-terracotta"
              aria-label="Maximum price per day"
            />
          </div>
        </div>
      </div>

      {/* Count */}
      <p className="mt-6 font-mono text-sm uppercase tracking-wider text-olive">
        Showing {filtered.length} of {items.length} vehicles
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v) => (
            <div key={v.slug}>{v.card}</div>
          ))}
        </div>
      ) : (
        <div className="journal-card mt-5 flex flex-col items-center gap-4 rounded-[var(--radius-card)] px-6 py-16 text-center">
          <MapPinned size={36} className="text-terracotta/60" />
          <p className="font-display text-2xl text-clay">
            No rides match those filters
          </p>
          <p className="max-w-sm text-espresso/65">
            Try widening your price range or clearing a filter to see more of the
            fleet.
          </p>
          <button type="button" onClick={reset} className="btn btn-primary px-6 py-2.5">
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}

function BrandChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
        active
          ? 'border-terracotta bg-terracotta text-paper'
          : 'border-bark bg-sand text-espresso/70 hover:border-terracotta hover:text-terracotta'
      }`}
    >
      {children}
    </button>
  )
}
