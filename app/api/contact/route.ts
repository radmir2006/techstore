import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { rateLimit, getClientIp, getUserAgent, normalizePhone } from '@/lib/rateLimit'

export const dynamic = 'force-dynamic'

const contactSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа').max(100),
  phone: z.string().min(10, 'Введите корректный номер телефона').max(18),
  email: z.string().email().optional().or(z.literal('')),
  message: z.string().max(2000).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Honeypot
    if (body.website && body.website.length > 0) {
      return NextResponse.json({ success: true })
    }

    // Rate limit
    const ip = getClientIp(request)
    const { success } = rateLimit({ windowMs: 60 * 1000, maxRequests: 3, key: `contact:${ip}` })
    if (!success) {
      return NextResponse.json({ error: 'Слишком много запросов. Попробуйте позже.' }, { status: 429 })
    }

    const result = contactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: 'Неверные данные', details: result.error.flatten() }, { status: 400 })
    }

    const { name, phone, email, message } = result.data

    // Сохраняем как Lead с типом contact
    await prisma.lead.create({
      data: {
        name,
        phone: normalizePhone(phone),
        email: email || null,
        comment: message || null,
        type: 'contact',
        source: 'contacts-page',
        ipAddress: ip,
        userAgent: getUserAgent(request),
      },
    })

    return NextResponse.json({ success: true, message: 'Сообщение отправлено!' })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
