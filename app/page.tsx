import Hero from "@/components/hero";
import Projects from "@/components/projects";
import About from "@/components/about";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import CursorEffect from "@/components/cursor-effect";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* <CursorEffect />  */}
      <Hero />
      <Projects />
      <About />
      <Contact />
      {/* <Footer /> */}
    </main>
  );
}
