import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

// Teal and Ultramarine are different colors for iPhone 16
// Natural and Desert are different colors for iPhone 16 Pro/Pro Max
// Base models (16, 17) have no 2TB option

async function rebuildVariants(slug: string, colors: {color:string;colorCode:string}[], memories: {memory:string;price:number}[], sims: string[]) {
  const product = await prisma.product.findUnique({ where: { slug } })
  if (!product) { console.log(`NOT FOUND: ${slug}`); return }
  await prisma.productVariant.deleteMany({ where: { productId: product.id } })
  for (const c of colors) {
    for (const m of memories) {
      for (const s of sims) {
        await prisma.productVariant.create({ data: {
          productId: product.id, color: c.color, colorCode: c.colorCode,
          memory: m.memory, simType: s, price: new Prisma.Decimal(m.price), stock: 5, isActive: true,
        }})
      }
    }
  }
  await prisma.product.update({ where: { id: product.id }, data: { price: new Prisma.Decimal(memories[0].price) } })
  console.log(`✓ ${slug}: ${colors.length}×${memories.length}×${sims.length} = ${colors.length*memories.length*sims.length} variants`)
}

async function fixImages(slug: string, colorImages: Record<string,string>) {
  const product = await prisma.product.findUnique({ where: { slug }, include: { variants: true } })
  if (!product) return
  const colors = [...new Set(product.variants.filter(v=>v.color).map(v=>v.color!))]
  await prisma.productImage.deleteMany({ where: { productId: product.id } })
  let i = 0
  for (const color of colors) {
    const img = colorImages[color] || Object.values(colorImages)[0]
    await prisma.productImage.create({ data: { productId: product.id, url: img, alt: `${product.name} ${color}`, sortOrder: i, isMain: i===0 } })
    i++
  }
  console.log(`  images: ${i}`)
}

async function main() {
  const sims = ['SIM+eSIM', 'eSIM']

  // ── iPhone 16 — no 2TB, Teal and Ultramarine are different ──────────────────
  await rebuildVariants('apple-iphone-16', [
    { color: 'Black',        colorCode: '#1c1c1e' },
    { color: 'White',        colorCode: '#f5f5f7' },
    { color: 'Pink',         colorCode: '#f2a7b0' },
    { color: 'Teal',         colorCode: '#4a9b8e' },
    { color: 'Ultramarine',  colorCode: '#3a5fa0' },
  ], [
    { memory: '128 ГБ', price: 89990 },
    { memory: '256 ГБ', price: 99990 },
    { memory: '512 ГБ', price: 119990 },
  ], sims)
  await fixImages('apple-iphone-16', {
    'Black':       '/products/16 black.jpg.webp',
    'White':       '/products/16 white.jpg.webp',
    'Pink':        '/products/16 pink.jpg.webp',
    'Teal':        '/products/16 blue.jpg.webp',
    'Ultramarine': '/products/16 blue.jpg.webp',
  })

  // ── iPhone 16 Pro — Natural and Desert are different ────────────────────────
  await rebuildVariants('apple-iphone-16-pro', [
    { color: 'Black Titanium',   colorCode: '#3a3a3c' },
    { color: 'White Titanium',   colorCode: '#f0ede8' },
    { color: 'Natural Titanium', colorCode: '#b5a898' },
    { color: 'Desert Titanium',  colorCode: '#c8b89a' },
  ], [
    { memory: '128 ГБ', price: 119990 },
    { memory: '256 ГБ', price: 129990 },
    { memory: '512 ГБ', price: 149990 },
    { memory: '1 ТБ',   price: 169990 },
  ], sims)
  await fixImages('apple-iphone-16-pro', {
    'Black Titanium':   '/products/16 Pro Max Black.webp',
    'White Titanium':   '/products/16 Pro Max White.webp',
    'Natural Titanium': '/products/16 Pro.webp',
    'Desert Titanium':  '/products/16 Pro.webp',
  })

  // ── iPhone 16 Pro Max — Natural and Desert are different ────────────────────
  await rebuildVariants('apple-iphone-16-pro-max', [
    { color: 'Black Titanium',   colorCode: '#3a3a3c' },
    { color: 'White Titanium',   colorCode: '#f0ede8' },
    { color: 'Natural Titanium', colorCode: '#b5a898' },
    { color: 'Desert Titanium',  colorCode: '#c8b89a' },
  ], [
    { memory: '256 ГБ', price: 129990 },
    { memory: '512 ГБ', price: 149990 },
    { memory: '1 ТБ',   price: 169990 },
  ], sims)
  await fixImages('apple-iphone-16-pro-max', {
    'Black Titanium':   '/products/16 Pro Max Black.webp',
    'White Titanium':   '/products/16 Pro Max White.webp',
    'Natural Titanium': '/products/16 Pro.webp',
    'Desert Titanium':  '/products/16 Pro.webp',
  })

  // ── iPhone 17 — no 2TB ───────────────────────────────────────────────────────
  await rebuildVariants('apple-iphone-17', [
    { color: 'Black',     colorCode: '#1c1c1e' },
    { color: 'White',     colorCode: '#f5f5f7' },
    { color: 'Lavender',  colorCode: '#c8b8d8' },
    { color: 'Sage',      colorCode: '#8fad88' },
    { color: 'Mist Blue', colorCode: '#8ab4c8' },
  ], [
    { memory: '256 ГБ', price: 99990 },
    { memory: '512 ГБ', price: 109990 },
    { memory: '1 ТБ',   price: 129990 },
  ], sims)

  console.log('\n✅ All done!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
