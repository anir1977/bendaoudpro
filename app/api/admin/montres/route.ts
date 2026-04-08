import { NextResponse } from 'next/server'
import { getMontres, addMontre } from '@/lib/store'

export async function GET() {
  return NextResponse.json(getMontres())
}

export async function POST(req: Request) {
  const data = await req.json()
  const id = `mon-${Date.now()}`
  addMontre({ ...data, id })
  return NextResponse.json({ success: true, id })
}
