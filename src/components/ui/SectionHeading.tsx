import Reveal from './Reveal'

interface Props {
  eyebrow?: string
  title: string
  intro?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  className = '',
}: Props) {
  const center = align === 'center'
  return (
    <Reveal
      className={`flex flex-col gap-3 ${center ? 'items-center text-center mx-auto max-w-2xl' : 'max-w-2xl'} ${className}`}
    >
      {eyebrow && (
        <span className="eyebrow flex items-center gap-2 text-terracotta">
          <span className="inline-block h-px w-7 bg-terracotta/60" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-[clamp(2rem,1.2rem+3vw,3.4rem)] font-semibold leading-[1.02] text-clay">
        {title}
      </h2>
      {intro && (
        <p className="text-pretty text-lg leading-relaxed text-espresso/75">
          {intro}
        </p>
      )}
    </Reveal>
  )
}
