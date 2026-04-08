'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Bijou {
  id: string
  name: string
  category: string
  material: string
  description: string
  image: string
  featured: boolean
}

const categoryLabels: Record<string, string> = {
  collier: 'Collier',
  bague: 'Bague',
  bracelet: 'Bracelet',
  'bague-mariage': 'Mariage',
  gourmette: 'Gourmette',
  'boucle-doreille': "Boucle d'oreille",
  parure: 'Parure',
  sautoire: 'Sautoire',
  broche: 'Broche',
}

export default function BijouxAdmin() {
  const [bijoux, setBijoux] = useState<Bijou[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function load() {
    const res = await fetch('/api/admin/bijoux')
    setBijoux(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Supprimer "${name}" ?`)) return
    setDeleting(id)
    await fetch(`/api/admin/bijoux/${id}`, { method: 'DELETE' })
    await load()
    setDeleting(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-gold-400 tracking-wide">Bijoux</h1>
          <p className="text-neutral-400 mt-1">{bijoux.length} produit{bijoux.length !== 1 ? 's' : ''} au catalogue</p>
        </div>
        <Link
          href="/admin/bijoux/nouveau"
          className="flex items-center gap-2 bg-gold-700 hover:bg-gold-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nouveau bijou
        </Link>
      </div>

      {/* Table */}
      <div className="bg-neutral-900 border border-gold-900/40 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48 text-neutral-400">
            <svg className="animate-spin h-5 w-5 text-gold-500 mr-2" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Chargement...
          </div>
        ) : bijoux.length === 0 ? (
          <div className="text-center py-16 text-neutral-400">
            <p className="mb-4">Aucun bijou dans le catalogue</p>
            <Link href="/admin/bijoux/nouveau" className="text-gold-500 hover:text-gold-400">
              Ajouter le premier bijou →
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold-900/40">
                <th className="text-left text-neutral-400 font-medium px-5 py-4">Produit</th>
                <th className="text-left text-neutral-400 font-medium px-5 py-4 hidden sm:table-cell">Catégorie</th>
                <th className="text-left text-neutral-400 font-medium px-5 py-4 hidden md:table-cell">Matière</th>
                <th className="text-left text-neutral-400 font-medium px-5 py-4 hidden lg:table-cell">Vedette</th>
                <th className="text-right text-neutral-400 font-medium px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {bijoux.map(bijou => (
                <tr key={bijou.id} className="hover:bg-neutral-800/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-neutral-800 flex-shrink-0">
                        <Image
                          src={bijou.image}
                          alt={bijou.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <span className="text-white font-medium truncate max-w-[180px]">{bijou.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="bg-gold-900/30 text-gold-500 text-xs px-2.5 py-1 rounded-full border border-gold-800/40">
                      {categoryLabels[bijou.category] || bijou.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-neutral-400 hidden md:table-cell">{bijou.material}</td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    {bijou.featured ? (
                      <span className="text-gold-500">★ Oui</span>
                    ) : (
                      <span className="text-neutral-600">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/bijoux/${bijou.id}`}
                        className="text-neutral-400 hover:text-gold-400 transition-colors p-1.5 rounded-lg hover:bg-neutral-700"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(bijou.id, bijou.name)}
                        disabled={deleting === bijou.id}
                        className="text-neutral-400 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-950/30 disabled:opacity-50"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
