import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

async function fixColors(slug: string, colors: {old: string; new: string; code: string}[]) {
  const product = await prisma.product.findUnique({ where: { slug } })
  if (!product) { console.log(`NOT FOUND: ${slug}`); return }

  for (const c of colors) {
    const updated = await prisma.productVariant.updateMany({
      where: { productId: product.id, color: c.old },
      data: { color: c.new, colorCode: c.code }
    })
    await prisma.productImage.updateMany({
      where: { productId: product.id, alt: { contains: c.old } },
      data: { alt: `${product.name} ${c.new}` }
    })
    console.log(`  ${c.old} → ${c.new} (${updated.count} variants)`)
  }
  console.log(`✓ ${slug}`)
}

async function main() {
  // iPhone 17 Pro
  await fixColors('apple-iphone-17-pro', [
    { old: 'Orange',         new: 'Cosmic Orange', code: '#e8722a' },
    { old: 'White / Silver', new: 'Silver',         code: '#e8e8e8' },
    { old: 'Blue',           new: 'Deep Blue',      code: '#2c5f8a' },
  ])

  // iPhone 17 Pro Max
  await fixColors('apple-iphone-17-pro-max', [
    { old: 'Orange',         new: 'Cosmic Orange', code: '#e8722a' },
    { old: 'White / Silver', new: 'Silver',         code: '#e8e8e8' },
    { old: 'Blue',           new: 'Deep Blue',      code: '#2c5f8a' },
  ])

  // Also update colorMap in lib — just update DB names
  // iPhone 17 base colors — rename White to keep it consistent
  // (already correct: Black, White, Lavender, Sage, Mist Blue)

  console.log('\n✅ Done!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
