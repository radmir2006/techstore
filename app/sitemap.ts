import { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techstore.ru'

  const staticUrls = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/catalog`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/trade-in`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${baseUrl}/imei-check`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.5 },
    { url: `${baseUrl}/contacts`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.4 },
  ]

  try {
    const { prisma } = await import('@/lib/prisma')

    const [products, categories] = await Promise.all([
      prisma.product.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
      prisma.category.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
    ])

    const productUrls = products.map((p) => ({
      url: `${baseUrl}/product/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }))

    const categoryUrls = categories.map((c) => ({
      url: `${baseUrl}/catalog/${c.slug}`,
      lastModified: c.updatedAt,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }))

    return [...staticUrls, ...productUrls, ...categoryUrls]
  } catch {
    return staticUrls
  }
}
