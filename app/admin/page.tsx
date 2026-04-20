import Link from 'next/link'
import { Gem, Clock, Tag, Star, Plus, Settings, TrendingUp } from 'lucide-react'
import { getBijoux, getMontres, getMaintenanceMode } from '@/lib/store'
import MaintenanceToggle from '@/components/admin/MaintenanceToggle'

const categoryLabels: Record<string, string> = {
  collier: 'Colliers', bague: 'Bagues', bracelet: 'Bracelets',
  'bague-mariage': 'Bagues Mariage', gourmette: 'Gourmettes',
  'boucle-doreille': "Boucles d'Oreilles", parure: 'Parures',
  sautoire: 'Sautoires', broche: 'Broches',
}

export default function AdminDashboard() {
  // ── Lire les données côté serveur — instantané, zéro API call ──
  const bijoux  = getBijoux()
  const montres = getMontres()
  const maintenance = getMaintenanceMode()

  const categoriesBijoux: Record<string, number> = {}
  bijoux.forEach(b => { categoriesBijoux[b.category] = (categoriesBijoux[b.category] || 0) + 1 })

  const brandsMontres: Record<string, number> = {}
  montres.forEach(m => { brandsMontres[m.brand] = (brandsMontres[m.brand] || 0) + 1 })

  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="space-y-6 pb-8">

      {/* ── Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gold-600 text-xs tracking-[0.3em] uppercase mb-1">Administration</p>
          <h1 className="font-serif text-2xl sm:text-3xl text-white tracking-wide">Tableau de bord</h1>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-neutral-500 text-xs capitalize">{today}</p>
          <p className="text-gold-500 text-xs font-medium mt-0.5">Ben Daoud Bijouterie</p>
        </div>
      </div>

      {/* ── Maintenance toggle (client) ── */}
      <MaintenanceToggle initial={maintenance} />

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 gap-3">
        <KpiCard label="Bijoux"      value={bijoux.length}                          sub={`${Object.keys(categoriesBijoux).length} catégories`} icon={<Gem size={16}/>}      accent="gold"    href="/admin/bijoux" />
        <KpiCard label="Montres"     value={montres.length}                         sub={`${Object.keys(brandsMontres).length} marques`}       icon={<Clock size={16}/>}    accent="blue"    href="/admin/montres" />
        <KpiCard label="Catégories"  value={Object.keys(categoriesBijoux).length}  sub="de bijoux"                                             icon={<Tag size={16}/>}      accent="neutral" />
        <KpiCard label="Marques"     value={Object.keys(brandsMontres).length}      sub="de montres"                                            icon={<Star size={16}/>}     accent="neutral" />
      </div>

      {/* ── Actions rapides ── */}
      <div>
        <p className="text-neutral-500 text-xs tracking-widest uppercase mb-3">Actions rapides</p>
        <div className="grid grid-cols-2 gap-3">
          <ActionCard href="/admin/bijoux/nouveau"  label="Nouveau bijou"    sub="Ajouter au catalogue" color="gold" />
          <ActionCard href="/admin/montres/nouveau" label="Nouvelle montre"  sub="Ajouter au catalogue" color="blue" />
          <ActionCard href="/admin/bijoux"          label="Gérer bijoux"     sub="Modifier, supprimer"  color="neutral" />
          <ActionCard href="/admin/montres"         label="Gérer montres"    sub="Modifier, supprimer"  color="neutral" />
        </div>
      </div>

      {/* ── Charts ── */}
      <div className="space-y-4">
        <Chart
          title="Bijoux par catégorie"
          addHref="/admin/bijoux/nouveau"
          accentClass="bg-gradient-to-r from-gold-700 to-gold-400"
          valueClass="text-gold-500"
          entries={Object.entries(categoriesBijoux).sort(([,a],[,b])=>b-a).map(([k,v])=>({ label: categoryLabels[k]||k, value: v, pct: Math.round((v/bijoux.length)*100) }))}
        />
        <Chart
          title="Montres par marque"
          addHref="/admin/montres/nouveau"
          accentClass="bg-gradient-to-r from-blue-700 to-blue-400"
          valueClass="text-blue-400"
          entries={Object.entries(brandsMontres).sort(([,a],[,b])=>b-a).map(([k,v])=>({ label: k, value: v, pct: Math.round((v/montres.length)*100) }))}
        />
      </div>

    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function KpiCard({ label, value, sub, icon, accent, href }: {
  label: string; value: number; sub: string; icon: React.ReactNode; accent: 'gold'|'blue'|'neutral'; href?: string
}) {
  const s = {
    gold:    { card: 'border-gold-900/40',    num: 'text-gold-400',    ico: 'bg-gold-900/30 text-gold-500' },
    blue:    { card: 'border-blue-900/40',    num: 'text-blue-400',    ico: 'bg-blue-900/30 text-blue-500' },
    neutral: { card: 'border-neutral-800',    num: 'text-white',       ico: 'bg-neutral-800 text-neutral-400' },
  }[accent]
  const inner = (
    <div className={`bg-neutral-900 border ${s.card} rounded-2xl p-5 hover:bg-neutral-800/70 transition-colors h-full`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${s.ico}`}>{icon}</div>
      <p className={`text-2xl font-bold tabular-nums ${s.num}`}>{value}</p>
      <p className="text-neutral-400 text-xs mt-0.5">{label}</p>
      <p className="text-neutral-600 text-xs">{sub}</p>
    </div>
  )
  return href ? <Link href={href}>{inner}</Link> : <div>{inner}</div>
}

function ActionCard({ href, label, sub, color }: { href: string; label: string; sub: string; color: 'gold'|'blue'|'neutral' }) {
  const s = {
    gold:    { wrap: 'bg-gold-900/20 hover:bg-gold-900/30 border-gold-900/40', ico: 'bg-gold-800/40 text-gold-400', txt: 'text-gold-300' },
    blue:    { wrap: 'bg-blue-900/20 hover:bg-blue-900/30 border-blue-900/40', ico: 'bg-blue-800/40 text-blue-400', txt: 'text-blue-300' },
    neutral: { wrap: 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800',  ico: 'bg-neutral-800 text-neutral-400', txt: 'text-neutral-300' },
  }[color]
  const Icon = color === 'neutral' ? Settings : Plus
  return (
    <Link href={href} className={`flex items-center gap-3 border rounded-xl px-4 py-3.5 transition-colors ${s.wrap}`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${s.ico}`}><Icon size={15}/></div>
      <div>
        <p className={`text-xs font-semibold ${s.txt}`}>{label}</p>
        <p className="text-neutral-500 text-xs">{sub}</p>
      </div>
    </Link>
  )
}

function Chart({ title, addHref, accentClass, valueClass, entries }: {
  title: string; addHref: string; accentClass: string; valueClass: string
  entries: { label: string; value: number; pct: number }[]
}) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <TrendingUp size={14} className="text-neutral-500" />
          <h2 className="text-white text-sm font-semibold">{title}</h2>
        </div>
        <Link href={addHref} className="text-xs text-neutral-500 hover:text-neutral-300 border border-neutral-700 px-2.5 py-1 rounded-lg transition-colors">
          + Ajouter
        </Link>
      </div>
      <div className="space-y-3">
        {entries.map(e => (
          <div key={e.label}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-neutral-400 capitalize">{e.label}</span>
              <span className={`font-semibold tabular-nums ${valueClass}`}>{e.value}</span>
            </div>
            <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${accentClass}`} style={{ width: `${e.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
