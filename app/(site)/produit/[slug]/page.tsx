import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { categoryLabels, brandLabels } from '@/data/products'
import { getBijouxLive, getMontresLive } from '@/lib/store-live'
import WhatsAppButton from '@/components/WhatsAppButton'
import { Phone, MapPin, MessageCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 60
export const dynamicParams = true

interface Props {
  params: { slug: string }
}

async function getProduct(slug: string) {
  if (slug.startsWith('bijou-')) {
    const id = slug.replace('bijou-', '')
    const bijoux = await getBijouxLive()
    const item = bijoux.find((b) => b.id === id)
    if (item) return { type: 'bijou' as const, item }
  }
  if (slug.startsWith('montre-')) {
    const id = slug.replace('montre-', '')
    const montres = await getMontresLive()
    const item = montres.find((m) => m.id === id)
    if (item) return { type: 'montre' as const, item }
  }
  return null
}

export async function generateStaticParams() {
  const [bijoux, montres] = await Promise.all([getBijouxLive(), getMontresLive()])
  return [
    ...bijoux.map((b) => ({ slug: `bijou-${b.id}` })),
    ...montres.map((m) => ({ slug: `montre-${m.id}` })),
  ]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await getProduct(params.slug)
  if (!result) return {}
  return {
    title: `${result.item.name} — Ben Daoud Bijouterie`,
    description: result.item.description,
  }
}

const WHATSAPP_NUMBER = '212661180440'

export default async function ProductPage({ params }: Props) {
  const result = await getProduct(params.slug)
  if (!result) notFound()

  const { type, item } = result
  const isBijou = type === 'bijou'

  const category = isBijou
    ? categoryLabels[(item as { category: string }).category as keyof typeof categoryLabels] ?? (item as { category: string }).category
    : `Montre ${(item as { gender: string }).gender}`

  const subtitle = isBijou
    ? (item as { material: string }).material
    : brandLabels[(item as { brand: string }).brand as keyof typeof brandLabels] ?? (item as { brand: string }).brand

  const backHref = isBijou
    ? `/bijoux/${(item as { category: string }).category}`
    : `/montres/${(item as { gender: string }).gender}`

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
        <div className="relative aspect-square bg-neutral-50 overflow-hidden">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-100">
              <svg className="w-20 h-20 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
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
