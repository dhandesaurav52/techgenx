This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Backend API (added)

This project now includes a basic Node.js runtime backend using Next.js Route Handlers with file-based persistence in `data/db.json`.

### Auth
- `POST /api/auth/signup` → create account and session token
- `POST /api/auth/login` → login and return session token
- `POST /api/auth/logout` → invalidate session token

### User
- `GET /api/me` → current user profile (requires `Authorization: Bearer <token>`)
- `PATCH /api/me/settings` → update `fullName`, `darkMode`, `emailNotifications` (requires token)

### Courses
- `GET /api/courses` → list all courses
- `GET /api/courses/:slug` → get course details

### Enrollments
- `GET /api/enrollments` → list current user enrolled courses (requires token)
- `POST /api/enrollments` → enroll in a course with `courseSlug` or `courseTitle` (requires token)

### Contact
- `POST /api/contact` → submit a contact message

### Notes
- Storage is file-based for quick development (`data/db.json`).
- For production, replace with a real database and secure password hashing/token strategy.
