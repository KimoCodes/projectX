# projectX — Backend scaffold (NestJS)

This scaffold provides a minimal backend for a TaskRabbit-like MVP using NestJS, TypeORM, PostgreSQL, Redis, and Stripe.

Quick start (dev)
1. Copy `.env.example` to `.env` and fill values.
2. Start services:
   - docker-compose -f docker-compose.dev.yml up -d
3. Install dependencies:
   - npm install
4. Run migrations (or let TypeORM sync in dev):
   - npm run typeorm:migrate
5. Start dev server:
   - npm run start:dev

Main endpoints
- POST /api/v1/auth/signup
- POST /api/v1/auth/login
- POST /api/v1/auth/refresh
- POST /api/v1/auth/phone-verify (placeholder)
- GET /api/v1/tasks
- POST /api/v1/tasks
- GET /api/v1/tasks/:id
- POST /api/v1/tasks/:id/offers
- POST /api/v1/payments/create-intent
- POST /api/v1/payments/webhook

Environment variables
See `.env.example`.

Notes
- This scaffold is intended as a starting point — add validation, error handling, tests, CI, and production-grade secrets management before production use.