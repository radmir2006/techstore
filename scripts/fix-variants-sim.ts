import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // ── iPhone 17 Pro Max: убрать Белый титан и Чёрный титан, добавить SIM ──────
  const iphone17pm = await prisma.product.findUnique({ where: { slug: 'apple-iphone-17-pro-max' } })
  if (iphone17pm) {
    await prisma.productVariant.deleteMany({ where: { productId: iphone17pm.id } })
    const colors = [
      { color: 'Синий',      colorCode: '#2c5f8a' },
      { color: 'Оранжевый',  colorCode: '#e8722a' },
    ]
    const memories = [
      { memory: '256 ГБ', price: 159990 },
      { memory: '512 ГБ', price: 179990 },
      { memory: '1 ТБ',   price: 199990 },
      { memory: '2 ТБ',   price: 219990 },
    ]
    const sims = ['SIM+eSIM', '1 SIM']
    for (const c of colors) for (const m of memories) for (const s of sims) {
      await prisma.productVariant.create({ data: {
        productId: iphone17pm.id, color: c.color, colorCode: c.colorCode,
        memory: m.memory, simType: s, price: new Prisma.Decimal(m.price), stock: 4, isActive: true,
      }})
    }
    console.log('Fixed iPhone 17 Pro Max')
  }

  // ── iPhone 17 Pro: убрать Белый титан и Чёрный титан, добавить SIM ──────────
  const iphone17pro = await prisma.product.findUnique({ where: { slug: 'apple-iphone-17-pro' } })
  if (iphone17pro) {
    await prisma.productVariant.deleteMany({ where: { productId: iphone17pro.id } })
    const colors = [
      { color: 'Серебристый',     colorCode: '#e8e8e8' },
      { color: 'Пустынный титан', colorCode: '#c8b89a' },
    ]
    const memories = [
      { memory: '256 ГБ', price: 139990 },
      { memory: '512 ГБ', price: 159990 },
      { memory: '1 ТБ',   price: 179990 },
      { memory: '2 ТБ',   price: 199990 },
    ]
    const sims = ['SIM+eSIM', '1 SIM']
    for (const c of colors) for (const m of memories) for (const s of sims) {
      await prisma.productVariant.create({ data: {
        productId: iphone17pro.id, color: c.color, colorCode: c.colorCode,
        memory: m.memory, simType: s, price: new Prisma.Decimal(m.price), stock: 4, isActive: true,
      }})
    }
    console.log('Fixed iPhone 17 Pro')
  }

  // ── iPhone 17: убрать Белый (дубль), добавить SIM ───────────────────────────
  const iphone17 = await prisma.product.findUnique({ where: { slug: 'apple-iphone-17' } })
  if (iphone17) {
    await prisma.productVariant.deleteMany({ where: { productId: iphone17.id } })
    const colors = [
      { color: 'Чёрный',     colorCode: '#1c1c1e' },
      { color: 'Синий',      colorCode: '#5b8db8' },
      { color: 'Лавандовый', colorCode: '#c8b8d8' },
      { color: 'Шалфей',     colorCode: '#8fad88' },
    ]
    const memories = [
      { memory: '256 ГБ', price: 99990 },
      { memory: '512 ГБ', price: 109990 },
      { memory: '1 ТБ',   price: 129990 },
      { memory: '2 ТБ',   price: 149990 },
    ]
    const sims = ['SIM+eSIM', '1 SIM']
    for (const c of colors) for (const m of memories) for (const s of sims) {
      await prisma.productVariant.create({ data: {
        productId: iphone17.id, color: c.color, colorCode: c.colorCode,
        memory: m.memory, simType: s, price: new Prisma.Decimal(m.price), stock: 5, isActive: true,
      }})
    }
    console.log('Fixed iPhone 17')
  }

  // ── iPhone 16: только 1 SIM (убрать дубль Белый) ────────────────────────────
  const iphone16 = await prisma.product.findUnique({ where: { slug: 'apple-iphone-16' } })
  if (iphone16) {
    await prisma.productVariant.deleteMany({ where: { productId: iphone16.id } })
    const colors = [
      { color: 'Чёрный',  colorCode: '#1c1c1e' },
      { color: 'Синий',   colorCode: '#4a90d9' },
      { color: 'Зелёный', colorCode: '#4caf50' },
      { color: 'Розовый', colorCode: '#f48fb1' },
      { color: 'Белый',   colorCode: '#f5f5f7' },
    ]
    const memories = [
      { memory: '128 ГБ', price: 89990 },
      { memory: '256 ГБ', price: 99990 },
      { memory: '512 ГБ', price: 119990 },
    ]
    for (const c of colors) for (const m of memories) {
      await prisma.productVariant.create({ data: {
        productId: iphone16.id, color: c.color, colorCode: c.colorCode,
        memory: m.memory, simType: '1 SIM', price: new Prisma.Decimal(m.price), stock: 6, isActive: true,
      }})
    }
    console.log('Fixed iPhone 16')
  }

  // ── iPhone 16 Pro: только 1 SIM ──────────────────────────────────────────────
  const iphone16pro = await prisma.product.findUnique({ where: { slug: 'apple-iphone-16-pro' } })
  if (iphone16pro) {
    await prisma.productVariant.deleteMany({ where: { productId: iphone16pro.id } })
    const colors = [
      { color: 'Пустынный титан',   colorCode: '#c8b89a' },
      { color: 'Чёрный титан',      colorCode: '#3a3a3c' },
      { color: 'Белый титан',       colorCode: '#f0ede8' },
      { color: 'Натуральный титан', colorCode: '#b5a898' },
    ]
    const memories = [
      { memory: '128 ГБ', price: 119990 },
      { memory: '256 ГБ', price: 129990 },
      { memory: '512 ГБ', price: 149990 },
      { memory: '1 ТБ',   price: 169990 },
    ]
    for (const c of colors) for (const m of memories) {
      await prisma.productVariant.create({ data: {
        productId: iphone16pro.id, color: c.color, colorCode: c.colorCode,
        memory: m.memory, simType: '1 SIM', price: new Prisma.Decimal(m.price), stock: 4, isActive: true,
      }})
    }
    console.log('Fixed iPhone 16 Pro')
  }

  // ── iPhone 16 Pro Max: только 1 SIM ─────────────────────────────────────────
  const iphone16pm = await prisma.product.findUnique({ where: { slug: 'apple-iphone-16-pro-max' } })
  if (iphone16pm) {
    await prisma.productVariant.deleteMany({ where: { productId: iphone16pm.id } })
    const colors = [
      { color: 'Чёрный титан',      colorCode: '#3a3a3c' },
      { color: 'Белый титан',       colorCode: '#f0ede8' },
      { color: 'Пустынный титан',   colorCode: '#c8b89a' },
      { color: 'Натуральный титан', colorCode: '#b5a898' },
    ]
    const memories = [
      { memory: '256 ГБ', price: 129990 },
      { memory: '512 ГБ', price: 149990 },
      { memory: '1 ТБ',   price: 169990 },
    ]
    for (const c of colors) for (const m of memories) {
      await prisma.productVariant.create({ data: {
        productId: iphone16pm.id, color: c.color, colorCode: c.colorCode,
        memory: m.memory, simType: '1 SIM', price: new Prisma.Decimal(m.price), stock: 4, isActive: true,
      }})
    }
    console.log('Fixed iPhone 16 Pro Max')
  }

  console.log('\n✅ All variants fixed!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
