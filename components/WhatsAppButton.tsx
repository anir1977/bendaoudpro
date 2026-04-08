import { MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '212661180440'

interface WhatsAppButtonProps {
  message?: string
  className?: string
  variant?: 'floating' | 'inline'
  label?: string
}

export default function WhatsAppButton({
  message = 'Bonjour, je souhaite avoir des informations sur vos bijoux.',
  className = '',
  variant = 'floating',
  label = 'Contactez-nous sur WhatsApp',
}: WhatsAppButtonProps) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  if (variant === 'inline') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 font-semibold hover:bg-green-600 transition-colors ${className}`}
      >
        <MessageCircle size={18} />
        {label}
      </a>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110"
      aria-label="Contacter sur WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  )
}
