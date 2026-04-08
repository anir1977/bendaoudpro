import fs from 'fs'
import path from 'path'
import { bijoux as defaultBijoux, montres as defaultMontres, Bijou, Montre } from '@/data/products'

const storePath = path.join(process.cwd(), 'data', 'store.json')

interface Store {
  bijoux: Bijou[]
  montres: Montre[]
  maintenanceMode?: boolean
}

function readStore(): Store {
  try {
    if (fs.existsSync(storePath)) {
      return JSON.parse(fs.readFileSync(storePath, 'utf-8'))
    }
  } catch {}
  const initial: Store = { bijoux: defaultBijoux, montres: defaultMontres }
  fs.writeFileSync(storePath, JSON.stringify(initial, null, 2))
  return initial
}

function writeStore(data: Store) {
  fs.writeFileSync(storePath, JSON.stringify(data, null, 2))
}

export function getBijoux(): Bijou[] {
  return readStore().bijoux
}

export function getMontres(): Montre[] {
  return readStore().montres
}

export function getBijouById(id: string): Bijou | undefined {
  return readStore().bijoux.find((b) => b.id === id)
}

export function getMontreById(id: string): Montre | undefined {
  return readStore().montres.find((m) => m.id === id)
}

export function addBijou(bijou: Bijou) {
  const store = readStore()
  store.bijoux.push(bijou)
  writeStore(store)
}

export function updateBijou(id: string, data: Partial<Bijou>) {
  const store = readStore()
  store.bijoux = store.bijoux.map((b) => (b.id === id ? { ...b, ...data } : b))
  writeStore(store)
}

export function deleteBijou(id: string) {
  const store = readStore()
  store.bijoux = store.bijoux.filter((b) => b.id !== id)
  writeStore(store)
}

export function addMontre(montre: Montre) {
  const store = readStore()
  store.montres.push(montre)
  writeStore(store)
}

export function updateMontre(id: string, data: Partial<Montre>) {
  const store = readStore()
  store.montres = store.montres.map((m) => (m.id === id ? { ...m, ...data } : m))
  writeStore(store)
}

export function deleteMontre(id: string) {
  const store = readStore()
  store.montres = store.montres.filter((m) => m.id !== id)
  writeStore(store)
}

export function getMaintenanceMode(): boolean {
  return readStore().maintenanceMode ?? false
}

export function setMaintenanceMode(value: boolean) {
  const store = readStore()
  store.maintenanceMode = value
  writeStore(store)
}

export function getStats() {
  const store = readStore()
  const catCount: Record<string, number> = {}
  store.bijoux.forEach((b) => {
    catCount[b.category] = (catCount[b.category] || 0) + 1
  })
  const brandCount: Record<string, number> = {}
  store.montres.forEach((m) => {
    brandCount[m.brand] = (brandCount[m.brand] || 0) + 1
  })
  return {
    totalBijoux: store.bijoux.length,
    totalMontres: store.montres.length,
    categories: catCount,
    brands: brandCount,
  }
}
