import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔧 Исправление изображений категорий...')

  // Обновляем изображения категорий
  const updates = [
    { 
      slug: 'iphone', 
      name: 'iPhone', 
      image: '/products/17 Black.webp' 
    },
    { 
      slug: 'ipad', 
      name: 'iPad', 
      image: '/products/iPad.jpeg' 
    },
    { 
      slug: 'mac', 
      name: 'Mac', 
      image: '/products/macbook.jpg' 
    },
    { 
      slug: 'airpods', 
      name: 'AirPods', 
      image: '/products/airpods.jpg' 
    },
    { 
      slug: 'apple-watch', 
      name: 'Apple Watch', 
      image: '/products/apple-watch.jpg' 
    },
    { 
      slug: 'accessories', 
      name: 'Аксессуары', 
      image: '/products/accessories.jpg' 
    },
  ]

  for (const update of updates) {
    const result = await prisma.category.updateMany({
      where: { slug: update.slug },
      data: { 
        name: update.name,
        image: update.image 
      },
    })
    
    if (result.count > 0) {
      console.log(`✓ ${update.name}: ${update.image}`)
    } else {
      console.log(`⚠ ${update.name}: категория не найдена`)
    }
  }

  console.log('\n✅ Изображения категорий обновлены!')
}

main()
  .catch((e) => {
    console.error('❌ Ошибка:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
