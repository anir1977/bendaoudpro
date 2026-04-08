import { NextResponse } from 'next/server'
import { updateMontre, deleteMontre } from '@/lib/store'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  updateMontre(params.id, data)
  return NextResponse.json({ success: true })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  deleteMontre(params.id)
  return NextResponse.json({ success: true })
}
