/**
 * Route de migration one-shot : remplace les montres dans store.json
 * par les données statiques actuelles (MK au lieu de Tommy).
 */
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { readStoreFromGitHub, saveStoreToGitHub } from '@/lib/github'
import { getBijoux } from '@/lib/store'
import { montres as staticMontres } from '@/data/products'

export const dynamic = 'force-dynamic'

export async function POST() {
  const currentStore = await readStoreFromGitHub() ?? { bijoux: getBijoux(), montres: [] }

  // Remplace les montres par les données statiques à jour (MK, 19 montres)
  currentStore.montres = staticMontres

  const ok = await saveStoreToGitHub(currentStore)
  if (!ok) return NextResponse.json({ error: 'Erreur sauvegarde GitHub' }, { status: 500 })

  revalidatePath('/montres')
  revalidatePath('/montres/femme')
  revalidatePath('/montres/homme')
  revalidatePath('/')

  return NextResponse.json({ success: true, count: staticMontres.length })
}
