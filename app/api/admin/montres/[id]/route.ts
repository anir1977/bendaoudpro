import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getBijoux, getMontres, updateMontre, deleteMontre } from '@/lib/store'
import { readStoreFromGitHub, saveStoreToGitHub } from '@/lib/github'
import { Montre } from '@/data/products'

export const dynamic = 'force-dynamic'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()

  if (process.env.VERCEL) {
    const store = await readStoreFromGitHub() ?? { bijoux: getBijoux(), montres: getMontres() }
    store.montres = (store.montres as Montre[]).map(m => m.id === params.id ? { ...m, ...data } : m)
    const ok = await saveStoreToGitHub(store)
    if (!ok) return NextResponse.json({ error: 'Erreur sauvegarde GitHub' }, { status: 500 })
    revalidatePath('/montres')
    revalidatePath('/montres/[gender]', 'page')
    revalidatePath(`/produit/montre-${params.id}`)
    revalidatePath('/')
    return NextResponse.json({ success: true })
  }

  updateMontre(params.id, data)
  return NextResponse.json({ success: true })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  if (process.env.VERCEL) {
    const store = await readStoreFromGitHub() ?? { bijoux: getBijoux(), montres: getMontres() }
    store.montres = (store.montres as Montre[]).filter(m => m.id !== params.id)
    const ok = await saveStoreToGitHub(store)
    if (!ok) return NextResponse.json({ error: 'Erreur sauvegarde GitHub' }, { status: 500 })
    revalidatePath('/montres')
    revalidatePath('/montres/[gender]', 'page')
    revalidatePath('/')
    return NextResponse.json({ success: true })
  }

  deleteMontre(params.id)
  return NextResponse.json({ success: true })
}
