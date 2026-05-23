import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = checkAdminAuth(request)
  if (authError) return authError

  try {
    const { status } = await request.json()
    const lead = await prisma.lead.update({
      where: { id: params.id },
      data: { status },
    })
    return NextResponse.json(lead)
  } catch (error) {
    console.error('Update lead status error:', error)
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 })
  }
}
