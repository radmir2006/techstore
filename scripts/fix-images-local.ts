import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Map color → existing local image
// We use images already in public/products from the img folder
const colorImageMap: Record<string, string> = {
  // iPhone 16 — use existing webp files
  'iphone16-Black':        '/products/16 black.jpg.webp',
  'iphone16-White':        '/products/16 white.jpg.webp',
  'iphone16-Pink':         '/products/16 pink.jpg.webp',
  'iphone16-Teal':         '/products/16 blue.jpg.webp',       // closest available
  'iphone16-Ultramarine':  '/products/16 blue.jpg.webp',

  // iPhone 16 Pro
  'iphone16pro-Black Titanium':   '/products/16 Pro.webp',
  'iphone16pro-White Titanium':   '/products/16 Pro Max White.webp',
  'iphone16pro-Natural Titanium': '/products/16 Pro.webp',
  'iphone16pro-Desert Titanium':  '/products/16 Pro.webp',

  // iPhone 16 Pro Max
  'iphone16promax-Black Titanium':   '/products/16 Pro Max Black.webp',
  'iphone16promax-White Titanium':   '/products/16 Pro Max White.webp',
  'iphone16promax-Natural Titanium': '/products/16 Pro Max Black.webp',
  'iphone16promax-Desert Titanium':  '/products/16 Pro Max White.webp',

  // iPhone 17
  'iphone17-Black':     '/products/17 Black.webp',
  'iphone17-White':     '/products/17 White.webp',
  'iphone17-Lavender':  '/products/17 lavender.webp',
  'iphone17-Sage':      '/products/17 Sage.webp',
  'iphone17-Mist Blue': '/products/17 Blue.webp',

  // iPhone 17 Pro
  'iphone17pro-Orange':         '/products/17 Pro Max Orange.webp',
  'iphone17pro-White / Silver': '/products/17 Pro Silver.webp',
  'iphone17pro-Blue':           '/products/17 Pro Max Blue.webp',

  // iPhone 17 Pro Max
  'iphone17promax-Orange':         '/products/17 Pro Max Orange.webp',
  'iphone17promax-White / Silver': '/products/17 Pro Silver.webp',
  'iphone17promax-Blue':           '/products/17 Pro Max Blue.webp',
}

async function fixImages(slug: string, prefix: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { variants: true }
  })
  if (!product) { console.log(`NOT FOUND: ${slug}`); return }

  // Get unique colors
  const colors = [...new Set(product.variants.filter(v => v.color).map(v => v.color!))]

  // Delete old images
  await prisma.productImage.deleteMany({ where: { productId: product.id } })

  // Create one image per color
  let i = 0
  for (const color of colors) {
    const key = `${prefix}-${color}`
    const img = colorImageMap[key] || '/products/17 Black.webp'
    await prisma.productImage.create({
      data: {
        productId: product.id,
        url: img,
        alt: `${product.name} ${color}`,
        sortOrder: i,
        isMain: i === 0,
      }
    })
    i++
  }
  console.log(`✓ ${slug}: ${colors.length} images`)
}

async function main() {
  await fixImages('apple-iphone-16',         'iphone16')
  await fixImages('apple-iphone-16-pro',     'iphone16pro')
  await fixImages('apple-iphone-16-pro-max', 'iphone16promax')
  await fixImages('apple-iphone-17',         'iphone17')
  await fixImages('apple-iphone-17-pro',     'iphone17pro')
  await fixImages('apple-iphone-17-pro-max', 'iphone17promax')
  console.log('\n✅ Done!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
