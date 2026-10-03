'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const terminalCommands = [
  { cmd: '$ whoami', output: 'anshu-priya' },
  { cmd: '$ role', output: 'Software & DevOps Engineer' },
  { cmd: '$ core-stack', output: 'AWS · Docker · Jenkins · Linux · Nginx · Java · JavaScript' },
  { cmd: '$ focus', output: 'Cloud Automation · CI/CD Pipelines · Containerization · Scalable Systems' },
  { cmd: '$ location', output: 'Sarala Birla University, Ranchi, Jharkhand' },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState('');
  const [showOutput, setShowOutput] = useState(false);

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

  useEffect(() => {
    if (!visible || step >= terminalCommands.length) return;
    const current = terminalCommands[step];
    let idx = 0;
    setTyped('');
    setShowOutput(false);

    const timer = setInterval(() => {
      setTyped(current.cmd.slice(0, idx + 1));
      idx++;
      if (idx >= current.cmd.length) {
        clearInterval(timer);
        setTimeout(() => {
          setShowOutput(true);
          setTimeout(() => {
            setStep(prev => prev + 1);
          }, 500);
        }, 200);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [step, visible]);

  return (
    <section id="about" ref={ref} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Oversized Editorial Header & Summary Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-2">
              <div className="text-xs font-mono tracking-[0.3em] text-[#E63946] uppercase font-bold">
                01 / ABOUT
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
                ENGINEERING RELIABLE SYSTEMS<span className="text-[#E63946]">.</span>
              </h2>
            </div>

            <div className="space-y-6 text-neutral-300 text-base sm:text-lg leading-relaxed font-light">
              <p className="text-lg sm:text-xl font-medium text-white tracking-tight">
                Building Software. Automating Everything. Shipping with Confidence.
              </p>
              <p>
                I&apos;m Anshu Priya, a final-year B.Tech student passionate about building software and turning ideas into reliable, scalable solutions.
              </p>
              <p>
                I sit at the intersection of Software Engineering and DevOps — developing applications with modern technologies while also building the cloud infrastructure, CI/CD pipelines, containers, and monitoring systems that take them from &ldquo;it works on my machine&rdquo; to production.
              </p>
              <p>
                From crafting full-stack applications with React, Node.js, and MongoDB to deploying and managing workloads using AWS, Docker, Kubernetes, Jenkins, Terraform, and Linux, I enjoy understanding the complete journey of a product.
              </p>
              <p className="text-white font-medium">
                Code is where I start. Cloud is where I scale. Automation is how I deliver.
              </p>
              <p>
                I&apos;m constantly learning, building, breaking, fixing, and improving — with the goal of becoming an engineer who can not only build great software but also make it reliable, deployable, and production-ready.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Interactive Editorial Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="glass-card rounded-xl overflow-hidden shadow-2xl w-full max-w-full min-w-0">
              {/* Terminal Titlebar */}
              <div className="bg-[#141418] border-b border-white/5 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E63946]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono text-neutral-500 uppercase tracking-widest truncate">
                  anshu@devops-shell ~
                </span>
              </div>

              {/* Terminal Body */}
              <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-4 min-h-[280px] sm:min-h-[300px] overflow-x-auto break-words">
                {terminalCommands.slice(0, step).map((c, i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-[#E63946] font-bold">{c.cmd}</div>
                    <div className="text-neutral-300 pl-3 leading-relaxed">{c.output}</div>
                  </div>
                ))}
                {step < terminalCommands.length && (
                  <div className="space-y-1">
                    <div className="text-[#E63946] font-bold">
                      {typed}
                      <span className="animate-pulse border-r-2 border-[#E63946] ml-0.5" />
                    </div>
                    {showOutput && (
                      <div className="text-neutral-300 pl-3 leading-relaxed">
                        {terminalCommands[step].output}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
