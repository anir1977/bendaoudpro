import Image from 'next/image'
import Link from 'next/link'
import { Bijou, Montre } from '@/data/products'
import BrandLogo from '@/components/BrandLogo'

interface BijouCardProps {
  item: Bijou
}

interface MontreCardProps {
  item: Montre
}

/** Redirige les URLs raw.githubusercontent.com vers notre proxy pour éviter le blocage CORS */
function getImgSrc(url: string): string {
  if (url.startsWith('https://raw.githubusercontent.com/')) {
    return `/api/img?src=${encodeURIComponent(url)}`
  }
  return url
}

function ImagePlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-100">
      <svg className="w-12 h-12 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  )
}

export function BijouCard({ item }: BijouCardProps) {
  return (
    <Link href={`/produit/bijou-${item.id}`} className="group block">
      <div className="overflow-hidden bg-neutral-50 aspect-square relative">
        {item.image ? (
          <Image
            src={getImgSrc(item.image)}
            alt={item.name}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <div className="pt-4 pb-2">
        <p className="text-xs text-gold-600 tracking-widest uppercase mb-1">{item.material}</p>
        <h3 className="font-serif text-base text-neutral-800 group-hover:text-gold-600 transition-colors leading-snug">
          {item.name}
        </h3>
        <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed line-clamp-2">{item.description}</p>
        <p className="mt-3 text-xs tracking-widest uppercase text-gold-600 font-medium">
          Demander le prix →
        </p>
      </div>
    </Link>
  )
}

export function MontreCard({ item }: MontreCardProps) {
  return (
    <Link href={`/produit/montre-${item.id}`} className="group block">
      <div className="overflow-hidden bg-neutral-50 aspect-square relative">
        {item.image ? (
          <Image
            src={getImgSrc(item.image)}
            alt={item.name}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          <ImagePlaceholder />
        )}
        {/* Brand logo badge */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1.5 shadow-sm">
          <BrandLogo brand={item.brand} size="sm" />
        </div>
      </div>
      <div className="pt-4 pb-2">
        <p className="text-xs text-neutral-400 tracking-widest uppercase mb-1">
          {item.gender === 'femme' ? 'Montre Femme' : 'Montre Homme'}
        </p>
        <h3 className="font-serif text-base text-neutral-800 group-hover:text-gold-600 transition-colors leading-snug">
          {item.name}
        </h3>
        <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed line-clamp-2">{item.description}</p>
        <p className="mt-3 text-xs tracking-widest uppercase text-gold-600 font-medium">
          Demander le prix →
        </p>
      </div>
    </Link>
  )
}
