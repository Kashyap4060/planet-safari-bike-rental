import type { Metadata } from 'next'
import { vehicles, brands } from '@/data/vehicles'
import { scanFleetImages, scanPageHero } from '@/lib/fleet-images'
import PageHeader from '@/components/ui/PageHeader'
import VehicleCard from '@/components/vehicle/VehicleCard'
import FleetGrid, { type FleetItem } from '@/components/fleet/FleetGrid'

export const metadata: Metadata = {
  title: 'Our Fleet',
  description:
    'Browse scooties and bikes for rent in Mangaluru — Honda Activa, TVS Jupiter, Suzuki Access, Royal Enfield, KTM Duke and more. Filter by type, brand and budget.',
  alternates: { canonical: '/fleet' },
}

export default function FleetPage() {
  const items: FleetItem[] = vehicles.map((vehicle, i) => ({
    slug: vehicle.slug,
    name: vehicle.name,
    type: vehicle.type,
    brand: vehicle.brand,
    priceDay: vehicle.priceDay,
    card: (
      <VehicleCard
        vehicle={vehicle}
        images={scanFleetImages(vehicle.slug)}
        index={i}
      />
    ),
  }))

  return (
    <>
      <PageHeader
        eyebrow="The Fleet · Mangaluru"
        title="Choose your two-wheeler"
        subtitle="Scooties for the city, bikes for the Ghats. Every ride is serviced, fuelled and ready — pick one and book on WhatsApp."
        image={scanPageHero('fleet')}
      />
      <FleetGrid items={items} brands={brands} />
    </>
  )
}
