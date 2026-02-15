This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend API + MySQL schema

This app now uses a MySQL database (AWS RDS-compatible) for all backend entities.

### Required tables
The schema includes all requested entities/fields:

- **Users**: `id`, `name`, `email`, `passwordHash`, `createdAt`
- **Sessions**: `sessionId`, `userId`, `expiresAt`
- **Courses**: `courseId`, `title`, `description`, `price`, `createdAt`
- **Enrollments**: `enrollmentId`, `userId`, `courseId`, `enrolledAt`
- **Contacts**: `contactId`, `name`, `email`, `message`, `submittedAt`

### Migrations / SQL scripts
- Base schema: `database/schema.sql`
- Migration copy: `database/migrations/001_init_schema.sql`

### Apply schema

```bash
mysql -h <rds-endpoint> -u <user> -p < database/schema.sql
```

### `.env` setup for AWS RDS

A root `.env` file is included with all required app + RDS variables.
Before private deployment, replace these values:

- `DB_HOST` (your RDS endpoint)
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`

Optional:
- `DB_SSL=true` for encrypted RDS connections
- `SESSION_TTL_HOURS` to control session expiry

### API routes
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/me`
- `PATCH /api/me/settings`
- `GET /api/courses`
- `GET /api/courses/:slug` (slug is generated from title in backend)
- `GET /api/enrollments`
- `POST /api/enrollments`
- `POST /api/contact`

### Security note
Passwords are now stored as hashed values in `passwordHash` (using Node crypto scrypt). For production hardening, consider managed secret rotation and stricter TLS verification for RDS.

## Docker

### Run with Docker Compose

```bash
docker compose -f compose-docker.yaml up --build
```

This starts only the `app` container on `http://localhost:3000` and connects it to your external AWS RDS MySQL database using values from `.env`.
