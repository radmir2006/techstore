import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Fix iPhone category image — use iPhone 17 Black (clean product shot)
  await prisma.category.updateMany({
    where: { slug: 'iphone' },
    data: { image: '/products/17 Black.webp' },
  })
  console.log('✓ iPhone category image updated')

  // Fix iPhone 16 images: Teal → green, Ultramarine → blue
  const iphone16 = await prisma.product.findUnique({
    where: { slug: 'apple-iphone-16' },
    include: { images: true }
  })
  if (iphone16) {
    // Update Teal image to green
    for (const img of iphone16.images) {
      if (img.alt?.includes('Teal')) {
        await prisma.productImage.update({
          where: { id: img.id },
          data: { url: '/products/16 green.jpg.webp' }
        })
        console.log('✓ Teal → /products/16 green.jpg.webp')
      }
      // Ultramarine stays blue
      if (img.alt?.includes('Ultramarine')) {
        await prisma.productImage.update({
          where: { id: img.id },
          data: { url: '/products/16 blue.jpg.webp' }
        })
        console.log('✓ Ultramarine → /products/16 blue.jpg.webp')
      }
    }
  }

  console.log('\n✅ Done!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
