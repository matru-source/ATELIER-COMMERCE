import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch desktop devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor]') as HTMLElement | null;

      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute('data-cursor'));
        setIsHovered(true);
      } else if (
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('input') ||
        target?.closest('select') ||
        target?.closest('.cursor-pointer') ||
        target?.tagName === 'BUTTON' ||
        target?.tagName === 'A'
      ) {
        setCursorText(null);
        setIsHovered(true);
      } else {
        setCursorText(null);
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Luxury Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-atelier-accent/60 hidden md:flex items-center justify-center backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x - (cursorText ? 36 : isHovered ? 24 : 14),
          y: mousePosition.y - (cursorText ? 36 : isHovered ? 24 : 14),
          width: cursorText ? 72 : isHovered ? 48 : 28,
          height: cursorText ? 72 : isHovered ? 48 : 28,
          backgroundColor: cursorText
            ? 'rgba(23, 23, 21, 0.85)'
            : isHovered
            ? 'rgba(161, 138, 107, 0.12)'
            : 'transparent',
          borderColor: cursorText ? '#A18A6B' : 'rgba(161, 138, 107, 0.5)',
        }}
        transition={{
          type: 'spring',
          mass: 0.15,
          stiffness: 450,
          damping: 28,
        }}
      >
        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              className="text-[9px] tracking-widest uppercase font-serif text-atelier-bg font-medium select-none"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Center Micro Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-1.5 h-1.5 bg-atelier-dark rounded-full hidden md:block"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: cursorText || isHovered ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          mass: 0.1,
          stiffness: 850,
          damping: 38,
        }}
      />
    </>
  );
};
