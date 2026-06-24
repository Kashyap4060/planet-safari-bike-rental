import Image from 'next/image'

interface Props {
  eyebrow: string
  title: string
  subtitle?: string
  image?: string | null
}

/**
 * Page hero band. Uses a real photo when one is dropped into
 * public/images/pages/<page>.jpg, otherwise a designed earthy banner.
 */
export default function PageHeader({ eyebrow, title, subtitle, image }: Props) {
  return (
    <header className="grain relative isolate overflow-hidden border-b border-bark bg-espresso text-paper">
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/40" />
        </>
      ) : (
        <div className="absolute inset-0">
          <div className="contour absolute inset-0 opacity-[0.18]" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 120% at 15% 0%, rgba(207,138,38,0.32), transparent 55%), radial-gradient(90% 90% at 100% 100%, rgba(181,83,42,0.4), transparent 60%)',
            }}
          />
        </div>
      )}

      <div className="relative z-[2] mx-auto w-full max-w-6xl px-5 pb-16 pt-28 sm:px-8 md:pb-20 md:pt-36">
        <span className="eyebrow flex items-center gap-2 text-amber">
          <span className="inline-block h-px w-8 bg-amber/70" />
          {eyebrow}
        </span>
        <h1 className="mt-4 max-w-3xl text-balance text-[clamp(2.6rem,1.4rem+5vw,5rem)] font-semibold leading-[0.98]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-paper/80">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  )
}
