# 🚀 Размещение сайта на хостинге - Краткая инструкция

## 📋 Что у вас есть

Ваш проект готов к деплою! Созданы все необходимые файлы:

- ✅ `QUICK_START.md` - Быстрый старт (5 минут)
- ✅ `DEPLOYMENT.md` - Подробная инструкция
- ✅ `DEPLOYMENT_CHECKLIST.md` - Чеклист для проверки
- ✅ `vercel.json` - Конфигурация для Vercel
- ✅ `Dockerfile` - Для Docker деплоя
- ✅ `nginx.conf` - Конфигурация Nginx для VPS
- ✅ `ecosystem.config.js` - PM2 конфигурация
- ✅ `deploy.sh` - Скрипт автоматического деплоя на VPS

---

## 🎯 Рекомендуемый вариант: Vercel + Neon

**Почему:**
- Бесплатно
- Деплой за 5 минут
- Автоматические обновления
- Идеально для Next.js

### Быстрый старт:

#### 1. База данных (2 минуты)
1. Зайдите на https://neon.tech
2. Создайте аккаунт (бесплатно)
3. Создайте проект
4. Скопируйте `Connection String`

#### 2. GitHub (1 минута)
```bash
git add .
git commit -m "Ready for deployment"
git push
```

Если репозиторий еще не создан:
1. Создайте репозиторий на https://github.com
2. Выполните:
```bash
git remote add origin https://github.com/ваш-username/ваш-репозиторий.git
git branch -M main
git push -u origin main
```

#### 3. Vercel (2 минуты)
1. Зайдите на https://vercel.com
2. Войдите через GitHub
3. Нажмите **"Add New Project"**
4. Выберите ваш репозиторий
5. Добавьте переменные окружения:

```env
DATABASE_URL=postgresql://... (из Neon)
DIRECT_URL=postgresql://... (из Neon, вкладка "Connection pooling")
NEXTAUTH_SECRET=сгенерируйте на https://generate-secret.vercel.app/32
NEXTAUTH_URL=https://ваш-проект.vercel.app
ADMIN_EMAIL=admin@techstore.ru
ADMIN_PASSWORD=ваш-безопасный-пароль
NEXT_PUBLIC_SITE_URL=https://ваш-проект.vercel.app
NEXT_PUBLIC_SITE_NAME=TechStore
```

6. Нажмите **"Deploy"**

#### 4. Инициализация БД (1 минута)
После успешного деплоя:

```bash
# Установите Vercel CLI
npm i -g vercel

# Войдите
vercel login

# Подключитесь к проекту
vercel link

# Загрузите переменные окружения
vercel env pull .env.local

# Выполните миграции
npx prisma migrate deploy

# Заполните базу данными
npx prisma db seed
```

#### 5. Готово! 🎉
Ваш сайт доступен по адресу: `https://ваш-проект.vercel.app`

Админ панель: `https://ваш-проект.vercel.app/admin/login`

---

## 🔄 Обновление сайта

Просто делайте изменения и пушьте в Git:

```bash
git add .
git commit -m "Описание изменений"
git push
```

Vercel автоматически пересоберет и задеплоит сайт!

---

## 📚 Дополнительные инструкции

### Для других хостингов:
- **Railway** (с встроенной БД): см. `DEPLOYMENT.md` → Вариант 2
- **VPS** (полный контроль): см. `DEPLOYMENT.md` → Вариант 3

### Подробные инструкции:
- `QUICK_START.md` - Пошаговый быстрый старт
- `DEPLOYMENT.md` - Детальное руководство для всех вариантов
- `DEPLOYMENT_CHECKLIST.md` - Чеклист для проверки

---

## ❓ Частые вопросы

### Где взять NEXTAUTH_SECRET?
Сгенерируйте здесь: https://generate-secret.vercel.app/32

Или выполните:
```bash
openssl rand -base64 32
```

### Что такое DIRECT_URL?
Это прямое подключение к базе данных (без connection pooling).
В Neon найдите во вкладке "Connection Details" → "Direct connection"

### Как проверить, что все работает?
1. Откройте главную страницу
2. Проверьте `/api/products` - должен вернуть JSON
3. Войдите в админку `/admin/login`
4. Проверьте логи в Vercel Dashboard

### Ошибка при деплое?
1. Проверьте логи в Vercel Dashboard
2. Убедитесь, что все переменные окружения добавлены
3. Проверьте, что `DATABASE_URL` правильный
4. Попробуйте пересобрать: `npm run build` локально

### Как добавить свой домен?
1. В Vercel Dashboard → Settings → Domains
2. Добавьте ваш домен
3. Настройте DNS записи (Vercel покажет инструкцию)
4. Обновите `NEXTAUTH_URL` и `NEXT_PUBLIC_SITE_URL`

---

## 🆘 Нужна помощь?

1. Проверьте `DEPLOYMENT_CHECKLIST.md`
2. Прочитайте `DEPLOYMENT.md` для детальных инструкций
3. Проверьте логи деплоя
4. Проверьте документацию хостинга

---

## 📊 Что дальше?

После успешного деплоя:

1. **Настройте мониторинг**
   - Vercel автоматически отслеживает ошибки
   - Настройте уведомления в Settings

2. **Оптимизируйте производительность**
   - Проверьте Lighthouse Score
   - Оптимизируйте изображения
   - Настройте кэширование

3. **Настройте бэкапы**
   - Neon автоматически делает бэкапы
   - Настройте дополнительные бэкапы если нужно

4. **Добавьте аналитику**
   - Добавьте `YANDEX_METRIKA_ID` в переменные окружения
   - Настройте Google Analytics если нужно

5. **Настройте домен**
   - Купите домен (Reg.ru, Timeweb, и т.д.)
   - Подключите к Vercel
   - Настройте SSL (автоматически)

---

Удачного деплоя! 🚀

Если возникнут вопросы - проверьте детальные инструкции в `DEPLOYMENT.md`
