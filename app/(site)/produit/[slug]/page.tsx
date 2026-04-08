import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { bijoux, montres, categoryLabels, brandLabels } from '@/data/products'
import WhatsAppButton from '@/components/WhatsAppButton'
import { Phone, MapPin, MessageCircle } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

function getProduct(slug: string) {
  if (slug.startsWith('bijou-')) {
    const id = slug.replace('bijou-', '')
    const item = bijoux.find((b) => b.id === id)
    if (item) return { type: 'bijou' as const, item }
  }
  if (slug.startsWith('montre-')) {
    const id = slug.replace('montre-', '')
    const item = montres.find((m) => m.id === id)
    if (item) return { type: 'montre' as const, item }
  }
  return null
}

export function generateStaticParams() {
  return [
    ...bijoux.map((b) => ({ slug: `bijou-${b.id}` })),
    ...montres.map((m) => ({ slug: `montre-${m.id}` })),
  ]
}

export function generateMetadata({ params }: Props): Metadata {
  const result = getProduct(params.slug)
  if (!result) return {}
  return {
    title: `${result.item.name} — Ben Daoud Bijouterie`,
    description: result.item.description,
  }
}

const WHATSAPP_NUMBER = '212661180440'

export default function ProductPage({ params }: Props) {
  const result = getProduct(params.slug)
  if (!result) notFound()

  const { type, item } = result
  const isBijou = type === 'bijou'

  const category = isBijou
    ? categoryLabels[(item as typeof bijoux[0]).category]
    : `Montre ${(item as typeof montres[0]).gender}`

  const subtitle = isBijou
    ? (item as typeof bijoux[0]).material
    : brandLabels[(item as typeof montres[0]).brand]

  const backHref = isBijou
    ? `/bijoux/${(item as typeof bijoux[0]).category}`
    : `/montres/${(item as typeof montres[0]).gender}`

  const whatsappMsg = `Bonjour, je souhaite avoir des informations sur le produit : ${item.name}.`

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <nav className="text-xs text-neutral-400 mb-10 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-gold-600">Accueil</Link>
        <span>/</span>
        <Link href={isBijou ? '/bijoux' : '/montres'} className="hover:text-gold-600">
          {isBijou ? 'Bijoux' : 'Montres'}
        </Link>
        <span>/</span>
        <Link href={backHref} className="hover:text-gold-600">{category}</Link>
        <span>/</span>
        <span className="text-neutral-700">{item.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        {/* Image */}
        <div className="relative aspect-square bg-neutral-50">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <p className="text-gold-600 tracking-[0.3em] uppercase text-xs mb-2">{subtitle}</p>
          <h1 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-4">{item.name}</h1>
          <div className="w-12 h-0.5 bg-gold-500 mb-6" />
          <p className="text-neutral-600 leading-relaxed mb-8">{item.description}</p>

          {/* Price info */}
          <div className="bg-neutral-50 border border-neutral-200 p-6 mb-8">
            <p className="font-serif text-lg text-neutral-800 mb-2">Prix sur demande</p>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Pour connaître le prix de cet article, contactez-nous sur WhatsApp ou rendez-vous directement en boutique au Tachfine Center, Casablanca.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3.5 font-semibold hover:bg-green-600 transition-colors text-sm"
            >
              <MessageCircle size={18} />
              Demander le prix sur WhatsApp
            </a>
            <Link href="/contact" className="btn-outline-gold text-center text-sm">
              Voir nos coordonnées
            </Link>
          </div>

          {/* Store info */}
          <div className="border-t border-neutral-200 pt-6 space-y-3">
            <div className="flex items-start gap-3 text-sm">
              <MapPin size={16} className="text-gold-500 shrink-0 mt-0.5" />
              <span className="text-neutral-500">Rez de chaussée Tachfine Center, Marjane, Bd Ibn Tachfine — Casablanca</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone size={16} className="text-gold-500 shrink-0" />
              <span className="text-neutral-500">0522 62 18 18 · 0661 18 04 40</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
