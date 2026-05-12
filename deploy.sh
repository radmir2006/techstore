#!/bin/bash

# Скрипт для деплоя на VPS
# Использование: ./deploy.sh

echo "🚀 Начинаем деплой Tech Store..."

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Проверка наличия .env файла
if [ ! -f .env ]; then
    echo -e "${RED}❌ Файл .env не найден!${NC}"
    echo "Скопируйте .env.example в .env и заполните переменные:"
    echo "cp .env.example .env"
    exit 1
fi

# Обновление кода
echo -e "${YELLOW}📥 Получение последних изменений...${NC}"
git pull origin main

# Установка зависимостей
echo -e "${YELLOW}📦 Установка зависимостей...${NC}"
npm install

# Генерация Prisma клиента
echo -e "${YELLOW}🔧 Генерация Prisma клиента...${NC}"
npx prisma generate

# Применение миграций
echo -e "${YELLOW}🗄️  Применение миграций базы данных...${NC}"
npx prisma migrate deploy

# Сборка проекта
echo -e "${YELLOW}🏗️  Сборка проекта...${NC}"
npm run build

# Перезапуск PM2
echo -e "${YELLOW}🔄 Перезапуск приложения...${NC}"
pm2 restart tech-store || pm2 start ecosystem.config.js

# Сохранение конфигурации PM2
pm2 save

echo -e "${GREEN}✅ Деплой завершен успешно!${NC}"
echo ""
echo "Проверьте статус приложения:"
echo "pm2 status"
echo ""
echo "Просмотр логов:"
echo "pm2 logs tech-store"
