"use client";

import { useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";

export default function Home() {
  useEffect(() => {
    // Check if the URL has a hash (e.g. #about)
    const hash = window.location.hash;
    if (hash) {
      // Remove the '#' to get the element ID
      const id = hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          if (id === "experience" || id === "achievements") {
            const y = el.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
          } else {
            const sectionBottom = el.getBoundingClientRect().bottom + window.scrollY;
            const y = sectionBottom - window.innerHeight;
            window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
          }
        }
      }, 100); // Small delay to ensure the DOM is painted
    }
  }, []);

  return (
    <SplashScreen>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <AchievementsSection />
    </SplashScreen>
  );
}

