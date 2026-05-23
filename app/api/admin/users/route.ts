import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const authError = checkAdminAuth(request)
  if (authError) return authError
  try {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search') || ''
    const role = searchParams.get('role') || 'all'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = 20

    const where: any = {}
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ]
    }
    if (role !== 'all') {
      where.role = role
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          createdAt: true,
          _count: {
            select: { leads: true, favorites: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.user.count({ where }),
    ])

    return NextResponse.json({
      users,
      total,
      pages: Math.ceil(total / limit),
      page,
    })
  } catch (error) {
    console.error('Users API error:', error)
    return NextResponse.json({ error: 'Ошибка загрузки пользователей' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const authError = checkAdminAuth(request)
  if (authError) return authError
  try {
    const { userId, role } = await request.json()
    const validRoles = ['USER', 'ADMIN', 'MANAGER', 'CONTENT_MANAGER']
    if (!userId || !validRoles.includes(role)) {
      return NextResponse.json({ error: 'Неверные данные' }, { status: 400 })
    }
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: { id: true, name: true, email: true, role: true },
    })
    return NextResponse.json(user)
  } catch (error) {
    console.error('Update user role error:', error)
    return NextResponse.json({ error: 'Ошибка обновления роли' }, { status: 500 })
  }
}

