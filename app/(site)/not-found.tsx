import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-gold-600 tracking-[0.4em] uppercase text-xs mb-4">Erreur 404</p>
      <h1 className="font-serif text-5xl text-neutral-800 mb-4">Page introuvable</h1>
      <div className="w-12 h-0.5 bg-gold-500 mb-6" />
      <p className="text-neutral-500 mb-8">La page que vous recherchez n'existe pas ou a été déplacée.</p>
      <Link href="/" className="btn-gold">Retour à l'accueil</Link>
    </div>
  )
}
