import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { COOKIE_NAME, createToken } from '@/lib/auth'
import { uploadImageToGitHub } from '@/lib/github'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

function isAdmin() {
  const token = cookies().get(COOKIE_NAME)
  return token?.value === createToken()
}

export async function POST(request: Request) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { base64, filename, mimeType } = await request.json()
  if (!base64 || !filename) return NextResponse.json({ error: 'Missing data' }, { status: 400 })

  // ── On Vercel: upload to GitHub public/uploads/ ──────────────────────────
  if (process.env.VERCEL) {
    const url = await uploadImageToGitHub(base64, filename)
    if (url) return NextResponse.json({ url })
    return NextResponse.json({ error: 'GitHub upload failed' }, { status: 500 })
  }

  // ── Local dev: save to public/uploads/ ───────────────────────────────────
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
  const buffer = Buffer.from(base64, 'base64')
  fs.writeFileSync(path.join(uploadsDir, filename), buffer)
  return NextResponse.json({ url: `/uploads/${filename}` })
}
