import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springCfg = { damping: 28, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(cursorX, springCfg);
  const ringY = useSpring(cursorY, springCfg);

  const isPointerRef = useRef(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      const target = e.target as Element;
      const clickable = !!target.closest('a, button, [role="button"], input, textarea, select, label, [tabindex]');
      if (clickable !== isPointerRef.current) {
        isPointerRef.current = clickable;
        setIsPointer(clickable);
      }
    };

    const onLeave = () => { isVisibleRef.current = false; setIsVisible(false); };
    const onEnter = () => { isVisibleRef.current = true; setIsVisible(true); };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <>
      {/* Outer ring - follows with spring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointer ? 1.6 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: '1.5px solid rgba(214, 201, 182, 0.6)',
            boxShadow: '0 0 10px rgba(214, 201, 182, 0.2)',
          }}
        />
      </motion.div>

      {/* Inner dot - follows directly */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointer ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: 'rgba(214, 201, 182, 0.9)',
            boxShadow: '0 0 6px rgba(214, 201, 182, 0.5)',
          }}
        />
      </motion.div>
    </>
  );
};
