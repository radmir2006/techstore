import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding products...')

  // Создаём бренд Apple
  const apple = await prisma.brand.upsert({
    where: { slug: 'apple' },
    update: {},
    create: { name: 'Apple', slug: 'apple', isActive: true },
  })

  // Создаём категории
  const smartphones = await prisma.category.upsert({
    where: { slug: 'smartphones' },
    update: {},
    create: {
      name: 'Смартфоны',
      slug: 'smartphones',
      description: 'Смартфоны Apple iPhone',
      isActive: true,
      sortOrder: 1,
    },
  })

  const tablets = await prisma.category.upsert({
    where: { slug: 'tablets' },
    update: {},
    create: {
      name: 'Планшеты',
      slug: 'tablets',
      description: 'Планшеты Apple iPad',
      isActive: true,
      sortOrder: 2,
    },
  })

  const laptops = await prisma.category.upsert({
    where: { slug: 'laptops' },
    update: {},
    create: {
      name: 'Ноутбуки',
      slug: 'laptops',
      description: 'Ноутбуки Apple MacBook',
      isActive: true,
      sortOrder: 3,
    },
  })

  const accessories = await prisma.category.upsert({
    where: { slug: 'accessories' },
    update: {},
    create: {
      name: 'Аксессуары',
      slug: 'accessories',
      description: 'Аксессуары Apple',
      isActive: true,
      sortOrder: 4,
    },
  })

  // Вспомогательная функция создания товара
  async function createProduct(data: {
    name: string
    slug: string
    sku: string
    description: string
    shortDesc: string
    price: number
    oldPrice?: number
    categoryId: string
    brandId: string
    images: { url: string; alt: string; isMain: boolean }[]
    variants: { color: string; colorCode: string; memory: string; price: number; stock: number }[]
    characteristics: { name: string; value: string; group: string }[]
    isNew?: boolean
    isHit?: boolean
    isFeatured?: boolean
  }) {
    const existing = await prisma.product.findUnique({ where: { slug: data.slug } })
    if (existing) {
      console.log(`  Skipping existing: ${data.name}`)
      return existing
    }
    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        sku: data.sku,
        description: data.description,
        shortDesc: data.shortDesc,
        price: new Prisma.Decimal(data.price),
        oldPrice: data.oldPrice ? new Prisma.Decimal(data.oldPrice) : undefined,
        categoryId: data.categoryId,
        brandId: data.brandId,
        isActive: true,
        isNew: data.isNew ?? false,
        isHit: data.isHit ?? false,
        isFeatured: data.isFeatured ?? false,
        warranty: '12 месяцев',
        deliveryInfo: 'Доставка 1-2 дня',
        images: {
          create: data.images.map((img, i) => ({ ...img, sortOrder: i })),
        },
        variants: {
          create: data.variants.map(v => ({
            color: v.color,
            colorCode: v.colorCode,
            memory: v.memory,
            price: new Prisma.Decimal(v.price),
            stock: v.stock,
            isActive: true,
          })),
        },
        characteristics: {
          create: data.characteristics.map((c, i) => ({ ...c, sortOrder: i })),
        },
      },
    })
    console.log(`  Created: ${data.name}`)
    return product
  }

  // ─── iPhone 16 ───────────────────────────────────────────────────────────────
  console.log('\nCreating iPhone 16...')
  await createProduct({
    name: 'Apple iPhone 16',
    slug: 'apple-iphone-16',
    sku: 'IPHONE-16',
    description: 'Apple iPhone 16 — флагманский смартфон с чипом A18, улучшенной камерой 48 МП и поддержкой Apple Intelligence. Доступен в четырёх цветах.',
    shortDesc: 'Смартфон Apple с чипом A18 и камерой 48 МП',
    price: 89990,
    oldPrice: 99990,
    categoryId: smartphones.id,
    brandId: apple.id,
    isNew: true,
    isFeatured: true,
    images: [
      { url: '/products/16 black.jpg.webp', alt: 'iPhone 16 Black', isMain: true },
      { url: '/products/16 blue.jpg.webp', alt: 'iPhone 16 Blue', isMain: false },
      { url: '/products/16 green.jpg.webp', alt: 'iPhone 16 Green', isMain: false },
      { url: '/products/16 pink.jpg.webp', alt: 'iPhone 16 Pink', isMain: false },
      { url: '/products/16 white.jpg.webp', alt: 'iPhone 16 White', isMain: false },
    ],
    variants: [
      { color: 'Чёрный', colorCode: '#1c1c1e', memory: '128 ГБ', price: 89990, stock: 10 },
      { color: 'Чёрный', colorCode: '#1c1c1e', memory: '256 ГБ', price: 99990, stock: 8 },
      { color: 'Синий', colorCode: '#4a90d9', memory: '128 ГБ', price: 89990, stock: 7 },
      { color: 'Синий', colorCode: '#4a90d9', memory: '256 ГБ', price: 99990, stock: 5 },
      { color: 'Зелёный', colorCode: '#4caf50', memory: '128 ГБ', price: 89990, stock: 6 },
      { color: 'Розовый', colorCode: '#f48fb1', memory: '128 ГБ', price: 89990, stock: 9 },
      { color: 'Белый', colorCode: '#f5f5f7', memory: '128 ГБ', price: 89990, stock: 8 },
    ],
    characteristics: [
      { name: 'Процессор', value: 'Apple A18', group: 'Производительность' },
      { name: 'Оперативная память', value: '8 ГБ', group: 'Производительность' },
      { name: 'Дисплей', value: '6.1" Super Retina XDR OLED, 2556×1179', group: 'Дисплей' },
      { name: 'Частота обновления', value: '60 Гц', group: 'Дисплей' },
      { name: 'Основная камера', value: '48 МП + 12 МП', group: 'Камера' },
      { name: 'Фронтальная камера', value: '12 МП TrueDepth', group: 'Камера' },
      { name: 'Аккумулятор', value: '3561 мАч', group: 'Аккумулятор' },
      { name: 'Быстрая зарядка', value: '25 Вт', group: 'Аккумулятор' },
      { name: 'Беспроводная зарядка', value: 'MagSafe 25 Вт, Qi 15 Вт', group: 'Аккумулятор' },
      { name: 'Операционная система', value: 'iOS 18', group: 'Программное обеспечение' },
      { name: 'Разъём', value: 'USB-C', group: 'Подключение' },
      { name: '5G', value: 'Да', group: 'Подключение' },
      { name: 'Защита', value: 'IP68', group: 'Корпус' },
      { name: 'Размеры', value: '147.6 × 71.6 × 7.8 мм', group: 'Корпус' },
      { name: 'Вес', value: '170 г', group: 'Корпус' },
    ],
  })

  // ─── iPhone 16 Pro Max ───────────────────────────────────────────────────────
  console.log('\nCreating iPhone 16 Pro Max...')
  await createProduct({
    name: 'Apple iPhone 16 Pro Max',
    slug: 'apple-iphone-16-pro-max',
    sku: 'IPHONE-16-PRO-MAX',
    description: 'Apple iPhone 16 Pro Max — максимально мощный смартфон с чипом A18 Pro, камерой 48 МП с 5× оптическим зумом и дисплеем 6.9" ProMotion 120 Гц.',
    shortDesc: 'Флагман Apple с чипом A18 Pro и дисплеем 6.9"',
    price: 129990,
    oldPrice: 139990,
    categoryId: smartphones.id,
    brandId: apple.id,
    isNew: true,
    isFeatured: true,
    isHit: true,
    images: [
      { url: '/products/16 Pro Max Black.webp', alt: 'iPhone 16 Pro Max Black Titanium', isMain: true },
      { url: '/products/16 Pro Max White.webp', alt: 'iPhone 16 Pro Max White Titanium', isMain: false },
    ],
    variants: [
      { color: 'Чёрный титан', colorCode: '#3a3a3c', memory: '256 ГБ', price: 129990, stock: 8 },
      { color: 'Чёрный титан', colorCode: '#3a3a3c', memory: '512 ГБ', price: 149990, stock: 5 },
      { color: 'Чёрный титан', colorCode: '#3a3a3c', memory: '1 ТБ', price: 169990, stock: 3 },
      { color: 'Белый титан', colorCode: '#f0ede8', memory: '256 ГБ', price: 129990, stock: 7 },
      { color: 'Белый титан', colorCode: '#f0ede8', memory: '512 ГБ', price: 149990, stock: 4 },
    ],
    characteristics: [
      { name: 'Процессор', value: 'Apple A18 Pro', group: 'Производительность' },
      { name: 'Оперативная память', value: '8 ГБ', group: 'Производительность' },
      { name: 'Дисплей', value: '6.9" Super Retina XDR OLED ProMotion, 2868×1320', group: 'Дисплей' },
      { name: 'Частота обновления', value: '1–120 Гц', group: 'Дисплей' },
      { name: 'Основная камера', value: '48 МП + 48 МП + 12 МП', group: 'Камера' },
      { name: 'Оптический зум', value: '5×', group: 'Камера' },
      { name: 'Фронтальная камера', value: '12 МП TrueDepth', group: 'Камера' },
      { name: 'Аккумулятор', value: '4685 мАч', group: 'Аккумулятор' },
      { name: 'Быстрая зарядка', value: '27 Вт', group: 'Аккумулятор' },
      { name: 'Беспроводная зарядка', value: 'MagSafe 25 Вт, Qi 15 Вт', group: 'Аккумулятор' },
      { name: 'Операционная система', value: 'iOS 18', group: 'Программное обеспечение' },
      { name: 'Разъём', value: 'USB-C (USB 3)', group: 'Подключение' },
      { name: '5G', value: 'Да', group: 'Подключение' },
      { name: 'Защита', value: 'IP68', group: 'Корпус' },
      { name: 'Материал корпуса', value: 'Титан Grade 5', group: 'Корпус' },
      { name: 'Размеры', value: '163.0 × 77.6 × 8.25 мм', group: 'Корпус' },
      { name: 'Вес', value: '227 г', group: 'Корпус' },
    ],
  })

  // ─── iPhone 16 Pro ───────────────────────────────────────────────────────────
  console.log('\nCreating iPhone 16 Pro...')
  await createProduct({
    name: 'Apple iPhone 16 Pro',
    slug: 'apple-iphone-16-pro',
    sku: 'IPHONE-16-PRO',
    description: 'Apple iPhone 16 Pro — профессиональный смартфон с чипом A18 Pro, камерой 48 МП с 5× зумом и дисплеем 6.3" ProMotion 120 Гц.',
    shortDesc: 'Pro-смартфон Apple с чипом A18 Pro и дисплеем 6.3"',
    price: 119990,
    oldPrice: 129990,
    categoryId: smartphones.id,
    brandId: apple.id,
    isNew: true,
    images: [
      { url: '/products/16 Pro.webp', alt: 'iPhone 16 Pro Desert Titanium', isMain: true },
    ],
    variants: [
      { color: 'Пустынный титан', colorCode: '#c8b89a', memory: '128 ГБ', price: 119990, stock: 6 },
      { color: 'Пустынный титан', colorCode: '#c8b89a', memory: '256 ГБ', price: 129990, stock: 5 },
      { color: 'Пустынный титан', colorCode: '#c8b89a', memory: '512 ГБ', price: 149990, stock: 3 },
    ],
    characteristics: [
      { name: 'Процессор', value: 'Apple A18 Pro', group: 'Производительность' },
      { name: 'Оперативная память', value: '8 ГБ', group: 'Производительность' },
      { name: 'Дисплей', value: '6.3" Super Retina XDR OLED ProMotion, 2622×1206', group: 'Дисплей' },
      { name: 'Частота обновления', value: '1–120 Гц', group: 'Дисплей' },
      { name: 'Основная камера', value: '48 МП + 48 МП + 12 МП', group: 'Камера' },
      { name: 'Оптический зум', value: '5×', group: 'Камера' },
      { name: 'Фронтальная камера', value: '12 МП TrueDepth', group: 'Камера' },
      { name: 'Аккумулятор', value: '3582 мАч', group: 'Аккумулятор' },
      { name: 'Операционная система', value: 'iOS 18', group: 'Программное обеспечение' },
      { name: 'Разъём', value: 'USB-C (USB 3)', group: 'Подключение' },
      { name: '5G', value: 'Да', group: 'Подключение' },
      { name: 'Защита', value: 'IP68', group: 'Корпус' },
      { name: 'Материал корпуса', value: 'Титан Grade 5', group: 'Корпус' },
      { name: 'Размеры', value: '149.6 × 71.5 × 8.25 мм', group: 'Корпус' },
      { name: 'Вес', value: '199 г', group: 'Корпус' },
    ],
  })

  // ─── iPhone 17 ───────────────────────────────────────────────────────────────
  console.log('\nCreating iPhone 17...')
  await createProduct({
    name: 'Apple iPhone 17',
    slug: 'apple-iphone-17',
    sku: 'IPHONE-17',
    description: 'Apple iPhone 17 — новейший смартфон 2025 года с чипом A19, улучшенной системой камер и поддержкой Apple Intelligence нового поколения.',
    shortDesc: 'Новейший смартфон Apple 2025 года с чипом A19',
    price: 99990,
    categoryId: smartphones.id,
    brandId: apple.id,
    isNew: true,
    isFeatured: true,
    images: [
      { url: '/products/17 Black.webp', alt: 'iPhone 17 Black', isMain: true },
      { url: '/products/17 Blue.webp', alt: 'iPhone 17 Blue', isMain: false },
      { url: '/products/17 lavender.webp', alt: 'iPhone 17 Lavender', isMain: false },
      { url: '/products/17 Sage.webp', alt: 'iPhone 17 Sage', isMain: false },
      { url: '/products/17 White.webp', alt: 'iPhone 17 White', isMain: false },
    ],
    variants: [
      { color: 'Чёрный', colorCode: '#1c1c1e', memory: '128 ГБ', price: 99990, stock: 12 },
      { color: 'Чёрный', colorCode: '#1c1c1e', memory: '256 ГБ', price: 109990, stock: 8 },
      { color: 'Синий', colorCode: '#5b8db8', memory: '128 ГБ', price: 99990, stock: 10 },
      { color: 'Лавандовый', colorCode: '#c8b8d8', memory: '128 ГБ', price: 99990, stock: 9 },
      { color: 'Шалфей', colorCode: '#8fad88', memory: '128 ГБ', price: 99990, stock: 7 },
      { color: 'Белый', colorCode: '#f5f5f7', memory: '128 ГБ', price: 99990, stock: 11 },
    ],
    characteristics: [
      { name: 'Процессор', value: 'Apple A19', group: 'Производительность' },
      { name: 'Оперативная память', value: '8 ГБ', group: 'Производительность' },
      { name: 'Дисплей', value: '6.1" Super Retina XDR OLED, 2556×1179', group: 'Дисплей' },
      { name: 'Частота обновления', value: '60 Гц', group: 'Дисплей' },
      { name: 'Основная камера', value: '48 МП + 12 МП', group: 'Камера' },
      { name: 'Фронтальная камера', value: '12 МП TrueDepth', group: 'Камера' },
      { name: 'Аккумулятор', value: '3700 мАч', group: 'Аккумулятор' },
      { name: 'Операционная система', value: 'iOS 19', group: 'Программное обеспечение' },
      { name: 'Разъём', value: 'USB-C', group: 'Подключение' },
      { name: '5G', value: 'Да', group: 'Подключение' },
      { name: 'Защита', value: 'IP68', group: 'Корпус' },
      { name: 'Размеры', value: '147.6 × 71.6 × 7.8 мм', group: 'Корпус' },
      { name: 'Вес', value: '168 г', group: 'Корпус' },
    ],
  })

  // ─── iPhone 17 Pro ───────────────────────────────────────────────────────────
  console.log('\nCreating iPhone 17 Pro...')
  await createProduct({
    name: 'Apple iPhone 17 Pro',
    slug: 'apple-iphone-17-pro',
    sku: 'IPHONE-17-PRO',
    description: 'Apple iPhone 17 Pro — профессиональный смартфон 2025 года с чипом A19 Pro, революционной камерой и дисплеем ProMotion 120 Гц.',
    shortDesc: 'Pro-смартфон Apple 2025 с чипом A19 Pro',
    price: 139990,
    categoryId: smartphones.id,
    brandId: apple.id,
    isNew: true,
    isFeatured: true,
    images: [
      { url: '/products/17 Pro Silver.webp', alt: 'iPhone 17 Pro Silver', isMain: true },
      { url: '/products/iphone-17-pro-display.jpg', alt: 'iPhone 17 Pro Display', isMain: false },
    ],
    variants: [
      { color: 'Серебристый', colorCode: '#e8e8e8', memory: '256 ГБ', price: 139990, stock: 8 },
      { color: 'Серебристый', colorCode: '#e8e8e8', memory: '512 ГБ', price: 159990, stock: 5 },
      { color: 'Серебристый', colorCode: '#e8e8e8', memory: '1 ТБ', price: 179990, stock: 3 },
    ],
    characteristics: [
      { name: 'Процессор', value: 'Apple A19 Pro', group: 'Производительность' },
      { name: 'Оперативная память', value: '12 ГБ', group: 'Производительность' },
      { name: 'Дисплей', value: '6.3" Super Retina XDR OLED ProMotion, 2622×1206', group: 'Дисплей' },
      { name: 'Частота обновления', value: '1–120 Гц', group: 'Дисплей' },
      { name: 'Основная камера', value: '48 МП + 48 МП + 12 МП', group: 'Камера' },
      { name: 'Оптический зум', value: '5×', group: 'Камера' },
      { name: 'Фронтальная камера', value: '24 МП TrueDepth', group: 'Камера' },
      { name: 'Аккумулятор', value: '3800 мАч', group: 'Аккумулятор' },
      { name: 'Операционная система', value: 'iOS 19', group: 'Программное обеспечение' },
      { name: 'Разъём', value: 'USB-C (USB 3)', group: 'Подключение' },
      { name: '5G', value: 'Да', group: 'Подключение' },
      { name: 'Защита', value: 'IP68', group: 'Корпус' },
      { name: 'Материал корпуса', value: 'Титан Grade 5', group: 'Корпус' },
      { name: 'Вес', value: '195 г', group: 'Корпус' },
    ],
  })

  // ─── iPhone 17 Pro Max ───────────────────────────────────────────────────────
  console.log('\nCreating iPhone 17 Pro Max...')
  await createProduct({
    name: 'Apple iPhone 17 Pro Max',
    slug: 'apple-iphone-17-pro-max',
    sku: 'IPHONE-17-PRO-MAX',
    description: 'Apple iPhone 17 Pro Max — самый мощный смартфон Apple 2025 года с чипом A19 Pro, дисплеем 6.9" ProMotion и рекордной автономностью.',
    shortDesc: 'Самый мощный iPhone 2025 с дисплеем 6.9"',
    price: 159990,
    categoryId: smartphones.id,
    brandId: apple.id,
    isNew: true,
    isFeatured: true,
    isHit: true,
    images: [
      { url: '/products/17 Pro Max Blue.webp', alt: 'iPhone 17 Pro Max Blue', isMain: true },
      { url: '/products/17 Pro Max Orange.webp', alt: 'iPhone 17 Pro Max Orange', isMain: false },
    ],
    variants: [
      { color: 'Синий', colorCode: '#2c5f8a', memory: '256 ГБ', price: 159990, stock: 7 },
      { color: 'Синий', colorCode: '#2c5f8a', memory: '512 ГБ', price: 179990, stock: 5 },
      { color: 'Синий', colorCode: '#2c5f8a', memory: '1 ТБ', price: 199990, stock: 3 },
      { color: 'Оранжевый', colorCode: '#e8722a', memory: '256 ГБ', price: 159990, stock: 6 },
      { color: 'Оранжевый', colorCode: '#e8722a', memory: '512 ГБ', price: 179990, stock: 4 },
    ],
    characteristics: [
      { name: 'Процессор', value: 'Apple A19 Pro', group: 'Производительность' },
      { name: 'Оперативная память', value: '12 ГБ', group: 'Производительность' },
      { name: 'Дисплей', value: '6.9" Super Retina XDR OLED ProMotion, 2868×1320', group: 'Дисплей' },
      { name: 'Частота обновления', value: '1–120 Гц', group: 'Дисплей' },
      { name: 'Основная камера', value: '48 МП + 48 МП + 12 МП', group: 'Камера' },
      { name: 'Оптический зум', value: '5×', group: 'Камера' },
      { name: 'Фронтальная камера', value: '24 МП TrueDepth', group: 'Камера' },
      { name: 'Аккумулятор', value: '5000 мАч', group: 'Аккумулятор' },
      { name: 'Операционная система', value: 'iOS 19', group: 'Программное обеспечение' },
      { name: 'Разъём', value: 'USB-C (USB 3)', group: 'Подключение' },
      { name: '5G', value: 'Да', group: 'Подключение' },
      { name: 'Защита', value: 'IP68', group: 'Корпус' },
      { name: 'Материал корпуса', value: 'Титан Grade 5', group: 'Корпус' },
      { name: 'Размеры', value: '163.0 × 77.6 × 8.25 мм', group: 'Корпус' },
      { name: 'Вес', value: '225 г', group: 'Корпус' },
    ],
  })

  // ─── AirPods ─────────────────────────────────────────────────────────────────
  console.log('\nCreating AirPods...')
  await createProduct({
    name: 'Apple AirPods 4',
    slug: 'apple-airpods-4',
    sku: 'AIRPODS-4',
    description: 'Apple AirPods 4 — беспроводные наушники с активным шумоподавлением, чипом H2 и до 30 часов работы с зарядным кейсом.',
    shortDesc: 'Беспроводные наушники Apple с чипом H2',
    price: 19990,
    oldPrice: 22990,
    categoryId: accessories.id,
    brandId: apple.id,
    isHit: true,
    images: [
      { url: '/products/AirPods.jpg', alt: 'Apple AirPods 4', isMain: true },
    ],
    variants: [
      { color: 'Белый', colorCode: '#ffffff', memory: 'Без ANC', price: 19990, stock: 20 },
      { color: 'Белый', colorCode: '#ffffff', memory: 'С ANC', price: 24990, stock: 15 },
    ],
    characteristics: [
      { name: 'Чип', value: 'Apple H2', group: 'Производительность' },
      { name: 'Активное шумоподавление', value: 'Да (в версии с ANC)', group: 'Звук' },
      { name: 'Прозрачный режим', value: 'Да', group: 'Звук' },
      { name: 'Адаптивный звук', value: 'Да', group: 'Звук' },
      { name: 'Время работы наушников', value: 'До 6 часов', group: 'Аккумулятор' },
      { name: 'Время работы с кейсом', value: 'До 30 часов', group: 'Аккумулятор' },
      { name: 'Зарядка кейса', value: 'USB-C, MagSafe, Qi', group: 'Аккумулятор' },
      { name: 'Подключение', value: 'Bluetooth 5.3', group: 'Подключение' },
      { name: 'Управление', value: 'Сенсорное, голосовое Siri', group: 'Управление' },
      { name: 'Защита', value: 'IP54', group: 'Корпус' },
    ],
  })

  // ─── Apple Watch ─────────────────────────────────────────────────────────────
  console.log('\nCreating Apple Watch...')
  await createProduct({
    name: 'Apple Watch Series 10',
    slug: 'apple-watch-series-10',
    sku: 'WATCH-S10',
    description: 'Apple Watch Series 10 — самые тонкие умные часы Apple с дисплеем Always-On, датчиком ЭКГ, мониторингом сна и чипом S10.',
    shortDesc: 'Умные часы Apple с датчиком ЭКГ и Always-On дисплеем',
    price: 39990,
    oldPrice: 44990,
    categoryId: accessories.id,
    brandId: apple.id,
    isHit: true,
    images: [
      { url: '/products/AppleWatch.png', alt: 'Apple Watch Series 10', isMain: true },
    ],
    variants: [
      { color: 'Алюминий Midnight', colorCode: '#1c1c1e', memory: '42 мм', price: 39990, stock: 10 },
      { color: 'Алюминий Midnight', colorCode: '#1c1c1e', memory: '46 мм', price: 44990, stock: 8 },
      { color: 'Алюминий Starlight', colorCode: '#e8e0d0', memory: '42 мм', price: 39990, stock: 9 },
      { color: 'Алюминий Starlight', colorCode: '#e8e0d0', memory: '46 мм', price: 44990, stock: 7 },
    ],
    characteristics: [
      { name: 'Чип', value: 'Apple S10', group: 'Производительность' },
      { name: 'Дисплей', value: 'LTPO OLED Always-On Retina', group: 'Дисплей' },
      { name: 'ЭКГ', value: 'Да', group: 'Здоровье' },
      { name: 'Пульсоксиметр', value: 'Да', group: 'Здоровье' },
      { name: 'Мониторинг сна', value: 'Да', group: 'Здоровье' },
      { name: 'Датчик температуры', value: 'Да', group: 'Здоровье' },
      { name: 'GPS', value: 'Да', group: 'Навигация' },
      { name: 'Время работы', value: 'До 18 часов', group: 'Аккумулятор' },
      { name: 'Зарядка', value: 'Магнитная USB-C', group: 'Аккумулятор' },
      { name: 'Защита', value: 'WR50', group: 'Корпус' },
      { name: 'Операционная система', value: 'watchOS 11', group: 'Программное обеспечение' },
    ],
  })

  // ─── iPad ─────────────────────────────────────────────────────────────────────
  console.log('\nCreating iPad...')
  await createProduct({
    name: 'Apple iPad (10-е поколение)',
    slug: 'apple-ipad-10',
    sku: 'IPAD-10',
    description: 'Apple iPad 10-го поколения — универсальный планшет с чипом A14 Bionic, дисплеем 10.9" Liquid Retina и поддержкой Apple Pencil.',
    shortDesc: 'Планшет Apple с чипом A14 Bionic и дисплеем 10.9"',
    price: 49990,
    oldPrice: 54990,
    categoryId: tablets.id,
    brandId: apple.id,
    isHit: true,
    images: [
      { url: '/products/iPad.jpeg', alt: 'Apple iPad 10th generation', isMain: true },
    ],
    variants: [
      { color: 'Серебристый', colorCode: '#e8e8e8', memory: '64 ГБ Wi-Fi', price: 49990, stock: 10 },
      { color: 'Серебристый', colorCode: '#e8e8e8', memory: '256 ГБ Wi-Fi', price: 64990, stock: 7 },
      { color: 'Синий', colorCode: '#4a90d9', memory: '64 ГБ Wi-Fi', price: 49990, stock: 8 },
      { color: 'Розовый', colorCode: '#f48fb1', memory: '64 ГБ Wi-Fi', price: 49990, stock: 6 },
      { color: 'Жёлтый', colorCode: '#ffd54f', memory: '64 ГБ Wi-Fi', price: 49990, stock: 5 },
    ],
    characteristics: [
      { name: 'Процессор', value: 'Apple A14 Bionic', group: 'Производительность' },
      { name: 'Дисплей', value: '10.9" Liquid Retina IPS, 2360×1640', group: 'Дисплей' },
      { name: 'Основная камера', value: '12 МП', group: 'Камера' },
      { name: 'Фронтальная камера', value: '12 МП Ultra Wide', group: 'Камера' },
      { name: 'Аккумулятор', value: 'До 10 часов', group: 'Аккумулятор' },
      { name: 'Разъём', value: 'USB-C', group: 'Подключение' },
      { name: 'Wi-Fi', value: 'Wi-Fi 6 (802.11ax)', group: 'Подключение' },
      { name: 'Bluetooth', value: '5.2', group: 'Подключение' },
      { name: 'Apple Pencil', value: 'Apple Pencil (1-го поколения)', group: 'Совместимость' },
      { name: 'Операционная система', value: 'iPadOS 17', group: 'Программное обеспечение' },
      { name: 'Размеры', value: '248.6 × 179.5 × 7.0 мм', group: 'Корпус' },
      { name: 'Вес', value: '477 г', group: 'Корпус' },
    ],
  })

  // ─── MacBook ──────────────────────────────────────────────────────────────────
  console.log('\nCreating MacBook Air...')
  await createProduct({
    name: 'Apple MacBook Air 13" M3',
    slug: 'apple-macbook-air-13-m3',
    sku: 'MACBOOK-AIR-13-M3',
    description: 'Apple MacBook Air 13" с чипом M3 — самый популярный ноутбук Apple с дисплеем Liquid Retina 13.6", до 18 часов автономной работы и весом всего 1.24 кг.',
    shortDesc: 'Ноутбук Apple с чипом M3 и дисплеем 13.6"',
    price: 119990,
    oldPrice: 129990,
    categoryId: laptops.id,
    brandId: apple.id,
    isHit: true,
    isFeatured: true,
    images: [
      { url: '/products/macbook.jpg', alt: 'Apple MacBook Air 13 M3', isMain: true },
    ],
    variants: [
      { color: 'Midnight', colorCode: '#1c1c1e', memory: '8 ГБ / 256 ГБ', price: 119990, stock: 8 },
      { color: 'Midnight', colorCode: '#1c1c1e', memory: '8 ГБ / 512 ГБ', price: 139990, stock: 6 },
      { color: 'Midnight', colorCode: '#1c1c1e', memory: '16 ГБ / 512 ГБ', price: 159990, stock: 4 },
      { color: 'Starlight', colorCode: '#e8e0d0', memory: '8 ГБ / 256 ГБ', price: 119990, stock: 7 },
      { color: 'Space Gray', colorCode: '#86868b', memory: '8 ГБ / 256 ГБ', price: 119990, stock: 5 },
    ],
    characteristics: [
      { name: 'Процессор', value: 'Apple M3 (8-ядерный CPU)', group: 'Производительность' },
      { name: 'Графика', value: 'Apple M3 (10-ядерный GPU)', group: 'Производительность' },
      { name: 'Дисплей', value: '13.6" Liquid Retina IPS, 2560×1664, 224 ppi', group: 'Дисплей' },
      { name: 'Яркость', value: '500 нит', group: 'Дисплей' },
      { name: 'Камера', value: '1080p FaceTime HD', group: 'Камера' },
      { name: 'Время работы', value: 'До 18 часов', group: 'Аккумулятор' },
      { name: 'Зарядка', value: 'MagSafe 3, USB-C', group: 'Аккумулятор' },
      { name: 'Разъёмы', value: '2× Thunderbolt / USB 4, MagSafe 3, 3.5 мм', group: 'Подключение' },
      { name: 'Wi-Fi', value: 'Wi-Fi 6E (802.11ax)', group: 'Подключение' },
      { name: 'Bluetooth', value: '5.3', group: 'Подключение' },
      { name: 'Клавиатура', value: 'Magic Keyboard с Touch ID', group: 'Ввод' },
      { name: 'Операционная система', value: 'macOS Sequoia', group: 'Программное обеспечение' },
      { name: 'Размеры', value: '304.1 × 215.0 × 11.3 мм', group: 'Корпус' },
      { name: 'Вес', value: '1.24 кг', group: 'Корпус' },
    ],
  })

  console.log('\n✅ All products seeded successfully!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
