# ✅ Чеклист деплоя

## Перед деплоем

### 1. Проверка кода
- [ ] Все изменения закоммичены в Git
- [ ] Нет ошибок в коде (`npm run build` проходит успешно)
- [ ] `.env` файл не добавлен в Git (проверьте `.gitignore`)
- [ ] Все зависимости установлены (`npm install`)

### 2. Конфигурация базы данных
- [ ] Создана PostgreSQL база данных
- [ ] Получен `DATABASE_URL` (connection string)
- [ ] Если используется Prisma Accelerate/Neon - получен `DIRECT_URL`

### 3. Переменные окружения
Подготовьте следующие переменные:

```env
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...  # Опционально, для некоторых хостингов
NEXTAUTH_SECRET=<32-символьная-случайная-строка>
NEXTAUTH_URL=https://ваш-домен.com
ADMIN_EMAIL=admin@techstore.ru
ADMIN_PASSWORD=<безопасный-пароль>
NEXT_PUBLIC_SITE_URL=https://ваш-домен.com
NEXT_PUBLIC_SITE_NAME=TechStore
```

**Опционально (для email уведомлений):**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=<app-password>
SMTP_FROM=noreply@techstore.ru
```

**Опционально (аналитика):**
```env
YANDEX_METRIKA_ID=
CALLTRACKING_ID=
```

---

## Деплой на Vercel

### Шаг 1: Подготовка
- [ ] Код загружен на GitHub
- [ ] База данных создана (Neon/Supabase/другая)
- [ ] Переменные окружения подготовлены

### Шаг 2: Создание проекта
- [ ] Зайти на https://vercel.com
- [ ] Войти через GitHub
- [ ] Нажать "Add New Project"
- [ ] Выбрать репозиторий

### Шаг 3: Настройка
- [ ] Vercel автоматически определил Next.js
- [ ] Добавить все переменные окружения в Settings → Environment Variables
- [ ] Нажать "Deploy"

### Шаг 4: После деплоя
- [ ] Дождаться завершения сборки
- [ ] Выполнить миграции базы данных:
  ```bash
  # Установить Vercel CLI
  npm i -g vercel
  vercel login
  
  # Подключиться к проекту
  vercel link
  
  # Загрузить переменные окружения
  vercel env pull .env.local
  
  # Выполнить миграции
  npx prisma migrate deploy
  
  # Заполнить базу начальными данными
  npx prisma db seed
  ```

### Шаг 5: Проверка
- [ ] Открыть сайт
- [ ] Проверить главную страницу
- [ ] Проверить API: `/api/products`
- [ ] Войти в админку: `/admin/login`
- [ ] Проверить создание товара
- [ ] Проверить корзину и оформление заказа

---

## Деплой на Railway

### Шаг 1: Создание проекта
- [ ] Зайти на https://railway.app
- [ ] Войти через GitHub
- [ ] New Project → Deploy from GitHub repo
- [ ] Выбрать репозиторий

### Шаг 2: Добавление базы данных
- [ ] Add Service → Database → PostgreSQL
- [ ] Railway автоматически добавит `DATABASE_URL`

### Шаг 3: Настройка переменных
- [ ] Добавить все переменные окружения (кроме DATABASE_URL)
- [ ] Убедиться, что `NEXTAUTH_URL` указывает на Railway домен

### Шаг 4: Деплой
- [ ] Railway автоматически запустит деплой
- [ ] Дождаться завершения сборки

### Шаг 5: Миграции
- [ ] В Railway Console выполнить:
  ```bash
  npx prisma migrate deploy
  npx prisma db seed
  ```

### Шаг 6: Проверка
- [ ] Открыть сайт по Railway URL
- [ ] Проверить функциональность

---

## Деплой на VPS

### Шаг 1: Подготовка сервера
- [ ] Подключиться к серверу: `ssh root@ваш-ip`
- [ ] Обновить систему:
  ```bash
  sudo apt update && sudo apt upgrade -y
  ```

### Шаг 2: Установка зависимостей
- [ ] Установить Node.js 18+:
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```
- [ ] Установить PostgreSQL:
  ```bash
  sudo apt install postgresql postgresql-contrib
  ```
- [ ] Установить Nginx:
  ```bash
  sudo apt install nginx
  ```
- [ ] Установить PM2:
  ```bash
  sudo npm install -g pm2
  ```

### Шаг 3: Настройка PostgreSQL
- [ ] Создать базу данных:
  ```bash
  sudo -u postgres psql
  CREATE DATABASE tech_store;
  CREATE USER tech_user WITH PASSWORD 'ваш-пароль';
  GRANT ALL PRIVILEGES ON DATABASE tech_store TO tech_user;
  \q
  ```

### Шаг 4: Клонирование проекта
- [ ] Клонировать репозиторий:
  ```bash
  cd /var/www
  git clone <ваш-репозиторий> tech-store
  cd tech-store
  ```

### Шаг 5: Настройка проекта
- [ ] Создать `.env` файл:
  ```bash
  cp .env.example .env
  nano .env
  ```
- [ ] Заполнить переменные окружения
- [ ] Установить зависимости:
  ```bash
  npm install
  ```
- [ ] Выполнить миграции:
  ```bash
  npx prisma generate
  npx prisma migrate deploy
  npx prisma db seed
  ```
- [ ] Собрать проект:
  ```bash
  npm run build
  ```

### Шаг 6: Запуск с PM2
- [ ] Запустить приложение:
  ```bash
  pm2 start ecosystem.config.js
  pm2 save
  pm2 startup
  ```

### Шаг 7: Настройка Nginx
- [ ] Скопировать конфигурацию:
  ```bash
  sudo cp nginx.conf /etc/nginx/sites-available/tech-store
  ```
- [ ] Отредактировать домен в конфигурации:
  ```bash
  sudo nano /etc/nginx/sites-available/tech-store
  ```
- [ ] Активировать сайт:
  ```bash
  sudo ln -s /etc/nginx/sites-available/tech-store /etc/nginx/sites-enabled/
  sudo nginx -t
  sudo systemctl restart nginx
  ```

### Шаг 8: SSL сертификат (Let's Encrypt)
- [ ] Установить Certbot:
  ```bash
  sudo apt install certbot python3-certbot-nginx
  ```
- [ ] Получить сертификат:
  ```bash
  sudo certbot --nginx -d ваш-домен.ru -d www.ваш-домен.ru
  ```

### Шаг 9: Проверка
- [ ] Открыть сайт по домену
- [ ] Проверить HTTPS
- [ ] Проверить функциональность
- [ ] Проверить логи:
  ```bash
  pm2 logs tech-store
  ```

---

## После деплоя

### Обязательные проверки
- [ ] Главная страница загружается
- [ ] Каталог товаров работает
- [ ] Поиск работает
- [ ] Карточка товара открывается
- [ ] Корзина работает
- [ ] Админ панель доступна
- [ ] Можно войти в админку
- [ ] Можно создать/редактировать товар
- [ ] API endpoints отвечают

### Проверка производительности
- [ ] Время загрузки главной < 3 сек
- [ ] Lighthouse Score > 80
- [ ] Изображения оптимизированы
- [ ] Нет ошибок в консоли браузера

### Безопасность
- [ ] HTTPS работает
- [ ] Админ панель защищена паролем
- [ ] `.env` файл не доступен публично
- [ ] Нет чувствительных данных в логах

### Мониторинг
- [ ] Настроить уведомления об ошибках
- [ ] Проверять логи регулярно
- [ ] Настроить бэкапы базы данных

---

## Обновление сайта

### Vercel/Railway (автоматически)
```bash
git add .
git commit -m "Описание изменений"
git push
```

### VPS (вручную)
```bash
cd /var/www/tech-store
git pull
npm install
npx prisma generate
npx prisma migrate deploy
npm run build
pm2 restart tech-store
```

Или используйте скрипт:
```bash
./deploy.sh
```

---

## Полезные команды

### Vercel CLI
```bash
vercel login              # Войти
vercel link               # Подключить проект
vercel env pull           # Загрузить переменные
vercel logs               # Посмотреть логи
vercel deploy             # Деплой
```

### PM2 (VPS)
```bash
pm2 status                # Статус приложений
pm2 logs tech-store       # Логи
pm2 restart tech-store    # Перезапуск
pm2 stop tech-store       # Остановка
pm2 delete tech-store     # Удаление
pm2 monit                 # Мониторинг
```

### Prisma
```bash
npx prisma generate       # Генерация клиента
npx prisma migrate deploy # Применить миграции
npx prisma db seed        # Заполнить данными
npx prisma studio         # Открыть GUI
```

### Nginx (VPS)
```bash
sudo nginx -t             # Проверка конфигурации
sudo systemctl restart nginx  # Перезапуск
sudo tail -f /var/log/nginx/error.log  # Логи ошибок
```

---

## Решение проблем

### Ошибка сборки
1. Проверьте логи деплоя
2. Убедитесь, что все зависимости установлены
3. Проверьте `package.json` скрипты
4. Попробуйте локально: `npm run build`

### Ошибка базы данных
1. Проверьте `DATABASE_URL`
2. Убедитесь, что база доступна
3. Выполните миграции: `npx prisma migrate deploy`
4. Проверьте логи базы данных

### Сайт не открывается
1. Проверьте статус приложения
2. Проверьте логи
3. Проверьте DNS настройки
4. Проверьте firewall/security groups

### Медленная загрузка
1. Оптимизируйте изображения
2. Включите кэширование
3. Используйте CDN
4. Проверьте запросы к БД

---

## Контакты поддержки

- **Vercel**: https://vercel.com/support
- **Railway**: https://railway.app/help
- **Neon**: https://neon.tech/docs
- **Supabase**: https://supabase.com/docs

---

Удачного деплоя! 🚀
