'use client'

import Link from 'next/link'
import { memo } from 'react'
import { OptimizedImage } from './OptimizedImage'

interface Category {
  id: string
  name: string
  slug: string
  image?: string | null
}

interface CategoryGridProps {
  categories: Category[]
}

export const CategoryGrid = memo(function CategoryGrid({ categories }: CategoryGridProps) {
  // v2.0 - Fixed image display with object-contain
  // Проверяем что categories является массивом
  if (!Array.isArray(categories)) {
    console.error('CategoryGrid: categories is not an array:', categories)
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Категории не найдены</p>
      </div>
    )
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Категории не найдены</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
      {categories.map((category, index) => (
        <Link
          key={category.id}
          href={`/catalog/${category.slug}`}
          className="group relative bg-white rounded-2xl overflow-hidden aspect-square border border-gray-200 hover:border-gray-300 transition-all hover:shadow-md"
        >
          {category.image ? (
            <OptimizedImage
              src={category.image}
              alt={category.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="category-image group-hover:scale-105 transition-transform duration-300"
              quality={80}
              priority={index < 3}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100" />
          )}
          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
            <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg inline-block">
              <h3 className="text-gray-900 text-sm md:text-base font-semibold">
                {category.name}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
})
