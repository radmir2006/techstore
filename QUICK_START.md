# 🚀 Быстрый старт - Деплой на хостинг

## Самый простой способ - Vercel (5 минут)

### Шаг 1: Подготовка базы данных
Выберите один из вариантов:

**Вариант A: Neon (рекомендуется)**
1. Зайдите на https://neon.tech
2. Создайте аккаунт (бесплатно)
3. Создайте новый проект
4. Скопируйте `Connection String` (начинается с `postgresql://`)

**Вариант B: Supabase**
1. Зайдите на https://supabase.com
2. Создайте проект
3. В Settings → Database найдите `Connection String` (URI)

### Шаг 2: Загрузка на GitHub
```bash
# Если еще не создан репозиторий
git init
git add .
git commit -m "Initial commit"

# Создайте репозиторий на GitHub, затем:
git remote add origin https://github.com/ваш-username/ваш-репозиторий.git
git branch -M main
git push -u origin main
```

### Шаг 3: Деплой на Vercel
1. Зайдите на https://vercel.com
2. Войдите через GitHub
3. Нажмите **"Add New Project"**
4. Выберите ваш репозиторий
5. Vercel автоматически определит Next.js

### Шаг 4: Настройка переменных окружения
В настройках проекта Vercel добавьте:

```env
DATABASE_URL=postgresql://user:password@host/dbname
NEXTAUTH_SECRET=сгенерируйте-случайную-строку-32-символа
NEXTAUTH_URL=https://ваш-проект.vercel.app
ADMIN_EMAIL=admin@techstore.ru
ADMIN_PASSWORD=ваш-безопасный-пароль
NEXT_PUBLIC_SITE_URL=https://ваш-проект.vercel.app
NEXT_PUBLIC_SITE_NAME=TechStore
```

**Генерация NEXTAUTH_SECRET:**
- Откройте https://generate-secret.vercel.app/32
- Или выполните: `openssl rand -base64 32`

### Шаг 5: Деплой
1. Нажмите **"Deploy"**
2. Дождитесь завершения сборки (2-3 минуты)
3. Откройте ваш сайт!

### Шаг 6: Инициализация базы данных
После успешного деплоя:

1. Откройте терминал Vercel (в Dashboard → Settings → Functions)
2. Или установите Vercel CLI:
```bash
npm i -g vercel
vercel login
vercel env pull .env.local
npx prisma migrate deploy
npx prisma db seed
```

### Готово! 🎉
Ваш сайт доступен по адресу: `https://ваш-проект.vercel.app`

Админ панель: `https://ваш-проект.vercel.app/admin/login`

---

## Альтернатива: Railway (с встроенной БД)

### Преимущества:
- Встроенная PostgreSQL
- Не нужно настраивать отдельную БД
- Простой деплой

### Инструкция:

1. **Зайдите на https://railway.app**
2. Войдите через GitHub
3. **New Project** → **Deploy from GitHub repo**
4. Выберите ваш репозиторий
5. **Add Service** → **Database** → **PostgreSQL**
6. Railway автоматически добавит `DATABASE_URL`
7. Добавьте остальные переменные окружения
8. Деплой запустится автоматически

---

## Проверка после деплоя

✅ Откройте главную страницу  
✅ Проверьте API: `/api/products`  
✅ Войдите в админку: `/admin/login`  
✅ Проверьте логи на ошибки

---

## Частые проблемы

### ❌ "Failed to build an image"
**Решение:** Проверьте, что в `package.json` есть скрипт `"build": "next build"`

### ❌ "Database connection failed"
**Решение:** 
- Проверьте правильность `DATABASE_URL`
- Убедитесь, что база доступна извне
- Проверьте, что выполнены миграции: `npx prisma migrate deploy`

### ❌ "Module not found: @prisma/client"
**Решение:** Добавьте в `package.json`:
```json
"scripts": {
  "postinstall": "prisma generate"
}
```

### ❌ Изображения не загружаются
**Решение:** Проверьте `next.config.js` → `images.remotePatterns`

---

## Обновление сайта

Просто сделайте изменения и:
```bash
git add .
git commit -m "Описание изменений"
git push
```

Vercel/Railway автоматически пересоберут и задеплоят сайт!

---

## Полезные ссылки

- 📚 Полная инструкция: `DEPLOYMENT.md`
- 🐳 Docker деплой: `Dockerfile`
- 🖥️ VPS деплой: `deploy.sh`
- ⚙️ PM2 конфиг: `ecosystem.config.js`

---

## Нужна помощь?

1. Проверьте логи деплоя
2. Прочитайте `DEPLOYMENT.md` для детальных инструкций
3. Проверьте документацию хостинга
