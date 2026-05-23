import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Updating categories...')

  // Update category names to English Apple-style + add images
  const updates = [
    { slug: 'smartphones', name: 'iPhone', image: '/products/17 Black.webp' },
    { slug: 'tablets',     name: 'iPad',   image: '/products/iPad.jpeg' },
    { slug: 'laptops',     name: 'Mac',    image: '/products/macbook.jpg' },
    { slug: 'accessories', name: 'AirPods & Watch', image: '/products/AirPods.jpg' },
  ]

  for (const u of updates) {
    await prisma.category.updateMany({
      where: { slug: u.slug },
      data: { name: u.name, image: u.image },
    })
    console.log(`  Updated category: ${u.slug} → ${u.name}`)
  }

  // ── Banner ────────────────────────────────────────────────────────────────────
  console.log('\nCreating banner...')
  const existingBanner = await prisma.banner.findFirst({ where: { isActive: true } })
  if (existingBanner) {
    await prisma.banner.update({
      where: { id: existingBanner.id },
      data: {
        title: 'iPhone 17 Pro Max',
        subtitle: 'Новинка 2025',
        imageDesktop: '/products/17 Pro Max Blue.webp',
        imageMobile: '/products/17 Pro Max Blue.webp',
        link: '/catalog/smartphones',
        buttonText: 'Купить iPhone',
        isActive: true,
        sortOrder: 0,
      },
    })
    console.log('  Updated existing banner')
  } else {
    await prisma.banner.create({
      data: {
        title: 'iPhone 17 Pro Max',
        subtitle: 'Новинка 2025',
        imageDesktop: '/products/17 Pro Max Blue.webp',
        imageMobile: '/products/17 Pro Max Blue.webp',
        link: '/catalog/smartphones',
        buttonText: 'Купить iPhone',
        isActive: true,
        sortOrder: 0,
      },
    })
    console.log('  Created new banner')
  }

  // ── Fix iPhone 17 variants (no 128GB) ─────────────────────────────────────────
  console.log('\nFixing iPhone 17 variants...')

  // iPhone 17 — remove 128GB variants, keep 256/512/1TB, add 2TB
  const iphone17 = await prisma.product.findUnique({ where: { slug: 'apple-iphone-17' } })
  if (iphone17) {
    // Delete all existing variants
    await prisma.productVariant.deleteMany({ where: { productId: iphone17.id } })
    // Recreate correct variants
    const colors17 = [
      { color: 'Чёрный',      colorCode: '#1c1c1e' },
      { color: 'Синий',       colorCode: '#5b8db8' },
      { color: 'Лавандовый',  colorCode: '#c8b8d8' },
      { color: 'Шалфей',      colorCode: '#8fad88' },
      { color: 'Белый',       colorCode: '#f5f5f7' },
    ]
    const memories17 = [
      { memory: '256 ГБ', price: 99990 },
      { memory: '512 ГБ', price: 109990 },
      { memory: '1 ТБ',   price: 129990 },
      { memory: '2 ТБ',   price: 149990 },
    ]
    for (const c of colors17) {
      for (const m of memories17) {
        await prisma.productVariant.create({
          data: {
            productId: iphone17.id,
            color: c.color,
            colorCode: c.colorCode,
            memory: m.memory,
            price: new Prisma.Decimal(m.price),
            stock: 5,
            isActive: true,
          },
        })
      }
    }
    // Update base price
    await prisma.product.update({ where: { id: iphone17.id }, data: { price: new Prisma.Decimal(99990) } })
    console.log('  Fixed iPhone 17 variants')
  }

  // iPhone 17 Pro — fix variants
  const iphone17pro = await prisma.product.findUnique({ where: { slug: 'apple-iphone-17-pro' } })
  if (iphone17pro) {
    await prisma.productVariant.deleteMany({ where: { productId: iphone17pro.id } })
    const colors17pro = [
      { color: 'Серебристый',    colorCode: '#e8e8e8' },
      { color: 'Чёрный титан',   colorCode: '#3a3a3c' },
      { color: 'Пустынный титан', colorCode: '#c8b89a' },
    ]
    const memories17pro = [
      { memory: '256 ГБ', price: 139990 },
      { memory: '512 ГБ', price: 159990 },
      { memory: '1 ТБ',   price: 179990 },
      { memory: '2 ТБ',   price: 199990 },
    ]
    for (const c of colors17pro) {
      for (const m of memories17pro) {
        await prisma.productVariant.create({
          data: {
            productId: iphone17pro.id,
            color: c.color,
            colorCode: c.colorCode,
            memory: m.memory,
            price: new Prisma.Decimal(m.price),
            stock: 4,
            isActive: true,
          },
        })
      }
    }
    await prisma.product.update({ where: { id: iphone17pro.id }, data: { price: new Prisma.Decimal(139990) } })
    console.log('  Fixed iPhone 17 Pro variants')
  }

  // iPhone 17 Pro Max — fix variants
  const iphone17promax = await prisma.product.findUnique({ where: { slug: 'apple-iphone-17-pro-max' } })
  if (iphone17promax) {
    await prisma.productVariant.deleteMany({ where: { productId: iphone17promax.id } })
    const colors17pm = [
      { color: 'Синий',      colorCode: '#2c5f8a' },
      { color: 'Оранжевый',  colorCode: '#e8722a' },
      { color: 'Белый титан', colorCode: '#f0ede8' },
      { color: 'Чёрный титан', colorCode: '#3a3a3c' },
    ]
    const memories17pm = [
      { memory: '256 ГБ', price: 159990 },
      { memory: '512 ГБ', price: 179990 },
      { memory: '1 ТБ',   price: 199990 },
      { memory: '2 ТБ',   price: 219990 },
    ]
    for (const c of colors17pm) {
      for (const m of memories17pm) {
        await prisma.productVariant.create({
          data: {
            productId: iphone17promax.id,
            color: c.color,
            colorCode: c.colorCode,
            memory: m.memory,
            price: new Prisma.Decimal(m.price),
            stock: 4,
            isActive: true,
          },
        })
      }
    }
    await prisma.product.update({ where: { id: iphone17promax.id }, data: { price: new Prisma.Decimal(159990) } })
    console.log('  Fixed iPhone 17 Pro Max variants')
  }

  // Also fix iPhone 16 variants (all colors × all memories)
  const iphone16 = await prisma.product.findUnique({ where: { slug: 'apple-iphone-16' } })
  if (iphone16) {
    await prisma.productVariant.deleteMany({ where: { productId: iphone16.id } })
    const colors16 = [
      { color: 'Чёрный',   colorCode: '#1c1c1e' },
      { color: 'Синий',    colorCode: '#4a90d9' },
      { color: 'Зелёный',  colorCode: '#4caf50' },
      { color: 'Розовый',  colorCode: '#f48fb1' },
      { color: 'Белый',    colorCode: '#f5f5f7' },
    ]
    const memories16 = [
      { memory: '128 ГБ', price: 89990 },
      { memory: '256 ГБ', price: 99990 },
      { memory: '512 ГБ', price: 119990 },
    ]
    for (const c of colors16) {
      for (const m of memories16) {
        await prisma.productVariant.create({
          data: {
            productId: iphone16.id,
            color: c.color,
            colorCode: c.colorCode,
            memory: m.memory,
            price: new Prisma.Decimal(m.price),
            stock: 6,
            isActive: true,
          },
        })
      }
    }
    console.log('  Fixed iPhone 16 variants')
  }

  // Fix iPhone 16 Pro Max variants
  const iphone16promax = await prisma.product.findUnique({ where: { slug: 'apple-iphone-16-pro-max' } })
  if (iphone16promax) {
    await prisma.productVariant.deleteMany({ where: { productId: iphone16promax.id } })
    const colors16pm = [
      { color: 'Чёрный титан',   colorCode: '#3a3a3c' },
      { color: 'Белый титан',    colorCode: '#f0ede8' },
      { color: 'Пустынный титан', colorCode: '#c8b89a' },
      { color: 'Натуральный титан', colorCode: '#b5a898' },
    ]
    const memories16pm = [
      { memory: '256 ГБ', price: 129990 },
      { memory: '512 ГБ', price: 149990 },
      { memory: '1 ТБ',   price: 169990 },
    ]
    for (const c of colors16pm) {
      for (const m of memories16pm) {
        await prisma.productVariant.create({
          data: {
            productId: iphone16promax.id,
            color: c.color,
            colorCode: c.colorCode,
            memory: m.memory,
            price: new Prisma.Decimal(m.price),
            stock: 4,
            isActive: true,
          },
        })
      }
    }
    console.log('  Fixed iPhone 16 Pro Max variants')
  }

  // Fix iPhone 16 Pro variants
  const iphone16pro = await prisma.product.findUnique({ where: { slug: 'apple-iphone-16-pro' } })
  if (iphone16pro) {
    await prisma.productVariant.deleteMany({ where: { productId: iphone16pro.id } })
    const colors16pro = [
      { color: 'Пустынный титан', colorCode: '#c8b89a' },
      { color: 'Чёрный титан',   colorCode: '#3a3a3c' },
      { color: 'Белый титан',    colorCode: '#f0ede8' },
      { color: 'Натуральный титан', colorCode: '#b5a898' },
    ]
    const memories16pro = [
      { memory: '128 ГБ', price: 119990 },
      { memory: '256 ГБ', price: 129990 },
      { memory: '512 ГБ', price: 149990 },
      { memory: '1 ТБ',   price: 169990 },
    ]
    for (const c of colors16pro) {
      for (const m of memories16pro) {
        await prisma.productVariant.create({
          data: {
            productId: iphone16pro.id,
            color: c.color,
            colorCode: c.colorCode,
            memory: m.memory,
            price: new Prisma.Decimal(m.price),
            stock: 4,
            isActive: true,
          },
        })
      }
    }
    console.log('  Fixed iPhone 16 Pro variants')
  }

  console.log('\n✅ All updates done!')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
