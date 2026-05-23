'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, ArrowLeft } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { OptimizedImage } from '@/components/OptimizedImage'
import { formatPrice } from '@/lib/utils'
import clsx from 'clsx'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  images: { url: string }[]
}

interface Category {
  id: string
  name: string
  slug: string
  image?: string | null
  products?: Product[]
  children?: Category[]
  _count?: { products: number }
}

export default function CatalogPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories')
        const data = await res.json()
        const cats: Category[] = data.categories || data || []
        setCategories(cats)
        if (cats.length > 0) setSelectedCategory(cats[0])
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Загрузка...</p>
        </div>
        <Footer />
      </div>
    )
  }

  const displayProducts = selectedCategory?.products || []
  const totalCount = selectedCategory?._count?.products ?? displayProducts.length

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="border-b border-gray-100">
          <div className="container-custom py-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-900 transition-colors">Главная</Link>
              <span>/</span>
              <span className="text-gray-900">Каталог</span>
            </div>
          </div>
        </div>

        <div className="container-custom py-8 md:py-12">
          <div className="mb-8">
            <h1 className="section-title mb-2">Каталог товаров</h1>
            <p className="text-gray-600">Выберите категорию и откройте для себя лучшие предложения</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl overflow-hidden sticky top-24 border border-gray-100">
                <div className="p-4 md:p-5 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">Категории</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat)}
                      className={clsx(
                        'w-full text-left px-4 md:px-5 py-3 md:py-4 transition-all duration-200 flex items-center justify-between group',
                        selectedCategory?.id === cat.id
                          ? 'bg-primary-50 text-primary-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      )}
                    >
                      <span className="text-sm md:text-base">{cat.name}</span>
                      <ChevronRight
                        size={18}
                        className={clsx(
                          'transition-transform duration-200',
                          selectedCategory?.id === cat.id ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-4">
              {selectedCategory ? (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                        {selectedCategory.name}
                      </h2>
                      <p className="text-gray-500 text-sm">{totalCount} товаров</p>
                    </div>
                    <Link
                      href={`/catalog/${selectedCategory.slug}`}
                      className="hidden md:flex items-center gap-2 text-sm text-primary-600 hover:underline font-medium"
                    >
                      Все товары
                      <ChevronRight size={16} />
                    </Link>
                  </div>

                  {displayProducts.length > 0 ? (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {displayProducts.map(product => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            className="group bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                          >
                            <div className="relative bg-gray-50" style={{ paddingBottom: '100%' }}>
                              {product.images[0] ? (
                                <OptimizedImage
                                  src={product.images[0].url}
                                  alt={product.name}
                                  fill
                                  className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                />
                              ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100" />
                              )}
                            </div>
                            <div className="p-3 flex flex-col flex-1">
                              <p className="text-xs text-gray-500 mb-1 line-clamp-2 flex-1">
                                {product.name}
                              </p>
                              <p className="text-sm font-semibold text-gray-900 mt-1">
                                {formatPrice(product.price)}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {totalCount > displayProducts.length && (
                        <div className="mt-6 text-center">
                          <Link
                            href={`/catalog/${selectedCategory.slug}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-700 transition-colors"
                          >
                            Смотреть все {totalCount} товаров
                            <ChevronRight size={16} />
                          </Link>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="bg-gray-50 rounded-2xl p-12 text-center border border-gray-100">
                      <p className="text-gray-500 mb-4">Товары не найдены</p>
                      <Link
                        href={`/catalog/${selectedCategory.slug}`}
                        className="text-primary-600 hover:underline text-sm"
                      >
                        Открыть каталог категории
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-12 text-center border border-gray-100">
                  <p className="text-gray-500">Выберите категорию</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <div className="border-t border-gray-100 py-6 md:py-8">
        <div className="container-custom">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-full transition-colors font-medium text-sm md:text-base"
          >
            <ArrowLeft size={18} />
            Вернуться на главную
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
