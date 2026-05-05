import { getMontresLive } from '@/lib/store-live'
import MontresClient from './MontresClient'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Montres Femme & Homme — Ben Daoud Bijouterie',
  description: 'Découvrez notre collection de montres Guess, Festina, Daniel Cline, Guess Collection et Tommy Hilfiger chez Ben Daoud Bijouterie, Casablanca.',
}

export default async function MontresPage() {
  const montres = await getMontresLive()
  return <MontresClient montres={montres} />
}
