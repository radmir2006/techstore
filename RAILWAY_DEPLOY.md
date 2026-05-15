# Инструкция по деплою на Railway

## Шаг 1: Подготовка проекта

Все необходимые файлы уже созданы:
- ✅ `railway.toml` - конфигурация Railway
- ✅ `prisma/schema.prisma` - схема базы данных
- ✅ `.env.production` - шаблон переменных окружения

## Шаг 2: Создание аккаунта на Railway

1. Перейдите на https://railway.app
2. Нажмите "Start a New Project" или "Login with GitHub"
3. Авторизуйтесь через GitHub (рекомендуется)

## Шаг 3: Создание нового проекта

### Вариант A: Деплой из GitHub (рекомендуется)

1. **Загрузите код в GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/ваш-username/ваш-репозиторий.git
   git push -u origin main
   ```

2. **В Railway:**
   - Нажмите "New Project"
   - Выберите "Deploy from GitHub repo"
   - Выберите ваш репозиторий
   - Railway автоматически обнаружит Next.js проект

### Вариант B: Деплой через Railway CLI

1. **Установите Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Авторизуйтесь:**
   ```bash
   railway login
   ```

3. **Инициализируйте проект:**
   ```bash
   railway init
   ```

4. **Задеплойте:**
   ```bash
   railway up
   ```

## Шаг 4: Добавление PostgreSQL базы данных

1. В вашем проекте Railway нажмите "New"
2. Выберите "Database" → "Add PostgreSQL"
3. Railway автоматически создаст базу данных и добавит переменную `DATABASE_URL`

## Шаг 5: Настройка переменных окружения

В разделе "Variables" вашего проекта добавьте:

### Обязательные переменные:

```bash
# База данных (автоматически добавляется Railway)
DATABASE_URL=postgresql://...

# NextAuth Secret (сгенерируйте новый!)
NEXTAUTH_SECRET=ваш-секретный-ключ-минимум-32-символа

# URL сайта (будет доступен после первого деплоя)
NEXTAUTH_URL=https://ваш-проект.up.railway.app
NEXT_PUBLIC_SITE_URL=https://ваш-проект.up.railway.app

# Админ
ADMIN_EMAIL=admin@techstore.ru
ADMIN_PASSWORD=ваш-безопасный-пароль

# Название сайта
NEXT_PUBLIC_SITE_NAME=TechStore
```

### Опциональные переменные (для email):

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=ваш@gmail.com
SMTP_PASS=ваш-app-password
SMTP_FROM=noreply@techstore.ru
```

### Генерация NEXTAUTH_SECRET:

```bash
# В терминале выполните:
openssl rand -base64 32
```

## Шаг 6: Настройка домена (опционально)

1. В разделе "Settings" → "Domains"
2. Railway предоставит домен вида: `ваш-проект.up.railway.app`
3. Можно добавить свой домен, нажав "Custom Domain"

## Шаг 7: Миграция базы данных

После первого деплоя нужно применить миграции:

### Через Railway CLI:

```bash
railway run npx prisma db push
```

### Или через Railway Dashboard:

1. Откройте ваш сервис
2. Перейдите в "Settings" → "Deploy"
3. Добавьте команду в "Build Command":
   ```
   npm install && npx prisma generate && npx prisma db push && npm run build
   ```

## Шаг 8: Заполнение базы данных (опционально)

Если у вас есть seed скрипт:

```bash
railway run npm run db:seed
```

## Шаг 9: Проверка деплоя

1. Откройте URL вашего проекта
2. Проверьте, что сайт загружается
3. Попробуйте войти в админ-панель: `/admin/login`
   - Email: `admin@techstore.ru`
   - Пароль: тот, что указали в `ADMIN_PASSWORD`

## Автоматические деплои

Railway автоматически деплоит при каждом push в GitHub:
- Push в `main` → автоматический деплой в production
- Pull Request → создается preview окружение

## Мониторинг и логи

1. **Логи:** В Railway Dashboard → "Deployments" → выберите деплой → "View Logs"
2. **Метрики:** "Metrics" покажет использование CPU, RAM, Network
3. **База данных:** "PostgreSQL" → "Data" для просмотра таблиц

## Troubleshooting

### Ошибка при билде:

```bash
# Проверьте логи билда в Railway Dashboard
# Убедитесь, что все зависимости установлены
```

### Ошибка подключения к БД:

```bash
# Проверьте, что DATABASE_URL правильно установлен
# Убедитесь, что PostgreSQL сервис запущен
```

### Ошибка 500 на сайте:

```bash
# Проверьте логи приложения
# Убедитесь, что все переменные окружения установлены
# Проверьте, что миграции применены
```

## Полезные команды Railway CLI

```bash
# Просмотр логов
railway logs

# Выполнение команд в production
railway run <команда>

# Подключение к БД
railway connect postgres

# Просмотр переменных
railway variables

# Откат к предыдущему деплою
railway rollback
```

## Стоимость

- **Hobby Plan:** $5/месяц
  - $5 кредитов включено
  - Подходит для небольших проектов
  
- **Pro Plan:** $20/месяц
  - $20 кредитов включено
  - Больше ресурсов и возможностей

## Дополнительные ресурсы

- [Railway Documentation](https://docs.railway.app)
- [Next.js on Railway](https://docs.railway.app/guides/nextjs)
- [Prisma on Railway](https://docs.railway.app/databases/postgresql)

## Контрольный чеклист

- [ ] Код загружен в GitHub
- [ ] Проект создан в Railway
- [ ] PostgreSQL база данных добавлена
- [ ] Все переменные окружения настроены
- [ ] NEXTAUTH_SECRET сгенерирован
- [ ] Миграции применены (`prisma db push`)
- [ ] Сайт открывается по URL
- [ ] Админ-панель работает
- [ ] Домен настроен (если нужен)

---

**Готово!** Ваш сайт теперь доступен онлайн 🚀
