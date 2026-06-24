// Central business configuration for PLANET SAFARI Bike Rental.
// Update these values when rebuilding for another client.

export const business = {
  name: 'PLANET SAFARI Bike Rental',
  shortName: 'Planet Safari',
  tagline: 'Ride the Mangaluru Coast & the Western Ghats',
  blurb:
    'Self-drive scooties and bikes for exploring Mangaluru, its beaches and the Ghats. Pick your ride, message us on WhatsApp, and roll out the same day.',

  // WhatsApp number — country code + number, no spaces or symbols.
  phone: '+919876543210',
  waNumber: '919876543210',
  email: 'planetsafari@gmail.com',

  address:
    '7, 3rd Floor, HO, Ashirwad Building, GHS Rd, opp. Tara Clinic, Hampankatta, Mangaluru, Karnataka 575001',
  locality: 'Mangaluru',
  region: 'Karnataka',
  postalCode: '575001',
  location: 'Hampankatta, Mangaluru',
  country: 'IN',

  // Coordinates from the client's Google Maps place listing.
  coords: { lat: 12.8696055, lng: 74.840299 },
  // Keyless embed that renders the pin without a Maps API key.
  mapEmbedUrl:
    'https://maps.google.com/maps?q=12.8696055,74.840299&z=16&hl=en&output=embed',
  mapLink:
    'https://www.google.com/maps/place/PLANET+SAFARI/@12.8696055,74.840299,16z',

  openingHours: '8:00 AM – 8:00 PM, every day',
  opens: '08:00',
  closes: '20:00',

  socialLinks: {
    instagram: '',
    facebook: '',
  },

  // Canonical site URL (Vercel default until a custom domain is attached).
  siteUrl: 'https://planet-safari-bike-rental.vercel.app',
} as const

export type Business = typeof business
