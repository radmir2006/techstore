# 📝 Шпаргалка команд для деплоя

## 🚀 Быстрый деплой на Vercel

### 1. Подготовка
```bash
# Проверка сборки
npm run build

# Коммит изменений
git add .
git commit -m "Ready for deployment"
git push
```

### 2. Установка Vercel CLI
```bash
npm i -g vercel
vercel login
```

### 3. Деплой
```bash
# Первый деплой
vercel

# Продакшн деплой
vercel --prod

# Подключение к существующему проекту
vercel link
```

### 4. Инициализация БД
```bash
# Загрузить переменные окружения
vercel env pull .env.local

# Применить миграции
npx prisma migrate deploy

# Заполнить данными
npx prisma db seed
```

---

## 🗄️ Работа с базой данных

### Prisma команды
```bash
# Генерация клиента
npx prisma generate

# Создание миграции
npx prisma migrate dev --name название_миграции

# Применение миграций (продакшн)
npx prisma migrate deploy

# Сброс БД (только для разработки!)
npx prisma migrate reset

# Заполнение данными
npx prisma db seed

# Открыть Prisma Studio
npx prisma studio

# Проверка схемы
npx prisma validate

# Форматирование схемы
npx prisma format
```

### Экспорт/Импорт БД
```bash
# Экспорт базы данных
pg_dump -h host -U user -d database > backup.sql

# Импорт базы данных
psql -h host -U user -d database < backup.sql

# Экспорт только данных
pg_dump -h host -U user -d database --data-only > data.sql

# Экспорт только схемы
pg_dump -h host -U user -d database --schema-only > schema.sql
```

---

## 🔧 Vercel CLI команды

### Управление проектом
```bash
# Список проектов
vercel list

# Информация о проекте
vercel inspect

# Логи
vercel logs

# Логи в реальном времени
vercel logs --follow

# Удалить деплой
vercel remove [deployment-url]
```

### Переменные окружения
```bash
# Список переменных
vercel env ls

# Добавить переменную
vercel env add

# Удалить переменную
vercel env rm

# Загрузить переменные локально
vercel env pull .env.local

# Загрузить из файла
vercel env add < .env.production
```

### Домены
```bash
# Список доменов
vercel domains ls

# Добавить домен
vercel domains add example.com

# Удалить домен
vercel domains rm example.com
```

---

## 🐳 Docker команды

### Сборка и запуск
```bash
# Собрать образ
docker build -t tech-store .

# Запустить контейнер
docker run -p 3000:3000 --env-file .env tech-store

# Запустить в фоне
docker run -d -p 3000:3000 --env-file .env --name tech-store tech-store

# Остановить контейнер
docker stop tech-store

# Удалить контейнер
docker rm tech-store

# Логи контейнера
docker logs tech-store

# Логи в реальном времени
docker logs -f tech-store
```

### Docker Compose
```bash
# Запустить все сервисы
docker-compose up

# Запустить в фоне
docker-compose up -d

# Остановить
docker-compose down

# Пересобрать и запустить
docker-compose up --build

# Логи
docker-compose logs

# Логи конкретного сервиса
docker-compose logs app
```

---

## 🖥️ VPS команды

### PM2 (Process Manager)
```bash
# Запустить приложение
pm2 start npm --name "tech-store" -- start

# Запустить с конфигом
pm2 start ecosystem.config.js

# Список процессов
pm2 list

# Статус
pm2 status

# Логи
pm2 logs tech-store

# Логи в реальном времени
pm2 logs tech-store --lines 100

# Перезапуск
pm2 restart tech-store

# Остановка
pm2 stop tech-store

# Удаление
pm2 delete tech-store

# Мониторинг
pm2 monit

# Сохранить конфигурацию
pm2 save

# Автозапуск при перезагрузке
pm2 startup

# Обновление PM2
pm2 update
```

### Nginx
```bash
# Проверка конфигурации
sudo nginx -t

# Перезапуск
sudo systemctl restart nginx

# Перезагрузка конфигурации
sudo systemctl reload nginx

# Статус
sudo systemctl status nginx

# Логи ошибок
sudo tail -f /var/log/nginx/error.log

# Логи доступа
sudo tail -f /var/log/nginx/access.log

# Включить сайт
sudo ln -s /etc/nginx/sites-available/tech-store /etc/nginx/sites-enabled/

# Отключить сайт
sudo rm /etc/nginx/sites-enabled/tech-store
```

### SSL (Let's Encrypt)
```bash
# Установка Certbot
sudo apt install certbot python3-certbot-nginx

# Получить сертификат
sudo certbot --nginx -d example.com -d www.example.com

# Обновить сертификаты
sudo certbot renew

# Тест обновления
sudo certbot renew --dry-run

# Список сертификатов
sudo certbot certificates

# Удалить сертификат
sudo certbot delete --cert-name example.com
```

### Системные команды
```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Установка PostgreSQL
sudo apt install postgresql postgresql-contrib

# Проверка дискового пространства
df -h

# Проверка памяти
free -h

# Проверка процессов
htop

# Проверка портов
sudo netstat -tulpn | grep LISTEN
```

---

## 📦 NPM команды

### Разработка
```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка
npm run build

# Запуск продакшн
npm start

# Линтинг
npm run lint

# Проверка типов
npx tsc --noEmit
```

### Управление зависимостями
```bash
# Установить пакет
npm install package-name

# Установить dev зависимость
npm install -D package-name

# Удалить пакет
npm uninstall package-name

# Обновить пакет
npm update package-name

# Проверить устаревшие пакеты
npm outdated

# Аудит безопасности
npm audit

# Исправить уязвимости
npm audit fix

# Очистить кэш
npm cache clean --force
```

---

## 🔍 Отладка и мониторинг

### Проверка работы
```bash
# Проверка доступности сайта
curl https://ваш-сайт.com

# Проверка API
curl https://ваш-сайт.com/api/products

# Проверка с заголовками
curl -I https://ваш-сайт.com

# Проверка времени ответа
curl -w "@curl-format.txt" -o /dev/null -s https://ваш-сайт.com
```

### Логи
```bash
# Vercel логи
vercel logs --follow

# PM2 логи
pm2 logs tech-store --lines 100

# Nginx логи
sudo tail -f /var/log/nginx/error.log

# PostgreSQL логи
sudo tail -f /var/log/postgresql/postgresql-14-main.log

# Системные логи
sudo journalctl -u nginx -f
```

---

## 🔄 Обновление сайта

### Vercel (автоматически)
```bash
git add .
git commit -m "Update"
git push
# Vercel автоматически задеплоит
```

### VPS (вручную)
```bash
# Быстрое обновление
./deploy.sh

# Или вручную:
cd /var/www/tech-store
git pull
npm install
npx prisma generate
npx prisma migrate deploy
npm run build
pm2 restart tech-store
```

---

## 🆘 Решение проблем

### Очистка и переустановка
```bash
# Удалить node_modules и lock файлы
rm -rf node_modules package-lock.json

# Переустановить зависимости
npm install

# Очистить Next.js кэш
rm -rf .next

# Пересобрать
npm run build
```

### Проверка портов
```bash
# Проверить, что порт 3000 свободен
lsof -i :3000

# Убить процесс на порту 3000
kill -9 $(lsof -t -i:3000)
```

### Проверка БД
```bash
# Подключиться к PostgreSQL
psql -h host -U user -d database

# Список таблиц
\dt

# Описание таблицы
\d table_name

# Выход
\q
```

---

## 🔐 Безопасность

### Генерация секретов
```bash
# NEXTAUTH_SECRET
openssl rand -base64 32

# Или
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Проверка безопасности
```bash
# Аудит npm пакетов
npm audit

# Проверка SSL
openssl s_client -connect ваш-сайт.com:443

# Проверка заголовков безопасности
curl -I https://ваш-сайт.com
```

---

## 📊 Производительность

### Анализ сборки
```bash
# Анализ размера бандла
npm run build

# Lighthouse CI
npx lighthouse https://ваш-сайт.com --view

# Проверка производительности
npx @next/bundle-analyzer
```

---

## 💾 Бэкапы

### Автоматический бэкап БД (cron)
```bash
# Редактировать crontab
crontab -e

# Добавить задачу (каждый день в 2:00)
0 2 * * * pg_dump -h localhost -U user database > /backups/db_$(date +\%Y\%m\%d).sql

# Список задач
crontab -l
```

---

**Совет:** Сохраните этот файл и используйте как справочник при работе с проектом!
