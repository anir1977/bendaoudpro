'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    image: '/slide1.jpg',
    label: 'Bagues en Or 18 Carats',
    title: "L'Art de la\nBijouterie Fine",
    subtitle: "Bagues solitaires et alliances en or 18 carats, pour les moments qui comptent.",
    cta: { label: 'Voir les Bagues', href: '/bijoux/bague' },
  },
  {
    id: 2,
    image: '/slide3.jpg',
    label: 'Bracelets Or 18 Carats',
    title: "Élégance\n& Raffinement",
    subtitle: "Bracelets joncs en or jaune, blanc et rosé — pour sublimer chaque poignet.",
    cta: { label: 'Voir les Bracelets', href: '/bijoux/bracelet' },
  },
  {
    id: 3,
    image: '/slide5.jpg',
    label: "Boucles d'Oreilles",
    title: "Finesse\n& Prestige",
    subtitle: "Boucles d'oreilles arabesques en or 18 carats, alliant tradition et élégance.",
    cta: { label: "Voir les Boucles", href: '/bijoux/boucle-doreille' },
  },
  {
    id: 4,
    image: '/slide4.jpg',
    label: 'Tachfine Center — Casablanca',
    title: "50 ans\nd'Excellence",
    subtitle: "Bijouterie Ben Daoud, une référence incontournable de la haute joaillerie au Maroc.",
    cta: { label: 'Notre Histoire', href: '/a-propos' },
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((index: number) => {
    if (animating) return
    setAnimating(true)
    setCurrent(index)
    setTimeout(() => setAnimating(false), 900)
  }, [animating])

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length)
  }, [current, goTo])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative w-full overflow-hidden bg-neutral-900" style={{ height: '88vh', minHeight: '560px' }}>
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          {/* Image with Ken Burns */}
          <div
            className="absolute inset-0"
            style={{
              animation: i === current ? 'kenburns 8s ease-out forwards' : 'none',
            }}
          >
            <Image
              src={slide.image}
              alt={slide.label}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Text content */}
          <div className="relative h-full flex items-center z-10">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
              <div
                className="max-w-2xl"
                style={{
                  opacity: i === current ? 1 : 0,
                  transform: i === current ? 'translateY(0)' : 'translateY(24px)',
                  transition: 'opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s',
                }}
              >
                <p className="text-gold-400 tracking-[0.4em] uppercase text-xs mb-5 font-light">
                  {slide.label}
                </p>
                <h1 className="font-serif text-white mb-6 leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                  {slide.title.split('\n').map((line, j) => (
                    <span key={j} className="block">
                      {j === 1 ? <span className="text-gold-400">{line}</span> : line}
                    </span>
                  ))}
                </h1>
                <p className="text-neutral-300 text-base md:text-lg leading-relaxed mb-10 max-w-lg font-light">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href={slide.cta.href} className="btn-gold text-sm">
                    {slide.cta.label}
                  </Link>
                  <Link href="/contact" className="border border-white/60 text-white px-6 py-3 text-sm font-semibold tracking-wide uppercase hover:bg-white/10 transition-colors">
                    Nous Contacter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center border border-white/30 text-white/80 hover:bg-white/15 hover:border-white/60 transition-all"
        aria-label="Précédent"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center border border-white/30 text-white/80 hover:bg-white/15 hover:border-white/60 transition-all"
        aria-label="Suivant"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-300"
            aria-label={`Slide ${i + 1}`}
          >
            <span
              className="block transition-all duration-300"
              style={{
                width: i === current ? '28px' : '8px',
                height: '3px',
                backgroundColor: i === current ? '#C8A951' : 'rgba(255,255,255,0.4)',
              }}
            />
          </button>
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-8 right-8 z-20 text-white/50 text-xs tracking-widest hidden md:block">
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>

      {/* Ken Burns keyframe */}
      <style>{`
        @keyframes kenburns {
          0%   { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
      `}</style>
    </section>
  )
}
