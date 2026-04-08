import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { getMaintenanceMode } from '@/lib/store'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const maintenance = getMaintenanceMode()
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
