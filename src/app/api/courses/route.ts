import { NextResponse } from "next/server";
import { readDb } from "@/lib/data-store";

export const runtime = "nodejs";

export async function GET() {
  const db = await readDb();
  return NextResponse.json({ courses: db.courses });
}
