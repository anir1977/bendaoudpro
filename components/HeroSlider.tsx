'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    image: '/slide1.jpg',
    label: 'Colliers & Pendentifs',
    title: "L'Art de la\nJoaillerie Fine",
    subtitle: "Colliers en or 18 carats façonnés à la main — un savoir-faire transmis depuis plus de 50 ans.",
    cta: { label: 'Voir les Colliers', href: '/bijoux/collier' },
    ken: 'kb-zoom-bl',      // zoom depuis coin bas-gauche
    textPos: 'left',
  },
  {
    id: 2,
    image: '/slide3.jpg',
    label: 'Bracelets Or 18 Carats',
    title: "Élégance\n& Raffinement",
    subtitle: "Bracelets joncs en or jaune, blanc et rosé — pour sublimer chaque instant.",
    cta: { label: 'Voir les Bracelets', href: '/bijoux/bracelet' },
    ken: 'kb-pan-right',    // pan légèrement vers la droite
    textPos: 'left',
  },
  {
    id: 3,
    image: '/slide5.jpg',
    label: 'Collections Exclusives',
    title: "Une Brillance\nSans Égale",
    subtitle: "Des pièces uniques en or rose, blanc et jaune, signées Ben Daoud — Tachfine Center, Casablanca.",
    cta: { label: 'Découvrir', href: '/bijoux' },
    ken: 'kb-zoom-tr',      // zoom depuis coin haut-droit
    textPos: 'left',
  },
  {
    id: 4,
    image: '/slide4.jpg',
    label: "Boucles d'Oreilles",
    title: "Finesse\n& Prestige",
    subtitle: "Créoles, puces et boucles pendantes en or 18 carats et diamants — l'éclat qui illumine.",
    cta: { label: "Voir les Boucles", href: '/bijoux/boucle-doreille' },
    ken: 'kb-zoom-in',      // zoom simple au centre
    textPos: 'left',
  },
]

export default function HeroSlider() {
  const [current, setCurrent]     = useState(0)
  const [prev,    setPrev]        = useState<number | null>(null)
  const [dir,     setDir]         = useState<'next' | 'prev'>('next')
  const [animKey, setAnimKey]     = useState(0)
  const [shimmer, setShimmer]     = useState(false)
  const locked                    = useRef(false)

  const goTo = useCallback((index: number, direction: 'next' | 'prev' = 'next') => {
    if (locked.current || index === current) return
    locked.current = true
    setPrev(current)
    setDir(direction)
    setCurrent(index)
    setAnimKey(k => k + 1)
    setShimmer(true)
    setTimeout(() => { setShimmer(false) }, 1200)
    setTimeout(() => { locked.current = false; setPrev(null) }, 1000)
  }, [current])

  const goPrev = useCallback(() => goTo((current - 1 + slides.length) % slides.length, 'prev'), [current, goTo])
  const goNext = useCallback(() => goTo((current + 1) % slides.length, 'next'),              [current, goTo])

  useEffect(() => {
    const t = setInterval(goNext, 6500)
    return () => clearInterval(t)
  }, [goNext])

  return (
    <section
      className="relative w-full overflow-hidden bg-neutral-950 select-none"
      style={{ height: '90vh', minHeight: '580px' }}
    >
      {/* ── Slides ────────────────────────────────────────────────── */}
      {slides.map((slide, i) => {
        const isActive = i === current
        const isLeaving = i === prev
        return (
          <div
            key={slide.id}
            className="absolute inset-0"
            style={{
              zIndex: isActive ? 2 : isLeaving ? 1 : 0,
              opacity: isActive ? 1 : isLeaving ? 1 : 0,
              transition: 'opacity 1s ease',
            }}
          >
            {/* Photo + Ken Burns */}
            <div
              key={isActive ? `active-${animKey}` : `idle-${i}`}
              className="absolute inset-0"
              style={{
                animation: isActive ? `${slide.ken} 8s ease-out forwards` : 'none',
                willChange: 'transform',
              }}
            >
              <Image
                src={slide.image}
                alt={slide.label}
                fill
                className="object-cover object-center"
                priority={i === 0}
                sizes="100vw"
              />
            </div>

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

            {/* Vignette coins */}
            <div className="absolute inset-0"
              style={{ boxShadow: 'inset 0 0 120px rgba(0,0,0,0.5)' }} />

            {/* Ligne décorative verticale gauche */}
            <div
              className="absolute left-6 md:left-14 top-1/2 -translate-y-1/2 w-px bg-gradient-to-b from-transparent via-gold-400/60 to-transparent"
              style={{
                height: '38%',
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.8s ease 0.6s',
              }}
            />

            {/* Texte */}
            <div className="relative h-full flex items-center z-10">
              <div className="max-w-7xl mx-auto px-10 md:px-16 lg:px-20 w-full">
                <div className="max-w-2xl pl-4 md:pl-6">

                  {/* Label */}
                  <div
                    style={{
                      opacity:    isActive ? 1 : 0,
                      transform:  isActive ? 'translateY(0)' : 'translateY(16px)',
                      transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
                    }}
                  >
                    <span className="inline-flex items-center gap-3 mb-6">
                      <span className="w-8 h-px bg-gold-400" />
                      <span className="text-gold-400 tracking-[0.45em] uppercase text-xs font-light">
                        {slide.label}
                      </span>
                    </span>
                  </div>

                  {/* Titre */}
                  <h1
                    className="font-serif text-white leading-none mb-6"
                    style={{
                      fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
                      opacity:    isActive ? 1 : 0,
                      transform:  isActive ? 'translateY(0)' : 'translateY(24px)',
                      transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s',
                    }}
                  >
                    {slide.title.split('\n').map((line, j) => (
                      <span key={j} className="block">
                        {j === 1
                          ? <span className="text-gold-400 italic">{line}</span>
                          : line}
                      </span>
                    ))}
                  </h1>

                  {/* Séparateur */}
                  <div
                    className="h-px bg-gradient-to-r from-gold-500/70 to-transparent mb-6"
                    style={{
                      width:      isActive ? '120px' : '0px',
                      transition: 'width 0.8s ease 0.9s',
                    }}
                  />

                  {/* Sous-titre */}
                  <p
                    className="text-neutral-300 text-base md:text-lg leading-relaxed mb-10 max-w-md font-light"
                    style={{
                      opacity:    isActive ? 1 : 0,
                      transform:  isActive ? 'translateY(0)' : 'translateY(16px)',
                      transition: 'opacity 0.8s ease 0.75s, transform 0.8s ease 0.75s',
                    }}
                  >
                    {slide.subtitle}
                  </p>

                  {/* CTA */}
                  <div
                    className="flex flex-wrap gap-4"
                    style={{
                      opacity:    isActive ? 1 : 0,
                      transform:  isActive ? 'translateY(0)' : 'translateY(12px)',
                      transition: 'opacity 0.8s ease 0.95s, transform 0.8s ease 0.95s',
                    }}
                  >
                    <Link
                      href={slide.cta.href}
                      className="inline-flex items-center gap-2 bg-gold-600 hover:bg-gold-500 text-white px-7 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
                    >
                      {slide.cta.label}
                      <ChevronRight size={14} />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center border border-white/40 text-white/90 px-7 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white/10 hover:border-white/70 transition-all"
                    >
                      Nous Contacter
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* ── Shimmer doré à la transition ──────────────────────────── */}
      {shimmer && (
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(105deg, transparent 30%, rgba(200,169,81,0.08) 50%, transparent 70%)',
            animation: 'shimmer-sweep 1.2s ease forwards',
          }}
        />
      )}

      {/* ── Coin décoratif doré (haut-droit) ─────────────────────── */}
      <div className="absolute top-8 right-8 z-10 hidden md:block">
        <div className="relative w-12 h-12">
          <div className="absolute top-0 right-0 w-full h-px bg-gold-500/40" />
          <div className="absolute top-0 right-0 w-px h-full bg-gold-500/40" />
        </div>
      </div>

      {/* ── Ben Daoud watermark ───────────────────────────────────── */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <p className="text-white/20 text-xs tracking-[0.5em] uppercase">Ben Daoud — Depuis 1975</p>
      </div>

      {/* ── Flèches ───────────────────────────────────────────────── */}
      {[
        { fn: goPrev, side: 'left-4 md:left-8',   icon: <ChevronLeft  size={20}/>, label: 'Précédent' },
        { fn: goNext, side: 'right-4 md:right-8',  icon: <ChevronRight size={20}/>, label: 'Suivant' },
      ].map(({ fn, side, icon, label }) => (
        <button
          key={label}
          onClick={fn}
          aria-label={label}
          className={`absolute ${side} top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center border border-white/25 text-white/70 hover:border-gold-400/70 hover:text-gold-400 hover:bg-black/30 transition-all duration-300`}
        >
          {icon}
        </button>
      ))}

      {/* ── Indicateurs ───────────────────────────────────────────── */}
      <div className="absolute bottom-9 left-10 md:left-20 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 'next' : 'prev')}
            aria-label={`Slide ${i + 1}`}
            className="relative flex items-center"
          >
            <span
              className="block transition-all duration-500 ease-out"
              style={{
                width:           i === current ? '36px' : '8px',
                height:          '2px',
                backgroundColor: i === current ? '#C8A951' : 'rgba(255,255,255,0.3)',
              }}
            />
          </button>
        ))}
      </div>

      {/* ── Compteur slides ───────────────────────────────────────── */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex items-center gap-2 text-white/40 text-xs tracking-[0.3em]">
        <span className="text-gold-400/80 font-light">{String(current + 1).padStart(2, '0')}</span>
        <span className="w-6 h-px bg-white/20" />
        <span>{String(slides.length).padStart(2, '0')}</span>
      </div>

      {/* ── Barre de progression ──────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 z-20">
        <div
          key={`bar-${current}`}
          className="h-full bg-gold-500/60"
          style={{ animation: 'progress-bar 6.5s linear forwards' }}
        />
      </div>

      {/* ── Keyframes ─────────────────────────────────────────────── */}
      <style>{`
        @keyframes kb-zoom-bl {
          0%   { transform: scale(1.1) translate(1%, 1%); }
          100% { transform: scale(1)   translate(0, 0); }
        }
        @keyframes kb-pan-right {
          0%   { transform: scale(1.06) translateX(-2%); }
          100% { transform: scale(1.01) translateX(0); }
        }
        @keyframes kb-zoom-tr {
          0%   { transform: scale(1.1) translate(-1%, 1%); }
          100% { transform: scale(1)   translate(0, 0); }
        }
        @keyframes kb-zoom-in {
          0%   { transform: scale(1.12); }
          100% { transform: scale(1); }
        }
        @keyframes shimmer-sweep {
          0%   { opacity: 0; transform: translateX(-100%); }
          30%  { opacity: 1; }
          100% { opacity: 0; transform: translateX(100%); }
        }
        @keyframes progress-bar {
          0%   { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </section>
  )
}
