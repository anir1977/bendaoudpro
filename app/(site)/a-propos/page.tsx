import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Award, Users, MapPin, Star } from 'lucide-react'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: 'À Propos — Ben Daoud Bijouterie Casablanca',
  description: "Découvrez l'histoire de la Bijouterie Ben Daoud, plus de 50 ans d'expertise dans la bijouterie fine en or 18 carats à Casablanca, Maroc.",
}

export default function AProposPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-neutral-900 text-white py-24 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mb-6" />
          <p className="text-neutral-300 text-lg leading-relaxed">
            Plus de 50 ans d'excellence au service de l'élégance marocaine.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <p className="text-gold-600 tracking-[0.3em] uppercase text-xs mb-4">Qui Sommes-Nous</p>
              <h2 className="font-serif text-3xl text-neutral-800 mb-6">Un Héritage de Passion et d'Excellence</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                La Bijouterie Ben Daoud est une institution dans le monde de la bijouterie marocaine. Fondée il y a plus de 50 ans, notre maison s'est imposée comme une référence incontournable grâce à la qualité irréprochable de ses créations en or 18 carats.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-4">
                Connue et reconnue dans tout le Maroc et au-delà de ses frontières, la Bijouterie Ben Daoud perpétue un savoir-faire artisanal exceptionnel, alliant les traditions ancestrales de la bijouterie marocaine aux tendances les plus contemporaines.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Notre engagement envers nos clients est simple : vous offrir ce qu'il y a de plus beau, de plus authentique, avec un service personnalisé et attentionné.
              </p>
            </div>
            <div className="bg-neutral-50 p-8 border-l-4 border-gold-500">
              <p className="font-serif text-4xl text-gold-600 mb-2">+50</p>
              <p className="text-sm tracking-widest uppercase text-neutral-500 mb-6">Ans d'Expérience</p>
              <p className="font-serif text-4xl text-gold-600 mb-2">18K</p>
              <p className="text-sm tracking-widest uppercase text-neutral-500 mb-6">Or Garanti</p>
              <p className="font-serif text-4xl text-gold-600 mb-2">Maroc</p>
              <p className="text-sm tracking-widest uppercase text-neutral-500">& International</p>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              {
                Icon: Award,
                title: 'Qualité',
                desc: 'Tous nos bijoux sont en or 18 carats, garantissant une durabilité et un éclat incomparables.',
              },
              {
                Icon: Star,
                title: 'Excellence',
                desc: 'Un savoir-faire artisanal transmis de génération en génération.',
              },
              {
                Icon: Users,
                title: 'Service',
                desc: 'Une équipe de conseillers passionnés à votre service pour chaque occasion.',
              },
              {
                Icon: MapPin,
                title: 'Présence',
                desc: 'Au cœur de Casablanca, au Tachfine Center, facilement accessible.',
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="text-center p-6 border border-neutral-100">
                <div className="w-12 h-12 bg-gold-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={20} className="text-gold-600" />
                </div>
                <h3 className="font-semibold text-sm tracking-wide mb-2">{title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Collections */}
          <div className="bg-neutral-900 text-white p-10 text-center">
            <h2 className="font-serif text-3xl mb-4">Nos Collections</h2>
            <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-6" />
            <p className="text-neutral-300 leading-relaxed mb-8 max-w-2xl mx-auto">
              Bijoux en or 18 carats — colliers, bagues, bracelets, alliances, gourmettes, boucles d'oreilles, parures, sautoires et broches — ainsi qu'une sélection de montres de prestige pour femme et homme des marques Guess, Festina, Daniel Cline, Guess Collection et Tommy Hilfiger.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/bijoux" className="btn-gold">Voir nos Bijoux</Link>
              <Link href="/montres" className="border border-white text-white px-6 py-3 text-sm font-semibold tracking-wide uppercase hover:bg-white hover:text-neutral-900 transition-colors">
                Voir nos Montres
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gold-600 py-14 text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-serif text-2xl mb-3">Venez nous rendre visite</h2>
          <p className="text-gold-100 text-sm mb-6">
            Notre équipe est à votre disposition au Tachfine Center, Casablanca, pour vous accueillir et vous conseiller.
          </p>
          <WhatsAppButton
            variant="inline"
            label="Nous contacter sur WhatsApp"
            message="Bonjour, je souhaite avoir des informations sur la bijouterie Ben Daoud."
          />
        </div>
      </section>
    </>
  )
}
