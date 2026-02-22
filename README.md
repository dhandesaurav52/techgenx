This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend API + MySQL schema

This app now uses a MySQL database running in Docker for all backend entities.

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

### Apply schema manually (optional)

```bash
mysql -h 127.0.0.1 -P 3306 -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < database/schema.sql
```

### `.env` setup for Docker MySQL

A root `.env` file is included with required app + MySQL variables.
Before deployment, replace secrets:

- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `MYSQL_ROOT_PASSWORD`

Defaults are set up for local Docker Compose usage:

- `DB_HOST=mysql`
- `DB_PORT=3306`
- `DB_SSL=false`
- `SESSION_TTL_HOURS=168`

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
Passwords are stored as hashed values in `passwordHash` (using Node crypto scrypt).

## Docker

### Run with Docker Compose

```bash
docker compose -f compose-docker.yaml up --build
```

This starts:
- `mysql` container on port `3306`
- `app` container on `http://localhost:3000`

Schema is auto-initialized from `database/schema.sql` on first MySQL startup.

## CI/CD

GitHub Actions workflow is removed. Use Jenkins with the repository `Jenkinsfile`.
