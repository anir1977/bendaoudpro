'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      const data = await res.json()
      setError(data.error || 'Erreur de connexion')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/slide1.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* Gold decorative lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-gold-500/50" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-t from-transparent to-gold-500/50" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-32 bg-gradient-to-r from-transparent to-gold-500/50" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-32 bg-gradient-to-l from-transparent to-gold-500/50" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-neutral-900/95 border border-gold-700/50 rounded-2xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="px-8 pt-10 pb-6 text-center border-b border-gold-700/30">
            <div className="flex justify-center mb-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gold-600 shadow-lg shadow-gold-900/50">
                <Image src="/logo.jpg" alt="Ben Daoud" fill className="object-cover" />
              </div>
            </div>
            <h1 className="font-serif text-2xl text-gold-400 tracking-widest uppercase">Ben Daoud</h1>
            <p className="text-neutral-400 text-sm mt-1 tracking-wider">Administration</p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px w-16 bg-gold-700/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold-600" />
              <div className="h-px w-16 bg-gold-700/50" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
            <div>
              <label className="block text-xs text-gold-500 uppercase tracking-widest mb-2">
                Nom d&apos;utilisateur
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className="w-full bg-neutral-800 border border-neutral-700 focus:border-gold-600 rounded-lg px-4 py-3 text-white placeholder-neutral-500 outline-none transition-colors"
                placeholder="Entrez votre identifiant"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-xs text-gold-500 uppercase tracking-widest mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-neutral-800 border border-neutral-700 focus:border-gold-600 rounded-lg px-4 py-3 text-white placeholder-neutral-500 outline-none transition-colors"
                placeholder="••••••••••"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-700/50 rounded-lg px-4 py-3 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-700 hover:bg-gold-600 disabled:opacity-60 text-white font-medium py-3 rounded-lg transition-colors tracking-widest uppercase text-sm mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Connexion...
                </span>
              ) : 'Se connecter'}
            </button>
          </form>

          {/* Footer */}
          <div className="px-8 pb-6 text-center">
            <p className="text-neutral-600 text-xs">© 2024 Ben Daoud Bijouterie · Casablanca</p>
          </div>
        </div>
      </div>
    </div>
  )
}
