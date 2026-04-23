import { NextResponse } from 'next/server'
import { getBijoux, getMontres } from '@/lib/store'
import { readStoreFromGitHub, saveStoreToGitHub } from '@/lib/github'
import { Montre } from '@/data/products'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (process.env.VERCEL) {
    const store = await readStoreFromGitHub()
    if (store) return NextResponse.json(store.montres)
  }
  return NextResponse.json(getMontres())
}

export async function POST(req: Request) {
  const data = await req.json()
  const id = `mon-${Date.now()}`
  const nouvelle: Montre = { ...data, id }

  if (process.env.VERCEL) {
    const store = await readStoreFromGitHub() ?? { bijoux: getBijoux(), montres: getMontres() }
    store.montres = [...(store.montres as Montre[]), nouvelle]
    await saveStoreToGitHub(store)
    return NextResponse.json({ success: true, id })
  }

  const { addMontre } = await import('@/lib/store')
  addMontre(nouvelle)
  return NextResponse.json({ success: true, id })
}
