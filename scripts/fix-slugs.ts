import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Update category slugs to match Header navigation
  await prisma.category.updateMany({ where: { slug: 'smartphones' }, data: { slug: 'iphone' } })
  await prisma.category.updateMany({ where: { slug: 'tablets' },     data: { slug: 'ipad' } })
  await prisma.category.updateMany({ where: { slug: 'laptops' },     data: { slug: 'mac' } })
  // airpods and apple-watch already correct

  // Update banner link
  await prisma.banner.updateMany({ where: { isActive: true }, data: { link: '/catalog/iphone' } })

  const cats = await prisma.category.findMany({ select: { name: true, slug: true } })
  console.log('Updated categories:', cats)
  console.log('✅ Done')
}

main().catch(console.error).finally(() => prisma.$disconnect())
