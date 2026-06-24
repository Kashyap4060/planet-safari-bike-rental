import { Phone } from 'lucide-react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { buildBookingWhatsAppUrl, telLink } from '@/lib/whatsapp'

/** Sticky bottom action bar — mobile only. */
export default function MobileBookingBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-bark bg-paper/95 p-2.5 backdrop-blur-md md:hidden">
      <a
        href={telLink}
        className="btn btn-ghost py-2.5 text-sm"
        aria-label="Call us now"
      >
        <Phone size={17} />
        Call Now
      </a>
      <a
        href={buildBookingWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-wa py-2.5 text-sm"
      >
        <WhatsAppIcon size={17} />
        WhatsApp
      </a>
    </div>
  )
}
