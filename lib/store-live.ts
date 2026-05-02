/**
 * Live store reads — on Vercel, reads from GitHub API (always fresh).
 * In local dev, reads from the local store.json file.
 */
import { readStoreFromGitHub } from './github'
import { getBijoux, getMontres } from './store'
import type { Bijou, Montre } from '@/data/products'

export async function getBijouxLive(): Promise<Bijou[]> {
  if (process.env.VERCEL) {
    try {
      const store = await readStoreFromGitHub()
      if (store?.bijoux && Array.isArray(store.bijoux)) return store.bijoux as Bijou[]
    } catch {}
  }
  return getBijoux()
}

export async function getMontresLive(): Promise<Montre[]> {
  if (process.env.VERCEL) {
    try {
      const store = await readStoreFromGitHub()
      if (store?.montres && Array.isArray(store.montres)) return store.montres as Montre[]
    } catch {}
  }
  return getMontres()
}
