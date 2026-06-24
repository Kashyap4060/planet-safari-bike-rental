import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getFeaturedVehicles } from '@/data/vehicles'
import { scanFleetImages } from '@/lib/fleet-images'
import VehicleCard from '@/components/vehicle/VehicleCard'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'

/** Server component — scans images per featured vehicle and passes them down. */
export default function FeaturedVehicles() {
  const featured = getFeaturedVehicles()

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Pick your ride"
          title="Featured two-wheelers"
          intro="Hand-checked, fuelled-up and ready to roll. Every booking includes a helmet, insurance and unlimited kilometres."
        />
        <Reveal delay={150}>
          <Link
            href="/fleet"
            className="group inline-flex items-center gap-2 font-medium text-terracotta-deep"
          >
            See the whole fleet
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((vehicle, i) => (
          <Reveal key={vehicle.slug} delay={i * 90}>
            <VehicleCard
              vehicle={vehicle}
              images={scanFleetImages(vehicle.slug)}
              index={i}
            />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
