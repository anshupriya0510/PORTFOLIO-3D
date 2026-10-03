'use client';
import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseGSAPOptions {
  selector?: string;
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
}

export function useGSAPCardAnimation(
  containerRef: RefObject<HTMLElement | null>,
  options: UseGSAPOptions = {}
) {
  const {
    selector = '.glass-card, .glass-card-red, .glass-card-neutral',
    y = 40,
    duration = 0.65,
    stagger = 0.1,
    start = 'top 88%',
  } = options;

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    // Register plugin inside effect to ensure client execution
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = containerRef.current.querySelectorAll(selector);

    if (!cards.length) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      // Initial hidden state to prevent flash before animation
      gsap.set(cards, { opacity: 0, y });

      ScrollTrigger.batch(cards, {
        start,
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration,
            ease: 'power2.out',
            stagger,
            overwrite: 'auto',
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, selector, y, duration, stagger, start]);
}

// ─── 3-D Tilt Hover — desktop only ─────────────────────────────────────────
interface TiltOptions {
  selector?: string;
  maxDeg?: number;
  scalePeak?: number;
  lerpSpeed?: number; // 0–1, higher = snappier
}

export function useTiltHover(
  containerRef: RefObject<HTMLElement | null>,
  options: TiltOptions = {}
) {
  const {
    selector = '.glass-card, .glass-card-red, .glass-card-neutral',
    maxDeg   = 9,
    scalePeak = 1.025,
    lerpSpeed = 0.12,
  } = options;

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    // Skip on touch devices and prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch               = window.matchMedia('(hover: none)').matches;
    if (prefersReducedMotion || isTouch) return;

    const cards = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(selector)
    );
    if (!cards.length) return;

    const cleanups: (() => void)[] = [];

    cards.forEach((card) => {
      // ── Wrap card in a perspective container so 3-D transforms render ──
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'perspective:900px;display:contents;';

      // "display:contents" makes the wrapper invisible to layout —
      // it won't affect flexbox/grid/spacing at all
      card.parentNode?.insertBefore(wrapper, card);
      wrapper.appendChild(card);

      // Current lerp state
      let targetRX = 0, targetRY = 0, targetSC = 1;
      let currentRX = 0, currentRY = 0, currentSC = 1;
      let rafId = 0;
      let isHovered = false;

      // Enable GPU layer
      card.style.willChange = 'transform';

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      const tick = () => {
        currentRX = lerp(currentRX, targetRX, lerpSpeed);
        currentRY = lerp(currentRY, targetRY, lerpSpeed);
        currentSC = lerp(currentSC, targetSC, lerpSpeed);

        // Single combined transform — no GSAP property conflicts
        card.style.transform =
          `perspective(900px) rotateX(${currentRX.toFixed(3)}deg) rotateY(${currentRY.toFixed(3)}deg) scale(${currentSC.toFixed(4)})`;

        const stillMoving =
          Math.abs(currentRX - targetRX) > 0.01 ||
          Math.abs(currentRY - targetRY) > 0.01 ||
          Math.abs(currentSC - targetSC) > 0.001;

        if (stillMoving || isHovered) {
          rafId = requestAnimationFrame(tick);
        } else {
          // Fully settled — clear inline style so CSS transitions can resume
          card.style.transform = '';
          card.style.willChange = '';
        }
      };

      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        // Normalise cursor to -1 … +1
        const nx = ((e.clientX - rect.left)  / rect.width  - 0.5) * 2;
        const ny = ((e.clientY - rect.top)   / rect.height - 0.5) * 2;

        targetRY =  nx * maxDeg;   // left↔right tilt
        targetRX = -ny * maxDeg;   // top↔bottom tilt (inverted = natural)
        targetSC = scalePeak;
      };

      const onEnter = () => {
        isHovered = true;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(tick);
      };

      const onLeave = () => {
        isHovered = false;
        targetRX = 0;
        targetRY = 0;
        targetSC = 1;
        // keep ticking so it lerps back to zero
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(tick);
      };

      card.addEventListener('mousemove',  onMove);
      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mouseleave', onLeave);

      cleanups.push(() => {
        cancelAnimationFrame(rafId);
        card.removeEventListener('mousemove',  onMove);
        card.removeEventListener('mouseenter', onEnter);
        card.removeEventListener('mouseleave', onLeave);
        card.style.transform  = '';
        card.style.willChange = '';
        // Unwrap: move card back, remove wrapper
        wrapper.parentNode?.insertBefore(card, wrapper);
        wrapper.parentNode?.removeChild(wrapper);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [containerRef, selector, maxDeg, scalePeak, lerpSpeed]);
}
