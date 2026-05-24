#!/bin/bash
# Script to apply Prisma migrations on Railway

echo "🚀 Starting Prisma migration on Railway..."

# Generate Prisma Client
echo "📦 Generating Prisma Client..."
npx prisma generate

# Push schema changes to database
echo "🔄 Pushing schema changes to database..."
npx prisma db push --accept-data-loss

echo "✅ Migration completed successfully!"
