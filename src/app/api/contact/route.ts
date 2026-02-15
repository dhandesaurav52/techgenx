import { NextRequest, NextResponse } from "next/server";
import { createContactMessage } from "@/lib/data-store";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const name = body?.name?.trim();
  const email = body?.email?.trim();
  const subject = body?.subject?.trim();
  const message = body?.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { message: "name, email and message are required" },
      { status: 400 }
    );
  }

  const normalizedMessage = subject ? `[${subject}] ${message}` : message;
  const contact = await createContactMessage({ name, email, message: normalizedMessage });

  return NextResponse.json({ message: "Message received", contact }, { status: 201 });
}
