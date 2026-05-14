# TechStore - Интернет-магазин электроники

Современный интернет-магазин техники Apple и Samsung на Next.js 14.

## Технологии

- **Frontend:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, NextAuth.js
- **Database:** PostgreSQL (Neon), Prisma ORM
- **Deployment:** Railway, SpaceWeb VPS

## Функционал

- Каталог товаров с фильтрацией и сортировкой
- Карточки товаров с вариантами (цвет, память)
- Корзина покупок
- Избранное и сравнение товаров
- Админ-панель для управления товарами
- Система заявок (лиды)
- Адаптивный дизайн

## Установка

```bash
npm install
npx prisma generate
npm run build
npm start
```

## Переменные окружения

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://your-domain.com
ADMIN_EMAIL=admin@techstore.ru
ADMIN_PASSWORD=admin123
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=TechStore
```

## Деплой на Railway

1. Подключите репозиторий на https://railway.app/
2. Добавьте переменные окружения
3. Railway автоматически задеплоит проект

## Админ-панель

Доступ: `/admin/login`
- Email: admin@techstore.ru
- Пароль: admin123

## Лицензия

MIT
