'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 300;

function getFramePath(index: number) {
  const num = String(index + 1).padStart(3, '0');
  return `/frames/ezgif-frame-${num}.jpg`;
}

export default function PortraitCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const loadedRef = useRef(0);
  const [ready, setReady] = useState(false);

  // Draw a frame centred & aspect-fit on the canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[Math.round(frameIndex)];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.width;
    const ch = canvas.height;

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = cw / ch;

    let drawW: number, drawH: number, drawX: number, drawY: number;
    if (canvasAspect > imgAspect) {
      drawH = ch;
      drawW = ch * imgAspect;
    } else {
      drawW = cw;
      drawH = cw / imgAspect;
    }
    drawX = (cw - drawW) / 2;
    drawY = (ch - drawH) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Lerp animation loop
  const animate = useCallback(() => {
    const diff = targetFrameRef.current - currentFrameRef.current;
    if (Math.abs(diff) > 0.05) {
      currentFrameRef.current += diff * 0.12;
    } else {
      currentFrameRef.current = targetFrameRef.current;
    }
    drawFrame(Math.max(0, Math.min(TOTAL_FRAMES - 1, currentFrameRef.current)));
    rafRef.current = requestAnimationFrame(animate);
  }, [drawFrame]);

  // Resize handler
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    drawFrame(Math.round(currentFrameRef.current));
  }, [drawFrame]);

  // Scroll handler
  const onScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;
    const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
    targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
  }, []);

  // Preload all frames
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedRef.current++;
        if (loadedRef.current === TOTAL_FRAMES) {
          setReady(true);
        }
      };
      img.onerror = () => {
        loadedRef.current++;
        if (loadedRef.current === TOTAL_FRAMES) setReady(true);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  // Start animation once images are ready
  useEffect(() => {
    if (!ready) return;
    resizeCanvas();
    drawFrame(0);
    rafRef.current = requestAnimationFrame(animate);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [ready, animate, onScroll, resizeCanvas, drawFrame]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none"
      style={{
        zIndex: 0,
        opacity: ready ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
      aria-hidden="true"
    />
  );
}
