import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { getMaintenanceMode } from '@/lib/store'

async function checkMaintenance(): Promise<boolean> {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const res = await fetch(`${process.env.KV_REST_API_URL}/get/maintenance`, {
        headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
        cache: 'no-store',
      })
      const data = await res.json()
      return data.result === 'true'
    } catch {}
  }
  return getMaintenanceMode()
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const maintenance = await checkMaintenance()
  if (maintenance) redirect('/maintenance')

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
