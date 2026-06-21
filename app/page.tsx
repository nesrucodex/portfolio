import Hero from "@/components/hero";
import Disciplines from "@/components/disciplines";
import Projects from "@/components/projects";
import About from "@/components/about";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Hero />
      <Projects />
      <Disciplines />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
