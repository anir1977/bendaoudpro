import { NextResponse } from 'next/server'
import { updateBijou, deleteBijou } from '@/lib/store'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  updateBijou(params.id, data)
  return NextResponse.json({ success: true })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  deleteBijou(params.id)
  return NextResponse.json({ success: true })
}
