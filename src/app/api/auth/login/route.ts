import { NextRequest, NextResponse } from "next/server";
import { createSessionForUser, sanitizeUser, verifyLogin } from "@/lib/data-store";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const email = body?.email?.trim();
  const password = body?.password;

  if (!email || !password) {
    return NextResponse.json({ message: "email and password are required" }, { status: 400 });
  }

  const user = await verifyLogin(email, password);
  if (!user) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const session = await createSessionForUser(user.id);

  return NextResponse.json({ user: sanitizeUser(user), token: session.sessionId });
}
