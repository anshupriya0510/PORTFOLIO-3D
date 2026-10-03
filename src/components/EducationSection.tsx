'use client';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGSAPCardAnimation, useTiltHover } from '@/hooks/useGSAPCardAnimation';

const EDUCATION_DATA = [
  {
    title: 'B.Tech in Computer Science Engineering',
    institution: 'Sarala Birla University, Ranchi, Jharkhand',
    period: '2023 – 2027',
    description:
      'Coursework and practical training in Cloud Computing, DevOps practices, Computer Networks, Operating Systems, Database Management, and Software Engineering principles.',
  },
  {
    title: 'Class XII — ISC (Science Stream)',
    institution: 'St. Francis School, Harmu, Ranchi',
    period: 'Passed out: 2023 · 74%',
  },
  {
    title: 'Class X — ICSE',
    institution: 'St. Francis School, Harmu, Ranchi',
    period: 'Passed out: 2021 · 83%',
  },
];

export default function EducationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useGSAPCardAnimation(ref, { stagger: 0.15, y: 40 });
  useTiltHover(ref);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="education" ref={ref} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 space-y-2"
        >
          <div className="text-xs font-mono tracking-[0.3em] text-[#E63946] uppercase font-bold">
            04 / EDUCATION
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase">
            ACADEMIC BACKGROUND<span className="text-[#E63946]">.</span>
          </h2>
        </motion.div>

        {/* Education Timeline Entries */}
        <div className="space-y-8 max-w-4xl w-full">
          {EDUCATION_DATA.map((item, idx) => (
            <div
              key={idx}
              className="relative pl-6 sm:pl-12 border-l-2 border-[#E63946]/40 space-y-3 glass-card p-4 sm:p-8 w-full max-w-full min-w-0 break-words"
            >
              {/* Red Timeline Milestone Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#E63946] path-dot border-2 border-[#070709]" />

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h3 className="text-lg sm:text-2xl font-bold text-white tracking-wide break-words">
                  {item.title}
                </h3>
                <span className="text-xs font-mono text-[#E63946] tracking-widest uppercase font-semibold flex-shrink-0">
                  {item.period}
                </span>
              </div>

              <div className="text-sm sm:text-base font-mono text-neutral-300 break-words">
                {item.institution}
              </div>

              {item.description && (
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light pt-1 max-w-2xl break-words">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
