export default function Courses() {
  const courses = [
    { title: "Full Stack Development", desc: "Learn MERN stack with real projects." },
    { title: "Data Science", desc: "Master Python, ML, and AI tools." },
    { title: "Cloud Computing", desc: "AWS, Azure, and GCP in one course." },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Explore Our Courses
      </h3>
      <div className="flex flex-wrap justify-center gap-10">
        {courses.map((c, i) => (
          <div key={i} className="bg-white shadow-md rounded-xl p-6 w-72">
            <h4 className="text-xl font-semibold mb-2 text-blue-600">{c.title}</h4>
            <p className="text-gray-600 mb-4">{c.desc}</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Learn More
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
