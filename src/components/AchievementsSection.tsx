'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAPCardAnimation, useTiltHover } from '@/hooks/useGSAPCardAnimation';

interface CertificateItem {
  title: string;
  issuer: string;
  date?: string;
  image: string;
  verifyUrl?: string;
  certId?: string;
  details?: string;
}

const CERTIFICATIONS: CertificateItem[] = [
  {
    title: 'AWS Certified Developer – Associate Certification',
    issuer: 'Infosys Springboard',
    date: 'May 26, 2026',
    image: '/certificates/aws-developer-infosys.svg',
    details: 'Course Completion & Cloud Architecture Certification',
  },
  {
    title: 'CCNA: Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    date: '30 May 2026',
    image: '/certificates/ccna-introduction-to-networks.svg',
    certId: '20a0e9d3-ef29-4e58-b852-384ffb6a2f72',
    details: 'Offered by Sarala Birla University, Ranchi',
  },
  {
    title: 'Introduction to DevOps and DevSecOps',
    issuer: 'Simplilearn SkillUp',
    date: '14th August 2026',
    image: '/certificates/devops-devsecops-simplilearn.svg',
    certId: '10599690',
    details: 'DevOps Lifecycle, Security & Automation',
  },
  {
    title: 'AWS Cloud Practitioner Essentials',
    issuer: 'AWS Training & Certification',
    date: 'July 20, 2026',
    image: '/certificates/aws-cloud-practitioner.svg',
    details: 'Foundational Cloud Services & Security',
  },
];

const HACKATHONS_COMPETITIONS = [
  {
    title: 'Teliport Season 3 – Tata Elxsi',
    result: 'Participant / Competitor',
    project: 'Participated as part of Team Logic Loopers, representing Sarala Birla University, Ranchi',
    tech: 'June 15, 2026 · National Innovation Challenge',
  },
  {
    title: "Hacktron'26 – BIT Sindri",
    result: 'Finalist',
    project: 'AI Meeting-to-Task Automation system',
    tech: 'Whisper AI, spaCy, Gemini Flash 2.5',
  },
  {
    title: "Hackathon on Cyber Security'26 – BIT Mesra",
    result: 'Participant / Builder',
    project: 'Autonomous Deepfake Detection and Response System',
    tech: 'OpenCV, Python Flask',
  },
  {
    title: "INNOVERSE TECH FEST'25 – St. Xavier's Ranchi",
    result: 'Project Presenter',
    project: 'EchoSkill (skill-exchange platform)',
    tech: 'Full-Stack Web Development',
  },
  {
    title: "SBU Coding Challenge'26 – Sarala Birla University",
    result: 'Participant',
    project: 'Competitive Coding & Data Structures',
    tech: 'Algorithms & Problem Solving',
  },
];

export default function AchievementsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeCert, setActiveCert] = useState<CertificateItem | null>(null);

  useGSAPCardAnimation(ref, { stagger: 0.1, y: 40 });
  useTiltHover(ref);

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

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="achievements" ref={ref} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 space-y-2"
        >
          <div className="text-xs font-mono tracking-[0.3em] text-[#E63946] uppercase font-bold">
            06 / ACHIEVEMENTS
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase">
            CERTIFICATIONS & HACKATHONS<span className="text-[#E63946]">.</span>
          </h2>
          <p className="text-neutral-400 font-light max-w-xl text-sm sm:text-base pt-2">
            Industry credentials and competitive hackathons demonstrating problem-solving and rapid building.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Certifications Block */}
          <div className="space-y-8">
            <h3 className="text-xs font-mono font-bold tracking-[0.25em] text-neutral-400 uppercase border-b border-white/10 pb-4">
              CERTIFICATIONS
            </h3>
            <div className="space-y-6">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.title}
                  className="glass-card-red p-4 sm:p-5 space-y-4 min-w-0 break-words w-full group hover:border-[#E63946] transition-all"
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                    {/* Thumbnail Preview */}
                    <div
                      onClick={() => setActiveCert(cert)}
                      className="relative w-full sm:w-36 h-28 sm:h-24 rounded-lg overflow-hidden border border-white/15 bg-black/40 flex-shrink-0 cursor-pointer group/thumb transition-transform duration-300 hover:scale-[1.03]"
                    >
                      <Image
                        src={cert.image}
                        alt={`${cert.title} preview`}
                        fill
                        className="object-cover object-top opacity-90 group-hover/thumb:opacity-100 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/10 transition-colors flex items-center justify-center">
                        <span className="text-[10px] font-mono font-bold px-2 py-1 bg-black/80 text-white rounded border border-white/20 backdrop-blur-sm tracking-wider uppercase flex items-center gap-1 group-hover/thumb:text-[#E63946]">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                          VIEW
                        </span>
                      </div>
                    </div>

                    {/* Cert Info & Actions */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="text-base sm:text-lg font-bold text-white leading-snug break-words group-hover:text-[#E63946] transition-colors">
                        {cert.title}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400">
                        <span className="text-[#E63946] font-semibold">{cert.issuer}</span>
                        {cert.date && <span>• {cert.date}</span>}
                        {cert.certId && <span className="text-neutral-500">ID: {cert.certId}</span>}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setActiveCert(cert)}
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:text-[#E63946] uppercase tracking-wider transition-colors"
                        >
                          <span>VIEW CERTIFICATE</span>
                          <span className="text-[#E63946]">↗</span>
                        </button>

                        {cert.verifyUrl && (
                          <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-white uppercase tracking-wider border-l border-white/20 pl-3 transition-colors"
                          >
                            <span>VERIFY</span>
                            <span className="text-sky-400">→</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hackathons & Competitions Block */}
          <div className="space-y-8">
            <h3 className="text-xs font-mono font-bold tracking-[0.25em] text-neutral-400 uppercase border-b border-white/10 pb-4">
              HACKATHONS & COMPETITIONS
            </h3>
            <div className="space-y-6">
              {HACKATHONS_COMPETITIONS.map((hack) => (
                <div
                  key={hack.title}
                  className="glass-card p-4 sm:p-6 space-y-2 group hover:border-[#E63946]/50 transition-colors min-w-0 break-words w-full"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#E63946] transition-colors leading-snug min-w-0 break-words">
                      {hack.title}
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-[#E63946]/20 text-[#E63946] uppercase font-bold whitespace-nowrap self-start sm:self-auto flex-shrink-0">
                      {hack.result}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light break-words">{hack.project}</p>
                  <div className="text-xs font-mono text-neutral-500 break-words">{hack.tech}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Certificate Lightbox Modal */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCert(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#0d0d12] border border-white/20 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                <div className="min-w-0 pr-4">
                  <h3 className="text-base sm:text-lg font-bold text-white truncate">
                    {activeCert.title}
                  </h3>
                  <p className="text-xs font-mono text-[#E63946]">
                    {activeCert.issuer} {activeCert.date && `• ${activeCert.date}`}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={activeCert.image}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-neutral-400 hover:text-white uppercase tracking-wider px-3 py-1.5 rounded bg-white/5 border border-white/10 hover:border-white/30 transition-colors hidden sm:inline-flex items-center gap-1.5"
                  >
                    <span>OPEN TAB</span>
                    <span>↗</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setActiveCert(null)}
                    aria-label="Close certificate modal"
                    className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Certificate Image View */}
              <div className="p-3 sm:p-6 flex-1 overflow-auto flex items-center justify-center bg-black/50">
                <div className="relative w-full aspect-[1000/700] max-h-[65vh] rounded-lg overflow-hidden border border-white/10 shadow-lg">
                  <Image
                    src={activeCert.image}
                    alt={activeCert.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-3 sm:p-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-400 bg-white/[0.02]">
                <div>
                  {activeCert.certId && <span>Certificate ID: {activeCert.certId}</span>}
                </div>
                <div className="flex items-center gap-4">
                  {activeCert.verifyUrl && (
                    <a
                      href={activeCert.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sky-400 hover:underline uppercase tracking-wider flex items-center gap-1 font-semibold"
                    >
                      <span>OFFICIAL VERIFICATION</span>
                      <span>→</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setActiveCert(null)}
                    className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded transition-colors uppercase tracking-wider"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

