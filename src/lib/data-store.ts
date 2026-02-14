import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { DatabaseShape, UserAccount, Course, ContactMessage, Session } from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "db.json");

const defaultCourses: Course[] = [
  {
    title: "Full Stack Web Development",
    slug: "full-stack-web-development",
    description: "Learn HTML, CSS, JavaScript, React, Node.js, and more.",
    price: "₹4,999",
    duration: "3 Months",
  },
  {
    title: "Data Science & Machine Learning",
    slug: "data-science-ml",
    description: "Python, Pandas, NumPy, ML algorithms, and real projects.",
    price: "₹5,999",
    duration: "4 Months",
  },
  {
    title: "Cybersecurity Essentials",
    slug: "cybersecurity-essentials",
    description: "Protect systems, networks, and learn ethical hacking.",
    price: "₹3,999",
    duration: "2 Months",
  },
  {
    title: "Cloud Computing with AWS",
    slug: "cloud-computing-aws",
    description: "Learn AWS services, deployment, and cloud architecture.",
    price: "₹6,499",
    duration: "3 Months",
  },
];

const defaultDb: DatabaseShape = {
  accounts: [],
  courses: defaultCourses,
  contacts: [],
  sessions: [],
};

async function ensureDb() {
  try {
    await readFile(DB_PATH, "utf-8");
  } catch {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(DB_PATH, JSON.stringify(defaultDb, null, 2), "utf-8");
  }
}

export async function readDb(): Promise<DatabaseShape> {
  await ensureDb();
  const raw = await readFile(DB_PATH, "utf-8");
  const parsed = JSON.parse(raw) as DatabaseShape;

  return {
    accounts: parsed.accounts ?? [],
    courses: parsed.courses?.length ? parsed.courses : defaultCourses,
    contacts: parsed.contacts ?? [],
    sessions: parsed.sessions ?? [],
  };
}

export async function writeDb(data: DatabaseShape): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export function sanitizeUser(account: UserAccount) {
  const safeUser = { ...account };
  delete safeUser.password;
  return safeUser;
}

export async function createAccount(payload: {
  fullName: string;
  email: string;
  password: string;
}): Promise<{ ok: true; user: Omit<UserAccount, "password"> } | { ok: false; message: string }> {
  const db = await readDb();
  const email = payload.email.trim().toLowerCase();

  if (db.accounts.some((acc) => acc.email.toLowerCase() === email)) {
    return { ok: false, message: "Email already exists" };
  }

  const newAccount: UserAccount = {
    fullName: payload.fullName.trim(),
    email,
    password: payload.password,
    registeredAt: new Date().toLocaleString(),
    enrolledCourses: [],
    role: "student",
    darkMode: false,
    emailNotifications: true,
  };

  db.accounts.push(newAccount);
  await writeDb(db);

  return { ok: true, user: sanitizeUser(newAccount) };
}

export async function createSessionForUser(email: string): Promise<Session> {
  const db = await readDb();
  db.sessions = db.sessions.filter((s) => s.email !== email);

  const session: Session = {
    token: randomUUID(),
    email,
    createdAt: new Date().toISOString(),
  };

  db.sessions.push(session);
  await writeDb(db);

  return session;
}

export async function removeSession(token: string): Promise<void> {
  const db = await readDb();
  db.sessions = db.sessions.filter((s) => s.token !== token);
  await writeDb(db);
}

export async function getUserByToken(token: string): Promise<UserAccount | null> {
  const db = await readDb();
  const session = db.sessions.find((s) => s.token === token);
  if (!session) return null;

  const user = db.accounts.find((acc) => acc.email === session.email);
  return user ?? null;
}

export async function verifyLogin(email: string, password: string): Promise<UserAccount | null> {
  const db = await readDb();
  return db.accounts.find((acc) => acc.email === email.trim().toLowerCase() && acc.password === password) ?? null;
}

export async function updateUserSettings(
  email: string,
  updates: Partial<Pick<UserAccount, "darkMode" | "emailNotifications" | "fullName">>
): Promise<UserAccount | null> {
  const db = await readDb();
  const idx = db.accounts.findIndex((acc) => acc.email === email);
  if (idx === -1) return null;

  const current = db.accounts[idx];
  db.accounts[idx] = {
    ...current,
    ...updates,
    fullName: updates.fullName?.trim() || current.fullName,
  };

  await writeDb(db);
  return db.accounts[idx];
}

export async function enrollUserInCourse(email: string, courseTitle: string): Promise<UserAccount | null> {
  const db = await readDb();
  const idx = db.accounts.findIndex((acc) => acc.email === email);
  if (idx === -1) return null;

  const user = db.accounts[idx];
  if (!user.enrolledCourses.includes(courseTitle)) {
    user.enrolledCourses = [...user.enrolledCourses, courseTitle];
    db.accounts[idx] = user;
    await writeDb(db);
  }

  return user;
}

export async function createContactMessage(payload: Omit<ContactMessage, "id" | "createdAt">) {
  const db = await readDb();
  const newMessage: ContactMessage = {
    ...payload,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };

  db.contacts.push(newMessage);
  await writeDb(db);

  return newMessage;
}
