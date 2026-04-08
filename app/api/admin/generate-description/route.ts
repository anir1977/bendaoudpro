import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: Request) {
  const { name, category, material, brand, gender } = await req.json()

  const productInfo = brand
    ? `Montre ${brand} - ${name}, pour ${gender === 'femme' ? 'femme' : 'homme'}`
    : `Bijou en or 18 carats - ${name}, catégorie: ${category}, matière: ${material || 'or 18 carats'}`

  const prompt = `Tu es un expert en joaillerie de luxe pour Ben Daoud Bijouterie à Casablanca, Maroc.
Rédige une description commerciale courte et élégante (2-3 phrases) en français pour ce produit:
${productInfo}

La description doit être sophistiquée, mettre en valeur le savoir-faire artisanal, et inciter à l'achat.
Ne pas mentionner de prix. Style raffiné et luxueux.`

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 200,
      messages: [{ role: 'user', content: prompt }],
    })

    const description = (message.content[0] as { type: string; text: string }).text
    return NextResponse.json({ description })
  } catch (error) {
    console.error('Anthropic API error:', error)
    return NextResponse.json({ error: 'Erreur lors de la génération' }, { status: 500 })
  }
}
