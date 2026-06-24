import { business } from '@/data/business'

const WA_NUMBER = business.waNumber

/** Build a wa.me link, optionally with a pre-filled message. */
export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${WA_NUMBER}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

/** Booking link pre-filled for a specific vehicle. */
export function buildVehicleWhatsAppUrl(vehicleName: string): string {
  return buildWhatsAppUrl(
    `Hi ${business.shortName}! I'd like to book the ${vehicleName}. Please confirm availability and pricing.`,
  )
}

/** Generic "I want to book" message used by hero / CTAs. */
export function buildBookingWhatsAppUrl(): string {
  return buildWhatsAppUrl(
    `Hi ${business.shortName}! I'd like to rent a two-wheeler in Mangaluru. Can you help me pick a ride?`,
  )
}

export interface ContactDetails {
  name: string
  phone: string
  email?: string
  vehicle?: string
  message?: string
}

/** Compose a WhatsApp message from the contact form fields. */
export function buildContactWhatsAppUrl(details: ContactDetails): string {
  const lines = [
    `Hi ${business.shortName}, I'd like to enquire about a rental.`,
    '',
    `Name: ${details.name}`,
    `Phone: ${details.phone}`,
  ]
  if (details.email) lines.push(`Email: ${details.email}`)
  if (details.vehicle) lines.push(`Vehicle: ${details.vehicle}`)
  if (details.message) lines.push('', `Message: ${details.message}`)
  return buildWhatsAppUrl(lines.join('\n'))
}

export const telLink = `tel:${business.phone}`
export const mailLink = `mailto:${business.email}`
