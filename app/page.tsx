import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { About } from "@/components/About";
import { Contact, Footer } from "@/components/Contact";
import { CursorGlow, ScrollProgress } from "@/components/Chrome";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ThemeReveal } from "@/components/ThemeReveal";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <ThemeReveal />
      <CursorGlow />
      <div id="page-root">
        <Nav />
        <main>
          <Hero />
          <Projects />
          <Experience />
          <Skills />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
