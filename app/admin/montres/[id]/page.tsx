'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import ImageUpload from '@/components/admin/ImageUpload'

const brands = [
  { value: 'guess', label: 'Guess' },
  { value: 'festina', label: 'Festina' },
  { value: 'daniel-cline', label: 'Daniel Cline' },
  { value: 'guess-collection', label: 'Guess Collection' },
  { value: 'michael-kors', label: 'Michael Kors' },
]
const genders = [
  { value: 'femme', label: 'Femme' },
  { value: 'homme', label: 'Homme' },
  { value: 'unisexe', label: 'Unisexe' },
]

export default function EditMontre() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [form, setForm] = useState({
    name: '',
    brand: 'guess',
    gender: 'femme',
    description: '',
    image: '',
    featured: false,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/montres')
      .then(r => r.json())
      .then((montres: { id: string; name: string; brand: string; gender: string; description: string; image: string; featured: boolean }[]) => {
        const found = montres.find((m) => m.id === id)
        if (found) {
          setForm({
            name: found.name,
            brand: found.brand,
            gender: found.gender,
            description: found.description,
            image: found.image,
            featured: found.featured,
          })
        }
        setLoading(false)
      })
  }, [id])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  async function generateDescription() {
    if (!form.name) return alert("Entrez d'abord le nom de la montre")
    setGenerating(true)
    const res = await fetch('/api/admin/generate-description', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, brand: form.brand, gender: form.gender }),
    })
    const data = await res.json()
    if (data.description) {
      setForm(prev => ({ ...prev, description: data.description }))
    }
    setGenerating(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/montres/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        router.push('/admin/montres')
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error ?? 'Erreur lors de l\'enregistrement. Réessayez.')
      }
    } catch {
      setError('Erreur réseau. Vérifiez votre connexion.')
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-neutral-400">
        <svg className="animate-spin h-5 w-5 text-gold-500 mr-2" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Chargement...
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/montres" className="text-neutral-400 hover:text-gold-400 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="font-serif text-3xl text-gold-400 tracking-wide">Modifier montre</h1>
          <p className="text-neutral-400 mt-0.5 text-sm">{form.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-neutral-900 border border-gold-900/40 rounded-xl p-6 space-y-5">
          <h2 className="text-gold-500 font-medium text-sm uppercase tracking-widest">Informations</h2>

          <div>
            <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-1.5">Nom de la montre *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-neutral-800 border border-neutral-700 focus:border-gold-600 rounded-lg px-4 py-2.5 text-white outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-1.5">Marque *</label>
              <select
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className="w-full bg-neutral-800 border border-neutral-700 focus:border-gold-600 rounded-lg px-4 py-2.5 text-white outline-none transition-colors"
              >
                {brands.map(b => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-1.5">Genre *</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full bg-neutral-800 border border-neutral-700 focus:border-gold-600 rounded-lg px-4 py-2.5 text-white outline-none transition-colors"
              >
                {genders.map(g => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs text-neutral-400 uppercase tracking-wider">Description</label>
              <button
                type="button"
                onClick={generateDescription}
                disabled={generating}
                className="flex items-center gap-1.5 text-xs text-gold-500 hover:text-gold-400 transition-colors disabled:opacity-50"
              >
                {generating ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Génération...
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Générer avec IA
                  </>
                )}
              </button>
            </div>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-neutral-800 border border-neutral-700 focus:border-gold-600 rounded-lg px-4 py-2.5 text-white outline-none transition-colors resize-none"
            />
          </div>
        </div>

        <div className="bg-neutral-900 border border-gold-900/40 rounded-xl p-6 space-y-4">
          <h2 className="text-gold-500 font-medium text-sm uppercase tracking-widest">Photo du produit</h2>
          <ImageUpload value={form.image} onChange={url => setForm(p => ({ ...p, image: url }))} />
        </div>

        <div className="bg-neutral-900 border border-gold-900/40 rounded-xl p-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="w-4 h-4 accent-yellow-600"
            />
            <div>
              <div className="text-white text-sm font-medium">Mettre en vedette</div>
              <div className="text-neutral-500 text-xs mt-0.5">Afficher cette montre en avant sur la page d&apos;accueil</div>
            </div>
          </label>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500/50 rounded-lg px-4 py-3 text-red-400 text-sm">
            ⚠️ {error}
          </div>
        )}

        <div className="flex gap-3">
          <Link
            href="/admin/montres"
            className="flex-1 text-center bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Annuler
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-gold-700 hover:bg-gold-600 disabled:opacity-60 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Enregistrement...
              </>
            ) : 'Enregistrer les modifications'}
          </button>
        </div>
      </form>
    </div>
  )
}
