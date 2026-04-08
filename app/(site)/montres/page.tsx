'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { MontreCard } from '@/components/ProductCard'
import { montres, brandLabels, WatchBrand, WatchGender } from '@/data/products'
import Link from 'next/link'

function MontresContent() {
  const searchParams = useSearchParams()
  const brandParam = searchParams.get('brand') as WatchBrand | null
  const [gender, setGender] = useState<WatchGender | 'all'>('all')
  const [brand, setBrand] = useState<WatchBrand | 'all'>(brandParam ?? 'all')

  const filtered = montres.filter((m) => {
    const genderMatch = gender === 'all' || m.gender === gender
    const brandMatch = brand === 'all' || m.brand === brand
    return genderMatch && brandMatch
  })

  const brands: WatchBrand[] = ['guess', 'festina', 'daniel-cline', 'guess-collection', 'tommy']

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <p className="text-gold-600 tracking-[0.3em] uppercase text-xs mb-3">Collection</p>
        <h1 className="section-title">Nos Montres</h1>
        <div className="section-divider" />
        <p className="text-neutral-500 max-w-xl mx-auto text-sm">
          Montres femme et homme des plus grandes marques : Guess, Festina, Daniel Cline, Guess Collection, Tommy Hilfiger.
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-4 mb-12">
        {/* Gender */}
        <div className="flex flex-wrap gap-2 justify-center">
          {(['all', 'femme', 'homme'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`px-5 py-2 text-xs tracking-widest uppercase font-medium border transition-colors ${
                gender === g
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'border-neutral-300 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900'
              }`}
            >
              {g === 'all' ? 'Femme & Homme' : g === 'femme' ? 'Femme' : 'Homme'}
            </button>
          ))}
        </div>

        {/* Brand */}
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setBrand('all')}
            className={`px-4 py-2 text-xs tracking-widest uppercase font-medium border transition-colors ${
              brand === 'all'
                ? 'bg-gold-600 text-white border-gold-600'
                : 'border-neutral-300 text-neutral-600 hover:border-gold-600 hover:text-gold-600'
            }`}
          >
            Toutes les marques
          </button>
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setBrand(b)}
              className={`px-4 py-2 text-xs tracking-widest uppercase font-medium border transition-colors ${
                brand === b
                  ? 'bg-gold-600 text-white border-gold-600'
                  : 'border-neutral-300 text-neutral-600 hover:border-gold-600 hover:text-gold-600'
              }`}
            >
              {brandLabels[b]}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-neutral-400 text-center mb-8">
        {filtered.length} montre{filtered.length > 1 ? 's' : ''} trouvée{filtered.length > 1 ? 's' : ''}
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-neutral-400">
          <p>Aucune montre trouvée pour ces critères.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {filtered.map((item) => (
            <MontreCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function MontresPage() {
  return (
    <Suspense>
      <MontresContent />
    </Suspense>
  )
}
