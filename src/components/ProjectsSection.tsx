'use client';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGSAPCardAnimation, useTiltHover } from '@/hooks/useGSAPCardAnimation';

const PROJECTS_DATA = [
  {
    id: 1,
    title: 'Production-Style E-Commerce DevOps Application',
    tag: 'DevOps · Kubernetes · Observability',
    highlights: [
      {
        label: 'CONTAINERIZATION & CI/CD',
        text: 'Containerized an E-Commerce application using Docker and automated CI/CD with GitHub Actions and Docker Hub',
      },
      {
        label: 'KUBERNETES DEPLOYMENT',
        text: 'Deployed workloads on K3s Kubernetes hosted on AWS EC2 and configured application services',
      },
      {
        label: 'MONITORING & ALERTING',
        text: 'Implemented Prometheus, kube-state-metrics, and Grafana for monitoring and application health alerting',
      },
    ],
    tech: ['Docker', 'GitHub Actions', 'Docker Hub', 'K3s', 'Kubernetes', 'AWS EC2', 'Prometheus', 'Grafana'],
    github: 'https://github.com/anshupriya0510/DevOps_E-commerce',
  },
  {
    id: 2,
    title: 'Automated CI/CD Pipeline for MERN Stack Application',
    tag: 'DevOps · CI/CD · Cloud',
    highlights: [
      {
        label: 'CI/CD WORKFLOWS',
        text: 'Built automated CI/CD workflows using GitHub Actions and Jenkins for a MERN application',
      },
      {
        label: 'CONTAINERIZATION',
        text: 'Containerized application components using Docker and Docker Compose and managed images with Docker Hub',
      },
      {
        label: 'AWS DEPLOYMENT',
        text: 'Deployed the application on AWS EC2, reducing manual deployment steps',
      },
    ],
    tech: ['GitHub Actions', 'Jenkins', 'Docker', 'Docker Compose', 'Docker Hub', 'AWS EC2'],
    github: 'https://github.com/anshupriya0510/WatchList-Tracker',
  },
  {
    id: 3,
    title: '3-Tier Architecture on AWS',
    tag: 'AWS Cloud · Infrastructure · Security',
    highlights: [
      {
        label: 'SCALABLE ARCHITECTURE',
        text: 'Designed a scalable three-tier architecture using AWS VPC, EC2, ALB, ASG, and RDS',
      },
      {
        label: 'NETWORKING & ISOLATION',
        text: 'Configured cloud networking and security to separate application and database layers',
      },
    ],
    tech: ['AWS EC2', 'VPC', 'Application Load Balancer', 'Auto Scaling', 'RDS'],
    github: 'https://github.com/anshupriya0510/3-tier-APP',
  },
  {
    id: 4,
    title: 'AWS WordPress Hosting with EC2 & RDS',
    tag: 'Cloud · Web Hosting · Linux',
    highlights: [
      {
        label: 'LAMP STACK DEPLOYMENT',
        text: 'Deployed WordPress on AWS EC2 using Linux, Apache, PHP, and the LAMP stack',
      },
      {
        label: 'MANAGED DATABASE & SECURITY',
        text: 'Configured Amazon RDS MySQL as a separate managed database and secured EC2–RDS communication using Security Groups',
      },
    ],
    tech: ['AWS EC2', 'RDS', 'Linux', 'Apache', 'PHP', 'MySQL', 'WordPress'],
    github: 'https://github.com/anshupriya0510/Wordpress-website-hosting-on-EC2-with-RDS-with-LAMP-stack',
  },
  {
    id: 5,
    title: 'AWS VM Migration Project',
    tag: 'Cloud Migration · Virtualization · AWS',
    highlights: [
      {
        label: 'OVERVIEW',
        text: 'Migrated an on-premises/laptop Virtual Machine (HTML-based web app, 20GB storage volume) to AWS Cloud using an OVA file, Amazon S3, and an Amazon Machine Image (AMI)',
      },
      {
        label: 'MIGRATION FLOW',
        text: 'Exported local VM as OVA → uploaded to S3 → imported as AMI via AWS VM Import/Export → launched EC2 instance from the AMI with 20GB storage → verified the app via EC2 public IP',
      },
      {
        label: 'BENEFITS & OUTCOME',
        text: 'Easier cloud deployment, scalability, better availability, backup & recovery, reduced local hardware dependency',
      },
    ],
    tech: ['Amazon S3', 'Amazon EC2', 'Amazon AMI', 'OVA export/import', 'HTML application'],
    github: 'https://github.com/anshupriya0510/AWS-VM-Migration-Project',
  },
];

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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

  return (
    <section id="projects" ref={ref} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 space-y-2"
        >
          <div className="text-xs font-mono tracking-[0.3em] text-[#E63946] uppercase font-bold">
            03 / PROJECTS
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase">
            SELECTED CASE STUDIES<span className="text-[#E63946]">.</span>
          </h2>
          <p className="text-neutral-400 font-light max-w-xl text-base pt-2">
            Real-world cloud architectures, CI/CD pipelines, and application engineering built with production rigor.
          </p>
        </motion.div>

        {/* Editorial Case Studies List */}
        <div className="space-y-16">
          {PROJECTS_DATA.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.12 }}
              className="border-b border-white/10 pb-16 space-y-8 group"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#E63946] tracking-widest uppercase">
                    0{index + 1} — {project.tag}
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white group-hover:text-[#E63946] transition-colors">
                    {project.title}
                  </h3>
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white uppercase tracking-widest transition-colors flex-shrink-0"
                >
                  GITHUB REPO <span className="text-[#E63946]">→</span>
                </a>
              </div>

              {/* Project Highlights Grid */}
              <div className={`grid grid-cols-1 ${project.highlights.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4 sm:gap-6 pt-2`}>
                {project.highlights.map((item, hIdx) => (
                  <div
                    key={hIdx}
                    className={`${hIdx % 2 === 1 ? 'glass-card-red' : 'glass-card-neutral'} p-4 sm:p-6 space-y-2 min-w-0 break-words`}
                  >
                    <div
                      className={`text-[10px] font-mono ${
                        hIdx % 2 === 1 ? 'text-[#E63946]' : 'text-neutral-500'
                      } tracking-widest uppercase`}
                    >
                      {item.label}
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tech.map((item, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] sm:text-[11px] font-mono px-2.5 sm:px-3 py-1 bg-white/5 border border-white/10 text-neutral-300 max-w-full break-words"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
