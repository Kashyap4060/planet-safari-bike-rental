import fs from 'fs'
import path from 'path'
import { vehicles } from '@/data/vehicles'

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])

/**
 * Scan public/images/fleet/<slug> for vehicle photos.
 * Drop images into the folder and they appear automatically — no config needed.
 * Server-only (uses fs); call from Server Components and pass results down as props.
 */
export function scanFleetImages(slug: string): string[] {
  const dir = path.join(process.cwd(), 'public', 'images', 'fleet', slug)
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
      .sort()
      .map((f) => `/images/fleet/${slug}/${f}`)
  } catch {
    return []
  }
}

/** Scan images for every vehicle, keyed by slug. */
export function scanAllFleetImages(): Record<string, string[]> {
  return Object.fromEntries(
    vehicles.map((v) => [v.slug, scanFleetImages(v.slug)]),
  )
}

/** Scan a directory under public/images for any image files (sorted). */
function scanDir(...segments: string[]): string[] {
  const dir = path.join(process.cwd(), 'public', 'images', ...segments)
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
      .sort()
      .map((f) => `/images/${segments.join('/')}/${f}`)
  } catch {
    return []
  }
}

/** Hero carousel images, if any have been dropped into public/images/hero. */
export function scanHeroImages(): string[] {
  return scanDir('hero')
}

/** Page hero image for /fleet, /pricing, /about, /contact — empty if none. */
export function scanPageHero(page: string): string | null {
  const dir = path.join(process.cwd(), 'public', 'images', 'pages')
  try {
    const match = fs
      .readdirSync(dir)
      .filter((f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
      .find((f) => path.parse(f).name === page)
    return match ? `/images/pages/${match}` : null
  } catch {
    return null
  }
}

/** Scenic gallery images for the About page (reuses hero folder). */
export function scanGalleryImages(): string[] {
  return scanHeroImages()
}
