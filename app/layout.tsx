import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ben Daoud Bijouterie — Or 18 Carats & Montres — Casablanca',
  description:
    "Bijouterie Ben Daoud, plus de 50 ans d'expertise dans la bijouterie en or 18 carats et les montres de marque à Casablanca. Colliers, bagues, bracelets, alliances, Guess, Festina, Tommy Hilfiger.",
  keywords: 'bijouterie, or 18 carats, bijoux, montres, Casablanca, Maroc, Ben Daoud, collier, bague, bracelet',
  openGraph: {
    title: 'Ben Daoud Bijouterie — Casablanca',
    description: "Plus de 50 ans d'excellence dans la bijouterie en or 18 carats.",
    locale: 'fr_MA',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
