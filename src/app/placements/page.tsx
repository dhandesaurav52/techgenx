"use client";

export default function PlacementsPage() {
  const students = [
    {
      name: "Rahul Sharma",
      course: "Full Stack Web Development",
      company: "Google",
      image: "/students/rahul.jpg", // replace with real images
    },
    {
      name: "Ananya Singh",
      course: "Data Science & ML",
      company: "Amazon",
      image: "/students/ananya.jpg",
    },
    {
      name: "Vikram Patel",
      course: "Cloud Computing",
      company: "Microsoft",
      image: "/students/vikram.jpg",
    },
    {
      name: "Sanya Mehta",
      course: "Cybersecurity",
      company: "Infosys",
      image: "/students/sanya.jpg",
    },
  ];

  const companies = [
    "/companies/google.png",
    "/companies/amazon.png",
    "/companies/microsoft.png",
    "/companies/infosys.png",
    "/companies/adobe.png",
  ];

  return (
    <section className="flex flex-col items-center py-24 px-6 bg-gray-100 min-h-[calc(100vh-128px)]">
      <h1 className="text-4xl font-bold mb-12 text-blue-600">Our Placements</h1>

      {/* Partner Companies */}
      <div className="flex flex-wrap justify-center items-center gap-8 mb-16">
        {companies.map((company, index) => (
          <img
            key={index}
            src={company}
            alt="Company Logo"
            className="h-16 object-contain"
          />
        ))}
      </div>

      {/* Placed Students */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {students.map((student, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
          >
            <img
              src={student.image}
              alt={student.name}
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold text-gray-800">{student.name}</h2>
            <p className="text-gray-600">{student.course}</p>
            <p className="text-blue-600 font-medium mt-1">{student.company}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
