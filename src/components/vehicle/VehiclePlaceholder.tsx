import { Bike } from 'lucide-react'

const PALETTES = [
  { from: '#84c9af', to: '#4fb28f' },
  { from: '#7cc7ab', to: '#57a98a' },
  { from: '#6f9d86', to: '#3c403e' },
  { from: '#84c9af', to: '#3a8a6c' },
]

/**
 * Designed fallback artwork shown when no real photo exists for a vehicle yet.
 * Drop a JPG into public/images/fleet/<slug>/ and the real photo replaces this.
 */
export default function VehiclePlaceholder({
  name,
  type,
  index = 0,
}: {
  name: string
  type: 'scooty' | 'bike'
  index?: number
}) {
  const p = PALETTES[index % PALETTES.length]
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ background: `linear-gradient(150deg, ${p.from}, ${p.to})` }}
    >
      {/* topographic rings */}
      <svg
        className="absolute inset-0 h-full w-full opacity-25"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g fill="none" stroke="#ffffff" strokeWidth="1.2">
          {[40, 80, 120, 160, 200].map((r) => (
            <circle key={r} cx="320" cy="40" r={r} />
          ))}
        </g>
      </svg>

      <div className="relative z-[1] flex flex-col items-center gap-3 text-paper">
        <Bike size={64} strokeWidth={1.4} className="drop-shadow" />
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-paper/85">
          {type === 'bike' ? 'Motorcycle' : 'Scooter'}
        </span>
        <span className="px-6 text-center font-display text-lg font-medium leading-tight">
          {name}
        </span>
      </div>

      {/* sun in corner */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-paper/15 blur-md" />
    </div>
  )
}
