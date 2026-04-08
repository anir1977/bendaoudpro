import { NextResponse } from 'next/server'
import { ADMIN_USER, ADMIN_PASS, COOKIE_NAME, createToken } from '@/lib/auth'

export async function POST(req: Request) {
  const { username, password } = await req.json()

  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 })
  }

  const res = NextResponse.json({ success: true })
  res.cookies.set(COOKIE_NAME, createToken(), {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 jours
    sameSite: 'lax',
  })
  return res
}
