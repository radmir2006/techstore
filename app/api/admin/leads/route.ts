import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const authError = checkAdminAuth(request)
  if (authError) return authError

  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const type = searchParams.get('type') // 'leads' | 'tradein' | 'all'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where = status && status !== 'all' ? { status: status as any } : {}

    // Если запрашиваем trade-in заявки
    if (type === 'tradein') {
      const [items, total] = await Promise.all([
        prisma.tradeInRequest.findMany({
          orderBy: { createdAt: 'desc' },
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.tradeInRequest.count(),
      ])
      return NextResponse.json({
        leads: items.map(t => ({
          id: t.id,
          name: t.name,
          phone: t.phone,
          email: null,
          comment: t.comment,
          status: t.status,
          type: 'trade-in',
          totalAmount: null,
          createdAt: t.createdAt,
          items: [],
          tradeInDetails: {
            brand: t.brand,
            model: t.model,
            condition: t.condition,
            memory: t.memory,
            estimatedPrice: t.estimatedPrice,
          },
        })),
        total,
        pages: Math.ceil(total / limit),
        page,
      })
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        include: {
          items: {
            include: {
              product: { select: { id: true, name: true, slug: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.lead.count({ where }),
    ])

    const response = NextResponse.json({
      leads: leads.map(lead => ({
        ...lead,
        totalAmount: lead.totalAmount ? Number(lead.totalAmount) : null,
      })),
      total,
      pages: Math.ceil(total / limit),
      page,
    })

    response.headers.set('Cache-Control', 'private, s-maxage=30, stale-while-revalidate=60')
    return response
  } catch (error) {
    console.error('Admin leads fetch error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch leads',
      leads: [],
      total: 0,
      pages: 0,
      page: 1
    }, { status: 500 })
  }
}
