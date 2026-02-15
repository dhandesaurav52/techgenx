import mysql from "mysql2/promise";

let pool: ReturnType<typeof mysql.createPool> | null = null;

function isTrue(value: string | undefined): boolean {
  return String(value || "").toLowerCase() === "true";
}

export function getPool() {
  if (!pool) {
    const useSsl = isTrue(process.env.DB_SSL);

    pool = mysql.createPool({
      host: process.env.DB_HOST || "127.0.0.1",
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "techgenx",
      ssl: useSsl ? { rejectUnauthorized: false } : undefined,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  return pool;
}
