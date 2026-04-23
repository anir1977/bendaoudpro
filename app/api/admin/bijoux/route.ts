import { NextResponse } from 'next/server'
import { getBijoux, getMontres } from '@/lib/store'
import { readStoreFromGitHub, saveStoreToGitHub } from '@/lib/github'
import { Bijou } from '@/data/products'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (process.env.VERCEL) {
    const store = await readStoreFromGitHub()
    if (store) return NextResponse.json(store.bijoux)
  }
  return NextResponse.json(getBijoux())
}

export async function POST(req: Request) {
  const data = await req.json()
  const id = `bij-${Date.now()}`
  const nouveau: Bijou = { ...data, id }

  if (process.env.VERCEL) {
    const store = await readStoreFromGitHub() ?? { bijoux: getBijoux(), montres: getMontres() }
    store.bijoux = [...(store.bijoux as Bijou[]), nouveau]
    await saveStoreToGitHub(store)
    return NextResponse.json({ success: true, id })
  }

  // Local dev
  const { addBijou } = await import('@/lib/store')
  addBijou(nouveau)
  return NextResponse.json({ success: true, id })
}
