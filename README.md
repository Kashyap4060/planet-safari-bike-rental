# PLANET SAFARI Bike Rental

Conversion-focused two-wheeler rental website for **PLANET SAFARI Bike Rental**,
Hampankatta, Mangaluru. Visitors browse the fleet, check pricing, and book
directly over **WhatsApp** — no payment gateway, no accounts.

Live: https://planet-safari-bike-rental.vercel.app

## Tech stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **lucide-react** icons, **motion** available for animation
- **next-sitemap** for `sitemap.xml` + `robots.txt`
- Deployed on **Vercel**

## Design

Earthy expedition / field-journal direction — warm sand & terracotta palette,
`Fraunces` display serif + `Hanken Grotesk` body + `Spline Sans Mono` labels,
topographic contours, grain, and stamp/route motifs.

## Pages

`/` Home · `/fleet` Fleet (filterable) · `/pricing` · `/about` · `/contact`

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build + sitemap (postbuild)
npm start          # serve the production build
```

## Customising for another business

Most content lives in plain data files:

- `src/data/business.ts` — name, phone, email, address, hours, map embed, siteUrl
- `src/data/vehicles.ts` — fleet catalog & pricing
- `src/data/reviews.ts`, `src/data/faqs.ts`
- `next-sitemap.config.js` — `siteUrl`

## Images (zero-config drop-in)

Drop photos into `public/images/` and they appear automatically — until then the
site renders designed placeholder artwork. See `public/images/README.md` for the
exact folder layout (vehicle folders match each `slug` in `vehicles.ts`).

## WhatsApp booking

All booking CTAs open `wa.me` with a pre-filled message — see `src/lib/whatsapp.ts`.

---

Business logic & page specs: `docs/RENTAL_WEBSITE_BLUEPRINT.md`.
