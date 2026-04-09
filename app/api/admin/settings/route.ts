import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { COOKIE_NAME, createToken } from '@/lib/auth'
import { getMaintenanceMode, setMaintenanceModeLocal } from '@/lib/store'

function isAdmin() {
  const token = cookies().get(COOKIE_NAME)
  return token?.value === createToken()
}

async function getKV(): Promise<boolean> {
  // On Vercel: use KV (Redis)
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const res = await fetch(`${process.env.KV_REST_API_URL}/get/maintenance`, {
      headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
      cache: 'no-store',
    })
    const data = await res.json()
    return data.result === 'true'
  }
  // Local: use file
  return getMaintenanceMode()
}

async function setKV(value: boolean): Promise<void> {
  // On Vercel: use KV (Redis)
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    await fetch(`${process.env.KV_REST_API_URL}/set/maintenance/${value}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
    })
    return
  }
  // Local: use file
  setMaintenanceModeLocal(value)
}

export async function GET() {
  const maintenanceMode = await getKV()
  return NextResponse.json({ maintenanceMode })
}

export async function PUT(request: Request) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { maintenanceMode } = await request.json()
  await setKV(Boolean(maintenanceMode))
  return NextResponse.json({ maintenanceMode: Boolean(maintenanceMode) })
}
