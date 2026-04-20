'use client'

import { useState } from 'react'
import { Power, CheckCircle2, AlertCircle } from 'lucide-react'

export default function MaintenanceToggle({ initial }: { initial: boolean }) {
  const [maintenance, setMaintenance] = useState(initial)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  async function toggle() {
    if (loading) return
    setLoading(true)
    setMsg(null)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ maintenanceMode: !maintenance }),
      })
      if (res.ok) {
        const d = await res.json()
        setMaintenance(d.maintenanceMode)
        setMsg({ type: 'ok', text: d.maintenanceMode ? 'Site mis en maintenance.' : 'Site remis en ligne.' })
      } else {
        setMsg({ type: 'err', text: 'Erreur serveur — réessayez.' })
      }
    } catch {
      setMsg({ type: 'err', text: 'Erreur de connexion.' })
    }
    setLoading(false)
    setTimeout(() => setMsg(null), 4000)
  }

  return (
    <div className={`rounded-2xl border overflow-hidden transition-colors ${
      maintenance ? 'border-red-700/50 bg-red-950/20' : 'border-neutral-700/50 bg-neutral-900'
    }`}>
      <div className="p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            maintenance ? 'bg-red-500/15 text-red-400' : 'bg-emerald-500/15 text-emerald-400'
          }`}>
            <Power size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full shrink-0 ${maintenance ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
              <span className={`font-semibold text-sm ${maintenance ? 'text-red-300' : 'text-emerald-300'}`}>
                {maintenance ? 'Site en maintenance' : 'Site en ligne'}
              </span>
            </div>
            <p className="text-neutral-500 text-xs mt-0.5">
              {maintenance ? 'Les visiteurs voient la page de maintenance.' : 'Le site est accessible à tous les visiteurs.'}
            </p>
          </div>
        </div>
        <button
          onClick={toggle}
          disabled={loading}
          className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide uppercase transition-all disabled:opacity-40 ${
            maintenance
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
              : 'bg-red-700 hover:bg-red-600 text-white'
          }`}
        >
          {loading ? (
            <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          ) : <Power size={13} />}
          <span className="hidden sm:inline">{maintenance ? 'Remettre en ligne' : 'Activer maintenance'}</span>
          <span className="sm:hidden">{maintenance ? 'En ligne' : 'Maint.'}</span>
        </button>
      </div>
      {msg && (
        <div className={`mx-5 mb-4 flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${
          msg.type === 'ok' ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-800/40' : 'bg-red-900/30 text-red-300 border border-red-800/40'
        }`}>
          {msg.type === 'ok' ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
          {msg.text}
        </div>
      )}
    </div>
  )
}
