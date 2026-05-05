import { BijouCard } from '@/components/ProductCard'
import { categoryLabels } from '@/data/products'
import { getBijouxLive } from '@/lib/store-live'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Bijoux en Or 18 Carats — Ben Daoud Bijouterie',
  description: 'Découvrez notre collection complète de bijoux en or 18 carats : colliers, bagues, bracelets, alliances, gourmettes, parures et plus encore.',
}

const categories = [
  'collier', 'bague', 'bracelet', 'bague-mariage',
  'gourmette', 'boucle-doreille', 'parure', 'sautoire', 'broche',
] as const

export default async function BijouxPage() {
  const bijoux = await getBijouxLive()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-gold-600 tracking-[0.3em] uppercase text-xs mb-3">Collection</p>
        <h1 className="section-title">Nos Bijoux en Or 18 Carats</h1>
        <div className="section-divider" />
        <p className="text-neutral-500 max-w-xl mx-auto text-sm">
          Une sélection raffinée de bijoux artisanaux en or 18 carats, pour chaque moment de votre vie.
        </p>
      </div>

      {/* Categories filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        <Link
          href="/bijoux"
          className="px-4 py-2 text-xs tracking-widest uppercase border border-gold-600 bg-gold-600 text-white font-medium"
        >
          Tous
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/bijoux/${cat}`}
            className="px-4 py-2 text-xs tracking-widest uppercase border border-neutral-300 text-neutral-600 hover:border-gold-600 hover:text-gold-600 transition-colors font-medium"
          >
            {categoryLabels[cat]}
          </Link>
        ))}
      </div>

      {/* Grid */}
      {bijoux.length === 0 ? (
        <div className="text-center py-20 text-neutral-400">
          <p className="text-lg">Aucun bijou disponible pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {bijoux.map((item) => (
            <BijouCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
