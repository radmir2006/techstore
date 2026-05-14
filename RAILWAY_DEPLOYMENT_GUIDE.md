# Railway Deployment Guide - TechStore

## Шаг 1: Подготовка (Завершено ✓)

- [x] Код загружен на GitHub: https://github.com/triviattanew-wq/techstore
- [x] Создан файл `railway.json` с конфигурацией сборки
- [x] Файл `.gitignore` настроен (исключает `.env` и чувствительные данные)

## Шаг 2: Создание проекта на Railway

1. Перейдите на https://railway.app/
2. Нажмите "Start a New Project"
3. Выберите "Deploy from GitHub repo"
4. Авторизуйтесь через GitHub (если еще не авторизованы)
5. Выберите репозиторий: `triviattanew-wq/techstore`
6. Railway автоматически обнаружит Next.js проект

## Шаг 3: Настройка переменных окружения

В разделе "Variables" Railway проекта добавьте следующие переменные:

### Обязательные переменные:

```
DATABASE_URL=postgresql://neondb_owner:npg_cap75jlybEnY@ep-damp-wind-al26jk2t.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require

DIRECT_URL=postgresql://neondb_owner:npg_cap75jlybEnY@ep-damp-wind-al26jk2t.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require

NEXTAUTH_SECRET=SZs+RSVhIIcF8DbNF4P2z9S8lUfo3ZBZvPxhg5eEe8s=

NEXTAUTH_URL=https://ваш-домен.railway.app

ADMIN_EMAIL=admin@techstore.ru

ADMIN_PASSWORD=admin123

NEXT_PUBLIC_SITE_URL=https://ваш-домен.railway.app

NEXT_PUBLIC_SITE_NAME=TechStore
```

**ВАЖНО:** После первого деплоя Railway предоставит вам домен (например, `techstore-production-xxxx.up.railway.app`). Обновите переменные `NEXTAUTH_URL` и `NEXT_PUBLIC_SITE_URL` на этот домен и сделайте редеплой.

### Опциональные переменные (для email-уведомлений):

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@techstore.ru
```

## Шаг 4: Деплой

1. После добавления переменных окружения Railway автоматически начнет деплой
2. Процесс деплоя займет 3-5 минут
3. Следите за логами в разделе "Deployments"

## Шаг 5: Проверка после деплоя

После успешного деплоя проверьте:

- [ ] Главная страница открывается: `https://ваш-домен.railway.app/`
- [ ] Каталог работает: `https://ваш-домен.railway.app/catalog`
- [ ] Карточка товара открывается
- [ ] Админ-панель доступна: `https://ваш-домен.railway.app/admin/login`
- [ ] Вход в админку работает (admin@techstore.ru / admin123)
- [ ] Товары отображаются из базы данных Neon

## Шаг 6: Обновление URL в переменных окружения

1. Скопируйте домен Railway (например, `techstore-production-xxxx.up.railway.app`)
2. Обновите переменные:
   - `NEXTAUTH_URL=https://techstore-production-xxxx.up.railway.app`
   - `NEXT_PUBLIC_SITE_URL=https://techstore-production-xxxx.up.railway.app`
3. Railway автоматически сделает редеплой

## Технические детали

### Конфигурация сборки (railway.json):
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### База данных:
- **Провайдер:** Neon (PostgreSQL cloud)
- **Регион:** EU Central 1 (AWS)
- **SSL:** Обязателен (sslmode=require)
- **Схема:** Prisma ORM

### Стек технологий:
- **Framework:** Next.js 14 (App Router)
- **Runtime:** Node.js 18+
- **Package Manager:** npm
- **Database ORM:** Prisma
- **Authentication:** NextAuth.js

## Мониторинг и логи

- Логи доступны в разделе "Deployments" → выберите деплой → "View Logs"
- Метрики использования ресурсов в разделе "Metrics"
- Настройте уведомления в разделе "Settings" → "Notifications"

## Стоимость

Railway предоставляет:
- **Hobby Plan:** $5/месяц + $0.000231/GB-час RAM + $0.000463/vCPU-час
- **Бесплатный trial:** $5 кредитов для тестирования

Примерная стоимость для TechStore: ~$10-15/месяц

## Альтернативные домены

Для подключения собственного домена:
1. Перейдите в "Settings" → "Domains"
2. Нажмите "Add Domain"
3. Введите ваш домен
4. Настройте DNS записи у вашего регистратора

## Troubleshooting

### Ошибка "Module not found"
- Проверьте, что все зависимости указаны в `package.json`
- Убедитесь, что `npm install` выполняется успешно

### Ошибка подключения к БД
- Проверьте правильность `DATABASE_URL`
- Убедитесь, что в строке подключения указан `?sslmode=require`

### Ошибка 500 на главной странице
- Проверьте логи Railway
- Убедитесь, что все переменные окружения установлены
- Проверьте, что база данных Neon доступна

## Контакты для поддержки

- Railway Documentation: https://docs.railway.app/
- Railway Discord: https://discord.gg/railway
- GitHub Issues: https://github.com/triviattanew-wq/techstore/issues
