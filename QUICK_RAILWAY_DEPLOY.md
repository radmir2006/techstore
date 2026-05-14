# Быстрый деплой на Railway - TechStore

## ✅ Что уже сделано:

1. Код загружен на GitHub: https://github.com/triviattanew-wq/techstore
2. Создан файл `railway.json` с конфигурацией
3. Все изменения закоммичены и запушены

## 🚀 Что нужно сделать:

### Шаг 1: Создать проект на Railway

1. Откройте https://railway.app/
2. Нажмите **"Start a New Project"**
3. Выберите **"Deploy from GitHub repo"**
4. Авторизуйтесь через GitHub (если нужно)
5. Выберите репозиторий: **triviattanew-wq/techstore**
6. Railway автоматически начнет деплой

### Шаг 2: Добавить переменные окружения

Пока идет первый деплой, откройте вкладку **"Variables"** и добавьте:

```
DATABASE_URL=postgresql://neondb_owner:npg_cap75jlybEnY@ep-damp-wind-al26jk2t.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require

DIRECT_URL=postgresql://neondb_owner:npg_cap75jlybEnY@ep-damp-wind-al26jk2t.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require

NEXTAUTH_SECRET=SZs+RSVhIIcF8DbNF4P2z9S8lUfo3ZBZvPxhg5eEe8s=

NEXTAUTH_URL=https://temporary-url.railway.app

ADMIN_EMAIL=admin@techstore.ru

ADMIN_PASSWORD=admin123

NEXT_PUBLIC_SITE_URL=https://temporary-url.railway.app

NEXT_PUBLIC_SITE_NAME=TechStore
```

**Примечание:** Пока используйте временный URL для `NEXTAUTH_URL` и `NEXT_PUBLIC_SITE_URL`. Мы обновим их на следующем шаге.

### Шаг 3: Получить домен Railway

1. Дождитесь завершения деплоя (3-5 минут)
2. В разделе **"Settings"** → **"Domains"** скопируйте ваш домен
3. Он будет выглядеть примерно так: `techstore-production-xxxx.up.railway.app`

### Шаг 4: Обновить URL в переменных

1. Вернитесь в **"Variables"**
2. Обновите две переменные на ваш реальный домен:
   - `NEXTAUTH_URL=https://ваш-домен.railway.app`
   - `NEXT_PUBLIC_SITE_URL=https://ваш-домен.railway.app`
3. Railway автоматически сделает редеплой (~2 минуты)

### Шаг 5: Проверить работу сайта

Откройте в браузере:

- ✅ Главная: `https://ваш-домен.railway.app/`
- ✅ Каталог: `https://ваш-домен.railway.app/catalog`
- ✅ Админка: `https://ваш-домен.railway.app/admin/login`
  - Email: admin@techstore.ru
  - Пароль: admin123

## 📊 Что проверить после деплоя:

- [ ] Главная страница загружается
- [ ] Товары отображаются из БД
- [ ] Фильтры работают
- [ ] Карточка товара открывается
- [ ] Кнопки "В избранное", "Сравнить" работают
- [ ] Корзина добавляет товары
- [ ] Админка открывается
- [ ] Вход в админку работает
- [ ] Можно редактировать товары

## 🔧 Если что-то не работает:

### Проблема: Ошибка подключения к БД
**Решение:** Проверьте, что `DATABASE_URL` содержит `?sslmode=require` в конце

### Проблема: Ошибка 500 на главной
**Решение:** 
1. Откройте **"Deployments"** → выберите последний деплой → **"View Logs"**
2. Найдите ошибку в логах
3. Проверьте, что все переменные окружения установлены

### Проблема: NextAuth ошибка
**Решение:** Убедитесь, что `NEXTAUTH_URL` совпадает с доменом Railway (включая https://)

## 💰 Стоимость

- **Бесплатный trial:** $5 кредитов
- **Hobby Plan:** $5/месяц + оплата по факту использования
- **Примерная стоимость для TechStore:** $10-15/месяц

## 📝 Полезные ссылки

- Railway Dashboard: https://railway.app/dashboard
- Railway Docs: https://docs.railway.app/
- GitHub Repo: https://github.com/triviattanew-wq/techstore

## ✨ Готово!

После выполнения всех шагов ваш сайт будет доступен по адресу Railway с:
- ✅ Автоматическим HTTPS
- ✅ Глобальной CDN
- ✅ Автоматическим деплоем при push в GitHub
- ✅ Встроенным мониторингом и логами
