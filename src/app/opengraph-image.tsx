import { ImageResponse } from 'next/og'
import { business } from '@/data/business'

export const alt = `${business.name} — Scooty & Bike Rentals in Mangaluru`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background:
            'radial-gradient(120% 120% at 15% 0%, #e3a73f 0%, #b5532a 50%, #3a2a1b 100%)',
          color: '#fbf5ea',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 30,
            letterSpacing: 8,
            textTransform: 'uppercase',
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              border: '4px solid #fbf5ea',
            }}
          />
          Planet Safari
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.02 }}>
            Ride the Mangaluru
          </div>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.02 }}>
            coast &amp; the Ghats
          </div>
          <div style={{ marginTop: 28, fontSize: 34, color: '#f3e7d3' }}>
            Scooty &amp; bike rentals · Book on WhatsApp
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 26,
            color: '#f3e7d3',
          }}
        >
          <span>Hampankatta, Mangaluru</span>
          <span>{business.phone}</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
