import { notFound } from 'next/navigation'
import { BijouCard } from '@/components/ProductCard'
import { categoryLabels, Category } from '@/data/products'
import { getBijouxLive } from '@/lib/store-live'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 60
export const dynamicParams = true

interface Props {
  params: { category: string }
}

const validCategories: Category[] = [
  'collier', 'bague', 'bracelet', 'bague-mariage',
  'gourmette', 'boucle-doreille', 'parure', 'sautoire', 'broche',
]

export function generateStaticParams() {
  return validCategories.map((category) => ({ category }))
}

export function generateMetadata({ params }: Props): Metadata {
  const cat = params.category as Category
  if (!validCategories.includes(cat)) return {}
  return {
    title: `${categoryLabels[cat]} en Or 18 Carats — Ben Daoud Bijouterie`,
    description: `Découvrez notre collection de ${categoryLabels[cat].toLowerCase()} en or 18 carats chez Ben Daoud Bijouterie, Casablanca.`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const cat = params.category as Category
  if (!validCategories.includes(cat)) notFound()

  const allBijoux = await getBijouxLive()
  const items = allBijoux.filter((b) => b.category === cat)
  const label = categoryLabels[cat]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <nav className="text-xs text-neutral-400 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-gold-600">Accueil</Link>
        <span>/</span>
        <Link href="/bijoux" className="hover:text-gold-600">Bijoux</Link>
        <span>/</span>
        <span className="text-neutral-700">{label}</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-gold-600 tracking-[0.3em] uppercase text-xs mb-3">Or 18 Carats</p>
        <h1 className="section-title">{label}</h1>
        <div className="section-divider" />
        <p className="text-neutral-500 text-sm">{items.length} article{items.length > 1 ? 's' : ''} disponible{items.length > 1 ? 's' : ''}</p>
      </div>

      {/* Categories nav */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        <Link href="/bijoux" className="px-4 py-2 text-xs tracking-widest uppercase border border-neutral-300 text-neutral-600 hover:border-gold-600 hover:text-gold-600 transition-colors font-medium">
          Tous les Bijoux
        </Link>
        {validCategories.map((c) => (
          <Link
            key={c}
            href={`/bijoux/${c}`}
            className={`px-4 py-2 text-xs tracking-widest uppercase border font-medium transition-colors ${
              c === cat
                ? 'border-gold-600 bg-gold-600 text-white'
                : 'border-neutral-300 text-neutral-600 hover:border-gold-600 hover:text-gold-600'
            }`}
          >
            {categoryLabels[c]}
          </Link>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 text-neutral-400">
          <p className="text-lg">Aucun article dans cette catégorie pour le moment.</p>
          <Link href="/bijoux" className="btn-outline-gold mt-6 inline-block">Voir tous les bijoux</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {items.map((item) => (
            <BijouCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
