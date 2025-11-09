export default function Placements() {
  const students = [
    { name: "Aarav Mehta", company: "Google", img: "/student1.jpg" },
    { name: "Priya Sharma", company: "Amazon", img: "/student2.jpg" },
    { name: "Rohan Patel", company: "Infosys", img: "/student3.jpg" },
  ];

  return (
    <section className="py-20">
      <h3 className="text-3xl font-bold text-center text-yellow-800 mb-10">
        Students Placed from TechGenX
      </h3>
      <div className="flex flex-wrap justify-center gap-10">
        {students.map((s, i) => (
          <div
            key={i}
            className="bg-white shadow-lg rounded-xl p-6 text-center w-64"
          >
            <img
              src={s.img}
              alt={s.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h4 className="text-xl font-semibold">{s.name}</h4>
            <p className="text-blue-600 font-medium">{s.company}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
