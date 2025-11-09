import Hero from "@/components/Hero";
import Companies from "@/components/Companies";
import Placements from "@/components/Placements";
import Courses from "@/components/Courses";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Companies />
      <Placements />
      <Courses />
    </main>
  );
}
