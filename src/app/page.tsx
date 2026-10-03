'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import EducationSection from '@/components/EducationSection';
import SkillsSection from '@/components/SkillsSection';
import AchievementsSection from '@/components/AchievementsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import RedScrollSpine from '@/components/RedScrollSpine';

// Dynamically import canvas (client-only)
const PortraitCanvas = dynamic(() => import('@/components/PortraitCanvas'), { ssr: false });

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="relative text-white min-h-screen">
          {/* Layer 0 — Fixed scroll-driven portrait canvas (behind everything) */}
          <PortraitCanvas />

          {/* Layer 1 — Animated red SVG scroll spine */}
          <RedScrollSpine />

          {/* Layer 2 — All page sections */}
          <main className="relative z-20">
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <EducationSection />
            <SkillsSection />
            <AchievementsSection />
            <ContactSection />
          </main>

          {/* Layer 3 — Fixed Top Navigation Bar */}
          <Navbar />

          <Footer />
        </div>
      )}
    </>
  );
}
