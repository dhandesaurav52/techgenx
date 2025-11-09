"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function CoursesPage() {
  const router = useRouter();
  const { user, enrollCourse } = useAuth();

  const courses = [
    {
      title: "Full Stack Web Development",
      slug: "full-stack-web-development",
      description: "Learn HTML, CSS, JavaScript, React, Node.js, and more.",
    },
    {
      title: "Data Science & Machine Learning",
      slug: "data-science-ml",
      description: "Python, Pandas, NumPy, ML algorithms, and real projects.",
    },
    {
      title: "Cybersecurity Essentials",
      slug: "cybersecurity-essentials",
      description: "Protect systems, networks, and learn ethical hacking.",
    },
    {
      title: "Cloud Computing with AWS",
      slug: "cloud-computing-aws",
      description: "Learn AWS services, deployment, and cloud architecture.",
    },
  ];

  // keep local copy of enrolled course names for quick UI updates
  const [enrolled, setEnrolled] = useState<string[]>(user?.enrolledCourses ?? []);

  // when user changes (login/logout), sync enrolled list
  useEffect(() => {
    setEnrolled(user?.enrolledCourses ?? []);
  }, [user?.enrolledCourses]);

  const handleEnrollClick = (e: React.MouseEvent, courseName: string, slug: string) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      // not logged in -> go to login page
      router.push("/login");
      return;
    }

    // if already enrolled do nothing
    if (enrolled.includes(courseName)) {
      router.push(`/courses/${slug}`); // go to course detail if already enrolled
      return;
    }

    // call enrollCourse from context (updates localStorage + accounts)
    if (enrollCourse) {
      enrollCourse(courseName);
      // optimistic UI update
      setEnrolled((prev) => [...prev, courseName]);
      // optionally show a tiny success message
      alert(`Enrolled in "${courseName}" successfully!`);
    }
  };

  return (
    <section className="flex flex-col items-center py-24 px-6 bg-gray-100 min-h-[calc(100vh-128px)]">
      <h1 className="text-4xl font-bold mb-12 text-blue-600">Our Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {courses.map((course, index) => {
          const isEnrolled = enrolled.includes(course.title);
          return (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Title + description link to the course detail page */}
              <Link href={`/courses/${course.slug}`} className="block">
                <div className="cursor-pointer">
                  <h2 className="text-2xl font-semibold mb-2 text-gray-800">{course.title}</h2>
                  <p className="text-gray-600">{course.description}</p>
                </div>
              </Link>

              {/* Actions */}
              <div className="mt-4 flex items-center justify-between">
                {isEnrolled ? (
                  <span className="text-green-600 font-medium">Enrolled ✅</span>
                ) : (
                  <button
                    onClick={(e) => handleEnrollClick(e, course.title, course.slug)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Enroll Now
                  </button>
                )}

                  <Link
                  href={`/courses/${course.slug}`}
                  className="text-sm text-gray-500 hover:underline">View details
                  </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
