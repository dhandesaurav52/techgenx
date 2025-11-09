"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function MyCoursesPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <section className="min-h-screen p-8 bg-gray-100 flex items-center justify-center">
        <p className="text-gray-700 text-lg">You need to login to see your courses.</p>
      </section>
    );
  }

  const courses = user?.enrolledCourses ?? []; // Safe access

  return (
    <section className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Your Enrolled Courses</h1>

      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 mt-10">
          <p className="text-gray-700 text-lg">You haven’t enrolled in any courses yet.</p>
          <Link href="/courses">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Enroll in Courses Now
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="font-semibold text-gray-800 text-lg">{course}</h2>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
