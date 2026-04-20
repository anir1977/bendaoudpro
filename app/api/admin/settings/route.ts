import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { COOKIE_NAME, createToken } from '@/lib/auth'
import { getMaintenanceMode, setMaintenanceModeLocal } from '@/lib/store'

export const dynamic = 'force-dynamic'

function isAdmin() {
  const token = cookies().get(COOKIE_NAME)
  return token?.value === createToken()
}

// ── Read ──────────────────────────────────────────────────────────────────────
async function readMaintenance(): Promise<boolean> {
  // 1. Vercel KV (if configured)
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const res = await fetch(`${process.env.KV_REST_API_URL}/get/maintenance`, {
        headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
        cache: 'no-store',
      })
      const data = await res.json()
      if (data.result !== null) return data.result === 'true'
    } catch {}
  }
  // 2. Local file fallback
  return getMaintenanceMode()
}

// ── Write ─────────────────────────────────────────────────────────────────────
async function writeMaintenance(value: boolean): Promise<boolean> {
  // 1. Vercel KV (if configured)
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const res = await fetch(`${process.env.KV_REST_API_URL}/set/maintenance/${value}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
      })
      if (res.ok) return true
    } catch {}
  }

  // 2. GitHub API — commit data/maintenance.json directly to repo
  if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) {
    try {
      const [owner, repo] = process.env.GITHUB_REPO.split('/')
      const filePath = 'data/maintenance.json'
      const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`

      // Get current SHA
      const getRes = await fetch(apiBase, {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      })
      const fileData = await getRes.json()
      const sha = fileData.sha

      // Update file
      const content = Buffer.from(JSON.stringify({ enabled: value })).toString('base64')
      const putRes = await fetch(apiBase, {
        method: 'PUT',
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: value ? 'chore: enable maintenance mode' : 'chore: disable maintenance mode',
          content,
          sha,
        }),
      })
      if (putRes.ok) {
        // Trigger Vercel redeploy if token configured
        if (process.env.VERCEL_DEPLOY_HOOK) {
          await fetch(process.env.VERCEL_DEPLOY_HOOK, { method: 'POST' })
        }
        return true
      }
    } catch {}
  }

  // 3. Local file (dev environment)
  try {
    setMaintenanceModeLocal(value)
    return true
  } catch {
    return false
  }
}

// ── Routes ────────────────────────────────────────────────────────────────────
export async function GET() {
  const maintenanceMode = await readMaintenance()
  return NextResponse.json({ maintenanceMode })
}

export async function PUT(request: Request) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { maintenanceMode } = await request.json()
  const saved = await writeMaintenance(Boolean(maintenanceMode))
  return NextResponse.json({
    maintenanceMode: Boolean(maintenanceMode),
    saved,
    note: saved ? undefined : 'Configurez KV_REST_API_URL ou GITHUB_TOKEN dans Vercel pour la persistance.',
  })
}
