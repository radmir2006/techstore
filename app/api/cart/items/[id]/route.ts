import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// DELETE - Remove item from cart
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const itemId = params.id
    
    if (!itemId) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 })
    }
    
    const session = await getServerSession(authOptions)
    const sessionId = request.cookies.get('sessionId')?.value
    
    // Find the cart item
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true },
    })
    
    if (!cartItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }
    
    // Verify ownership
    const isOwner = session?.user?.id 
      ? cartItem.cart.userId === session.user.id
      : cartItem.cart.sessionId === sessionId
    
    if (!isOwner) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }
    
    // Delete the item
    await prisma.cartItem.delete({
      where: { id: itemId },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete cart item error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH - Update item quantity
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const itemId = params.id
    const body = await request.json()
    const { quantity } = body
    
    if (!itemId) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 })
    }
    
    if (!quantity || quantity < 1) {
      return NextResponse.json({ error: 'Valid quantity is required' }, { status: 400 })
    }
    
    const session = await getServerSession(authOptions)
    const sessionId = request.cookies.get('sessionId')?.value
    
    // Find the cart item
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true },
    })
    
    if (!cartItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }
    
    // Verify ownership
    const isOwner = session?.user?.id 
      ? cartItem.cart.userId === session.user.id
      : cartItem.cart.sessionId === sessionId
    
    if (!isOwner) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }
    
    // Update the quantity
    const updatedItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            oldPrice: true,
            images: {
              select: { url: true },
              take: 1,
            },
          },
        },
      },
    })
    
    return NextResponse.json({ success: true, item: updatedItem })
  } catch (error) {
    console.error('Update cart item error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
