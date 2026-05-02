import { getMontresLive } from '@/lib/store-live'
import Image from 'next/image'
import Link from 'next/link'
import BrandLogo from '@/components/BrandLogo'
import type { WatchBrand } from '@/data/products'

const brands: WatchBrand[] = ['guess', 'festina', 'daniel-cline', 'guess-collection', 'tommy']

export default async function WatchesShowcase() {
  const montres = await getMontresLive()
  const sorted = [...montres].sort((a, b) => (b.image ? 1 : 0) - (a.image ? 1 : 0))
  const featured = sorted.slice(0, 4)

  return (
    <section className="relative py-24 bg-[#080808] overflow-hidden">

      {/* Decorative large background text */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span className="font-serif font-bold text-white/[0.025] leading-none tracking-[0.3em] whitespace-nowrap"
          style={{ fontSize: 'clamp(80px, 18vw, 220px)' }}>
          MONTRES
        </span>
      </div>

      {/* Glow blob */}
      <div aria-hidden className="absolute top-0 left-0 w-[600px] h-[600px] bg-gold-600/[0.04] rounded-full blur-[120px] pointer-events-none -translate-x-1/3 -translate-y-1/4" />
      <div aria-hidden className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold-500/[0.04] rounded-full blur-[100px] pointer-events-none translate-x-1/4 translate-y-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── LEFT: Text ── */}
          <div>
            {/* Tag */}
            <div className="flex items-center gap-3 mb-7">
              <div className="w-8 h-px bg-gold-500" />
              <p className="text-gold-400 tracking-[0.4em] uppercase text-[11px] font-medium">
                Horlogerie de Prestige
              </p>
            </div>

            {/* Title */}
            <h2 className="font-serif text-white leading-[1.05] mb-8"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}>
              Nos Montres<br />
              <span className="text-gold-400 italic">de Prestige</span>
            </h2>

            {/* Gold separator */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-0.5 bg-gold-600" />
              <div className="w-1.5 h-1.5 bg-gold-600 rotate-45" />
            </div>

            {/* Description */}
            <p className="text-neutral-400 leading-relaxed mb-4 text-sm max-w-md">
              Chez Ben Daoud, nous sélectionnons pour vous les plus belles montres des grandes maisons horlogères internationales. Chaque modèle est choisi pour son excellence, son élégance et sa précision.
            </p>
            <p className="text-neutral-400 leading-relaxed mb-10 text-sm max-w-md">
              Femme ou homme, classique ou sportif — notre collection couvre chaque style et chaque occasion, avec des prix adaptés à toutes les envies.
            </p>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-4 mb-10 border-t border-b border-neutral-800/60 py-6">
              {[
                { n: '5', label: 'Grandes Marques' },
                { n: '50+', label: 'Ans d\'expertise' },
                { n: '∞', label: 'Modèles disponibles' },
              ].map(({ n, label }) => (
                <div key={label} className="text-center">
                  <p className="font-serif text-2xl text-gold-400 mb-1">{n}</p>
                  <p className="text-[10px] text-neutral-600 uppercase tracking-wider leading-tight">{label}</p>
                </div>
              ))}
            </div>

            {/* Brand logos */}
            <div className="flex flex-wrap gap-2 mb-10">
              {brands.map((brand) => (
                <Link
                  key={brand}
                  href="/montres"
                  className="bg-neutral-900 border border-neutral-800 px-3 py-2.5 flex items-center justify-center hover:border-gold-600 hover:bg-neutral-800 transition-all duration-300 group min-w-[64px] h-10"
                >
                  <BrandLogo brand={brand} size="sm" className="opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/montres"
              className="inline-flex items-center gap-3 border border-gold-600 text-gold-400 hover:bg-gold-600 hover:text-white px-8 py-4 font-medium tracking-[0.15em] uppercase text-xs transition-all duration-300 group"
            >
              Découvrir la collection
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* ── RIGHT: 2×2 Watch grid ── */}
          <div className="grid grid-cols-2 gap-2.5">
            {(featured.length > 0 ? featured : Array(4).fill(null)).map((item, i) => (
              item ? (
                <Link
                  key={item.id}
                  href={`/produit/montre-${item.id}`}
                  className="group relative aspect-square overflow-hidden bg-neutral-900 border border-neutral-800/60 hover:border-gold-700/50 transition-colors duration-500"
                >
                  {/* Index number */}
                  <span className="absolute top-3 left-3.5 z-10 font-mono text-[10px] text-neutral-700 group-hover:text-gold-600 transition-colors duration-300 select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Watch image */}
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  {/* Text on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-350">
                    <p className="text-white font-serif text-[13px] leading-snug mb-1.5">{item.name}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-px bg-gold-500" />
                      <p className="text-gold-400 text-[10px] uppercase tracking-[0.2em]">
                        Montre {item.gender}
                      </p>
                    </div>
                  </div>

                  {/* Bottom gold bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-700 via-gold-400 to-gold-700 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                </Link>
              ) : (
                <div
                  key={i}
                  className="aspect-square bg-neutral-900 border border-neutral-800/60 flex items-center justify-center"
                >
                  <svg className="w-10 h-10 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
