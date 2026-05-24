'use client'

import { useState, useCallback } from 'react'
import { ProductGallery } from './ProductGallery'
import { ProductInfo } from './ProductInfo'

interface Image {
  id: string
  url: string
  alt?: string | null
  sortOrder: number
  isMain: boolean
}

interface Variant {
  id: string
  color?: string | null
  colorCode?: string | null
  memory?: string | null
  simType?: string | null
  price?: number | null
  oldPrice?: number | null
  sku?: string | null
  stock: number
}

interface ProductPageClientProps {
  product: {
    id: string
    name: string
    slug: string
    price: number
    oldPrice: number | null
    sku?: string | null
    brand?: { name: string } | null
    warranty?: string | null
    shortDesc?: string | null
    images: Image[]
    variants: Variant[]
    characteristics: { name: string; value: string; group?: string | null }[]
  }
}

export function ProductPageClient({ product }: ProductPageClientProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // Build color → image index map
  // Each color has its own image (images are ordered by color)
  const uniqueColors = product.variants
    .filter(v => v.color)
    .reduce((acc, v) => {
      if (!acc.includes(v.color!)) acc.push(v.color!)
      return acc
    }, [] as string[])

  const colorImageMap: Record<string, number> = {}
  uniqueColors.forEach((color, i) => {
    const imgIndex = product.images.findIndex(img =>
      img.alt?.toLowerCase().includes(color.toLowerCase()) ||
      img.alt?.toLowerCase().includes(color.split(' ')[0].toLowerCase())
    )
    colorImageMap[color] = imgIndex >= 0 ? imgIndex : Math.min(i, product.images.length - 1)
  })

  const handleColorChange = useCallback((color: string) => {
    const idx = colorImageMap[color]
    if (idx !== undefined && idx >= 0) {
      setActiveImageIndex(idx)
    }
  }, [colorImageMap])

  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
      <ProductGallery
        images={product.images}
        productName={product.name}
        activeIndex={activeImageIndex}
        onIndexChange={setActiveImageIndex}
      />
      <ProductInfo
        product={product}
        onColorChange={handleColorChange}
      />
    </div>
  )
}
