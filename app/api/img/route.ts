/**
 * Proxy d'images GitHub — contourne le blocage CORS de raw.githubusercontent.com
 * Les images uploadées via admin sont stockées sur GitHub et servies via ce proxy.
 */
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

const ALLOWED_PREFIX = 'https://raw.githubusercontent.com/anir1977/bendaoudpro/'

export async function GET(request: NextRequest) {
  const src = request.nextUrl.searchParams.get('src')

  if (!src) {
    return new NextResponse('Missing src', { status: 400 })
  }

  // Sécurité : uniquement notre repo GitHub
  if (!src.startsWith(ALLOWED_PREFIX)) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  try {
    const response = await fetch(src, {
      headers: {
        'User-Agent': 'BendaoudBijouterie/1.0',
        Accept: 'image/*',
      },
    })

    if (!response.ok) {
      return new NextResponse('Image introuvable', { status: response.status })
    }

    const blob = await response.blob()

    return new NextResponse(blob, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch {
    return new NextResponse('Erreur serveur', { status: 500 })
  }
}
