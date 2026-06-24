export interface Vehicle {
  slug: string
  name: string
  type: 'scooty' | 'bike'
  brand: string
  engine: string
  mileage: string
  priceDay: number
  priceWeek: number
  priceMonth: number
  deposit: number
  featured: boolean
  available: boolean
  description?: string
}

export const vehicles: Vehicle[] = [
  {
    slug: 'honda-activa',
    name: 'Honda Activa',
    type: 'scooty',
    brand: 'Honda',
    engine: '110cc',
    mileage: '45 km/l',
    priceDay: 299,
    priceWeek: 1699,
    priceMonth: 5499,
    deposit: 500,
    featured: true,
    available: true,
    description:
      "India's most-loved scooter — light, frugal and effortless through Mangaluru traffic.",
  },
  {
    slug: 'tvs-jupiter',
    name: 'TVS Jupiter',
    type: 'scooty',
    brand: 'TVS',
    engine: '110cc',
    mileage: '50 km/l',
    priceDay: 279,
    priceWeek: 1599,
    priceMonth: 4999,
    deposit: 500,
    featured: false,
    available: true,
    description:
      'A plush seat and a big boot make this the comfiest pick for long coastal cruises.',
  },
  {
    slug: 'suzuki-access-125',
    name: 'Suzuki Access 125',
    type: 'scooty',
    brand: 'Suzuki',
    engine: '125cc',
    mileage: '48 km/l',
    priceDay: 319,
    priceWeek: 1899,
    priceMonth: 6499,
    deposit: 500,
    featured: true,
    available: true,
    description:
      'An extra punch of 125cc power with surprising fuel economy for the hills.',
  },
  {
    slug: 'royal-enfield-classic-350',
    name: 'Royal Enfield Classic 350',
    type: 'bike',
    brand: 'Royal Enfield',
    engine: '346cc',
    mileage: '35 km/l',
    priceDay: 799,
    priceWeek: 4999,
    priceMonth: 15999,
    deposit: 2000,
    featured: true,
    available: true,
    description:
      'Thump down the coast in timeless style — built for the open Ghats road.',
  },
  {
    slug: 'ktm-duke-200',
    name: 'KTM Duke 200',
    type: 'bike',
    brand: 'KTM',
    engine: '199cc',
    mileage: '35 km/l',
    priceDay: 699,
    priceWeek: 4299,
    priceMonth: 13999,
    deposit: 2000,
    featured: true,
    available: true,
    description:
      'Sharp, aggressive and quick — a corner-carver made for the Ghat twisties.',
  },
  {
    slug: 'bajaj-pulsar-220',
    name: 'Bajaj Pulsar 220',
    type: 'bike',
    brand: 'Bajaj',
    engine: '220cc',
    mileage: '38 km/l',
    priceDay: 499,
    priceWeek: 2999,
    priceMonth: 9999,
    deposit: 1500,
    featured: false,
    available: true,
    description:
      'A sporty highway tourer with the muscle for longer coastal expeditions.',
  },
]

export const brands = Array.from(new Set(vehicles.map((v) => v.brand)))

export function getFeaturedVehicles(): Vehicle[] {
  return vehicles.filter((v) => v.featured)
}
