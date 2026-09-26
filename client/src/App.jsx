import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Scene3DSection from "./components/Scene3DSection.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";

function App() {
  return (
    <>
      <Navbar />
      <ThemeToggle />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Scene3DSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
