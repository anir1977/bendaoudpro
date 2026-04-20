'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Power, Gem, Clock, Tag, Star, Plus, Settings, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react'

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
  const [maintenance, setMaintenance] = useState<boolean | null>(null)
  const [togglingMaintenance, setTogglingMaintenance] = useState(false)
  const [maintenanceMsg, setMaintenanceMsg] = useState<{ type: 'ok' | 'error'; text: string } | null>(null)

  async function toggleMaintenance() {
    if (maintenance === null || togglingMaintenance) return
    setTogglingMaintenance(true)
    setMaintenanceMsg(null)
    try {
      const next = !maintenance
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ maintenanceMode: next }),
      })
      if (res.ok) {
        const data = await res.json()
        setMaintenance(data.maintenanceMode)
        setMaintenanceMsg({
          type: 'ok',
          text: data.maintenanceMode ? 'Site mis en maintenance avec succès.' : 'Site remis en ligne avec succès.',
        })
      } else {
        setMaintenanceMsg({ type: 'error', text: 'Erreur lors de la mise à jour.' })
      }
    } catch {
      setMaintenanceMsg({ type: 'error', text: 'Erreur de connexion.' })
    }
    setTogglingMaintenance(false)
    setTimeout(() => setMaintenanceMsg(null), 4000)
  }

  useEffect(() => {
    fetch('/api/admin/settings').then(r => r.json()).then(d => setMaintenance(d.maintenanceMode)).catch(() => setMaintenance(false))
  }, [])

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
      setStats({ totalBijoux: bijoux.length, totalMontres: montres.length, categoriesBijoux, brandsMontres })
    }
    loadStats()
  }, [])

  return (
    <div className="space-y-6 pb-8">

      {/* ── Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gold-600 text-xs tracking-[0.3em] uppercase mb-1">Administration</p>
          <h1 className="font-serif text-2xl sm:text-3xl text-white tracking-wide">Tableau de bord</h1>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-neutral-500 text-xs">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <p className="text-gold-500 text-xs font-medium mt-0.5">Ben Daoud Bijouterie</p>
        </div>
      </div>

      {/* ── Maintenance card ── */}
      <div className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
        maintenance ? 'border-red-700/50 bg-red-950/20' : 'border-neutral-700/50 bg-neutral-900'
      }`}>
        <div className="p-5">
          <div className="flex items-center justify-between gap-4">
            {/* Left: icon + text */}
            <div className="flex items-center gap-3.5 min-w-0">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                maintenance ? 'bg-red-500/15 text-red-400' : 'bg-emerald-500/15 text-emerald-400'
              }`}>
                <Power size={18} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`inline-block w-2 h-2 rounded-full shrink-0 ${maintenance ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                  <span className={`font-semibold text-sm ${maintenance ? 'text-red-300' : 'text-emerald-300'}`}>
                    {maintenance === null ? 'Chargement…' : maintenance ? 'Site en maintenance' : 'Site en ligne'}
                  </span>
                </div>
                <p className="text-neutral-500 text-xs mt-0.5 leading-snug">
                  {maintenance
                    ? 'Les visiteurs voient la page de maintenance.'
                    : 'Le site est accessible à tous les visiteurs.'}
                </p>
              </div>
            </div>
            {/* Right: button */}
            <button
              onClick={toggleMaintenance}
              disabled={togglingMaintenance || maintenance === null}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide uppercase transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                maintenance
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30'
                  : 'bg-red-700 hover:bg-red-600 text-white shadow-lg shadow-red-900/30'
              }`}
            >
              {togglingMaintenance ? (
                <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              ) : (
                <Power size={13} />
              )}
              <span className="hidden sm:inline">
                {maintenance ? 'Remettre en ligne' : 'Maintenance'}
              </span>
              <span className="sm:hidden">
                {maintenance ? 'En ligne' : 'Maint.'}
              </span>
            </button>
          </div>

          {/* Feedback message */}
          {maintenanceMsg && (
            <div className={`mt-3 flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${
              maintenanceMsg.type === 'ok'
                ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-800/40'
                : 'bg-red-900/30 text-red-300 border border-red-800/40'
            }`}>
              {maintenanceMsg.type === 'ok' ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
              {maintenanceMsg.text}
            </div>
          )}
        </div>
      </div>

      {/* ── KPI Cards ── */}
      {stats ? (
        <div className="grid grid-cols-2 gap-3">
          <KpiCard
            label="Bijoux"
            value={stats.totalBijoux}
            icon={<Gem size={16} />}
            sub={`${Object.keys(stats.categoriesBijoux).length} catégories`}
            href="/admin/bijoux"
            accent="gold"
          />
          <KpiCard
            label="Montres"
            value={stats.totalMontres}
            icon={<Clock size={16} />}
            sub={`${Object.keys(stats.brandsMontres).length} marques`}
            href="/admin/montres"
            accent="blue"
          />
          <KpiCard
            label="Catégories"
            value={Object.keys(stats.categoriesBijoux).length}
            icon={<Tag size={16} />}
            sub="bijoux"
            accent="neutral"
          />
          <KpiCard
            label="Marques"
            value={Object.keys(stats.brandsMontres).length}
            icon={<Star size={16} />}
            sub="montres"
            accent="neutral"
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {[0,1,2,3].map(i => (
            <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 animate-pulse">
              <div className="h-3 bg-neutral-800 rounded w-1/2 mb-3" />
              <div className="h-8 bg-neutral-800 rounded w-1/3" />
            </div>
          ))}
        </div>
      )}

      {/* ── Actions rapides ── */}
      <div>
        <p className="text-neutral-500 text-xs tracking-widest uppercase mb-3">Actions rapides</p>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/admin/bijoux/nouveau"
            className="flex items-center gap-3 bg-gold-900/20 hover:bg-gold-900/30 border border-gold-900/40 rounded-xl px-4 py-3.5 transition-colors group">
            <div className="w-8 h-8 bg-gold-800/40 rounded-lg flex items-center justify-center text-gold-400 group-hover:bg-gold-700/40 transition-colors">
              <Plus size={15} />
            </div>
            <div>
              <p className="text-gold-300 text-xs font-semibold">Nouveau bijou</p>
              <p className="text-neutral-500 text-xs">Ajouter au catalogue</p>
            </div>
          </Link>
          <Link href="/admin/montres/nouveau"
            className="flex items-center gap-3 bg-blue-900/20 hover:bg-blue-900/30 border border-blue-900/40 rounded-xl px-4 py-3.5 transition-colors group">
            <div className="w-8 h-8 bg-blue-800/40 rounded-lg flex items-center justify-center text-blue-400 group-hover:bg-blue-700/40 transition-colors">
              <Plus size={15} />
            </div>
            <div>
              <p className="text-blue-300 text-xs font-semibold">Nouvelle montre</p>
              <p className="text-neutral-500 text-xs">Ajouter au catalogue</p>
            </div>
          </Link>
          <Link href="/admin/bijoux"
            className="flex items-center gap-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl px-4 py-3.5 transition-colors group">
            <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400">
              <Settings size={15} />
            </div>
            <div>
              <p className="text-neutral-300 text-xs font-semibold">Gérer bijoux</p>
              <p className="text-neutral-500 text-xs">Modifier, supprimer</p>
            </div>
          </Link>
          <Link href="/admin/montres"
            className="flex items-center gap-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl px-4 py-3.5 transition-colors group">
            <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400">
              <Settings size={15} />
            </div>
            <div>
              <p className="text-neutral-300 text-xs font-semibold">Gérer montres</p>
              <p className="text-neutral-500 text-xs">Modifier, supprimer</p>
            </div>
          </Link>
        </div>
      </div>

      {/* ── Charts ── */}
      {stats && (
        <div className="space-y-4">
          {/* Bijoux */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-gold-500" />
                <h2 className="text-white text-sm font-semibold">Bijoux par catégorie</h2>
              </div>
              <Link href="/admin/bijoux/nouveau"
                className="text-xs text-gold-600 hover:text-gold-400 border border-gold-900/40 px-2.5 py-1 rounded-lg transition-colors">
                + Ajouter
              </Link>
            </div>
            <div className="space-y-3">
              {Object.entries(stats.categoriesBijoux)
                .sort(([,a],[,b]) => b - a)
                .map(([cat, count]) => (
                <div key={cat}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-neutral-400">{categoryLabels[cat] || cat}</span>
                    <span className="text-gold-500 font-semibold tabular-nums">{count}</span>
                  </div>
                  <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold-700 to-gold-400 rounded-full transition-all duration-700"
                      style={{ width: `${Math.round((count / stats.totalBijoux) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Montres */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-blue-500" />
                <h2 className="text-white text-sm font-semibold">Montres par marque</h2>
              </div>
              <Link href="/admin/montres/nouveau"
                className="text-xs text-blue-500 hover:text-blue-400 border border-blue-900/40 px-2.5 py-1 rounded-lg transition-colors">
                + Ajouter
              </Link>
            </div>
            <div className="space-y-3">
              {Object.entries(stats.brandsMontres)
                .sort(([,a],[,b]) => b - a)
                .map(([brand, count]) => (
                <div key={brand}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-neutral-400 capitalize">{brand}</span>
                    <span className="text-blue-400 font-semibold tabular-nums">{count}</span>
                  </div>
                  <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-700 to-blue-400 rounded-full transition-all duration-700"
                      style={{ width: `${Math.round((count / stats.totalMontres) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

function KpiCard({
  label, value, icon, sub, href, accent,
}: {
  label: string; value: number; icon: React.ReactNode; sub: string; href?: string; accent: 'gold' | 'blue' | 'neutral'
}) {
  const accentMap = {
    gold: { card: 'border-gold-900/40', num: 'text-gold-400', icon: 'bg-gold-900/30 text-gold-500' },
    blue: { card: 'border-blue-900/40', num: 'text-blue-400', icon: 'bg-blue-900/30 text-blue-500' },
    neutral: { card: 'border-neutral-800', num: 'text-white', icon: 'bg-neutral-800 text-neutral-400' },
  }
  const s = accentMap[accent]
  const inner = (
    <div className={`bg-neutral-900 border ${s.card} rounded-2xl p-5 hover:bg-neutral-800/80 transition-colors`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.icon}`}>{icon}</div>
      </div>
      <p className={`text-2xl font-bold ${s.num} tabular-nums`}>{value}</p>
      <p className="text-neutral-500 text-xs mt-0.5">{label}</p>
      <p className="text-neutral-600 text-xs">{sub}</p>
    </div>
  )
  return href ? <Link href={href}>{inner}</Link> : inner
}
