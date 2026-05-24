import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

// Apple CDN base — images served directly in browser
const CDN = 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is'
const CDN17 = 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is'
const Q = '?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1'

async function rebuildProduct(slug: string, colors: {color:string;colorCode:string;img:string}[], memories: {memory:string;price:number}[], sims: string[]) {
  const product = await prisma.product.findUnique({ where: { slug } })
  if (!product) { console.log(`NOT FOUND: ${slug}`); return }

  // Delete old variants and images
  await prisma.productVariant.deleteMany({ where: { productId: product.id } })
  await prisma.productImage.deleteMany({ where: { productId: product.id } })

  // Create images (one per color, first color is main)
  await prisma.productImage.createMany({
    data: colors.map((c, i) => ({
      productId: product.id,
      url: c.img,
      alt: `${product.name} ${c.color}`,
      sortOrder: i,
      isMain: i === 0,
    }))
  })

  // Create variants: color × memory × sim
  for (const c of colors) {
    for (const m of memories) {
      for (const s of sims) {
        await prisma.productVariant.create({ data: {
          productId: product.id,
          color: c.color,
          colorCode: c.colorCode,
          memory: m.memory,
          simType: s,
          price: new Prisma.Decimal(m.price),
          stock: 5,
          isActive: true,
        }})
      }
    }
  }

  // Update base price
  await prisma.product.update({ where: { id: product.id }, data: { price: new Prisma.Decimal(memories[0].price) } })
  console.log(`✓ ${slug}: ${colors.length} colors × ${memories.length} memories × ${sims.length} sims = ${colors.length * memories.length * sims.length} variants`)
}

async function main() {
  const sims = ['SIM+eSIM', 'eSIM']

  // ── iPhone 16 ────────────────────────────────────────────────────────────────
  await rebuildProduct('apple-iphone-16', [
    { color: 'Black',        colorCode: '#1c1c1e', img: `${CDN}/iphone16-black-select-202409${Q}` },
    { color: 'White',        colorCode: '#f5f5f7', img: `${CDN}/iphone16-white-select-202409${Q}` },
    { color: 'Pink',         colorCode: '#f2a7b0', img: `${CDN}/iphone16-pink-select-202409${Q}` },
    { color: 'Teal',         colorCode: '#4a9b8e', img: `${CDN}/iphone16-teal-select-202409${Q}` },
    { color: 'Ultramarine',  colorCode: '#3a5fa0', img: `${CDN}/iphone16-ultramarine-select-202409${Q}` },
  ], [
    { memory: '128 ГБ', price: 89990 },
    { memory: '256 ГБ', price: 99990 },
    { memory: '512 ГБ', price: 119990 },
  ], sims)

  // ── iPhone 16 Pro ────────────────────────────────────────────────────────────
  await rebuildProduct('apple-iphone-16-pro', [
    { color: 'Black Titanium',   colorCode: '#3a3a3c', img: `${CDN}/iphone16pro-blacktitanium-select-202409${Q}` },
    { color: 'White Titanium',   colorCode: '#f0ede8', img: `${CDN}/iphone16pro-whitetitanium-select-202409${Q}` },
    { color: 'Natural Titanium', colorCode: '#b5a898', img: `${CDN}/iphone16pro-naturaltitanium-select-202409${Q}` },
    { color: 'Desert Titanium',  colorCode: '#c8b89a', img: `${CDN}/iphone16pro-deserttitanium-select-202409${Q}` },
  ], [
    { memory: '128 ГБ', price: 119990 },
    { memory: '256 ГБ', price: 129990 },
    { memory: '512 ГБ', price: 149990 },
    { memory: '1 ТБ',   price: 169990 },
  ], sims)

  // ── iPhone 16 Pro Max ────────────────────────────────────────────────────────
  await rebuildProduct('apple-iphone-16-pro-max', [
    { color: 'Black Titanium',   colorCode: '#3a3a3c', img: `${CDN}/iphone16promax-blacktitanium-select-202409${Q}` },
    { color: 'White Titanium',   colorCode: '#f0ede8', img: `${CDN}/iphone16promax-whitetitanium-select-202409${Q}` },
    { color: 'Natural Titanium', colorCode: '#b5a898', img: `${CDN}/iphone16promax-naturaltitanium-select-202409${Q}` },
    { color: 'Desert Titanium',  colorCode: '#c8b89a', img: `${CDN}/iphone16promax-deserttitanium-select-202409${Q}` },
  ], [
    { memory: '256 ГБ', price: 129990 },
    { memory: '512 ГБ', price: 149990 },
    { memory: '1 ТБ',   price: 169990 },
  ], sims)

  // ── iPhone 17 ────────────────────────────────────────────────────────────────
  await rebuildProduct('apple-iphone-17', [
    { color: 'Black',     colorCode: '#1c1c1e', img: `${CDN17}/iphone17-black-select-202509${Q}` },
    { color: 'White',     colorCode: '#f5f5f7', img: `${CDN17}/iphone17-white-select-202509${Q}` },
    { color: 'Lavender',  colorCode: '#c8b8d8', img: `${CDN17}/iphone17-lavender-select-202509${Q}` },
    { color: 'Sage',      colorCode: '#8fad88', img: `${CDN17}/iphone17-sage-select-202509${Q}` },
    { color: 'Mist Blue', colorCode: '#8ab4c8', img: `${CDN17}/iphone17-mistblue-select-202509${Q}` },
  ], [
    { memory: '256 ГБ', price: 99990 },
    { memory: '512 ГБ', price: 109990 },
    { memory: '1 ТБ',   price: 129990 },
    { memory: '2 ТБ',   price: 149990 },
  ], sims)

  // ── iPhone 17 Pro ────────────────────────────────────────────────────────────
  await rebuildProduct('apple-iphone-17-pro', [
    { color: 'Orange',        colorCode: '#e8722a', img: `${CDN17}/iphone17pro-orange-select-202509${Q}` },
    { color: 'White / Silver', colorCode: '#e8e8e8', img: `${CDN17}/iphone17pro-white-select-202509${Q}` },
    { color: 'Blue',          colorCode: '#2c5f8a', img: `${CDN17}/iphone17pro-blue-select-202509${Q}` },
  ], [
    { memory: '256 ГБ', price: 139990 },
    { memory: '512 ГБ', price: 159990 },
    { memory: '1 ТБ',   price: 179990 },
    { memory: '2 ТБ',   price: 199990 },
  ], sims)

  // ── iPhone 17 Pro Max ────────────────────────────────────────────────────────
  await rebuildProduct('apple-iphone-17-pro-max', [
    { color: 'Orange',        colorCode: '#e8722a', img: `${CDN17}/iphone17promax-orange-select-202509${Q}` },
    { color: 'White / Silver', colorCode: '#e8e8e8', img: `${CDN17}/iphone17promax-white-select-202509${Q}` },
    { color: 'Blue',          colorCode: '#2c5f8a', img: `${CDN17}/iphone17promax-blue-select-202509${Q}` },
  ], [
    { memory: '256 ГБ', price: 159990 },
    { memory: '512 ГБ', price: 179990 },
    { memory: '1 ТБ',   price: 199990 },
    { memory: '2 ТБ',   price: 219990 },
  ], sims)

  console.log('\n✅ All done!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
