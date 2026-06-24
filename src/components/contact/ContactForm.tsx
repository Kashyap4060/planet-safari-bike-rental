'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { buildContactWhatsAppUrl } from '@/lib/whatsapp'

interface Props {
  vehicleNames: string[]
}

const FIELD =
  'w-full rounded-xl border border-bark bg-paper px-4 py-2.5 text-clay placeholder:text-espresso/40 focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30'

export default function ContactForm({ vehicleNames }: Props) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) {
      setError('Please share your name and phone number so we can reach you.')
      return
    }
    setError(null)
    const url = buildContactWhatsAppUrl({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      vehicle: vehicle || undefined,
      message: message.trim() || undefined,
    })
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={handleSubmit} className="journal-card rounded-[var(--radius-card)] p-6 sm:p-8" noValidate>
      <h2 className="font-display text-2xl font-semibold text-clay">
        Send an enquiry
      </h2>
      <p className="mt-1 text-sm text-espresso/65">
        Fill this in and we&apos;ll open WhatsApp with your details ready to send.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium text-espresso/80">
            Name <span className="text-terracotta">*</span>
          </label>
          <input
            id="cf-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={FIELD}
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="cf-phone" className="mb-1.5 block text-sm font-medium text-espresso/80">
            Phone <span className="text-terracotta">*</span>
          </label>
          <input
            id="cf-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 ..."
            className={FIELD}
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="cf-email" className="mb-1.5 block text-sm font-medium text-espresso/80">
            Email <span className="text-espresso/40">(optional)</span>
          </label>
          <input
            id="cf-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className={FIELD}
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="cf-vehicle" className="mb-1.5 block text-sm font-medium text-espresso/80">
            Vehicle <span className="text-espresso/40">(optional)</span>
          </label>
          <select
            id="cf-vehicle"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className={FIELD}
          >
            <option value="">Not sure yet</option>
            {vehicleNames.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium text-espresso/80">
            Message <span className="text-espresso/40">(optional)</span>
          </label>
          <textarea
            id="cf-message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Dates, pickup time, anything we should know…"
            className={`${FIELD} resize-none`}
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm font-medium text-terracotta-deep">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-wa mt-6 w-full py-3">
        <WhatsAppIcon size={18} />
        Send on WhatsApp
        <Send size={16} />
      </button>
    </form>
  )
}
