'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Stats {
  totalBijoux: number
  totalMontres: number
  categoriesBijoux: Record<string, number>
  brandsMontres: Record<string, number>
}

const categoryLabels: Record<string, string> = {
  collier: 'Colliers',
  bague: 'Bagues',
  bracelet: 'Bracelets',
  'bague-mariage': 'Bagues Mariage',
  gourmette: 'Gourmettes',
  'boucle-doreille': "Boucles d'Oreilles",
  parure: 'Parures',
  sautoire: 'Sautoires',
  broche: 'Broches',
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    async function loadStats() {
      const [bijRes, monRes] = await Promise.all([
        fetch('/api/admin/bijoux'),
        fetch('/api/admin/montres'),
      ])
      const bijoux = await bijRes.json()
      const montres = await monRes.json()

      const categoriesBijoux: Record<string, number> = {}
      bijoux.forEach((b: { category: string }) => {
        categoriesBijoux[b.category] = (categoriesBijoux[b.category] || 0) + 1
      })

      const brandsMontres: Record<string, number> = {}
      montres.forEach((m: { brand: string }) => {
        brandsMontres[m.brand] = (brandsMontres[m.brand] || 0) + 1
      })

      setStats({
        totalBijoux: bijoux.length,
        totalMontres: montres.length,
        categoriesBijoux,
        brandsMontres,
      })
    }
    loadStats()
  }, [])

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-neutral-400">
          <svg className="animate-spin h-5 w-5 text-gold-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Chargement...
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="font-serif text-3xl text-gold-400 tracking-wide">Tableau de bord</h1>
        <p className="text-neutral-400 mt-1">Bienvenue dans l&apos;espace d&apos;administration Ben Daoud Bijouterie</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Total Bijoux"
          value={stats.totalBijoux}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          }
          color="gold"
          href="/admin/bijoux"
        />
        <StatCard
          label="Total Montres"
          value={stats.totalMontres}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="blue"
          href="/admin/montres"
        />
        <StatCard
          label="Catégories"
          value={Object.keys(stats.categoriesBijoux).length}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          }
          color="purple"
        />
        <StatCard
          label="Marques Montres"
          value={Object.keys(stats.brandsMontres).length}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          }
          color="emerald"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bijoux by category */}
        <div className="bg-neutral-900 border border-gold-900/40 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gold-400 font-medium tracking-wide">Bijoux par catégorie</h2>
            <Link href="/admin/bijoux/nouveau" className="text-xs text-gold-600 hover:text-gold-400 transition-colors">
              + Ajouter
            </Link>
          </div>
          <div className="space-y-3">
            {Object.entries(stats.categoriesBijoux).map(([cat, count]) => (
              <div key={cat}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-300">{categoryLabels[cat] || cat}</span>
                  <span className="text-gold-500 font-medium">{count}</span>
                </div>
                <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-700 to-gold-500 rounded-full"
                    style={{ width: `${(count / stats.totalBijoux) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Montres by brand */}
        <div className="bg-neutral-900 border border-gold-900/40 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gold-400 font-medium tracking-wide">Montres par marque</h2>
            <Link href="/admin/montres/nouveau" className="text-xs text-gold-600 hover:text-gold-400 transition-colors">
              + Ajouter
            </Link>
          </div>
          <div className="space-y-3">
            {Object.entries(stats.brandsMontres).map(([brand, count]) => (
              <div key={brand}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-300">{brand}</span>
                  <span className="text-gold-500 font-medium">{count}</span>
                </div>
                <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-700 to-blue-400 rounded-full"
                    style={{ width: `${(count / stats.totalMontres) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-neutral-900 border border-gold-900/40 rounded-xl p-6">
        <h2 className="text-gold-400 font-medium tracking-wide mb-4">Actions rapides</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <QuickAction href="/admin/bijoux/nouveau" label="Nouveau bijou" color="gold" />
          <QuickAction href="/admin/montres/nouveau" label="Nouvelle montre" color="blue" />
          <QuickAction href="/admin/bijoux" label="Gérer bijoux" color="neutral" />
          <QuickAction href="/admin/montres" label="Gérer montres" color="neutral" />
        </div>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  icon,
  color,
  href,
}: {
  label: string
  value: number
  icon: React.ReactNode
  color: 'gold' | 'blue' | 'purple' | 'emerald'
  href?: string
}) {
  const colors = {
    gold: 'bg-gold-900/20 border-gold-800/40 text-gold-400',
    blue: 'bg-blue-900/20 border-blue-800/40 text-blue-400',
    purple: 'bg-purple-900/20 border-purple-800/40 text-purple-400',
    emerald: 'bg-emerald-900/20 border-emerald-800/40 text-emerald-400',
  }
  const iconColors = {
    gold: 'bg-gold-900/40 text-gold-500',
    blue: 'bg-blue-900/40 text-blue-500',
    purple: 'bg-purple-900/40 text-purple-500',
    emerald: 'bg-emerald-900/40 text-emerald-500',
  }

  const inner = (
    <div className={`bg-neutral-900 border rounded-xl p-5 ${colors[color]} hover:scale-[1.02] transition-transform`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-neutral-400 text-sm">{label}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-2.5 rounded-lg ${iconColors[color]}`}>{icon}</div>
      </div>
    </div>
  )

  return href ? <Link href={href}>{inner}</Link> : inner
}

function QuickAction({ href, label, color }: { href: string; label: string; color: string }) {
  const styles: Record<string, string> = {
    gold: 'bg-gold-800 hover:bg-gold-700 text-white',
    blue: 'bg-blue-800 hover:bg-blue-700 text-white',
    neutral: 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200',
  }
  return (
    <Link href={href} className={`${styles[color]} px-4 py-3 rounded-lg text-sm font-medium text-center transition-colors`}>
      {label}
    </Link>
  )
}
