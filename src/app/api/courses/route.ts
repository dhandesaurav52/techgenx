import { NextResponse } from "next/server";
import { getCourses } from "@/lib/data-store";

export const runtime = "nodejs";

export async function GET() {
  const courses = await getCourses();
  return NextResponse.json({ courses });
}
