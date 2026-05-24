import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function updateSpecs(slug: string, specs: { name: string; value: string; group: string }[], description: string, shortDesc: string) {
  const product = await prisma.product.findUnique({ where: { slug } })
  if (!product) { console.log(`NOT FOUND: ${slug}`); return }
  await prisma.productCharacteristic.deleteMany({ where: { productId: product.id } })
  await prisma.productCharacteristic.createMany({
    data: specs.map((s, i) => ({ ...s, productId: product.id, sortOrder: i }))
  })
  await prisma.product.update({ where: { id: product.id }, data: { description, shortDesc } })
  console.log(`✓ ${slug}: ${specs.length} specs`)
}

async function main() {

  // ── iPhone 16 ────────────────────────────────────────────────────────────────
  // A18, 6.1", алюминий, Ceramic Shield, 48+12 МП, iOS 18
  await updateSpecs('apple-iphone-16', [
    { name: 'Процессор', value: 'Apple A18 (3 нм)', group: 'Производительность' },
    { name: 'CPU', value: '6-ядерный (2 производительных + 4 эффективных)', group: 'Производительность' },
    { name: 'GPU', value: '5-ядерный', group: 'Производительность' },
    { name: 'Neural Engine', value: '16-ядерный', group: 'Производительность' },
    { name: 'Дисплей', value: '6.1" Super Retina XDR OLED, 2556×1179, 460 ppi', group: 'Дисплей' },
    { name: 'Технология', value: '60 Гц, True Tone, P3 Wide Color', group: 'Дисплей' },
    { name: 'Яркость', value: 'До 2000 нит (пиковая на улице)', group: 'Дисплей' },
    { name: 'Защита дисплея', value: 'Ceramic Shield (передняя)', group: 'Дисплей' },
    { name: 'Основная камера', value: '48 МП Fusion (f/1.6, OIS, 26 мм)', group: 'Камера' },
    { name: 'Сверхширокоугольная', value: '12 МП Ultra Wide (f/2.2, 13 мм)', group: 'Камера' },
    { name: 'Оптический зум', value: '2× (цифровой до 5×)', group: 'Камера' },
    { name: 'Фронтальная камера', value: '12 МП TrueDepth (f/1.9, автофокус)', group: 'Камера' },
    { name: 'Видео', value: '4K 60 fps Dolby Vision, ProRes (с USB 3)', group: 'Камера' },
    { name: 'Camera Control', value: 'Да', group: 'Камера' },
    { name: 'Время воспроизведения видео', value: 'До 22 часов', group: 'Аккумулятор' },
    { name: 'Быстрая зарядка', value: '50% за 30 мин (адаптер 20 Вт)', group: 'Аккумулятор' },
    { name: 'Беспроводная зарядка', value: 'MagSafe до 25 Вт, Qi2 15 Вт', group: 'Аккумулятор' },
    { name: 'Материал корпуса', value: 'Алюминий, стекло с цветным покрытием', group: 'Корпус' },
    { name: 'Защита', value: 'IP68 (6 м, 30 мин)', group: 'Корпус' },
    { name: 'Размеры', value: '147.6 × 71.6 × 7.8 мм', group: 'Корпус' },
    { name: 'Вес', value: '170 г', group: 'Корпус' },
    { name: 'Разъём', value: 'USB-C (USB 2)', group: 'Подключение' },
    { name: 'Wi-Fi', value: 'Wi-Fi 7 (802.11be)', group: 'Подключение' },
    { name: 'Bluetooth', value: 'Bluetooth 5.3', group: 'Подключение' },
    { name: '5G', value: 'Да', group: 'Подключение' },
    { name: 'SIM', value: 'eSIM (физическая SIM отсутствует)', group: 'Подключение' },
    { name: 'Операционная система', value: 'iOS 18 (обновляется до iOS 26)', group: 'Программное обеспечение' },
    { name: 'Apple Intelligence', value: 'Да', group: 'Программное обеспечение' },
  ],
  'Apple iPhone 16 — смартфон с чипом A18, дисплеем 6.1" Super Retina XDR, камерой 48 МП и Camera Control. Алюминиевый корпус, IP68, MagSafe.',
  'Смартфон Apple с чипом A18, камерой 48 МП и Camera Control')

  // ── iPhone 16 Pro ────────────────────────────────────────────────────────────
  // A18 Pro, 6.3", титан Grade 5, Ceramic Shield, 48+48+12 МП, 5× зум
  await updateSpecs('apple-iphone-16-pro', [
    { name: 'Процессор', value: 'Apple A18 Pro (3 нм)', group: 'Производительность' },
    { name: 'CPU', value: '6-ядерный (2 производительных + 4 эффективных)', group: 'Производительность' },
    { name: 'GPU', value: '6-ядерный', group: 'Производительность' },
    { name: 'Neural Engine', value: '16-ядерный', group: 'Производительность' },
    { name: 'Дисплей', value: '6.3" Super Retina XDR OLED ProMotion, 2622×1206, 460 ppi', group: 'Дисплей' },
    { name: 'Технология', value: 'ProMotion 1–120 Гц, Always-On, True Tone', group: 'Дисплей' },
    { name: 'Яркость', value: 'До 2000 нит (пиковая на улице)', group: 'Дисплей' },
    { name: 'Защита дисплея', value: 'Ceramic Shield (передняя)', group: 'Дисплей' },
    { name: 'Основная камера', value: '48 МП Fusion (f/1.78, OIS, 24 мм)', group: 'Камера' },
    { name: 'Сверхширокоугольная', value: '48 МП Ultra Wide (f/2.2, 13 мм, макро)', group: 'Камера' },
    { name: 'Телефото', value: '12 МП Telephoto, тетрапризма, 5× (120 мм)', group: 'Камера' },
    { name: 'Оптический зум', value: '5× (цифровой до 25×)', group: 'Камера' },
    { name: 'Фронтальная камера', value: '12 МП TrueDepth (f/1.9, автофокус)', group: 'Камера' },
    { name: 'Видео', value: '4K 120 fps Dolby Vision, ProRes, Log Video', group: 'Камера' },
    { name: 'Camera Control', value: 'Да', group: 'Камера' },
    { name: 'Время воспроизведения видео', value: 'До 27 часов', group: 'Аккумулятор' },
    { name: 'Быстрая зарядка', value: '50% за 30 мин (адаптер 20 Вт)', group: 'Аккумулятор' },
    { name: 'Беспроводная зарядка', value: 'MagSafe до 25 Вт, Qi2 15 Вт', group: 'Аккумулятор' },
    { name: 'Материал корпуса', value: 'Титан Grade 5 (рамка), матовое стекло (задняя)', group: 'Корпус' },
    { name: 'Защита', value: 'IP68 (6 м, 30 мин)', group: 'Корпус' },
    { name: 'Размеры', value: '149.6 × 71.5 × 8.25 мм', group: 'Корпус' },
    { name: 'Вес', value: '199 г', group: 'Корпус' },
    { name: 'Разъём', value: 'USB-C (USB 3, до 10 Гбит/с)', group: 'Подключение' },
    { name: 'Wi-Fi', value: 'Wi-Fi 7 (802.11be)', group: 'Подключение' },
    { name: 'Bluetooth', value: 'Bluetooth 5.3', group: 'Подключение' },
    { name: '5G', value: 'Да', group: 'Подключение' },
    { name: 'SIM', value: 'eSIM (физическая SIM отсутствует)', group: 'Подключение' },
    { name: 'Операционная система', value: 'iOS 18 (обновляется до iOS 26)', group: 'Программное обеспечение' },
    { name: 'Apple Intelligence', value: 'Да', group: 'Программное обеспечение' },
  ],
  'Apple iPhone 16 Pro — профессиональный смартфон с чипом A18 Pro, титановым корпусом Grade 5, тремя камерами 48 МП и 5× оптическим зумом. Дисплей 6.3" ProMotion 120 Гц.',
  'Pro-смартфон Apple с чипом A18 Pro, титановым корпусом и 5× оптическим зумом')

  // ── iPhone 16 Pro Max ────────────────────────────────────────────────────────
  await updateSpecs('apple-iphone-16-pro-max', [
    { name: 'Процессор', value: 'Apple A18 Pro (3 нм)', group: 'Производительность' },
    { name: 'CPU', value: '6-ядерный (2 производительных + 4 эффективных)', group: 'Производительность' },
    { name: 'GPU', value: '6-ядерный', group: 'Производительность' },
    { name: 'Neural Engine', value: '16-ядерный', group: 'Производительность' },
    { name: 'Дисплей', value: '6.9" Super Retina XDR OLED ProMotion, 2868×1320, 460 ppi', group: 'Дисплей' },
    { name: 'Технология', value: 'ProMotion 1–120 Гц, Always-On, True Tone', group: 'Дисплей' },
    { name: 'Яркость', value: 'До 2000 нит (пиковая на улице)', group: 'Дисплей' },
    { name: 'Защита дисплея', value: 'Ceramic Shield (передняя)', group: 'Дисплей' },
    { name: 'Основная камера', value: '48 МП Fusion (f/1.78, OIS, 24 мм)', group: 'Камера' },
    { name: 'Сверхширокоугольная', value: '48 МП Ultra Wide (f/2.2, 13 мм, макро)', group: 'Камера' },
    { name: 'Телефото', value: '12 МП Telephoto, тетрапризма, 5× (120 мм)', group: 'Камера' },
    { name: 'Оптический зум', value: '5× (цифровой до 25×)', group: 'Камера' },
    { name: 'Фронтальная камера', value: '12 МП TrueDepth (f/1.9, автофокус)', group: 'Камера' },
    { name: 'Видео', value: '4K 120 fps Dolby Vision, ProRes, Log Video', group: 'Камера' },
    { name: 'Camera Control', value: 'Да', group: 'Камера' },
    { name: 'Время воспроизведения видео', value: 'До 33 часов', group: 'Аккумулятор' },
    { name: 'Быстрая зарядка', value: '50% за 30 мин (адаптер 20 Вт)', group: 'Аккумулятор' },
    { name: 'Беспроводная зарядка', value: 'MagSafe до 25 Вт, Qi2 15 Вт', group: 'Аккумулятор' },
    { name: 'Материал корпуса', value: 'Титан Grade 5 (рамка), матовое стекло (задняя)', group: 'Корпус' },
    { name: 'Защита', value: 'IP68 (6 м, 30 мин)', group: 'Корпус' },
    { name: 'Размеры', value: '163.0 × 77.6 × 8.25 мм', group: 'Корпус' },
    { name: 'Вес', value: '227 г', group: 'Корпус' },
    { name: 'Разъём', value: 'USB-C (USB 3, до 10 Гбит/с)', group: 'Подключение' },
    { name: 'Wi-Fi', value: 'Wi-Fi 7 (802.11be)', group: 'Подключение' },
    { name: 'Bluetooth', value: 'Bluetooth 5.3', group: 'Подключение' },
    { name: '5G', value: 'Да', group: 'Подключение' },
    { name: 'SIM', value: 'eSIM (физическая SIM отсутствует)', group: 'Подключение' },
    { name: 'Операционная система', value: 'iOS 18 (обновляется до iOS 26)', group: 'Программное обеспечение' },
    { name: 'Apple Intelligence', value: 'Да', group: 'Программное обеспечение' },
  ],
  'Apple iPhone 16 Pro Max — флагман с чипом A18 Pro, титановым корпусом Grade 5, тремя камерами 48 МП и 5× оптическим зумом. Дисплей 6.9" ProMotion 120 Гц, до 33 часов видео.',
  'Флагман Apple с чипом A18 Pro, титановым корпусом и дисплеем 6.9"')

  // ── iPhone 17 ────────────────────────────────────────────────────────────────
  // A19, 6.3", алюминий, Ceramic Shield, 48+48 МП, ProMotion 120 Гц
  await updateSpecs('apple-iphone-17', [
    { name: 'Процессор', value: 'Apple A19 (3 нм)', group: 'Производительность' },
    { name: 'CPU', value: '6-ядерный (2 производительных + 4 эффективных)', group: 'Производительность' },
    { name: 'GPU', value: '5-ядерный с Neural Accelerators', group: 'Производительность' },
    { name: 'Neural Engine', value: '16-ядерный', group: 'Производительность' },
    { name: 'Беспроводной чип', value: 'Apple N1 (Wi-Fi 7, Bluetooth 6, Thread)', group: 'Производительность' },
    { name: 'Дисплей', value: '6.3" Super Retina XDR OLED, 2622×1206, 460 ppi', group: 'Дисплей' },
    { name: 'Технология', value: 'ProMotion 1–120 Гц, Always-On, True Tone', group: 'Дисплей' },
    { name: 'Яркость', value: 'До 3000 нит (пиковая на улице)', group: 'Дисплей' },
    { name: 'Защита дисплея', value: 'Ceramic Shield (передняя)', group: 'Дисплей' },
    { name: 'Основная камера', value: '48 МП Fusion (f/1.6, OIS)', group: 'Камера' },
    { name: 'Сверхширокоугольная', value: '48 МП Ultra Wide (f/2.2, макро)', group: 'Камера' },
    { name: 'Оптический зум', value: '2× (цифровой до 5×)', group: 'Камера' },
    { name: 'Фронтальная камера', value: '18 МП Center Stage (f/1.9, автофокус)', group: 'Камера' },
    { name: 'Видео', value: '4K 60 fps Dolby Vision', group: 'Камера' },
    { name: 'Camera Control', value: 'Да', group: 'Камера' },
    { name: 'Время воспроизведения видео', value: 'До 30 часов', group: 'Аккумулятор' },
    { name: 'Быстрая зарядка', value: '50% за 20 мин (адаптер 40 Вт)', group: 'Аккумулятор' },
    { name: 'Беспроводная зарядка', value: 'MagSafe до 25 Вт, Qi2 15 Вт', group: 'Аккумулятор' },
    { name: 'Материал корпуса', value: 'Алюминий, Ceramic Shield (задняя)', group: 'Корпус' },
    { name: 'Защита', value: 'IP68 (6 м, 30 мин)', group: 'Корпус' },
    { name: 'Размеры', value: '149.6 × 71.5 × 7.8 мм', group: 'Корпус' },
    { name: 'Вес', value: '170 г', group: 'Корпус' },
    { name: 'Разъём', value: 'USB-C (USB 2)', group: 'Подключение' },
    { name: 'Wi-Fi', value: 'Wi-Fi 7 (802.11be)', group: 'Подключение' },
    { name: 'Bluetooth', value: 'Bluetooth 6.0', group: 'Подключение' },
    { name: '5G', value: 'Да', group: 'Подключение' },
    { name: 'SIM', value: 'eSIM (физическая SIM отсутствует)', group: 'Подключение' },
    { name: 'Операционная система', value: 'iOS 26', group: 'Программное обеспечение' },
    { name: 'Apple Intelligence', value: 'Да', group: 'Программное обеспечение' },
  ],
  'Apple iPhone 17 — смартфон 2025 года с чипом A19, дисплеем 6.3" ProMotion 120 Гц, двумя камерами 48 МП и новой 18 МП фронтальной камерой Center Stage. Алюминиевый корпус, Ceramic Shield спереди и сзади.',
  'Смартфон Apple 2025 с чипом A19, ProMotion 120 Гц и двумя камерами 48 МП')

  console.log('\n✅ All done!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
