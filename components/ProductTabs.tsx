'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ProductTabsProps {
  product: {
    id: string
    description?: string | null
    warranty?: string | null
    deliveryInfo?: string | null
    characteristics: { name: string; value: string; group?: string | null }[]
    reviews?: any[]
  }
}

const tabs = [
  { id: 'description', label: 'Описание' },
  { id: 'specs', label: 'Характеристики' },
  { id: 'delivery', label: 'Доставка и гарантия' },
]

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description')

  const groupedSpecs = product.characteristics.reduce((acc, char) => {
    const group = char.group || 'Основные'
    if (!acc[group]) acc[group] = []
    acc[group].push(char)
    return acc
  }, {} as Record<string, typeof product.characteristics>)

  return (
    <div>
      {/* Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-shrink-0 px-6 py-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === tab.id
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {/* Description */}
        {activeTab === 'description' && (
          <div className="prose prose-gray max-w-none">
            {product.description ? (
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            ) : (
              <p className="text-gray-500">Описание отсутствует</p>
            )}
          </div>
        )}

        {/* Specifications */}
        {activeTab === 'specs' && (
          <div className="space-y-6">
            {Object.entries(groupedSpecs).map(([group, chars]) => (
              <div key={group}>
                <h3 className="font-medium text-gray-900 mb-3">{group}</h3>
                <div className="bg-gray-50 rounded-xl overflow-hidden">
                  {chars.map((char, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex justify-between py-3 px-4",
                        i !== chars.length - 1 && "border-b border-gray-100"
                      )}
                    >
                      <span className="text-gray-600">{char.name}</span>
                      <span className="font-medium">{char.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {product.characteristics.length === 0 && (
              <p className="text-gray-500">Характеристики не указаны</p>
            )}
          </div>
        )}

        {/* Delivery & Warranty */}
        {activeTab === 'delivery' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Доставка</h3>
              <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-gray-600">
                <p><strong>По Москве:</strong> 1-2 рабочих дня, от 300 ₽</p>
                <p><strong>По Московской области:</strong> 2-3 рабочих дня, от 500 ₽</p>
                <p><strong>По России:</strong> от 3 рабочих дней, от 500 ₽ (СДЭК, Почта России)</p>
                <p><strong>Самовывоз:</strong> бесплатно</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3">Гарантия</h3>
              <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-gray-600">
                <p>{product.warranty || 'Официальная гарантия производителя — 1 год'}</p>
                <p>Гарантийное обслуживание в авторизованных сервисных центрах</p>
                <p>Возможность расширенной гарантии до 3 лет</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3">Возврат</h3>
              <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-gray-600">
                <p>Возврат товара надлежащего качества — 14 дней</p>
                <p>Возврат товара ненадлежащего качества — по гарантии</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
