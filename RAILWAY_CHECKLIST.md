# ✅ Чек-лист деплоя на Railway

## Подготовка (Завершено)

- [x] Код загружен на GitHub
- [x] Создан `railway.json`
- [x] Создана документация для деплоя
- [x] Создан раздел 2.9 для диплома

## Ваши действия (Следуйте по порядку)

### 1. Зайти на Railway
- [ ] Откройте https://railway.app/
- [ ] Нажмите "Start a New Project"
- [ ] Выберите "Deploy from GitHub repo"
- [ ] Авторизуйтесь через GitHub
- [ ] Выберите репозиторий: `triviattanew-wq/techstore`

### 2. Настроить переменные окружения
Откройте вкладку "Variables" и добавьте (копируйте по одной):

```
DATABASE_URL
```
Значение:
```
postgresql://neondb_owner:npg_cap75jlybEnY@ep-damp-wind-al26jk2t.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

```
DIRECT_URL
```
Значение:
```
postgresql://neondb_owner:npg_cap75jlybEnY@ep-damp-wind-al26jk2t.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

```
NEXTAUTH_SECRET
```
Значение:
```
SZs+RSVhIIcF8DbNF4P2z9S8lUfo3ZBZvPxhg5eEe8s=
```

```
NEXTAUTH_URL
```
Значение (временно):
```
https://temp.railway.app
```

```
ADMIN_EMAIL
```
Значение:
```
admin@techstore.ru
```

```
ADMIN_PASSWORD
```
Значение:
```
admin123
```

```
NEXT_PUBLIC_SITE_URL
```
Значение (временно):
```
https://temp.railway.app
```

```
NEXT_PUBLIC_SITE_NAME
```
Значение:
```
TechStore
```

- [ ] Все 8 переменных добавлены

### 3. Дождаться первого деплоя
- [ ] Деплой завершен (3-5 минут)
- [ ] Статус "Success" в разделе Deployments

### 4. Получить домен
- [ ] Откройте Settings → Domains
- [ ] Скопируйте ваш домен (например: `techstore-production-xxxx.up.railway.app`)

### 5. Обновить URL
- [ ] Вернитесь в Variables
- [ ] Измените `NEXTAUTH_URL` на ваш реальный домен Railway
- [ ] Измените `NEXT_PUBLIC_SITE_URL` на ваш реальный домен Railway
- [ ] Дождитесь автоматического редеплоя (2-3 минуты)

### 6. Проверить работу
Откройте в браузере и проверьте:

- [ ] Главная страница: `https://ваш-домен.railway.app/`
- [ ] Каталог: `https://ваш-домен.railway.app/catalog`
- [ ] Карточка товара открывается
- [ ] Фильтры работают
- [ ] Кнопка "В избранное" работает
- [ ] Кнопка "Сравнить" работает
- [ ] Корзина добавляет товары
- [ ] Админка: `https://ваш-домен.railway.app/admin/login`
- [ ] Вход в админку (admin@techstore.ru / admin123)
- [ ] Редактирование товара в админке

## Результат

После выполнения всех шагов у вас будет:

✅ Сайт на Railway с автоматическим HTTPS
✅ Глобальная CDN для быстрой загрузки
✅ Автоматический деплой при push в GitHub
✅ Встроенный мониторинг и логи
✅ Та же база данных Neon, что и на VPS

## Запишите для диплома

После успешного деплоя запишите:

- [ ] URL сайта на Railway: `https://___________________________`
- [ ] Дата деплоя: `_______________`
- [ ] Время деплоя: `_________` минут
- [ ] Скриншот главной страницы на Railway
- [ ] Скриншот админки на Railway
- [ ] Скриншот Railway dashboard с метриками

## Документация

Подробные инструкции в файлах:
- `QUICK_RAILWAY_DEPLOY.md` - быстрый старт
- `RAILWAY_DEPLOYMENT_GUIDE.md` - полное руководство
- `diploma_section_2_9_railway_deployment.txt` - раздел для диплома

## Поддержка

Если возникли проблемы:
1. Проверьте логи: Deployments → View Logs
2. Проверьте переменные: Variables
3. Проверьте домен: Settings → Domains

Удачи! 🚀
