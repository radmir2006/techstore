import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// iPhone 16 — 5 distinct colors, we have: black, white, pink, blue, green
// Teal ≈ blue, Ultramarine ≈ blue (darker)
// iPhone 16 Pro — 4 titanium colors, we only have 1 Pro image
// iPhone 16 Pro Max — 4 titanium colors, we have Black and White

const colorImages: Record<string, Record<string, string>> = {
  'apple-iphone-16': {
    'Black':       '/products/16 black.jpg.webp',
    'White':       '/products/16 white.jpg.webp',
    'Pink':        '/products/16 pink.jpg.webp',
    'Teal':        '/products/16 blue.jpg.webp',
    'Ultramarine': '/products/16 blue.jpg.webp',
  },
  'apple-iphone-16-pro': {
    'Black Titanium':   '/products/16 Pro Max Black.webp',
    'White Titanium':   '/products/16 Pro Max White.webp',
    'Natural Titanium': '/products/16 Pro.webp',
    'Desert Titanium':  '/products/16 Pro.webp',
  },
  'apple-iphone-16-pro-max': {
    'Black Titanium':   '/products/16 Pro Max Black.webp',
    'White Titanium':   '/products/16 Pro Max White.webp',
    'Natural Titanium': '/products/16 Pro Max Black.webp',
    'Desert Titanium':  '/products/16 Pro Max White.webp',
  },
}

async function fixImages(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { variants: true }
  })
  if (!product) { console.log(`NOT FOUND: ${slug}`); return }

  const colors = [...new Set(product.variants.filter(v => v.color).map(v => v.color!))]
  const map = colorImages[slug]

  await prisma.productImage.deleteMany({ where: { productId: product.id } })

  let i = 0
  for (const color of colors) {
    const img = map[color] || '/products/16 Pro.webp'
    await prisma.productImage.create({
      data: {
        productId: product.id,
        url: img,
        alt: `${product.name} ${color}`,
        sortOrder: i,
        isMain: i === 0,
      }
    })
    console.log(`  ${color} → ${img}`)
    i++
  }
  console.log(`✓ ${slug}: ${i} images`)
}

async function main() {
  await fixImages('apple-iphone-16')
  await fixImages('apple-iphone-16-pro')
  await fixImages('apple-iphone-16-pro-max')
  console.log('\n✅ Done!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
