import { prisma } from '@/lib/prisma'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HeroBanner } from '@/components/HeroBanner'
import { CategoryGrid } from '@/components/CategoryGrid'
import { ProductGrid } from '@/components/ProductGrid'
import { Features } from '@/components/Features'
import { TradeInBlock } from '@/components/TradeInBlock'
import { ImeiCheckBlock } from '@/components/ImeiCheckBlock'
import { LazySection } from '@/components/LazySection'
import { ProductGridSkeleton } from '@/components/LoadingSkeleton'

// Отключаем кэширование для главной страницы
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getHomeData() {
  const [
    categories,
    banners,
    featuredProducts,
    newProducts,
  ] = await Promise.all([
    prisma.category.findMany({
      where: { isActive: true, parentId: null },
      orderBy: { sortOrder: 'asc' },
      take: 6,
    }),
    prisma.banner.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    }),
    prisma.product.findMany({
      where: { isActive: true, isFeatured: true },
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        variants: { select: { color: true, colorCode: true, memory: true, stock: true } },
      },
      orderBy: { sortOrder: 'asc' },
      take: 8,
    }),
    prisma.product.findMany({
      where: { isActive: true, isNew: true },
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        variants: { select: { color: true, colorCode: true, memory: true, stock: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 8,
    }),
  ])

  return {
    categories: categories.map(c => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      image: c.image,
    })),
    banners: banners.map(b => ({
      id: b.id,
      title: b.title,
      subtitle: b.subtitle,
      imageDesktop: b.imageDesktop,
      imageMobile: b.imageMobile,
      link: b.link,
      buttonText: b.buttonText,
    })),
    featuredProducts: featuredProducts.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: Number(p.price),
      oldPrice: p.oldPrice ? Number(p.oldPrice) : null,
      images: p.images,
      variants: p.variants,
      isFeatured: p.isFeatured,
      isNew: p.isNew,
      isHit: p.isHit,
    })),
    newProducts: newProducts.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: Number(p.price),
      oldPrice: p.oldPrice ? Number(p.oldPrice) : null,
      images: p.images,
      variants: p.variants,
      isNew: p.isNew,
    })),
  }
}

export default async function HomePage() {
  const data = await getHomeData()
  const heroBanner = data.banners[0]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Banner */}
        {heroBanner && (
          <section className="container-custom py-3 md:py-4">
            <HeroBanner banner={heroBanner} />
          </section>
        )}

        {/* Categories */}
        <section className="container-custom py-3 md:py-4">
          <h2 className="section-title mb-4">Категории</h2>
          <CategoryGrid categories={data.categories} />
        </section>

        {/* Featured Products - ПОДНЯТО ВЫШЕ */}
        {data.featuredProducts.length > 0 && (
          <section className="container-custom py-4 md:py-6">
            <ProductGrid 
              products={data.featuredProducts} 
              title="Популярные товары"
            />
          </section>
        )}

        {/* Trade-in */}
        <LazySection className="container-custom py-4 md:py-6">
          <TradeInBlock />
        </LazySection>

        {/* New Products */}
        {data.newProducts.length > 0 && (
          <LazySection 
            className="container-custom py-4 md:py-6"
            fallback={<ProductGridSkeleton count={8} />}
          >
            <ProductGrid 
              products={data.newProducts} 
              title="Новинки"
            />
          </LazySection>
        )}

        {/* IMEI Check */}
        <LazySection className="container-custom py-4 md:py-6">
          <ImeiCheckBlock />
        </LazySection>

        {/* Hit Products removed */}

        {/* Features */}
        <LazySection className="container-custom py-4 md:py-6">
          <Features />
        </LazySection>

        {/* SEO Text */}
        <section className="container-custom py-6 md:py-8">
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">
              Интернет-магазин техники Apple — TechStore
            </h2>
            <div className="text-gray-600 space-y-4 text-sm md:text-base">
              <p>
                TechStore — это премиум интернет-магазин оригинальной техники Apple, предлагающий широкий ассортимент iPhone, iPad, MacBook, AirPods, Apple Watch и аксессуаров. Мы специализируемся на продуктах Apple и гарантируем подлинность всех товаров с официальной гарантией производителя.
              </p>
              <p>
                В нашем каталоге представлены новейшие модели iPhone 17, iPhone 16, MacBook Pro и Air, iPad Pro, AirPods Pro и Apple Watch Series. Техника других брендов (Samsung, Sony, Google и др.) доступна под индивидуальный заказ — свяжитесь с нами для уточнения деталей.
              </p>
              <p>
                Наша команда специалистов поможет вам подобрать технику Apple под ваши задачи и бюджет, а быстрая доставка обеспечит получение заказа в кратчайшие сроки. Воспользуйтесь услугой Trade-in и обменяйте старый iPhone на новый с выгодой до 50 000 рублей. Проверьте оригинальность любого устройства Apple по IMEI или серийному номеру на нашем сайте.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-8 md:mt-12">
        <Footer />
      </footer>
    </div>
  )
}
