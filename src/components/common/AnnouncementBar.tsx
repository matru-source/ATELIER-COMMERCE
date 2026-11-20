import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ANNOUNCEMENTS = [
  'COMPLIMENTARY SHIPPING ON ORDERS ABOVE ₹5,000',
  'AUTUMN / WINTER 2026: DISCOVER THE ART OF EVERYDAY LIVING',
  'BESPOKE WHITE-GLOVE PRESENTATION INCLUDED WITH EVERY ACQUISITION'
];

export const AnnouncementBar: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-atelier-dark text-atelier-bg text-[10px] tracking-luxury uppercase py-2 px-4 relative overflow-hidden z-40 border-b border-atelier-dark-border">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center h-4 relative">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="absolute font-medium text-atelier-bg/90 tracking-widest-luxury"
          >
            {ANNOUNCEMENTS[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};
