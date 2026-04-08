import type { Metadata } from 'next'
import Image from 'next/image'
import { Phone, MapPin, Clock, Mail, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Site en maintenance — Ben Daoud Bijouterie',
  description: 'Notre site est temporairement en maintenance. Retrouvez-nous au Tachfine Center, Casablanca.',
}

const WHATSAPP_NUMBER = '212661180440'

export default function MaintenancePage() {
  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Background photo */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/slide1.jpg"
          alt="Ben Daoud Bijouterie"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top logo bar */}
        <header className="py-8 flex justify-center">
          <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-gold-500 ring-offset-2 ring-offset-black/40 shadow-2xl">
            <Image
              src="/logo.jpg"
              alt="Ben Daoud Haute Joaillerie"
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-2xl w-full text-center">
            {/* Title */}
            <p className="text-gold-400 tracking-[0.5em] uppercase text-xs mb-6">Ben Daoud Haute Joaillerie</p>
            <div className="w-16 h-px bg-gold-500 mx-auto mb-8" />

            <h1 className="font-serif text-4xl sm:text-5xl text-white mb-4 leading-tight">
              Site en cours de<br />maintenance
            </h1>
            <p className="text-neutral-300 text-lg mb-2">
              Nous revenons très bientôt.
            </p>
            <p className="text-neutral-400 text-sm mb-10">
              Notre équipe travaille à l&apos;amélioration de votre expérience.
            </p>

            <div className="w-16 h-px bg-gold-500/40 mx-auto mb-10" />

            {/* Info cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8 text-left">
              {/* Address */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={15} className="text-gold-400" />
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-semibold mb-1.5">Notre boutique</h3>
                    <p className="text-neutral-300 text-xs leading-relaxed">
                      Rez de chaussée, Tachfine Center<br />
                      Marjane, Bd Ibn Tachfine<br />
                      Casablanca, Maroc
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Clock size={15} className="text-gold-400" />
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-semibold mb-1.5">Horaires d&apos;ouverture</h3>
                    <p className="text-neutral-300 text-xs leading-relaxed">
                      Lun – Jeu &amp; Dim : 10h00 – 21h00<br />
                      Vendredi &amp; Samedi : 10h00 – 21h30
                    </p>
                    <p className="text-gold-400 text-xs mt-1.5">
                      ⚠ Vendredi : fermeture Jumu&apos;ah
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Phone size={15} className="text-gold-400" />
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-semibold mb-1.5">Téléphone</h3>
                    <div className="space-y-1">
                      <p className="text-xs text-neutral-400">
                        Tél :{' '}
                        <a href="tel:0522621818" className="text-neutral-200 hover:text-gold-400 transition-colors">
                          0522 62 18 18
                        </a>
                      </p>
                      <p className="text-xs text-neutral-400">
                        Mobile :{' '}
                        <a href="tel:0661180440" className="text-neutral-200 hover:text-gold-400 transition-colors">
                          0661 18 04 40
                        </a>
                      </p>
                      <p className="text-xs text-neutral-400">
                        Fax : <span className="text-neutral-200">0522 61 45 48</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Mail size={15} className="text-gold-400" />
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-semibold mb-1.5">Email</h3>
                    <a
                      href="mailto:contact@bendaoud.ma"
                      className="text-neutral-300 text-xs hover:text-gold-400 transition-colors"
                    >
                      contact@bendaoud.ma
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour, je souhaite avoir des informations sur vos produits.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-400 text-white px-7 py-3.5 text-sm font-semibold transition-colors rounded-sm"
            >
              <MessageCircle size={18} />
              Nous contacter sur WhatsApp
            </a>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-6 text-center">
          <p className="text-neutral-500 text-xs tracking-widest uppercase">
            Ben Daoud Bijouterie &nbsp;·&nbsp; Tachfine Center, Casablanca
          </p>
        </footer>
      </div>
    </div>
  )
}
