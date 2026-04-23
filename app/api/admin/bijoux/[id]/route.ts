import { NextResponse } from 'next/server'
import { getBijoux, getMontres, updateBijou, deleteBijou } from '@/lib/store'
import { readStoreFromGitHub, saveStoreToGitHub } from '@/lib/github'
import { Bijou } from '@/data/products'

export const dynamic = 'force-dynamic'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()

  if (process.env.VERCEL) {
    const store = await readStoreFromGitHub() ?? { bijoux: getBijoux(), montres: getMontres() }
    store.bijoux = (store.bijoux as Bijou[]).map(b => b.id === params.id ? { ...b, ...data } : b)
    await saveStoreToGitHub(store)
    return NextResponse.json({ success: true })
  }

  updateBijou(params.id, data)
  return NextResponse.json({ success: true })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  if (process.env.VERCEL) {
    const store = await readStoreFromGitHub() ?? { bijoux: getBijoux(), montres: getMontres() }
    store.bijoux = (store.bijoux as Bijou[]).filter(b => b.id !== params.id)
    await saveStoreToGitHub(store)
    return NextResponse.json({ success: true })
  }

  deleteBijou(params.id)
  return NextResponse.json({ success: true })
}
