import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <main>
      <main>
        <section className="main-section" id="#hero">
          <Navbar />
          <Hero />
        </section>
        <section className="main-section">Parallex</section>
        <section className="main-section" id="#services">
          Services
        </section>
        <section className="main-section">Parallex</section>
        <section className="main-section" id="#portfolio">
          Portfolio - 1
        </section>
        <section className="main-section">Portfolio - 2</section>
        <section className="main-section">Portfolio - 3</section>
        <section className="main-section">Portfolio - 4</section>
        <section className="main-section" id="contact">
          Contact Us
        </section>
      </main>
    </main>
  );
};

export default Home;
