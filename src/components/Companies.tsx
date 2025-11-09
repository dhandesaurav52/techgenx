export default function Companies() {
  const companies = [
    "/google.png",
    "/microsoft.png",
    "/amazon.png",
    "/infosys.png",
    "/tcs.png",
  ];

  return (
    <section className="py-16 bg-black-50">
      <h3 className="text-3xl font-bold text-center text-yellow-800 mb-8">
        Our Hiring Partners
      </h3>
      <div className="flex flex-wrap justify-center gap-10">
        {companies.map((logo, index) => (
          <img key={index} src={logo} alt="Company Logo" className="h-12" />
        ))}
      </div>
    </section>
  );
}
