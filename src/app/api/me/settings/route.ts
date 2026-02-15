import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { sanitizeUser, updateUserSettings } from "@/lib/data-store";

export const runtime = "nodejs";

export async function PATCH(request: NextRequest) {
  const auth = await requireUser(request);
  if (!auth.ok) {
    return NextResponse.json({ message: auth.message }, { status: auth.status });
  }

  const body = await request.json().catch(() => null);
  const fullName = typeof body?.fullName === "string" ? body.fullName : undefined;

  const updated = await updateUserSettings(auth.user.id, { fullName });

  if (!updated) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user: sanitizeUser(updated) });
}
