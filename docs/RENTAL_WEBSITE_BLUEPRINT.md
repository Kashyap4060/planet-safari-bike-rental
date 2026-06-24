# Two-Wheeler Rental Website — Business Blueprint

This document captures the complete business logic, data structures, page specs, and technical patterns
for a two-wheeler rental website. Use it to rebuild the same product for a different business with a
**completely new visual design/template**. Do not copy the existing design — invent a fresh one.

---

## What This Site Is

A conversion-focused rental website for a local two-wheeler rental business (scooties + bikes).
Visitors browse vehicles, check pricing, and book directly via WhatsApp. No payment gateway, no
user accounts — WhatsApp is the single booking channel.

---

## Tech Stack (keep the same)

- **Framework**: Next.js (App Router, latest stable)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion (optional but recommended)
- **Icons**: Lucide React
- **Image hosting**: `public/` folder (Next.js static)
- **SEO**: `next-sitemap` (postbuild), `metadata` exports, JSON-LD LocalBusiness
- **Deployment**: Vercel

---

## Data Structures

### Vehicle

```ts
interface Vehicle {
  slug: string          // kebab-case, used as folder name for images
  name: string          // e.g. "Honda Activa"
  type: 'scooty' | 'bike'
  brand: string         // e.g. "Honda"
  engine: string        // e.g. "110cc"
  mileage: string       // e.g. "45 km/l"
  priceDay: number      // INR
  priceWeek: number     // INR
  priceMonth: number    // INR
  deposit: number       // INR, fully refundable
  featured: boolean     // show on homepage
  available: boolean    // false = greyed out card
  description?: string  // 1-2 sentence pitch
}
```

**Sample fleet** (replace with actual business fleet):
| slug | name | type | engine | priceDay | priceWeek | priceMonth | deposit |
|------|------|------|--------|----------|-----------|------------|---------|
| honda-activa | Honda Activa | scooty | 110cc | 299 | 1699 | 5499 | 500 |
| tvs-jupiter | TVS Jupiter | scooty | 110cc | 279 | 1599 | 4999 | 500 |
| suzuki-access-125 | Suzuki Access 125 | scooty | 125cc | 319 | 1899 | 6499 | 500 |
| royal-enfield-classic-350 | Royal Enfield Classic 350 | bike | 346cc | 799 | 4999 | 15999 | 2000 |
| ktm-duke-200 | KTM Duke 200 | bike | 199cc | 699 | 4299 | 13999 | 2000 |
| bajaj-pulsar-220 | Bajaj Pulsar 220 | bike | 220cc | 499 | 2999 | 9999 | 1500 |

### Review

```ts
interface Review {
  name: string       // customer first name
  location: string   // e.g. "Mumbai"
  rating: number     // 1–5
  text: string       // review body, 1–3 sentences
  date: string       // e.g. "December 2024"
}
```

### FAQ

```ts
interface FAQ {
  question: string
  answer: string
}
```

**Common FAQ topics to include:**
- What documents are needed? (any govt ID)
- Is a driving licence mandatory?
- What is included in the price? (helmet, roadside assistance, unlimited km)
- How does the deposit work?
- Can I extend my rental?
- What happens in case of breakdown?
- Is fuel included? (never — customer fills it)
- Can I take the vehicle to another state?

---

## Business Info (customise per client)

```ts
const business = {
  name: 'Shiva Bike Rental',
  tagline: 'Explore Gokarna on Two Wheels',
  phone: '+919986596949',          // WhatsApp number — must be with country code, no spaces
  email: 'shivabikerental@gmail.com',
  address: 'Near Om Beach Road, Gokarna, Karnataka 581326',
  location: 'Gokarna, Karnataka',
  mapEmbedUrl: 'https://www.google.com/maps/embed?...',  // get from Google Maps → Share → Embed
  openingHours: '7:00 AM – 8:00 PM, every day',
  socialLinks: {
    instagram: '',  // optional
    facebook: '',   // optional
  },
}
```

---

## WhatsApp Integration

All booking CTAs open WhatsApp with a pre-filled message. No form submission, no backend.

```ts
// src/lib/whatsapp.ts

const WA_NUMBER = '919986596949'  // country code + number, no +

export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${WA_NUMBER}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

export function buildVehicleWhatsAppUrl(vehicleName: string): string {
  return buildWhatsAppUrl(
    `Hi! I'd like to book the ${vehicleName}. Please confirm availability and pricing.`
  )
}
```

**Where WhatsApp links appear:**
- Floating WhatsApp button (bottom-right, every page)
- "Book via WhatsApp" button on every vehicle card
- "Book Now" button in pricing table rows
- Contact form submit (builds message from form fields, opens WhatsApp)
- Hero section CTA
- Mobile sticky booking bar (bottom of screen on mobile)

---

## Fleet Image System

**Zero-friction image management**: drop images into a folder, they appear automatically.
No renaming, no numbering, no config changes needed.

**Folder structure:**
```
public/
  images/
    hero/           ← hero carousel images (any filenames)
    pages/
      fleet.jpg     ← page hero for /fleet
      pricing.jpg   ← page hero for /pricing
      about.jpg     ← page hero for /about
      contact.jpg   ← page hero for /contact
    fleet/
      honda-activa/    ← matches vehicle slug exactly
        photo1.jpg
        photo2.jpg
        (any filenames, sorted alphabetically)
      tvs-jupiter/
        front.jpg
        side.jpg
```

**Server-side image scanner** (runs at request time, uses Node.js `fs`):

```ts
// src/lib/fleet-images.ts
import fs from 'fs'
import path from 'path'

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])

export function scanFleetImages(slug: string): string[] {
  const dir = path.join(process.cwd(), 'public', 'images', 'fleet', slug)
  try {
    return fs
      .readdirSync(dir)
      .filter(f => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
      .sort()
      .map(f => `/images/fleet/${slug}/${f}`)
  } catch {
    return []
  }
}
```

**CRITICAL — RSC boundary rule:**
`scanFleetImages` uses Node.js `fs` and can only run in Server Components.
- `fleet/page.tsx` (server) → scans all slugs → passes `vehicleImages: Record<string, string[]>` to `FleetGrid` (client) as a prop
- `FeaturedVehicles` (server) → calls `scanFleetImages` per vehicle → passes `images: string[]` to `VehicleCard`
- `VehicleCard` itself is a Server Component — only the carousel inside it is `'use client'`

---

## Pages

### 1. Home (`/`)

Sections in order:
1. **Hero** — full-viewport image carousel with headline, subtext, 2 CTAs (View Fleet, Book Now via WhatsApp). Multiple Gokarna/beach/road photos cycling automatically. Pause on hover. Prev/next arrows. Dot indicators.
2. **Featured Vehicles** — 4-column grid of `featured: true` vehicles. Each is a VehicleCard.
3. **Why Choose Us** — 4–6 trust signals (e.g. No Hidden Charges, Well-Maintained Fleet, WhatsApp Support, Easy Booking, Local Experts, Flexible Rentals)
4. **Rental Packages** — 3 cards: Daily, Weekly, Monthly. Show starting price for each, list what's included.
5. **Customer Reviews** — carousel/grid of 6–8 reviews with star ratings.
6. **FAQ** — accordion of 6–8 questions.
7. **Contact CTA** — strip with phone number, WhatsApp link, and link to /contact.

**SEO on home page:**
- Full `metadata` export with title, description, keywords, OG tags
- JSON-LD `LocalBusiness` structured data

```ts
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: business.name,
  telephone: business.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '...',
    addressLocality: 'Gokarna',
    addressRegion: 'Karnataka',
    postalCode: '581326',
    addressCountry: 'IN',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    opens: '07:00',
    closes: '20:00',
  },
  priceRange: '₹₹',
  url: 'https://shivabikerental.com',
}
```

---

### 2. Fleet (`/fleet`)

- Page hero image
- `FleetGrid` client component with 3 filters:
  - **Type**: All / Scooty / Bike (toggle buttons)
  - **Brand**: All / Honda / TVS / Suzuki / Royal Enfield / KTM / Bajaj (toggle buttons)
  - **Max Price**: range slider ₹200–₹1000/day
- Filtered vehicle count display
- 3-column vehicle grid (each card = VehicleCard)
- Empty state with "Clear filters" button

---

### 3. Pricing (`/pricing`)

- Page hero
- "No hidden charges" notice banner
- Full pricing table columns: Vehicle | Type | Per Day | Per Week (+ % saving) | Per Month (+ % saving) | Deposit | Book button
- Savings % calculated: `Math.round((1 - priceWeek / (priceDay * 7)) * 100)`
- "What's Included" card: helmet, roadside assistance, unlimited km, basic insurance, clean vehicle, WhatsApp support
- "Deposit Policy" card: scooties ₹500, bikes ₹1500–₹2000, fully refundable

---

### 4. About (`/about`)

- Page hero
- Two-column intro: text (story paragraph) + scenic image
- Stats grid (4 items): Happy Customers, Average Rating, Years in Business, No Hidden Charges
- Mission card + Vision card (side by side)
- Gokarna/scenery photo gallery grid (pull from hero images)

---

### 5. Contact (`/contact`)

Contact page must be a **Server Component** that imports a `'use client'` `ContactForm` component.
(Reason: `metadata` export and `'use client'` cannot coexist in the same file.)

**ContactForm fields:**
- Name (text, required)
- Phone (tel, required)
- Email (email, optional)
- Vehicle interested in (select from vehicle list, optional)
- Message (textarea, optional)

On submit: build a WhatsApp message from all fields, open `wa.me/...` in new tab.

**Rest of the page (server-rendered):**
- Google Maps embed (`<iframe>` from Maps → Share → Embed a map)
- Contact info cards: Phone, WhatsApp, Email, Address, Opening Hours

---

## Vehicle Card

Every vehicle card shows:
- Image carousel (prev/next on hover, dot indicators, photo counter badge)
- Type badge (Scooty / Bike) — top-left overlay
- "Not Available" overlay if `available: false`
- Vehicle name + brand
- Engine cc + mileage (with icons)
- Price: ₹X/day (large) + ₹X/week (small below)
- "Book via WhatsApp" button (green, full width)

---

## Layout Components

### Navbar
- Logo (left) + nav links (center/right) + "Book Now" CTA button
- Links: Home, Fleet, Pricing, About, Contact
- Mobile: hamburger menu → slide-in drawer
- Sticky at top, slight background blur on scroll

### Footer
- Logo + tagline
- Quick links
- Contact info (phone, email, address, hours)
- WhatsApp button
- Copyright

### Floating WhatsApp Button
- Fixed bottom-right on all pages
- Green circle with WhatsApp icon
- Pulse animation to draw attention
- Opens `wa.me/...` in new tab

### Mobile Booking Bar
- Fixed bottom strip on mobile only
- Two buttons: Call Now (tel: link) | Book on WhatsApp
- Hidden on desktop

---

## SEO Setup

### next-sitemap

```js
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://yourdomain.com',  // update per client
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
}
```

Add to `package.json`:
```json
"postbuild": "next-sitemap"
```

### Metadata pattern (all pages)

```ts
export const metadata: Metadata = {
  title: 'Page Title — Business Name',
  description: '...',
  keywords: ['bike rental gokarna', 'scooty rental gokarna', ...],
  openGraph: { title: '...', description: '...', images: ['/og-image.jpg'] },
}
```

---

## Customisation Checklist for a New Business

When rebuilding for a new client, change:

- [ ] Business name, tagline, phone, email, address in `src/data/` or a `business.config.ts`
- [ ] Vehicle catalog in `src/data/vehicles.ts`
- [ ] Reviews in `src/data/reviews.ts`
- [ ] FAQs in `src/data/faqs.ts` (keep same topics, update answers)
- [ ] Google Maps embed URL in contact page
- [ ] `siteUrl` in `next-sitemap.config.js`
- [ ] JSON-LD business info on homepage
- [ ] All images in `public/images/`
- [ ] OG image at `public/og-image.jpg`
- [ ] Domain in Vercel project settings

**Do NOT carry over:**
- Colors, fonts, card shapes, layout compositions — design fresh for the new brand

---

## Deployment

```bash
npm install
npm run dev        # local dev
npm run build      # production build + generates sitemap
vercel --prod      # deploy to Vercel
```

Auto-deploy: connect the GitHub repo to Vercel → every `git push` to main triggers a new deploy.

---

## Prompt for Claude (copy-paste to start a new project)

> I want to build a two-wheeler rental website for [BUSINESS NAME] in [LOCATION].
> Read the file `docs/RENTAL_WEBSITE_BLUEPRINT.md` for the complete business logic, data structures,
> page specs, and technical patterns. Use that exact logic but design a completely different visual
> template — do not copy the previous design. Business details:
>
> - Business name: [NAME]
> - Location: [CITY, STATE]
> - WhatsApp number: [+91XXXXXXXXXX]
> - Email: [EMAIL]
> - Fleet: [list vehicles or say "same as blueprint"]
> - Visual direction: [e.g. "dark luxury", "earthy / nature", "bold orange and black", "minimal white"]
>
> Set up Next.js with TypeScript and Tailwind CSS v4, implement all 5 pages, and deploy to Vercel.
