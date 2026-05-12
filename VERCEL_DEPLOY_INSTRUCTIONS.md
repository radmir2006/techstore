# 🚀 Инструкция по деплою на Vercel

## ✅ Что уже сделано:

- ✅ База данных Neon создана и настроена
- ✅ Миграции применены
- ✅ База заполнена начальными данными
- ✅ Проект готов к деплою

---

## 📋 Шаг 1: Загрузите код на GitHub

Если репозиторий уже создан:
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push
```

Если репозиторий еще не создан:
1. Создайте новый репозиторий на https://github.com
2. Выполните:
```bash
git remote add origin https://github.com/ваш-username/ваш-репозиторий.git
git branch -M main
git add .
git commit -m "Ready for Vercel deployment"
git push -u origin main
```

---

## 📋 Шаг 2: Деплой на Vercel

1. **Зайдите на https://vercel.com**
2. **Войдите через GitHub**
3. **Нажмите "Add New Project"**
4. **Выберите ваш репозиторий**
5. Vercel автоматически определит Next.js

---

## 📋 Шаг 3: Добавьте переменные окружения

В настройках проекта Vercel (Settings → Environment Variables) добавьте:

### Обязательные переменные:

```env
DATABASE_URL
postgresql://neondb_owner:npg_cap75jlybEnY@ep-damp-wind-al26jk2t.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require

DIRECT_URL
postgresql://neondb_owner:npg_cap75jlybEnY@ep-damp-wind-al26jk2t.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require

NEXTAUTH_SECRET
SZs+RSVhIIcF8DbNF4P2z9S8lUfo3ZBZvPxhg5eEe8s=

NEXTAUTH_URL
https://ваш-проект.vercel.app

ADMIN_EMAIL
admin@techstore.ru

ADMIN_PASSWORD
admin123

NEXT_PUBLIC_SITE_URL
https://ваш-проект.vercel.app

NEXT_PUBLIC_SITE_NAME
TechStore
```

**ВАЖНО:** 
- Замените `https://ваш-проект.vercel.app` на реальный URL вашего проекта
- После первого деплоя Vercel покажет вам URL
- Затем обновите `NEXTAUTH_URL` и `NEXT_PUBLIC_SITE_URL` с правильным URL

### Опционально (для email уведомлений):

```env
SMTP_HOST
smtp.gmail.com

SMTP_PORT
587

SMTP_USER
your@gmail.com

SMTP_PASS
your-app-password

SMTP_FROM
noreply@techstore.ru
```

---

## 📋 Шаг 4: Деплой

1. **Нажмите "Deploy"**
2. Дождитесь завершения сборки (2-3 минуты)
3. Vercel покажет URL вашего сайта

---

## 📋 Шаг 5: Обновите URL в переменных окружения

После первого деплоя:

1. Скопируйте URL вашего проекта (например: `https://tech-store-abc123.vercel.app`)
2. Зайдите в Settings → Environment Variables
3. Обновите:
   - `NEXTAUTH_URL` → `https://ваш-реальный-url.vercel.app`
   - `NEXT_PUBLIC_SITE_URL` → `https://ваш-реальный-url.vercel.app`
4. Нажмите "Redeploy" для применения изменений

---

## 📋 Шаг 6: Проверка

Откройте ваш сайт и проверьте:

- ✅ Главная страница загружается
- ✅ Каталог товаров работает: `/catalog`
- ✅ API работает: `/api/products`
- ✅ Админ панель доступна: `/admin/login`
  - Email: `admin@techstore.ru`
  - Пароль: `admin123`

---

## 🔄 Обновление сайта

После деплоя любые изменения автоматически деплоятся при push в GitHub:

```bash
git add .
git commit -m "Описание изменений"
git push
```

Vercel автоматически пересоберет и задеплоит сайт!

---

## 🎨 Добавление своего домена (опционально)

1. В Vercel Dashboard → Settings → Domains
2. Нажмите "Add Domain"
3. Введите ваш домен (например: `techstore.ru`)
4. Vercel покажет DNS записи для настройки
5. Добавьте эти записи у вашего регистратора домена
6. После проверки обновите переменные окружения:
   - `NEXTAUTH_URL` → `https://techstore.ru`
   - `NEXT_PUBLIC_SITE_URL` → `https://techstore.ru`

---

## 🆘 Решение проблем

### Ошибка при деплое
1. Проверьте логи в Vercel Dashboard → Deployments → Logs
2. Убедитесь, что все переменные окружения добавлены
3. Проверьте, что `DATABASE_URL` правильный

### Ошибка подключения к БД
1. Проверьте, что база данных Neon активна
2. Убедитесь, что `DATABASE_URL` и `DIRECT_URL` правильные
3. Проверьте, что в URL есть `?sslmode=require`

### Не работает админ панель
1. Проверьте, что `NEXTAUTH_URL` совпадает с реальным URL сайта
2. Очистите cookies браузера
3. Попробуйте войти снова

### Изображения не загружаются
1. Проверьте `next.config.js` → `images.remotePatterns`
2. Убедитесь, что домены изображений добавлены

---

## 📊 Мониторинг

В Vercel Dashboard вы можете:
- Просматривать логи деплоя
- Мониторить трафик
- Проверять ошибки
- Анализировать производительность

---

## 🔐 Безопасность

**ВАЖНО:** После деплоя обязательно:

1. **Смените пароль администратора**
   - Войдите в админку: `/admin/login`
   - Перейдите в настройки
   - Смените пароль с `admin123` на более безопасный

2. **Обновите переменную окружения**
   - В Vercel Settings → Environment Variables
   - Обновите `ADMIN_PASSWORD` на новый пароль
   - Redeploy проект

---

## 📞 Полезные ссылки

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Neon Dashboard**: https://console.neon.tech
- **Документация Vercel**: https://vercel.com/docs
- **Документация Next.js**: https://nextjs.org/docs

---

## 🎉 Готово!

Ваш сайт успешно размещен на хостинге!

**URL сайта:** https://ваш-проект.vercel.app
**Админ панель:** https://ваш-проект.vercel.app/admin/login

Удачи! 🚀
