import { NextRequest, NextResponse } from "next/server";
import { readDb } from "@/lib/data-store";

export const runtime = "nodejs";

export async function GET(_request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const db = await readDb();

  const course = db.courses.find((item) => item.slug === slug);
  if (!course) {
    return NextResponse.json({ message: "Course not found" }, { status: 404 });
  }

  return NextResponse.json({ course });
}
