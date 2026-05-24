import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Fix banner link to correct category slug
  await prisma.banner.updateMany({
    where: { isActive: true },
    data: { link: '/catalog/smartphones' }
  })
  console.log('Banner link → /catalog/smartphones')

  // Check and fix category slugs
  const cats = await prisma.category.findMany({ select: { id: true, name: true, slug: true } })
  console.log('Current categories:', cats)

  // Ensure smartphones slug exists (iphone category)
  const iphone = cats.find(c => c.slug === 'smartphones' || c.slug === 'iphone')
  if (iphone && iphone.slug !== 'smartphones') {
    // Keep smartphones slug for catalog URL compatibility
    // The catalog page maps smartphones → smartphones
    console.log('iPhone category slug:', iphone.slug)
  }
}

main().catch(console.error).finally(() => prisma.$disconnect())
