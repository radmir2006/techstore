import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Rename existing accessories → AirPods
  await prisma.category.updateMany({
    where: { slug: 'accessories' },
    data: {
      name: 'AirPods',
      slug: 'airpods',
      image: '/products/AirPods.jpg',
      sortOrder: 4,
    },
  })
  console.log('Renamed accessories → AirPods')

  // Move AirPods product to airpods category
  const airpodsCategory = await prisma.category.findUnique({ where: { slug: 'airpods' } })
  if (airpodsCategory) {
    await prisma.product.updateMany({
      where: { slug: 'apple-airpods-4' },
      data: { categoryId: airpodsCategory.id },
    })
    console.log('Moved AirPods product to airpods category')
  }

  // Create Apple Watch category
  const existing = await prisma.category.findUnique({ where: { slug: 'apple-watch' } })
  if (!existing) {
    const watchCat = await prisma.category.create({
      data: {
        name: 'Apple Watch',
        slug: 'apple-watch',
        description: 'Умные часы Apple Watch',
        image: '/products/AppleWatch.png',
        isActive: true,
        sortOrder: 5,
      },
    })
    console.log('Created Apple Watch category:', watchCat.id)

    // Move Apple Watch product to new category
    await prisma.product.updateMany({
      where: { slug: 'apple-watch-series-10' },
      data: { categoryId: watchCat.id },
    })
    console.log('Moved Apple Watch product to apple-watch category')
  } else {
    console.log('Apple Watch category already exists')
    await prisma.product.updateMany({
      where: { slug: 'apple-watch-series-10' },
      data: { categoryId: existing.id },
    })
  }

  console.log('\n✅ Done!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
