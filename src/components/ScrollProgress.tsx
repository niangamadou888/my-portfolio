import { useEffect, useRef } from 'react';

export const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      rafId = null;
      const bar = barRef.current;
      if (!bar) return;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`;
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress"
      style={{ transformOrigin: '0 0', transform: 'scaleX(0)', width: '100%' }}
    />
  );
};
