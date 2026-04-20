import { NextResponse } from 'next/server'
import { getBijoux, addBijou, getMontres } from '@/lib/store'
import { saveStoreToGitHub, triggerDeploy } from '@/lib/github'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(getBijoux())
}

export async function POST(req: Request) {
  const data = await req.json()
  const id = `bij-${Date.now()}`
  addBijou({ ...data, id })
  if (process.env.VERCEL) {
    const ok = await saveStoreToGitHub({ bijoux: getBijoux(), montres: getMontres() })
    if (ok) triggerDeploy()
  }
  return NextResponse.json({ success: true, id })
}
