# Pastebin Lite

Simple Pastebin-like app built with Next.js and PostgreSQL.

## Run locally
npm install
npx prisma migrate dev
npm run dev

## Persistence
PostgreSQL (Neon) using Prisma ORM.

## Design Notes
- Supports TTL and view-based expiry
- Deterministic time handling for tests
- Serverless-safe persistence
