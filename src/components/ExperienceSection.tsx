'use client';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGSAPCardAnimation, useTiltHover } from '@/hooks/useGSAPCardAnimation';

const EXPERIENCE_DATA = [
  {
    role: 'WEB DESIGN INTERN',
    organization: 'Larch Soft Pvt. Ltd.',
    period: 'Jun 2026 – Aug 2026',
    overview:
      'Worked on building responsive and user-friendly web interfaces, focusing on creating layouts that work smoothly across desktop, tablet, and mobile devices. Gained hands-on exposure to React.js, TypeScript, JavaScript, HTML, CSS, and Git/GitHub, along with practical experience developing reusable UI components and improving frontend structure. Started with responsive frontend development and gradually explored TypeScript and modern React development, strengthening understanding of component-based architecture, type-safe coding, and collaborative development workflows.',
    details: [
      'Built responsive frontend interfaces for different screen sizes',
      'Worked with React.js and TypeScript to develop structured, reusable components',
      'Used Git & GitHub for version control and project collaboration',
      'Improved understanding of modern frontend development and UI design principles',
      'Gained practical experience working in a professional development environment',
    ],
  },
  {
    role: 'RESEARCH & ML INTERN',
    organization: 'National Institute of Advanced Manufacturing Technology (NIAMT), Ranchi',
    period: 'Jun 2025 – Jul 2025',
    projectTitle: 'Crime Hotspot Prediction Using Machine Learning',
    supervisor: 'Dr. Shalini Mahto',
    details: [
      'Worked on research paper implementation for a real-world machine learning problem.',
      'Collaborated under the guidance of Dr. Shalini Mahto focusing on predictive modeling and spatial analysis.',
      'Issued official Internship Certificate upon successful project research and implementation.',
    ],
  },
];

export default function ExperienceSection() {
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
    <section id="experience" ref={ref} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 space-y-2"
        >
          <div className="text-xs font-mono tracking-[0.3em] text-[#E63946] uppercase font-bold">
            02 / EXPERIENCE
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase">
            WORK & RESEARCH<span className="text-[#E63946]">.</span>
          </h2>
        </motion.div>

        {/* Timeline Milestones */}
        <div className="space-y-12 max-w-4xl">
          {EXPERIENCE_DATA.map((exp, i) => (
            <div
              key={i}
              className="relative pl-6 sm:pl-12 border-l-2 border-[#E63946]/40 space-y-4 glass-card p-4 sm:p-8 w-full max-w-full min-w-0"
            >
              {/* Red Timeline Milestone Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#E63946] path-dot border-2 border-[#070709]" />

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h3 className="text-lg sm:text-2xl font-bold text-white tracking-wide break-words">
                  {exp.role} <span className="text-[#E63946]">— {exp.organization}</span>
                </h3>
                <span className="text-xs font-mono text-neutral-400 tracking-widest uppercase flex-shrink-0">
                  {exp.period}
                </span>
              </div>

              {(exp.projectTitle || exp.supervisor) && (
                <div className="text-xs sm:text-sm font-mono text-neutral-300 flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-4 break-words">
                  {exp.projectTitle && <div><span className="text-neutral-500">Project:</span> {exp.projectTitle}</div>}
                  {exp.supervisor && <div><span className="text-neutral-500">Supervisor:</span> {exp.supervisor}</div>}
                </div>
              )}

              {exp.overview && (
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  {exp.overview}
                </p>
              )}

              <div className="space-y-2 pt-1">
                <div className="text-[10px] font-mono text-[#E63946] tracking-widest uppercase font-bold">
                  KEY HIGHLIGHTS
                </div>
                <ul className="space-y-2 text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
                  {exp.details.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 sm:gap-3">
                      <span className="text-[#E63946] font-mono flex-shrink-0">›</span>
                      <span className="break-words">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

