import SmoothScroll from "@/components/SmoothScroll";
import MatrixRain from "@/components/MatrixRain";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Reveals from "@/components/Reveals";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="matrix-bg" aria-hidden="true">
        <MatrixRain />
      </div>
      <div className="matrix-scrim" aria-hidden="true" />

      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Contact />
      </main>
      <Reveals />
    </SmoothScroll>
  );
}
