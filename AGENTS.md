<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:local-dev-config -->
# Local Development Configuration

This project runs entirely on localhost. Do NOT configure for cloud deployment.

## Frontend
- URL: http://localhost:3000
- API: http://localhost:8000/api (env: NEXT_PUBLIC_API_URL)
- .env file: frontend/.env.local

## Backend
- URL: http://localhost:8000
- Auto-reload via uvicorn: uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
- .env file: backend/.env

## Database
- MongoDB Community Server at mongodb://127.0.0.1:27017
- Database name: indiawebprogrammers
- Do NOT use MongoDB Atlas, Firebase, Supabase, or any cloud database

## File Storage
- Uploads: /backend/uploads
- Exports: /backend/exports
- Certificates: /backend/certificates

## Authentication
- JWT with localhost only
- No Auth0, Clerk, Firebase Auth, or external auth providers
- Refresh cookie: secure=only in production (false on localhost HTTP)

## Email
- SMTP architecture prepared but not connected to external services

## Payments
- Not integrated — leave as placeholders

## Prohibited
- Docker, Kubernetes, AWS, Azure, GCP, Render, Railway, Vercel Deploy, Netlify Deploy
- Cloud storage, cloud database, cloud auth
- MongoDB Atlas, Firebase, Supabase, PlanetScale, Neon, SQLite, PostgreSQL, MySQL

## Error Handling
- Developer-friendly errors with stack traces in development
- No production error masking during dev

## Logging
- API logs, DB logs, auth logs, validation logs, error logs all enabled in dev
<!-- END:local-dev-config -->
