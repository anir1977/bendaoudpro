import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact — Ben Daoud Bijouterie Casablanca',
  description: 'Contactez la Bijouterie Ben Daoud. Tachfine Center, Casablanca. Tél : 0522 62 18 18. Email : contact@bendaoud.ma',
}

const WHATSAPP_NUMBER = '212661180440'

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-neutral-900 text-white py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-gold-400 tracking-[0.4em] uppercase text-xs mb-4">Nous Trouver</p>
          <h1 className="font-serif text-5xl mb-4">Contact</h1>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mb-5" />
          <p className="text-neutral-300">
            Notre équipe est à votre disposition pour répondre à toutes vos questions.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-2xl text-neutral-800 mb-8">Informations de Contact</h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gold-50 rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm tracking-wide mb-1.5">Adresse</h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      Ben Daoud Bijouterie<br />
                      Rez de chaussée, Tachfine Center<br />
                      Marjane, Bd Ibn Tachfine<br />
                      Casablanca, Maroc
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gold-50 rounded-full flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm tracking-wide mb-1.5">Téléphone</h3>
                    <div className="text-neutral-600 text-sm space-y-1">
                      <p>
                        <span className="text-neutral-400 text-xs">Tél :</span>{' '}
                        <a href="tel:0522621818" className="hover:text-gold-600 transition-colors">0522 62 18 18</a>
                      </p>
                      <p>
                        <span className="text-neutral-400 text-xs">Fax :</span>{' '}
                        <span>0522 61 45 48</span>
                      </p>
                      <p>
                        <span className="text-neutral-400 text-xs">Mobile :</span>{' '}
                        <a href="tel:0661180440" className="hover:text-gold-600 transition-colors">0661 18 04 40</a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gold-50 rounded-full flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm tracking-wide mb-1.5">Email</h3>
                    <a
                      href="mailto:contact@bendaoud.ma"
                      className="text-neutral-600 text-sm hover:text-gold-600 transition-colors"
                    >
                      contact@bendaoud.ma
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gold-50 rounded-full flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm tracking-wide mb-1.5">Horaires d&apos;ouverture</h3>
                    <div className="text-neutral-600 text-sm space-y-1">
                      <p>Lun – Jeu &amp; Dim : 10h00 – 21h00</p>
                      <p>Vendredi &amp; Samedi : 10h00 – 21h30</p>
                      <p className="text-gold-600 text-xs mt-1.5 flex items-center gap-1">
                        <span>⚠</span> Vendredi : fermeture à l&apos;heure de la prière du Jumu&apos;ah
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-10 p-6 bg-neutral-50 border border-neutral-200">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <MessageCircle size={16} className="text-green-500" />
                  Contactez-nous sur WhatsApp
                </h3>
                <p className="text-xs text-neutral-500 mb-4 leading-relaxed">
                  Pour connaître le prix d'un article ou obtenir un renseignement rapide, écrivez-nous sur WhatsApp.
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour, je souhaite avoir des informations sur vos produits.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 text-sm font-semibold hover:bg-green-600 transition-colors"
                >
                  <MessageCircle size={16} />
                  Envoyer un message
                </a>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="flex flex-col gap-6">
              <div className="w-full overflow-hidden border border-neutral-200" style={{ height: '320px' }}>
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-7.5959801%2C33.5841845%2C-7.5899801%2C33.5881845&layer=mapnik&marker=33.5861845%2C-7.5929801"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ben Daoud Bijouterie — Tachfine Center, Casablanca"
                />
              </div>
              <a
                href="https://www.google.com/maps/place/Ben+Daoud+Bijouterie/@33.5861889,-7.595555,17z/data=!3m1!4b1!4m6!3m5!1s0xda7cd6a79846c4d:0x81cb4eff7369e1d6!8m2!3d33.5861845!4d-7.5929801!16s%2Fg%2F11f9hhkjqt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-gold-600 border border-gold-600 px-4 py-2 hover:bg-gold-600 hover:text-white transition-colors self-start"
              >
                <MapPin size={13} />
                Ouvrir dans Google Maps
              </a>

              {/* Prices note */}
              <div className="bg-gold-600 text-white p-8">
                <h3 className="font-serif text-xl mb-3">Aucun prix affiché sur le site ?</h3>
                <p className="text-gold-100 text-sm leading-relaxed mb-4">
                  Les prix varient en fonction du cours de l'or et des caractéristiques de chaque pièce. Pour obtenir le prix d'un article qui vous intéresse, contactez-nous via WhatsApp ou visitez notre boutique.
                </p>
                <p className="text-gold-100 text-sm leading-relaxed">
                  Notre équipe se fera un plaisir de vous renseigner et de vous accueillir dans notre boutique au Tachfine Center.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
