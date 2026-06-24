import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { buildBookingWhatsAppUrl } from '@/lib/whatsapp'

/** Fixed bottom-right WhatsApp button with a pulsing ring. */
export default function FloatingWhatsApp() {
  return (
    <a
      href={buildBookingWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="pulse-ring fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-wa text-[#06351b] shadow-lg transition-transform hover:scale-110 md:bottom-6"
    >
      <WhatsAppIcon size={28} />
    </a>
  )
}
