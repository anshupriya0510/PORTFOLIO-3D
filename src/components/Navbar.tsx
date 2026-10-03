'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'EDUCATION', href: '#education' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'ACHIEVEMENTS', href: '#achievements' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Track active section for highlight
      const sections = navLinks.map(l => l.href.substring(1));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 999999,
      }}
      className={`transition-all duration-300 pointer-events-auto ${
        scrolled
          ? 'bg-[#070709]/95 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-black/80'
          : 'bg-[#070709]/85 backdrop-blur-md border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Name */}
        <a href="#" className="text-xs sm:text-sm font-black tracking-[0.3em] text-white hover:text-[#E63946] transition-colors flex-shrink-0">
          ANSHU PRIYA<span className="text-[#E63946]">.</span>
        </a>

        {/* Desktop Navigation (lg+) */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-7">
          {navLinks.map(link => {
            const id = link.href.substring(1);
            const isActive = activeSection === id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`text-[10px] xl:text-[11px] font-mono tracking-[0.18em] transition-colors uppercase relative py-1 flex-shrink-0 ${
                  isActive ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E63946]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}

          {/* Resume Download — desktop */}
          <a
            href="/resume.pdf"
            download="Anshu_Priya_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-[10px] xl:text-[11px] font-mono tracking-[0.18em] uppercase py-1 px-3 border border-[#E63946] text-[#E63946] hover:bg-[#E63946] hover:text-white transition-all duration-200 flex-shrink-0"
          >
            RESUME ↓
          </a>
        </nav>

        {/* Mobile / Tablet Hamburger Button (<lg) */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white p-2 focus:outline-none"
          aria-label="Toggle Navigation"
        >
          <div className="w-6 space-y-1.5">
            <span className={`block h-0.5 bg-white transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-white transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile / Tablet Drawer (<lg) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0a0a0d] border-b border-white/10 px-6 sm:px-10 py-6 space-y-3"
          >
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-xs font-mono tracking-widest text-neutral-300 hover:text-[#E63946] uppercase py-2 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
            {/* Resume Download — mobile */}
            <a
              href="/resume.pdf"
              download="Anshu_Priya_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="block text-xs font-mono tracking-widest text-[#E63946] uppercase py-2 border border-[#E63946]/40 px-3 mt-2 hover:bg-[#E63946] hover:text-white transition-all duration-200"
            >
              DOWNLOAD RESUME ↓
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
