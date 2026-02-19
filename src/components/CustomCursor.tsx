import { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  // Track state in a ref to avoid React re-renders on every mousemove
  const stateRef = useRef({ pointer: false, visible: false });
  // Evaluated once — device type doesn't change mid-session
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  useEffect(() => {
    if (isTouch) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const applyState = () => {
      const { pointer, visible } = stateRef.current;
      ring.style.opacity = visible ? '1' : '0';
      ring.style.scale = pointer ? '1.6' : '1';
      dot.style.opacity = visible && !pointer ? '1' : '0';
    };

    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      // Dot follows cursor instantly
      dot.style.transform = `translate(${x}px,${y}px)`;
      // Ring follows with a CSS transition lag (spring-like)
      ring.style.transform = `translate(${x}px,${y}px)`;

      const wasVisible = stateRef.current.visible;
      stateRef.current.visible = true;

      const clickable = !!(e.target as Element).closest(
        'a,button,[role="button"],input,textarea,select,label,[tabindex]'
      );
      const changed = clickable !== stateRef.current.pointer || !wasVisible;
      stateRef.current.pointer = clickable;
      if (changed) applyState();
    };

    const onLeave = () => { stateRef.current.visible = false; applyState(); };
    const onEnter = () => { stateRef.current.visible = true; applyState(); };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Ring — CSS transition gives spring-like lag */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: -16,
          left: -16,
          pointerEvents: 'none',
          zIndex: 9999,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(214, 201, 182, 0.6)',
          boxShadow: '0 0 10px rgba(214, 201, 182, 0.2)',
          opacity: 0,
          transform: 'translate(-200px,-200px)',
          transition: 'opacity 0.2s, scale 0.2s, transform 110ms ease-out',
          willChange: 'transform',
        }}
      />
      {/* Dot — follows cursor directly, no transition on transform */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: -2.5,
          left: -2.5,
          pointerEvents: 'none',
          zIndex: 9999,
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: 'rgba(214, 201, 182, 0.9)',
          boxShadow: '0 0 6px rgba(214, 201, 182, 0.5)',
          opacity: 0,
          transform: 'translate(-200px,-200px)',
          transition: 'opacity 0.15s',
          willChange: 'transform',
        }}
      />
    </>
  );
};
