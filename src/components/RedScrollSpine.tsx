'use client';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function RedScrollSpine() {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden flex justify-center">
      <svg
        className="w-full h-full max-w-7xl px-4 sm:px-8"
        viewBox="0 0 1000 3000"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* Background static faint guide path */}
        <path
          d="M 500,0 
             C 520,300 850,500 850,800 
             C 850,1100 150,1300 150,1600 
             C 150,1900 820,2100 820,2400 
             C 820,2700 500,2850 500,3000"
          stroke="rgba(230, 57, 70, 0.08)"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Dynamic animated red path driven by scroll progress */}
        <motion.path
          d="M 500,0 
             C 520,300 850,500 850,800 
             C 850,1100 150,1300 150,1600 
             C 150,1900 820,2100 820,2400 
             C 820,2700 500,2850 500,3000"
          stroke="#E63946"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
}
