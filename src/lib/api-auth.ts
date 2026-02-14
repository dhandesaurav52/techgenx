import { NextRequest } from "next/server";
import { getUserByToken } from "@/lib/data-store";

export function getBearerToken(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  return authHeader.slice("Bearer ".length).trim();
}

export async function requireUser(request: NextRequest) {
  const token = getBearerToken(request);
  if (!token) {
    return { ok: false as const, status: 401, message: "Missing Bearer token" };
  }

  const user = await getUserByToken(token);
  if (!user) {
    return { ok: false as const, status: 401, message: "Invalid or expired session" };
  }

  return { ok: true as const, user, token };
}
