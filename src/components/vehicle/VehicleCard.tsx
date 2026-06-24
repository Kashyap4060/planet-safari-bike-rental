import { Fuel, Gauge } from 'lucide-react'
import type { Vehicle } from '@/data/vehicles'
import { buildVehicleWhatsAppUrl } from '@/lib/whatsapp'
import { formatINR } from '@/lib/pricing'
import VehicleCarousel from './VehicleCarousel'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

interface Props {
  vehicle: Vehicle
  images: string[]
  index?: number
}

/** Server component — carousel inside is the only client island. */
export default function VehicleCard({ vehicle, images, index = 0 }: Props) {
  const dimmed = !vehicle.available
  return (
    <article
      className={`journal-card group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] transition-transform duration-300 hover:-translate-y-1 ${
        dimmed ? 'opacity-70 grayscale' : ''
      }`}
    >
      <div className="relative">
        <VehicleCarousel
          images={images}
          name={vehicle.name}
          type={vehicle.type}
          index={index}
        />

        <span className="stamp absolute left-3 top-3 z-[3] bg-paper/90 px-2.5 py-1 text-[0.6rem] text-terracotta-deep">
          {vehicle.type === 'bike' ? 'Bike' : 'Scooty'}
        </span>

        {dimmed && (
          <div className="absolute inset-0 z-[3] flex items-center justify-center bg-clay/55">
            <span className="stamp rotate-[-8deg] bg-paper px-4 py-1.5 text-sm text-terracotta-deep">
              Not Available
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-olive">
              {vehicle.brand}
            </p>
            <h3 className="font-display text-xl font-semibold leading-tight text-clay">
              {vehicle.name}
            </h3>
          </div>
        </div>

        {vehicle.description && (
          <p className="mt-2 text-sm leading-relaxed text-espresso/70">
            {vehicle.description}
          </p>
        )}

        <div className="mt-4 flex items-center gap-4 text-sm text-espresso/80">
          <span className="inline-flex items-center gap-1.5">
            <Gauge size={15} className="text-terracotta" />
            {vehicle.engine}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Fuel size={15} className="text-terracotta" />
            {vehicle.mileage}
          </span>
        </div>

        <div className="route-divider my-4" />

        <div className="mt-auto flex items-end justify-between">
          <div>
            <span className="font-display text-3xl font-semibold text-clay">
              {formatINR(vehicle.priceDay)}
            </span>
            <span className="text-sm text-espresso/60"> /day</span>
            <p className="text-xs text-espresso/60">
              {formatINR(vehicle.priceWeek)} /week
            </p>
          </div>
        </div>

        <a
          href={buildVehicleWhatsAppUrl(vehicle.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-wa mt-4 w-full py-2.5 text-sm"
          aria-disabled={dimmed}
        >
          <WhatsAppIcon size={17} />
          Book via WhatsApp
        </a>
      </div>
    </article>
  )
}
