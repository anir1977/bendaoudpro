import { NextResponse } from 'next/server'
import { getBijoux, addBijou } from '@/lib/store'

export async function GET() {
  return NextResponse.json(getBijoux())
}

export async function POST(req: Request) {
  const data = await req.json()
  const id = `bij-${Date.now()}`
  addBijou({ ...data, id })
  return NextResponse.json({ success: true, id })
}
