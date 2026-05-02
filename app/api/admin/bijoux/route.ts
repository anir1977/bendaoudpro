import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
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
  if (!data.name) return NextResponse.json({ error: 'Nom requis' }, { status: 400 })

  const id = `bij-${Date.now()}`
  const nouveau: Bijou = { ...data, id }

  if (process.env.VERCEL) {
    const store = await readStoreFromGitHub() ?? { bijoux: getBijoux(), montres: getMontres() }
    store.bijoux = [...(store.bijoux as Bijou[]), nouveau]
    const ok = await saveStoreToGitHub(store)
    if (!ok) return NextResponse.json({ error: 'Erreur sauvegarde GitHub' }, { status: 500 })
    revalidatePath('/bijoux')
    revalidatePath('/bijoux/[category]', 'page')
    revalidatePath('/')
    return NextResponse.json({ success: true, id })
  }

  const { addBijou } = await import('@/lib/store')
  addBijou(nouveau)
  return NextResponse.json({ success: true, id })
}
