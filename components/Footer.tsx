import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Image
                src="/logo.jpg"
                alt="Ben Daoud Haute Joaillerie"
                width={160}
                height={96}
                className="w-36 h-auto object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed text-neutral-400">
              Plus de 50 ans d'expertise dans l'art de la bijouterie, au service de l'élégance marocaine.
            </p>
          </div>

          {/* Bijoux */}
          <div>
            <h3 className="text-white font-semibold tracking-widest uppercase text-xs mb-5">Bijoux</h3>
            <ul className="space-y-2.5">
              {[
                ['Colliers', '/bijoux/collier'],
                ['Bagues', '/bijoux/bague'],
                ['Bracelets', '/bijoux/bracelet'],
                ['Bagues de Mariage', '/bijoux/bague-mariage'],
                ['Gourmettes', '/bijoux/gourmette'],
                ["Boucles d'Oreilles", '/bijoux/boucle-doreille'],
                ['Parures', '/bijoux/parure'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-neutral-400 hover:text-gold-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Montres */}
          <div>
            <h3 className="text-white font-semibold tracking-widest uppercase text-xs mb-5">Montres</h3>
            <ul className="space-y-2.5">
              {[
                ['Montres Femme', '/montres/femme'],
                ['Montres Homme', '/montres/homme'],
                ['Guess', '/montres?brand=guess'],
                ['Festina', '/montres?brand=festina'],
                ['Daniel Cline', '/montres?brand=daniel-cline'],
                ['Guess Collection', '/montres?brand=guess-collection'],
                ['Michael Kors', '/montres?brand=michael-kors'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-neutral-400 hover:text-gold-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold tracking-widest uppercase text-xs mb-5">Nous Contacter</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} className="text-gold-500 shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-400 leading-relaxed">
                  Rez de chaussée Tachfine Center<br />
                  Marjane, Bd Ibn Tachfine<br />
                  Casablanca
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="text-gold-500 shrink-0 mt-0.5" />
                <div className="text-sm text-neutral-400 space-y-1">
                  <p>0522 62 18 18</p>
                  <p>0661 18 04 40</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="text-gold-500 shrink-0 mt-0.5" />
                <a href="mailto:contact@bendaoud.ma" className="text-sm text-neutral-400 hover:text-gold-400 transition-colors">
                  contact@bendaoud.ma
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Bijouterie Ben Daoud. Tous droits réservés.
          </p>
          <p className="text-xs text-neutral-500">
            Or 18 Carats · Casablanca, Maroc
          </p>
        </div>
      </div>
    </footer>
  )
}
