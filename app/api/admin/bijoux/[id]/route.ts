import { NextResponse } from 'next/server'
import { updateBijou, deleteBijou, getBijoux, getMontres } from '@/lib/store'
import { saveStoreToGitHub, triggerDeploy } from '@/lib/github'

export const dynamic = 'force-dynamic'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  updateBijou(params.id, data)
  if (process.env.VERCEL) {
    const ok = await saveStoreToGitHub({ bijoux: getBijoux(), montres: getMontres() })
    if (ok) triggerDeploy()
  }
  return NextResponse.json({ success: true })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  deleteBijou(params.id)
  if (process.env.VERCEL) {
    const ok = await saveStoreToGitHub({ bijoux: getBijoux(), montres: getMontres() })
    if (ok) triggerDeploy()
  }
  return NextResponse.json({ success: true })
}
