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

export function BijouCard({ item }: BijouCardProps) {
  return (
    <Link href={`/produit/bijou-${item.id}`} className="group block">
      <div className="overflow-hidden bg-neutral-50 aspect-square relative">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
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
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
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
