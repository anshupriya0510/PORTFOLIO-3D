'use client';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGSAPCardAnimation, useTiltHover } from '@/hooks/useGSAPCardAnimation';

const SKILL_GROUPS = [
  {
    category: 'PROGRAMMING',
    skills: ['Java', 'JavaScript'],
  },
  {
    category: 'CORE',
    skills: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Networking'],
  },
  {
    category: 'WEB DEVELOPMENT',
    skills: ['React.js', 'Node.js', 'MongoDB', 'HTML', 'CSS'],
  },
  {
    category: 'CLOUD & DEVOPS',
    skills: [
      'AWS (EC2, S3, IAM, VPC, RDS, Lambda, Security Groups, AMI)',
      'Linux',
      'Docker',
      'Docker Compose',
      'Kubernetes',
      'K3s',
      'Jenkins',
      'Git/GitHub',
      'GitHub Actions',
      'CI/CD',
      'Ansible',
      'Terraform',
      'Grafana',
      'Cloud Computing',
    ],
  },
  {
    category: 'PROTOCOLS',
    skills: ['HTTP', 'HTTPS', 'SSH'],
  },
];

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useGSAPCardAnimation(ref, { stagger: 0.04, y: 30 });
  useTiltHover(ref, { maxDeg: 7, scalePeak: 1.02 });

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 space-y-2"
        >
          <div className="text-xs font-mono tracking-[0.3em] text-[#E63946] uppercase font-bold">
            05 / SKILLS
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase">
            TECHNICAL CAPABILITIES<span className="text-[#E63946]">.</span>
          </h2>
          <p className="text-neutral-400 font-light max-w-xl text-base pt-2">
            Curated set of technologies, languages, cloud resources, and engineering tools.
          </p>
        </motion.div>

        {/* Editorial Stacked Typographic Layout */}
        <div className="space-y-16">
          {SKILL_GROUPS.map((group, gIdx) => (
            <div
              key={group.category}
              className="border-t border-white/10 pt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
            >
              {/* Category Label */}
              <div className="md:col-span-4">
                <h3 className="text-xs font-mono font-bold tracking-[0.25em] text-[#E63946] uppercase">
                  {group.category}
                </h3>
              </div>

              {/* Skills Editorial Tags / Typography */}
              <div className="md:col-span-8 flex flex-wrap gap-2.5 sm:gap-3">
                {group.skills.map((skill) => (
                  <div
                    key={skill}
                    className="px-3 sm:px-4 py-2 sm:py-2.5 glass-card hover:border-[#E63946]/50 text-white text-xs sm:text-sm font-mono transition-colors max-w-full break-words whitespace-normal leading-normal"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
