import { useEffect, useRef } from 'react';

const INTERACTIVE_SELECTOR =
  'a,button,[role="button"],input:not([type="hidden"]),textarea,select,label[for],summary,[data-cursor="pointer"]';

export const CustomCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  useEffect(() => {
    if (isTouch) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const target = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let pointer = false;
    let visible = false;
    let rafId = 0;

    const render = () => {
      // Lerp ring toward target (smooth trailing follow, no CSS transform transition)
      ringPos.x += (target.x - ringPos.x) * 0.22;
      ringPos.y += (target.y - ringPos.y) * 0.22;
      const scale = pointer ? 1.55 : 1;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(render);
    };

    const setVisible = (v: boolean) => {
      if (visible === v) return;
      visible = v;
      ring.style.opacity = v ? '1' : '0';
      dot.style.opacity = v ? '1' : '0';
    };

    const setPointer = (p: boolean) => {
      if (pointer === p) return;
      pointer = p;
      // Dot shrinks (not hidden) on hover so the link between ring and point stays continuous
      dot.style.opacity = visible ? (p ? '0.35' : '1') : '0';
      ring.style.borderColor = p ? 'rgba(214, 201, 182, 0.9)' : 'rgba(214, 201, 182, 0.55)';
    };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        // First frame — snap ring to cursor to avoid a long glide-in
        ringPos.x = target.x;
        ringPos.y = target.y;
        setVisible(true);
      }
      const el = e.target as Element | null;
      setPointer(!!(el && el.closest(INTERACTIVE_SELECTOR)));
    };

    const onLeave = () => setVisible(false);
    const onDown = () => { ring.style.scale = '0.85'; };
    const onUp = () => { ring.style.scale = '1'; };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Ring — position driven by rAF lerp (no transform transition to avoid fighting with scale) */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(214, 201, 182, 0.55)',
          boxShadow: '0 0 10px rgba(214, 201, 182, 0.2)',
          opacity: 0,
          transform: 'translate3d(-100px,-100px,0) translate(-50%,-50%)',
          transition: 'opacity 200ms ease, border-color 200ms ease, scale 140ms ease-out',
          willChange: 'transform',
        }}
      />
      {/* Dot — follows cursor directly, opacity fades between hover states */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: 'rgba(214, 201, 182, 0.95)',
          boxShadow: '0 0 6px rgba(214, 201, 182, 0.5)',
          opacity: 0,
          transform: 'translate3d(-100px,-100px,0) translate(-50%,-50%)',
          transition: 'opacity 180ms ease',
          willChange: 'transform',
        }}
      />
    </>
  );
};
