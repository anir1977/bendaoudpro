import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { COOKIE_NAME, createToken } from '@/lib/auth'
import { getMaintenanceMode, setMaintenanceMode } from '@/lib/store'

function isAdmin() {
  const token = cookies().get(COOKIE_NAME)
  return token?.value === createToken()
}

export async function GET() {
  return NextResponse.json({ maintenanceMode: getMaintenanceMode() })
}

export async function PUT(request: Request) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { maintenanceMode } = await request.json()
  setMaintenanceMode(Boolean(maintenanceMode))
  return NextResponse.json({ maintenanceMode: getMaintenanceMode() })
}
