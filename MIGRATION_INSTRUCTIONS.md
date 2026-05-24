# Инструкция по применению миграции inStock

## Проблема
Добавлено новое поле `inStock` в модель Product, но миграция не применена к базе данных на Railway.

## Решение

### Вариант 1: Через Railway Dashboard (рекомендуется)

1. Откройте ваш проект на Railway: https://railway.app
2. Выберите сервис `techstore`
3. Перейдите в раздел **Settings** → **Deploy**
4. Нажмите **Redeploy** для принудительного пересоздания

### Вариант 2: Через Railway Shell

1. Откройте ваш проект на Railway
2. Выберите сервис `techstore`
3. Нажмите на три точки (...) → **Shell**
4. Выполните команду:
```bash
npx prisma db push --accept-data-loss
```

### Вариант 3: Через SQL (если предыдущие не работают)

1. Откройте ваш проект на Railway
2. Выберите базу данных **Postgres**
3. Перейдите в раздел **Data**
4. Выполните SQL запрос:
```sql
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "inStock" BOOLEAN NOT NULL DEFAULT true;
UPDATE "Product" SET "inStock" = true WHERE "inStock" IS NULL;
CREATE INDEX IF NOT EXISTS "Product_inStock_idx" ON "Product"("inStock");
```

## Проверка

После применения миграции проверьте что сайт работает:
- Откройте: https://techstore-production-aa2a.up.railway.app/
- Проверьте что товары отображаются
- Зайдите в админку и проверьте что галочка "В наличии" появилась в форме товара

## Если ошибка осталась

Если после применения миграции все еще ошибка, проверьте логи Railway:
1. Откройте проект на Railway
2. Выберите сервис `techstore`
3. Перейдите в раздел **Deployments**
4. Откройте последний деплой
5. Посмотрите логи на наличие ошибок
