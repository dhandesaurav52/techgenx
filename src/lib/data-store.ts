import { randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { RowDataPacket } from "mysql2";
import { getPool } from "@/lib/mysql";
import { ContactMessage, Course, Session, UserAccount } from "@/lib/types";

type UserRow = RowDataPacket & {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

type CourseRow = RowDataPacket & {
  courseId: number;
  title: string;
  description: string;
  price: string;
  createdAt: string;
};


function hashPassword(rawPassword: string): string {
  const salt = randomUUID().replace(/-/g, "").slice(0, 16);
  const hash = scryptSync(rawPassword, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(rawPassword: string, stored: string): boolean {
  if (!stored.includes(":")) {
    return rawPassword === stored;
  }

  const [salt, storedHash] = stored.split(":");
  if (!salt || !storedHash) return false;

  const candidate = scryptSync(rawPassword, salt, 64);
  const storedBuffer = Buffer.from(storedHash, "hex");
  if (candidate.length !== storedBuffer.length) return false;
  return timingSafeEqual(candidate, storedBuffer);
}

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

function mapCourse(row: CourseRow): Course {
  return {
    courseId: row.courseId,
    title: row.title,
    slug: toSlug(row.title),
    description: row.description,
    price: row.price,
    createdAt: row.createdAt,
  };
}

function mapUser(row: UserRow, enrolledCourses: string[]): UserAccount {
  return {
    id: row.id,
    fullName: row.name,
    email: row.email,
    passwordHash: row.passwordHash,
    registeredAt: row.createdAt,
    enrolledCourses,
  };
}

export function sanitizeUser(account: UserAccount): Omit<UserAccount, "passwordHash"> {
  return {
    id: account.id,
    fullName: account.fullName,
    email: account.email,
    registeredAt: account.registeredAt,
    enrolledCourses: account.enrolledCourses,
  };
}

async function getEnrolledCoursesByUserId(userId: number): Promise<string[]> {
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT c.title
     FROM enrollments e
     INNER JOIN courses c ON c.courseId = e.courseId
     WHERE e.userId = ?
     ORDER BY e.enrolledAt DESC`,
    [userId]
  );

  return rows.map((row: RowDataPacket) => String(row.title));
}

async function getUserByEmail(email: string): Promise<UserRow | null> {
  const pool = getPool();
  const [rows] = await pool.query<UserRow[]>(
    `SELECT id, name, email, passwordHash, createdAt
     FROM users
     WHERE email = ?
     LIMIT 1`,
    [email]
  );

  return rows[0] ?? null;
}

export async function createAccount(payload: {
  fullName: string;
  email: string;
  password: string;
}): Promise<{ ok: true; user: Omit<UserAccount, "passwordHash"> } | { ok: false; message: string }> {
  const pool = getPool();
  const email = payload.email.trim().toLowerCase();

  const existing = await getUserByEmail(email);
  if (existing) {
    return { ok: false, message: "Email already exists" };
  }

  const createdAt = new Date().toISOString();
  await pool.query(
    `INSERT INTO users (name, email, passwordHash, createdAt)
     VALUES (?, ?, ?, ?)`,
    [payload.fullName.trim(), email, hashPassword(payload.password), createdAt]
  );

  const insertedUser = await getUserByEmail(email);
  if (!insertedUser) {
    return { ok: false, message: "Unable to create user" };
  }

  return {
    ok: true,
    user: sanitizeUser(mapUser(insertedUser, [])),
  };
}

export async function createSessionForUser(userId: number): Promise<Session> {
  const pool = getPool();
  const sessionId = randomUUID();
  const ttlHours = Number(process.env.SESSION_TTL_HOURS || 168);
  const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000).toISOString();

  await pool.query("DELETE FROM sessions WHERE userId = ?", [userId]);
  await pool.query("INSERT INTO sessions (sessionId, userId, expiresAt) VALUES (?, ?, ?)", [
    sessionId,
    userId,
    expiresAt,
  ]);

  return { sessionId, userId, expiresAt };
}

export async function removeSession(sessionId: string): Promise<void> {
  const pool = getPool();
  await pool.query("DELETE FROM sessions WHERE sessionId = ?", [sessionId]);
}

export async function getUserByToken(sessionId: string): Promise<UserAccount | null> {
  const pool = getPool();
  const [rows] = await pool.query<UserRow[]>(
    `SELECT u.id, u.name, u.email, u.passwordHash, u.createdAt
     FROM sessions s
     INNER JOIN users u ON u.id = s.userId
     WHERE s.sessionId = ?
       AND s.expiresAt > ?
     LIMIT 1`,
    [sessionId, new Date().toISOString()]
  );

  if (!rows.length) return null;

  const userRow = rows[0];
  const enrolledCourses = await getEnrolledCoursesByUserId(userRow.id);
  return mapUser(userRow, enrolledCourses);
}

export async function verifyLogin(email: string, password: string): Promise<UserAccount | null> {
  const pool = getPool();
  const normalizedEmail = email.trim().toLowerCase();

  const [rows] = await pool.query<UserRow[]>(
    `SELECT id, name, email, passwordHash, createdAt
     FROM users
     WHERE email = ?
     LIMIT 1`,
    [normalizedEmail]
  );

  if (!rows.length) return null;

  const userRow = rows[0];
  if (!verifyPassword(password, userRow.passwordHash)) return null;
  const enrolledCourses = await getEnrolledCoursesByUserId(userRow.id);
  return mapUser(userRow, enrolledCourses);
}

export async function updateUserSettings(
  userId: number,
  updates: Partial<Pick<UserAccount, "fullName">>
): Promise<UserAccount | null> {
  const pool = getPool();

  await pool.query(
    `UPDATE users
     SET name = COALESCE(?, name)
     WHERE id = ?`,
    [updates.fullName?.trim() || null, userId]
  );

  const [rows] = await pool.query<UserRow[]>(
    `SELECT id, name, email, passwordHash, createdAt
     FROM users
     WHERE id = ?
     LIMIT 1`,
    [userId]
  );

  if (!rows.length) return null;

  const userRow = rows[0];
  const enrolledCourses = await getEnrolledCoursesByUserId(userRow.id);
  return mapUser(userRow, enrolledCourses);
}

export async function getCourses(): Promise<Course[]> {
  const pool = getPool();
  const [rows] = await pool.query<CourseRow[]>(
    `SELECT courseId, title, description, price, createdAt
     FROM courses
     ORDER BY courseId ASC`
  );

  return rows.map((row: CourseRow) => mapCourse(row));
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const courses = await getCourses();
  return courses.find((course) => course.slug === slug) ?? null;
}

export async function enrollUserInCourse(userId: number, courseId: number): Promise<UserAccount | null> {
  const pool = getPool();
  const enrollmentId = randomUUID();

  await pool.query(
    `INSERT INTO enrollments (enrollmentId, userId, courseId, enrolledAt)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE enrolledAt = VALUES(enrolledAt)`,
    [enrollmentId, userId, courseId, new Date().toISOString()]
  );

  const [rows] = await pool.query<UserRow[]>(
    `SELECT id, name, email, passwordHash, createdAt
     FROM users
     WHERE id = ?
     LIMIT 1`,
    [userId]
  );

  if (!rows.length) return null;

  const userRow = rows[0];
  const enrolledCourses = await getEnrolledCoursesByUserId(userRow.id);
  return mapUser(userRow, enrolledCourses);
}

export async function createContactMessage(payload: Omit<ContactMessage, "contactId" | "submittedAt">) {
  const pool = getPool();
  const contactId = randomUUID();
  const submittedAt = new Date().toISOString();

  await pool.query(
    `INSERT INTO contacts (contactId, name, email, message, submittedAt)
     VALUES (?, ?, ?, ?, ?)`,
    [contactId, payload.name, payload.email, payload.message, submittedAt]
  );

  return {
    ...payload,
    contactId,
    submittedAt,
  };
}
