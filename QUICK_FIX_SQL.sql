-- БЫСТРОЕ ИСПРАВЛЕНИЕ: Добавление поля inStock в таблицу Product
-- Выполните этот SQL в Railway Dashboard → Postgres → Data → Query

-- Шаг 1: Добавить колонку inStock (если её нет)
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "inStock" BOOLEAN NOT NULL DEFAULT true;

-- Шаг 2: Установить значение true для всех существующих товаров
UPDATE "Product" SET "inStock" = true WHERE "inStock" IS NULL;

-- Шаг 3: Создать индекс для быстрого поиска
CREATE INDEX IF NOT EXISTS "Product_inStock_idx" ON "Product"("inStock");

-- Шаг 4: Проверка - должно вернуть количество товаров
SELECT COUNT(*) as total_products, 
       SUM(CASE WHEN "inStock" = true THEN 1 ELSE 0 END) as in_stock_count
FROM "Product";
