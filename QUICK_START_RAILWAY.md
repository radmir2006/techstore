# 🚀 Быстрый старт: Деплой на Railway

## 1️⃣ Загрузите код на GitHub

```bash
# Если репозиторий еще не создан на GitHub:
# 1. Создайте новый репозиторий на https://github.com/new
# 2. Затем выполните:

git push origin main
```

## 2️⃣ Создайте проект на Railway

1. Откройте https://railway.app
2. Войдите через GitHub
3. Нажмите **"New Project"**
4. Выберите **"Deploy from GitHub repo"**
5. Выберите ваш репозиторий

## 3️⃣ Добавьте PostgreSQL

1. В проекте нажмите **"New"** → **"Database"** → **"Add PostgreSQL"**
2. Railway автоматически создаст переменную `DATABASE_URL`

## 4️⃣ Настройте переменные окружения

В разделе **"Variables"** добавьте:

```bash
# Сгенерируйте секретный ключ (выполните в терминале):
# openssl rand -base64 32

NEXTAUTH_SECRET=ваш-сгенерированный-секрет-32-символа
ADMIN_PASSWORD=ваш-безопасный-пароль
ADMIN_EMAIL=admin@techstore.ru
NEXT_PUBLIC_SITE_NAME=TechStore
```

## 5️⃣ Обновите URL после первого деплоя

После того как Railway задеплоит проект, вы получите URL вида:
`https://ваш-проект.up.railway.app`

Добавьте эти переменные:

```bash
NEXTAUTH_URL=https://ваш-проект.up.railway.app
NEXT_PUBLIC_SITE_URL=https://ваш-проект.up.railway.app
```

## 6️⃣ Примените миграции базы данных

### Вариант A: Через Railway CLI

```bash
# Установите CLI
npm install -g @railway/cli

# Авторизуйтесь
railway login

# Подключитесь к проекту
railway link

# Примените миграции
railway run npx prisma db push
```

### Вариант B: Через Dashboard

1. Откройте ваш сервис в Railway
2. Перейдите в **"Settings"** → **"Deploy"**
3. В **"Build Command"** добавьте:
   ```
   npm install && npx prisma generate && npx prisma db push && npm run build
   ```
4. Нажмите **"Redeploy"**

## 7️⃣ Готово! 🎉

Откройте ваш сайт и войдите в админку:
- URL: `https://ваш-проект.up.railway.app/admin/login`
- Email: `admin@techstore.ru`
- Пароль: тот, что указали в `ADMIN_PASSWORD`

---

## 📋 Чеклист

- [ ] Код загружен на GitHub
- [ ] Проект создан в Railway
- [ ] PostgreSQL добавлен
- [ ] Переменные окружения настроены
- [ ] NEXTAUTH_SECRET сгенерирован
- [ ] URL обновлены после деплоя
- [ ] Миграции применены
- [ ] Сайт работает

## 🆘 Проблемы?

Смотрите подробную инструкцию в файле `RAILWAY_DEPLOY.md`

## 💰 Стоимость

Railway предоставляет **$5 бесплатных кредитов** каждый месяц на Hobby плане.
Этого достаточно для небольшого проекта!
