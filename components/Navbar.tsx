'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'

const bijouxCategories = [
  { label: 'Colliers', href: '/bijoux/collier' },
  { label: 'Bagues', href: '/bijoux/bague' },
  { label: 'Bracelets', href: '/bijoux/bracelet' },
  { label: 'Bagues de Mariage', href: '/bijoux/bague-mariage' },
  { label: 'Gourmettes', href: '/bijoux/gourmette' },
  { label: "Boucles d'Oreilles", href: '/bijoux/boucle-doreille' },
  { label: 'Parures', href: '/bijoux/parure' },
  { label: 'Sautoires', href: '/bijoux/sautoire' },
  { label: 'Broches', href: '/bijoux/broche' },
]

const montresCategories = [
  { label: 'Montres Femme', href: '/montres/femme' },
  { label: 'Montres Homme', href: '/montres/homme' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [bijouxOpen, setBijouxOpen] = useState(false)
  const [montresOpen, setMontresOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      {/* Top contact bar */}
      <div className="bg-neutral-900 py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-6">
          <a href="tel:0522621818" className="flex items-center gap-1.5 text-gold-400 text-xs tracking-widest hover:text-gold-300 transition-colors">
            <Phone size={11} /> 0522 62 18 18
          </a>
          <span className="text-neutral-600 text-xs">|</span>
          <span className="text-neutral-400 text-xs tracking-widest">TACHFINE CENTER — CASABLANCA</span>
          <span className="text-neutral-600 text-xs">|</span>
          <a href="tel:0661180440" className="flex items-center gap-1.5 text-gold-400 text-xs tracking-widest hover:text-gold-300 transition-colors">
            <Phone size={11} /> 0661 18 04 40
          </a>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-gold-600 ring-offset-2 ring-offset-white shadow-md">
              <Image
                src="/logo.jpg"
                alt="Ben Daoud Haute Joaillerie"
                fill
                className="object-cover"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium tracking-widest uppercase text-neutral-700 hover:text-gold-600 transition-colors">
              Accueil
            </Link>

            {/* Bijoux dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-1 text-sm font-medium tracking-widest uppercase text-neutral-700 hover:text-gold-600 transition-colors"
                onMouseEnter={() => setBijouxOpen(true)}
                onMouseLeave={() => setBijouxOpen(false)}
              >
                Bijoux <ChevronDown size={14} />
              </button>
              {bijouxOpen && (
                <div
                  className="absolute top-full left-0 bg-white border border-gray-100 w-56 z-50 shadow-xl rounded-b-lg overflow-hidden"
                  onMouseEnter={() => setBijouxOpen(true)}
                  onMouseLeave={() => setBijouxOpen(false)}
                >
                  <Link href="/bijoux" className="block px-5 py-3 text-sm text-gold-600 font-semibold border-b border-gray-100 hover:bg-gold-50">
                    Tous les Bijoux
                  </Link>
                  {bijouxCategories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className="block px-5 py-2.5 text-sm text-neutral-600 hover:bg-gold-50 hover:text-gold-700 transition-colors"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Montres dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-1 text-sm font-medium tracking-widests uppercase text-neutral-700 hover:text-gold-600 transition-colors"
                onMouseEnter={() => setMontresOpen(true)}
                onMouseLeave={() => setMontresOpen(false)}
              >
                Montres <ChevronDown size={14} />
              </button>
              {montresOpen && (
                <div
                  className="absolute top-full left-0 bg-white border border-gray-100 w-48 z-50 shadow-xl rounded-b-lg overflow-hidden"
                  onMouseEnter={() => setMontresOpen(true)}
                  onMouseLeave={() => setMontresOpen(false)}
                >
                  <Link href="/montres" className="block px-5 py-3 text-sm text-gold-600 font-semibold border-b border-gray-100 hover:bg-gold-50">
                    Toutes les Montres
                  </Link>
                  {montresCategories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className="block px-5 py-2.5 text-sm text-neutral-600 hover:bg-gold-50 hover:text-gold-700 transition-colors"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/a-propos" className="text-sm font-medium tracking-widests uppercase text-neutral-700 hover:text-gold-600 transition-colors">
              À Propos
            </Link>
            <Link href="/contact" className="text-sm font-medium tracking-widests uppercase text-neutral-700 hover:text-gold-600 transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-neutral-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 space-y-1">
            <Link href="/" className="block px-4 py-2.5 text-sm font-medium tracking-widests uppercase text-neutral-700" onClick={() => setMobileOpen(false)}>
              Accueil
            </Link>
            <div>
              <button
                className="w-full text-left px-4 py-2.5 text-sm font-medium tracking-widests uppercase text-neutral-700 flex items-center justify-between"
                onClick={() => setBijouxOpen(!bijouxOpen)}
              >
                Bijoux <ChevronDown size={14} className={bijouxOpen ? 'rotate-180' : ''} />
              </button>
              {bijouxOpen && (
                <div className="pl-8 space-y-1 bg-gray-50">
                  <Link href="/bijoux" className="block py-2 text-sm text-gold-600 font-semibold px-4" onClick={() => setMobileOpen(false)}>Tous les Bijoux</Link>
                  {bijouxCategories.map((cat) => (
                    <Link key={cat.href} href={cat.href} className="block py-2 text-sm text-neutral-600 px-4" onClick={() => setMobileOpen(false)}>
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div>
              <button
                className="w-full text-left px-4 py-2.5 text-sm font-medium tracking-widests uppercase text-neutral-700 flex items-center justify-between"
                onClick={() => setMontresOpen(!montresOpen)}
              >
                Montres <ChevronDown size={14} className={montresOpen ? 'rotate-180' : ''} />
              </button>
              {montresOpen && (
                <div className="pl-8 space-y-1 bg-gray-50">
                  <Link href="/montres" className="block py-2 text-sm text-gold-600 font-semibold px-4" onClick={() => setMobileOpen(false)}>Toutes les Montres</Link>
                  {montresCategories.map((cat) => (
                    <Link key={cat.href} href={cat.href} className="block py-2 text-sm text-neutral-600 px-4" onClick={() => setMobileOpen(false)}>
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/a-propos" className="block px-4 py-2.5 text-sm font-medium tracking-widests uppercase text-neutral-700" onClick={() => setMobileOpen(false)}>
              À Propos
            </Link>
            <Link href="/contact" className="block px-4 py-2.5 text-sm font-medium tracking-widests uppercase text-neutral-700" onClick={() => setMobileOpen(false)}>
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
