# Pastebin-Lite Implementation TODO

## Completed
- [x] Set up Next.js 14 project with TypeScript, Tailwind CSS
- [x] Install Prisma ORM and PostgreSQL dependencies
- [x] Set up Prisma schema with Paste model
- [x] Create lib/time.ts for deterministic time handling
- [x] Create lib/prisma.ts for database client
- [x] Implement API routes:
  - [x] GET /api/healthz (health check with DB connectivity)
  - [x] POST /api/pastes (create paste with validation)
  - [x] GET /api/pastes/[id] (fetch paste with constraints)
- [x] Create UI pages:
  - [x] / (home page with paste creation form)
  - [x] /p/[id] (HTML view for pastes)
- [x] Update README with deployment and local run instructions
- [x] Run Prisma migration for database setup

## Followup steps
- [ ] Set up Neon PostgreSQL database
- [ ] Configure environment variables (.env)
- [ ] Test locally with `npm run dev`
- [ ] Deploy to Vercel with PostgreSQL connection
- [ ] Verify automated tests pass
