# Vanta — real-time social video platform

This project is a production-friendly foundation for a premium real-time social video application with live calls, avatar switching, profile/social infrastructure, secure consent, and real-time signaling.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- Socket.IO + WebRTC signaling scaffold
- Production-ready route structure and auth/session cookies

## Scripts

```bash
npm install
cp .env.example .env.local
npx prisma generate
npx prisma db push
npm run dev
```

## Features included

- Landing page and dashboard
- Real-time calling UI and signaling service
- Avatar studio and profile UI
- Social account integration endpoints
- Auth, session, and route protection foundation
- Admin-style security, privacy, and call history structure

## Deployment notes

- Use a managed Postgres instance for `DATABASE_URL`
- Configure actual OAuth providers in `.env.local`
- Use HTTPS in production and secure session cookies
- Replace the mock-store with production database-backed APIs when ready
- Add WebRTC media processing for real-time transformation pipeline
