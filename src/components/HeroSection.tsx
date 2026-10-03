'use client';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-end pb-24 pt-32 overflow-hidden"
      style={{ background: 'transparent' }}
    >
      {/* Subtle gradient at the bottom-left so text stays readable over the portrait */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(7,7,9,0.78) 0%, rgba(7,7,9,0.35) 45%, transparent 100%)',
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full">
        <div className="max-w-4xl space-y-8">
          {/* Main Oversized Greeting Typography */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1"
          >
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.95]"
              style={{ textShadow: '0 2px 32px rgba(0,0,0,0.85)' }}
            >
              <span className="block text-white">Hi!!</span>
              <span className="block text-white">This is</span>
              <span className="block text-[#E63946]">Anshu Priya</span>
            </h1>
          </motion.div>

          {/* Role Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-2"
          >
            <div
              className="text-xs sm:text-sm font-mono tracking-[0.3em] text-neutral-300 uppercase font-semibold"
              style={{ textShadow: '0 1px 12px rgba(0,0,0,0.9)' }}
            >
              SOFTWARE & DEVOPS ENGINEER
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-lg sm:text-xl text-neutral-200 font-light max-w-2xl leading-relaxed"
            style={{ textShadow: '0 1px 16px rgba(0,0,0,0.9)' }}
          >
            Building reliable software, scalable systems & modern cloud infrastructure.
          </motion.p>

          {/* Action Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center gap-6 pt-4"
          >
            <a
              href="#projects"
              className="px-7 py-3.5 bg-[#E63946] text-white text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#E63946]/90 transition-all hover:scale-105"
            >
              VIEW PROJECTS
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 border border-white/40 text-white text-xs font-mono font-bold tracking-widest uppercase hover:border-[#E63946] hover:text-[#E63946] transition-all backdrop-blur-sm"
              style={{ background: 'rgba(0,0,0,0.25)' }}
            >
              GET IN TOUCH
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex items-center gap-8 pt-6 font-mono text-xs text-neutral-300 tracking-widest"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}
          >
            <a
              href="https://github.com/anshupriya0510"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GITHUB
            </a>
            <span className="text-neutral-500">/</span>
            <a
              href="https://www.linkedin.com/in/anshupriya-engineer"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              LINKEDIN
            </a>
            <span className="text-neutral-500">/</span>
            <a
              href="https://leetcode.com/u/anshu_priya05/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#E63946] transition-colors"
            >
              LEETCODE
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 right-12 hidden sm:flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <span className="text-[10px] font-mono text-neutral-400 tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#E63946] to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
