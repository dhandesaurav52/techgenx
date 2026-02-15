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

### Environment variables (`.env.local`)

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=techgenx
```


### `.env` setup

A root `.env` file is included with all required variables for app + DB + compose.
Before private deployment, update these values with your real secrets/passkeys:

- `DB_PASSWORD`
- `MYSQL_PASSWORD`
- `MYSQL_ROOT_PASSWORD`

You can keep the same variable names and only replace values on your private machine.

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
`passwordHash` column is in place, but current code still compares plain text values for compatibility. Move to hashed passwords (bcrypt/argon2) before production traffic.

## Docker

### Run with Docker Compose

```bash
docker compose -f compose-docker.yaml up --build
```

This starts:
- `app` on `http://localhost:3000`
- `mysql` on `localhost:3306`

The MySQL container auto-runs `database/schema.sql` on first startup.
