"use client";

export default function AboutPage() {
  return (
    <section className="flex flex-col items-center py-24 px-6 bg-gray-100 min-h-[calc(100vh-128px)]">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mb-16">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">About TechGenX</h1>
        <p className="text-gray-700 text-lg">
          TechGenX is dedicated to providing top-quality tech education and placement support to aspiring professionals. We empower students with industry-relevant skills, hands-on training, and real-world projects to ensure they are ready to excel in their careers.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full mb-16">
        <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            To provide world-class tech education and bridge the gap between learning and employment, ensuring our students are future-ready.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
          <p className="text-gray-600">
            To be the leading platform that nurtures talent, transforms careers, and contributes to the global tech community.
          </p>
        </div>
      </div>

      {/* Optional Team / Highlights */}
      <div className="max-w-6xl w-full">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Expert Trainers</h3>
            <p className="text-gray-600">Learn from industry professionals with years of experience.</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Hands-On Projects</h3>
            <p className="text-gray-600">Build real-world projects to strengthen your skills and portfolio.</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Placement Support</h3>
            <p className="text-gray-600">Get guidance and assistance to secure your dream job in top companies.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
