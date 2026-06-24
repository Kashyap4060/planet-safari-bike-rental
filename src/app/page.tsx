import { scanHeroImages } from '@/lib/fleet-images'
import { business } from '@/data/business'
import Hero from '@/components/home/Hero'
import FeaturedVehicles from '@/components/home/FeaturedVehicles'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import RentalPackages from '@/components/home/RentalPackages'
import Reviews from '@/components/home/Reviews'
import Faq from '@/components/home/Faq'
import ContactCta from '@/components/home/ContactCta'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': business.siteUrl,
  name: business.name,
  description: business.blurb,
  telephone: business.phone,
  email: business.email,
  url: business.siteUrl,
  address: {
    '@type': 'PostalAddress',
    streetAddress:
      '7, 3rd Floor, HO, Ashirwad Building, GHS Rd, opp. Tara Clinic, Hampankatta',
    addressLocality: business.locality,
    addressRegion: business.region,
    postalCode: business.postalCode,
    addressCountry: business.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: business.coords.lat,
    longitude: business.coords.lng,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: business.opens,
    closes: business.closes,
  },
  priceRange: '₹₹',
  areaServed: 'Mangaluru, Karnataka',
}

export default function HomePage() {
  const heroImages = scanHeroImages()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero images={heroImages} />
      <FeaturedVehicles />
      <WhyChooseUs />
      <RentalPackages />
      <Reviews />
      <Faq />
      <ContactCta />
    </>
  )
}
