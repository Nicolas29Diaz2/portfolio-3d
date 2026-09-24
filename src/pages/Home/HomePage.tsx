import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProjectsSection } from "./components/ProjectsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { SkillsSection } from "./components/SkillsSection";
import { EducationSection } from "./components/EducationSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { PRELOAD_DOM_IDS } from "@/features/loading/types/loading.types";
import "./HomePage.css";

export default function HomePage() {
  useEffect(() => {
    // Hide static HTML preload screen if present
    const logo = document.getElementById(PRELOAD_DOM_IDS.logo);
    const screen = document.getElementById(PRELOAD_DOM_IDS.screen);
    if (logo) logo.style.display = "none";
    if (screen) screen.style.display = "none";

    // Restore natural vertical page scrolling
    document.body.style.overflow = "auto";
    document.body.style.overflowX = "hidden";

    // Set page title for optimal SEO
    document.title = "Nicolás Díaz | Full Stack Software Engineer";
  }, []);

  return (
    <div className="home-2d-page" id="top">
      <Navbar />
      <main>
        <Hero />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
