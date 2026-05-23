import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const r = await prisma.banner.updateMany({
    where: { isActive: true },
    data: {
      imageDesktop: '/products/iphone-17-pro-display.jpg',
      imageMobile: '/products/iphone-17-pro-display.jpg',
    },
  })
  console.log('Updated banners:', r.count)
}
main().catch(console.error).finally(() => prisma.$disconnect())
