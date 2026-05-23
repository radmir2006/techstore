import { NextRequest, NextResponse } from 'next/server'

export function checkAdminAuth(request: NextRequest): NextResponse | null {
  const session = request.cookies.get('admin_session')
  if (session?.value === 'authenticated') return null
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
