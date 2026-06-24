import { business } from '@/data/business'

/** Compass-sun mark + wordmark for Planet Safari. */
export default function Logo({
  className = '',
  tone = 'dark',
}: {
  className?: string
  tone?: 'dark' | 'light'
}) {
  const ink = tone === 'light' ? '#fbf5ea' : '#2c1e12'
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="38"
        height="38"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="20" cy="20" r="18.25" stroke="#b5532a" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="13" stroke="#cf8a26" strokeWidth="1.2" strokeDasharray="2 3" />
        {/* compass needle */}
        <path d="M20 7 L24 20 L20 18 L16 20 Z" fill="#b5532a" />
        <path d="M20 33 L16 20 L20 22 L24 20 Z" fill="#6c6a39" />
        <circle cx="20" cy="20" r="2.2" fill={ink} />
      </svg>
      <span className="leading-[0.95]">
        <span
          className="block font-mono text-[0.6rem] uppercase tracking-[0.34em]"
          style={{ color: '#b5532a' }}
        >
          Planet
        </span>
        <span
          className="block font-display text-[1.35rem] font-semibold tracking-tight"
          style={{ color: ink }}
        >
          Safari
        </span>
      </span>
      <span className="sr-only">{business.name}</span>
    </span>
  )
}
