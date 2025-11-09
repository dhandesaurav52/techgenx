"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const courses = [
  {
    title: "Full Stack Web Development",
    slug: "full-stack-web-development",
    description:
      "Learn HTML, CSS, JavaScript, React, Node.js, and more. Build projects from scratch and deploy your apps.",
    price: "₹4,999",
    duration: "3 Months",
  },
  {
    title: "Data Science & Machine Learning",
    slug: "data-science-ml",
    description:
      "Master Python, Pandas, NumPy, and ML algorithms with real-world datasets and model deployment.",
    price: "₹5,999",
    duration: "4 Months",
  },
  {
    title: "Cybersecurity Essentials",
    slug: "cybersecurity-essentials",
    description:
      "Learn ethical hacking, system security, and how to defend against modern cyber threats.",
    price: "₹3,999",
    duration: "2 Months",
  },
  {
    title: "Cloud Computing with AWS",
    slug: "cloud-computing-aws",
    description:
      "Understand cloud architecture, deploy scalable apps, and get hands-on AWS experience.",
    price: "₹6,499",
    duration: "3 Months",
  },
];

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ unwrap params safely
  const { slug } = use(params);

  const { user, enrollCourse } = useAuth();
  const router = useRouter();

  const course = courses.find((c) => c.slug === slug);

  if (!course)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-red-600">Course Not Found</h1>
        <button
          onClick={() => router.push("/courses")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Courses
        </button>
      </div>
    );

  const handleEnroll = () => {
    enrollCourse(course.title);
  };

  return (
    <section className="flex flex-col items-center py-16 px-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">{course.title}</h1>
        <p className="text-gray-600 mb-6 text-lg">{course.description}</p>

        <div className="flex flex-col md:flex-row justify-between mb-6 text-gray-800">
          <p>
            <strong>Duration:</strong> {course.duration}
          </p>
          <p>
            <strong>Price:</strong> {course.price}
          </p>
        </div>

        <button
          onClick={handleEnroll}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          {user?.enrolledCourses.includes(course.title)
            ? "Already Enrolled"
            : "Enroll Now"}
        </button>
      </div>
    </section>
  );
}
