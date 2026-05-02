/**
 * Route de migration one-shot : remplace les montres dans store.json
 * par les données statiques actuelles (MK au lieu de Tommy).
 * Appeler une seule fois depuis /admin après déploiement.
 */
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { readStoreFromGitHub, saveStoreToGitHub } from '@/lib/github'
import { getMontres, getBijoux } from '@/lib/store'

export const dynamic = 'force-dynamic'

export async function POST() {
  const currentStore = await readStoreFromGitHub() ?? { bijoux: getBijoux(), montres: [] }

  // Remplace les montres par les données statiques à jour (MK)
  const newMontres = getMontres()
  currentStore.montres = newMontres

  const ok = await saveStoreToGitHub(currentStore)
  if (!ok) return NextResponse.json({ error: 'Erreur sauvegarde GitHub' }, { status: 500 })

  revalidatePath('/montres')
  revalidatePath('/montres/femme')
  revalidatePath('/montres/homme')
  revalidatePath('/')

  return NextResponse.json({ success: true, count: newMontres.length })
}
