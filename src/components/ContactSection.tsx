'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to deliver message.');
      }
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Network error occurred.');
    }
  };

  return (
    <section id="contact" ref={ref} className="py-32 relative min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 space-y-4"
        >
          <div className="text-xs font-mono tracking-[0.3em] text-[#E63946] uppercase font-bold">
            07 / CONTACT
          </div>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase leading-[0.95]">
            LET'S BUILD<br />SOMETHING GREAT<span className="text-[#E63946]">.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Direct Contact & Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 space-y-12"
          >
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                  EMAIL DIRECTLY
                </span>
                <div>
                  <a
                    href="mailto:anshu.priya4748@gmail.com"
                    className="text-xl sm:text-2xl font-mono text-white hover:text-[#E63946] transition-colors"
                  >
                    anshu.priya4748@gmail.com
                  </a>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                  PHONE
                </span>
                <div className="text-xl sm:text-2xl font-mono text-white">
                  +91-9142714797
                </div>
              </div>
            </div>

            {/* Uppercase Minimalist Social Links */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-4">
                CONNECT
              </span>
              <div className="flex flex-wrap gap-8 font-mono text-sm font-bold tracking-widest">
                <a
                  href="https://github.com/anshupriya0510"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-[#E63946] transition-colors uppercase"
                >
                  GITHUB ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/anshupriya-engineer"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-[#E63946] transition-colors uppercase"
                >
                  LINKEDIN ↗
                </a>
                <a
                  href="https://leetcode.com/u/anshu_priya05/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-[#E63946] transition-colors uppercase"
                >
                  LEETCODE ↗
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-6"
          >
            <form onSubmit={handleSubmit} className="glass-card p-5 sm:p-8 space-y-6 w-full max-w-full min-w-0">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                  NAME *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full bg-[#16161c] border border-white/10 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-[#E63946] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                  EMAIL *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full bg-[#16161c] border border-white/10 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-[#E63946] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                  MESSAGE *
                </label>
                <textarea
                  rows={5}
                  required
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project or inquiry..."
                  className="w-full bg-[#16161c] border border-white/10 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-[#E63946] transition-colors resize-none"
                />
              </div>

              {status === 'sent' && (
                <div className="p-3 bg-green-500/10 border border-green-500/30 text-green-400 font-mono text-xs">
                  ✓ Thank you! Your message has been sent successfully.
                </div>
              )}
              {status === 'error' && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs space-y-1">
                  <div className="font-bold">✗ {errorMessage || 'An error occurred.'}</div>
                  <div className="text-[11px] text-neutral-400">
                    You can also email directly at{' '}
                    <a href="mailto:anshu.priya4748@gmail.com" className="text-white underline">
                      anshu.priya4748@gmail.com
                    </a>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-4 bg-[#E63946] text-white font-mono font-bold text-xs tracking-widest uppercase hover:bg-[#E63946]/90 transition-colors disabled:opacity-50"
              >
                {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE →'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
