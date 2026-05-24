import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function updateSpecs(slug: string, specs: { name: string; value: string; group: string }[], description: string, shortDesc: string) {
  const product = await prisma.product.findUnique({ where: { slug } })
  if (!product) { console.log(`NOT FOUND: ${slug}`); return }

  // Delete old characteristics
  await prisma.productCharacteristic.deleteMany({ where: { productId: product.id } })

  // Create new
  await prisma.productCharacteristic.createMany({
    data: specs.map((s, i) => ({ ...s, productId: product.id, sortOrder: i }))
  })

  // Update description
  await prisma.product.update({
    where: { id: product.id },
    data: { description, shortDesc }
  })

  console.log(`✓ ${slug}: ${specs.length} specs updated`)
}

async function main() {
  // ── iPhone 17 Pro ────────────────────────────────────────────────────────────
  await updateSpecs(
    'apple-iphone-17-pro',
    [
      // Производительность
      { name: 'Процессор', value: 'Apple A19 Pro (3 нм)', group: 'Производительность' },
      { name: 'CPU', value: '6-ядерный (2 производительных + 4 эффективных)', group: 'Производительность' },
      { name: 'GPU', value: '6-ядерный с Neural Accelerators в каждом ядре', group: 'Производительность' },
      { name: 'Neural Engine', value: '16-ядерный', group: 'Производительность' },
      { name: 'Беспроводной чип', value: 'Apple N1 (Wi-Fi 7, Bluetooth 6, Thread)', group: 'Производительность' },
      // Дисплей
      { name: 'Дисплей', value: '6.3" Super Retina XDR OLED, 2622×1206, 460 ppi', group: 'Дисплей' },
      { name: 'Технология', value: 'ProMotion 1–120 Гц, Always-On', group: 'Дисплей' },
      { name: 'Яркость', value: 'До 3000 нит (пиковая на улице)', group: 'Дисплей' },
      { name: 'Защита дисплея', value: 'Ceramic Shield 2 (3× лучше устойчивость к царапинам)', group: 'Дисплей' },
      { name: 'Защита задней панели', value: 'Ceramic Shield 2 (4× лучше устойчивость к трещинам)', group: 'Дисплей' },
      // Камера
      { name: 'Основная камера', value: '48 МП Fusion (f/1.78, OIS)', group: 'Камера' },
      { name: 'Сверхширокоугольная', value: '48 МП Ultra Wide (f/2.2)', group: 'Камера' },
      { name: 'Телефото', value: '48 МП Telephoto, тетрапризма, 4× (100 мм) и 8× (200 мм)', group: 'Камера' },
      { name: 'Оптический зум', value: '4× и 8× (максимальный на iPhone)', group: 'Камера' },
      { name: 'Цифровой зум', value: 'До 40×', group: 'Камера' },
      { name: 'Фронтальная камера', value: '18 МП Center Stage, f/1.9, автофокус', group: 'Камера' },
      { name: 'Видео', value: '4K 120 fps Dolby Vision, ProRes RAW, Apple Log 2, Genlock', group: 'Камера' },
      // Аккумулятор
      { name: 'Время воспроизведения видео', value: 'До 33 часов', group: 'Аккумулятор' },
      { name: 'Быстрая зарядка', value: '50% за 20 мин (адаптер 40 Вт)', group: 'Аккумулятор' },
      { name: 'Беспроводная зарядка', value: 'MagSafe до 25 Вт, Qi2 15 Вт', group: 'Аккумулятор' },
      // Корпус
      { name: 'Материал корпуса', value: 'Алюминиевый монокорпус (авиационный сплав 7000-й серии)', group: 'Корпус' },
      { name: 'Защита', value: 'IP68 (6 м, 30 мин)', group: 'Корпус' },
      { name: 'Размеры', value: '150.0 × 71.9 × 8.75 мм', group: 'Корпус' },
      { name: 'Вес', value: '199 г', group: 'Корпус' },
      // Подключение
      { name: 'Разъём', value: 'USB-C (USB 3, до 10 Гбит/с)', group: 'Подключение' },
      { name: 'Wi-Fi', value: 'Wi-Fi 7 (802.11be)', group: 'Подключение' },
      { name: 'Bluetooth', value: 'Bluetooth 6.0', group: 'Подключение' },
      { name: '5G', value: 'Да', group: 'Подключение' },
      { name: 'SIM', value: 'eSIM (физическая SIM отсутствует)', group: 'Подключение' },
      // ПО
      { name: 'Операционная система', value: 'iOS 26', group: 'Программное обеспечение' },
      { name: 'Apple Intelligence', value: 'Да', group: 'Программное обеспечение' },
    ],
    'Apple iPhone 17 Pro — профессиональный смартфон 2025 года с алюминиевым монокорпусом, чипом A19 Pro, тремя камерами 48 МП и дисплеем 6.3" ProMotion 120 Гц. Первый iPhone с Ceramic Shield 2 на задней панели.',
    'Pro-смартфон Apple 2025 с чипом A19 Pro, алюминиевым корпусом и тремя камерами 48 МП'
  )

  // ── iPhone 17 Pro Max ────────────────────────────────────────────────────────
  await updateSpecs(
    'apple-iphone-17-pro-max',
    [
      // Производительность
      { name: 'Процессор', value: 'Apple A19 Pro (3 нм)', group: 'Производительность' },
      { name: 'CPU', value: '6-ядерный (2 производительных + 4 эффективных)', group: 'Производительность' },
      { name: 'GPU', value: '6-ядерный с Neural Accelerators в каждом ядре', group: 'Производительность' },
      { name: 'Neural Engine', value: '16-ядерный', group: 'Производительность' },
      { name: 'Беспроводной чип', value: 'Apple N1 (Wi-Fi 7, Bluetooth 6, Thread)', group: 'Производительность' },
      // Дисплей
      { name: 'Дисплей', value: '6.9" Super Retina XDR OLED, 2868×1320, 460 ppi', group: 'Дисплей' },
      { name: 'Технология', value: 'ProMotion 1–120 Гц, Always-On', group: 'Дисплей' },
      { name: 'Яркость', value: 'До 3000 нит (пиковая на улице)', group: 'Дисплей' },
      { name: 'Защита дисплея', value: 'Ceramic Shield 2 (3× лучше устойчивость к царапинам)', group: 'Дисплей' },
      { name: 'Защита задней панели', value: 'Ceramic Shield 2 (4× лучше устойчивость к трещинам)', group: 'Дисплей' },
      // Камера
      { name: 'Основная камера', value: '48 МП Fusion (f/1.78, OIS)', group: 'Камера' },
      { name: 'Сверхширокоугольная', value: '48 МП Ultra Wide (f/2.2)', group: 'Камера' },
      { name: 'Телефото', value: '48 МП Telephoto, тетрапризма, 4× (100 мм) и 8× (200 мм)', group: 'Камера' },
      { name: 'Оптический зум', value: '4× и 8× (максимальный на iPhone)', group: 'Камера' },
      { name: 'Цифровой зум', value: 'До 40×', group: 'Камера' },
      { name: 'Фронтальная камера', value: '18 МП Center Stage, f/1.9, автофокус', group: 'Камера' },
      { name: 'Видео', value: '4K 120 fps Dolby Vision, ProRes RAW, Apple Log 2, Genlock', group: 'Камера' },
      // Аккумулятор
      { name: 'Время воспроизведения видео', value: 'До 39 часов (рекорд для iPhone)', group: 'Аккумулятор' },
      { name: 'Быстрая зарядка', value: '50% за 20 мин (адаптер 40 Вт)', group: 'Аккумулятор' },
      { name: 'Беспроводная зарядка', value: 'MagSafe до 25 Вт, Qi2 15 Вт', group: 'Аккумулятор' },
      // Корпус
      { name: 'Материал корпуса', value: 'Алюминиевый монокорпус (авиационный сплав 7000-й серии)', group: 'Корпус' },
      { name: 'Защита', value: 'IP68 (6 м, 30 мин)', group: 'Корпус' },
      { name: 'Размеры', value: '163.9 × 77.9 × 8.75 мм', group: 'Корпус' },
      { name: 'Вес', value: '233 г', group: 'Корпус' },
      // Подключение
      { name: 'Разъём', value: 'USB-C (USB 3, до 10 Гбит/с)', group: 'Подключение' },
      { name: 'Wi-Fi', value: 'Wi-Fi 7 (802.11be)', group: 'Подключение' },
      { name: 'Bluetooth', value: 'Bluetooth 6.0', group: 'Подключение' },
      { name: '5G', value: 'Да', group: 'Подключение' },
      { name: 'SIM', value: 'eSIM (физическая SIM отсутствует)', group: 'Подключение' },
      // ПО
      { name: 'Операционная система', value: 'iOS 26', group: 'Программное обеспечение' },
      { name: 'Apple Intelligence', value: 'Да', group: 'Программное обеспечение' },
    ],
    'Apple iPhone 17 Pro Max — самый мощный iPhone 2025 года с алюминиевым монокорпусом, чипом A19 Pro, тремя камерами 48 МП и дисплеем 6.9" ProMotion 120 Гц. Рекордные 39 часов воспроизведения видео.',
    'Самый мощный iPhone 2025 с чипом A19 Pro, алюминиевым корпусом и дисплеем 6.9"'
  )

  console.log('\n✅ All done!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
