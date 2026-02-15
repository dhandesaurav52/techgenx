import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { enrollUserInCourse, getCourseBySlug, getCourses, sanitizeUser } from "@/lib/data-store";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const auth = await requireUser(request);
  if (!auth.ok) {
    return NextResponse.json({ message: auth.message }, { status: auth.status });
  }

  return NextResponse.json({ enrolledCourses: auth.user.enrolledCourses });
}

export async function POST(request: NextRequest) {
  const auth = await requireUser(request);
  if (!auth.ok) {
    return NextResponse.json({ message: auth.message }, { status: auth.status });
  }

  const body = await request.json().catch(() => null);
  const courseSlug = typeof body?.courseSlug === "string" ? body.courseSlug : undefined;
  const courseTitle = typeof body?.courseTitle === "string" ? body.courseTitle : undefined;

  const matched = courseSlug
    ? await getCourseBySlug(courseSlug)
    : (await getCourses()).find((course) => course.title === courseTitle);

  if (!matched) {
    return NextResponse.json({ message: "Course not found" }, { status: 404 });
  }

  const updated = await enrollUserInCourse(auth.user.id, matched.courseId);
  if (!updated) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    user: sanitizeUser(updated),
    enrolledCourses: updated.enrolledCourses,
  });
}
