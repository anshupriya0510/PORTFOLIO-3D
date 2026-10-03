'use client';
import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);
      if (cursorRef.current) {
        cursorRef.current.style.left = mouseX - 6 + 'px';
        cursorRef.current.style.top = mouseY - 6 + 'px';
      }
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      if (followerRef.current) {
        followerRef.current.style.left = followerX - 18 + 'px';
        followerRef.current.style.top = followerY - 18 + 'px';
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    animate();

    const onEnter = () => {
      if (cursorRef.current) cursorRef.current.style.transform = 'scale(2)';
      if (followerRef.current) followerRef.current.style.transform = 'scale(1.5)';
    };
    const onLeave = () => {
      if (cursorRef.current) cursorRef.current.style.transform = 'scale(1)';
      if (followerRef.current) followerRef.current.style.transform = 'scale(1)';
    };

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <>
      <div ref={cursorRef} className="cursor" style={{ opacity: visible ? 1 : 0 }} />
      <div ref={followerRef} className="cursor-follower" style={{ opacity: visible ? 1 : 0 }} />
    </>
  );
}
