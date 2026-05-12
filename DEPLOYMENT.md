# Инструкция по размещению сайта на хостинге

## Вариант 1: Vercel (Рекомендуется)

### Подготовка:

1. **Создайте аккаунт на Vercel**
   - Перейдите на https://vercel.com
   - Зарегистрируйтесь через GitHub

2. **Подготовьте базу данных PostgreSQL**
   
   Варианты:
   - **Vercel Postgres** (встроенное решение)
   - **Supabase** (бесплатно до 500MB): https://supabase.com
   - **Neon** (бесплатно): https://neon.tech
   - **Railway** (бесплатно с ограничениями): https://railway.app

### Деплой на Vercel:

1. **Загрузите проект на GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <ваш-репозиторий>
   git push -u origin main
   ```

2. **Подключите проект к Vercel**
   - Войдите на https://vercel.com
   - Нажмите "Add New Project"
   - Выберите ваш GitHub репозиторий
   - Vercel автоматически определит Next.js

3. **Настройте переменные окружения**
   
   В настройках проекта на Vercel добавьте:
   ```
   DATABASE_URL=postgresql://user:password@host:5432/dbname
   NEXTAUTH_SECRET=<сгенерируйте-случайную-строку>
   NEXTAUTH_URL=https://ваш-домен.vercel.app
   ADMIN_EMAIL=admin@techstore.ru
   ADMIN_PASSWORD=<ваш-пароль>
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your@gmail.com
   SMTP_PASS=<app-password>
   SMTP_FROM=noreply@techstore.ru
   NEXT_PUBLIC_SITE_URL=https://ваш-домен.vercel.app
   NEXT_PUBLIC_SITE_NAME=TechStore
   ```

4. **Деплой**
   - Нажмите "Deploy"
   - Vercel автоматически соберет и запустит проект

5. **Инициализация базы данных**
   ```bash
   # После деплоя выполните миграции
   npx prisma migrate deploy
   npx prisma db seed
   ```

---

## Вариант 2: Railway (с PostgreSQL)

### Преимущества:
- Встроенная PostgreSQL база
- Docker поддержка
- Простой деплой

### Инструкция:

1. **Создайте аккаунт на Railway**
   - https://railway.app
   - Войдите через GitHub

2. **Создайте новый проект**
   - New Project → Deploy from GitHub repo
   - Выберите ваш репозиторий

3. **Добавьте PostgreSQL**
   - Add Service → Database → PostgreSQL
   - Railway автоматически создаст базу

4. **Настройте переменные окружения**
   - Railway автоматически добавит DATABASE_URL
   - Добавьте остальные переменные из .env.example

5. **Настройте деплой**
   - Railway автоматически определит Dockerfile
   - Или используйте Nixpacks (автоматическая сборка)

---

## Вариант 3: VPS (DigitalOcean, Timeweb, Beget)

### Требования:
- Ubuntu 20.04+
- Node.js 18+
- PostgreSQL 14+
- Nginx

### Инструкция:

1. **Подключитесь к серверу**
   ```bash
   ssh root@ваш-сервер
   ```

2. **Установите зависимости**
   ```bash
   # Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # PostgreSQL
   sudo apt install postgresql postgresql-contrib
   
   # Nginx
   sudo apt install nginx
   
   # PM2 (менеджер процессов)
   sudo npm install -g pm2
   ```

3. **Настройте PostgreSQL**
   ```bash
   sudo -u postgres psql
   CREATE DATABASE tech_store;
   CREATE USER tech_user WITH PASSWORD 'ваш-пароль';
   GRANT ALL PRIVILEGES ON DATABASE tech_store TO tech_user;
   \q
   ```

4. **Клонируйте проект**
   ```bash
   cd /var/www
   git clone <ваш-репозиторий> tech-store
   cd tech-store
   ```

5. **Установите зависимости и соберите**
   ```bash
   npm install
   cp .env.example .env
   # Отредактируйте .env с правильными данными
   nano .env
   
   npx prisma generate
   npx prisma migrate deploy
   npm run build
   ```

6. **Запустите с PM2**
   ```bash
   pm2 start npm --name "tech-store" -- start
   pm2 save
   pm2 startup
   ```

7. **Настройте Nginx**
   ```bash
   sudo nano /etc/nginx/sites-available/tech-store
   ```
   
   Добавьте конфигурацию (см. nginx.conf в проекте)

8. **Активируйте сайт**
   ```bash
   sudo ln -s /etc/nginx/sites-available/tech-store /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

---

## Генерация NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

Или используйте онлайн генератор: https://generate-secret.vercel.app/32

---

## Проверка после деплоя

1. Откройте сайт в браузере
2. Проверьте работу API: `https://ваш-домен/api/products`
3. Войдите в админ панель: `https://ваш-домен/admin/login`
4. Проверьте логи на наличие ошибок

---

## Решение частых проблем

### Ошибка подключения к базе данных
- Проверьте DATABASE_URL
- Убедитесь, что база доступна извне (для облачных решений)
- Проверьте правильность credentials

### Ошибка "Module not found"
```bash
npm install
npx prisma generate
npm run build
```

### Ошибка при миграции Prisma
```bash
npx prisma migrate reset
npx prisma migrate deploy
npx prisma db seed
```

### Проблемы с изображениями
- Проверьте настройки `images.remotePatterns` в next.config.js
- Убедитесь, что домены изображений добавлены

---

## Мониторинг и логи

### Vercel
- Логи доступны в Dashboard → Deployments → Logs

### Railway
- Логи в реальном времени в Dashboard

### VPS
```bash
# PM2 логи
pm2 logs tech-store

# Nginx логи
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

---

## Обновление сайта

### Vercel/Railway
- Просто сделайте `git push` - автоматический деплой

### VPS
```bash
cd /var/www/tech-store
git pull
npm install
npx prisma generate
npx prisma migrate deploy
npm run build
pm2 restart tech-store
```
