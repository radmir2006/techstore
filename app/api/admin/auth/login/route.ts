import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Введите email и пароль' }, { status: 400 })
    }

    // Проверяем хардкод-аккаунт из env
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@techstore.ru'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

    let isValid = false

    if (email === adminEmail && password === adminPassword) {
      isValid = true
    } else {
      // Проверяем пользователей с ролью ADMIN в БД
      const user = await prisma.user.findFirst({
        where: { email, role: 'ADMIN' },
        select: { id: true, passwordHash: true, role: true },
      })

      if (user && user.passwordHash) {
        isValid = await bcrypt.compare(password, user.passwordHash)
      }
    }

    if (!isValid) {
      return NextResponse.json({ error: 'Неверный email или пароль' }, { status: 401 })
    }

    // Устанавливаем cookie сессии
    const response = NextResponse.json({ ok: true })
    response.cookies.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    response.cookies.set('admin_email', email, {
      httpOnly: false, // читается на клиенте
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
