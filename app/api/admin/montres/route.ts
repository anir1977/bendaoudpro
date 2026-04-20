import { NextResponse } from 'next/server'
import { getMontres, addMontre, getBijoux } from '@/lib/store'
import { saveStoreToGitHub, triggerDeploy } from '@/lib/github'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(getMontres())
}

export async function POST(req: Request) {
  const data = await req.json()
  const id = `mon-${Date.now()}`
  addMontre({ ...data, id })
  if (process.env.VERCEL) {
    const ok = await saveStoreToGitHub({ bijoux: getBijoux(), montres: getMontres() })
    if (ok) triggerDeploy()
  }
  return NextResponse.json({ success: true, id })
}
