import { NextRequest, NextResponse } from "next/server";
import { createAccount, createSessionForUser } from "@/lib/data-store";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const fullName = body?.fullName?.trim();
  const email = body?.email?.trim();
  const password = body?.password;

  if (!fullName || !email || !password) {
    return NextResponse.json({ message: "fullName, email and password are required" }, { status: 400 });
  }

  const created = await createAccount({ fullName, email, password });
  if (!created.ok) {
    return NextResponse.json({ message: created.message }, { status: 409 });
  }

  const session = await createSessionForUser(created.user.email);

  return NextResponse.json({ user: created.user, token: session.token }, { status: 201 });
}
