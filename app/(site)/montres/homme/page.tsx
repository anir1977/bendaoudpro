import { MontreCard } from '@/components/ProductCard'
import { montres } from '@/data/products'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Montres Homme — Ben Daoud Bijouterie Casablanca',
  description: 'Collection de montres homme Guess, Festina, Daniel Cline, Guess Collection, Tommy Hilfiger chez Ben Daoud Bijouterie à Casablanca.',
}

export default function MontreHommePage() {
  const items = montres.filter((m) => m.gender === 'homme')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <nav className="text-xs text-neutral-400 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-gold-600">Accueil</Link>
        <span>/</span>
        <Link href="/montres" className="hover:text-gold-600">Montres</Link>
        <span>/</span>
        <span className="text-neutral-700">Homme</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-gold-600 tracking-[0.3em] uppercase text-xs mb-3">Collection</p>
        <h1 className="section-title">Montres Homme</h1>
        <div className="section-divider" />
      </div>

      <div className="flex gap-3 justify-center mb-10">
        <Link href="/montres/femme" className="px-5 py-2 text-xs tracking-widest uppercase font-medium border border-neutral-300 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 transition-colors">
          Femme
        </Link>
        <Link href="/montres/homme" className="px-5 py-2 text-xs tracking-widest uppercase font-medium bg-neutral-900 text-white border border-neutral-900">
          Homme
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
        {items.map((item) => (
          <MontreCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
