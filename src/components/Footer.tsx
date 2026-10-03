'use client';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 relative z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-neutral-500">
        <div>
          © {new Date().getFullYear()} ANSHU PRIYA<span className="text-[#E63946]">.</span> ALL RIGHTS RESERVED.
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/anshupriya0510"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            GITHUB
          </a>
          <a
            href="https://www.linkedin.com/in/anshupriya-engineer"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            LINKEDIN
          </a>
          <a
            href="https://leetcode.com/u/anshu_priya05/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#E63946] transition-colors"
          >
            LEETCODE
          </a>
        </div>
      </div>
    </footer>
  );
}
