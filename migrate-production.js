// Скрипт для применения миграции к production базе данных
// Использование: node migrate-production.js

const { PrismaClient } = require('@prisma/client')

async function migrate() {
  console.log('🚀 Начинаем миграцию...')
  
  // Используем DATABASE_URL из переменных окружения
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  })

  try {
    console.log('📊 Проверяем подключение к базе данных...')
    await prisma.$connect()
    console.log('✅ Подключение установлено')

    console.log('🔧 Применяем миграцию: добавление поля inStock...')
    
    // Выполняем SQL напрямую
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "inStock" BOOLEAN NOT NULL DEFAULT true;
    `)
    console.log('✅ Колонка inStock добавлена')

    await prisma.$executeRawUnsafe(`
      UPDATE "Product" SET "inStock" = true WHERE "inStock" IS NULL;
    `)
    console.log('✅ Значения обновлены')

    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "Product_inStock_idx" ON "Product"("inStock");
    `)
    console.log('✅ Индекс создан')

    // Проверяем результат
    const count = await prisma.product.count()
    const inStockCount = await prisma.product.count({ where: { inStock: true } })
    
    console.log('\n📈 Статистика:')
    console.log(`   Всего товаров: ${count}`)
    console.log(`   В наличии: ${inStockCount}`)
    
    console.log('\n✅ Миграция успешно применена!')
    console.log('🎉 Теперь сайт должен работать!')
    
  } catch (error) {
    console.error('❌ Ошибка при миграции:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

migrate()
