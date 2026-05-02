import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
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
  if (!data.name) return NextResponse.json({ error: 'Nom requis' }, { status: 400 })

  const id = `mon-${Date.now()}`
  const nouvelle: Montre = { ...data, id }

  if (process.env.VERCEL) {
    const store = await readStoreFromGitHub() ?? { bijoux: getBijoux(), montres: getMontres() }
    store.montres = [...(store.montres as Montre[]), nouvelle]
    const ok = await saveStoreToGitHub(store)
    if (!ok) return NextResponse.json({ error: 'Erreur sauvegarde GitHub' }, { status: 500 })
    revalidatePath('/montres')
    revalidatePath('/montres/[gender]', 'page')
    revalidatePath('/')
    return NextResponse.json({ success: true, id })
  }

  const { addMontre } = await import('@/lib/store')
  addMontre(nouvelle)
  return NextResponse.json({ success: true, id })
}
