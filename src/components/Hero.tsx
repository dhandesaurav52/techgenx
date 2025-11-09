"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-blue-100 h-[500px] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">
        Learn from the Best at TechGenX
      </h1>
      <p className="text-gray-700 mb-6 max-w-xl">
        Explore our courses, enhance your skills, and get placed in top companies.
      </p>

      <Link href="/courses">
        <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-semibold">
          Enroll Course
        </button>
      </Link>
    </section>
  );
}
