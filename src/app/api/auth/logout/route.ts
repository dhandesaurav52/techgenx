import { NextRequest, NextResponse } from "next/server";
import { getBearerToken } from "@/lib/api-auth";
import { removeSession } from "@/lib/data-store";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const token = getBearerToken(request);
  if (!token) {
    return NextResponse.json({ message: "Missing Bearer token" }, { status: 401 });
  }

  await removeSession(token);
  return NextResponse.json({ message: "Logged out" });
}
