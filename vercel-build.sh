#!/bin/bash

# Vercel build script to handle Prisma migrations
echo "Starting Vercel build process..."

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Deploy migrations to production database
echo "Deploying database migrations..."
npx prisma migrate deploy

# Build the Next.js application
echo "Building Next.js application..."
npm run build

echo "Build completed successfully!"
