import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax subtle shifts
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const headlineWords = ['THE', 'ART', 'OF', 'EVERYDAY', 'LIVING.'];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[680px] flex items-center justify-center overflow-hidden bg-atelier-dark"
    >
      {/* Background Image with Parallax & Smooth Zoom */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop"
          alt="Atelier Luxury Campaign"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.05]"
          data-cursor="ATELIER"
        />
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/45" />
      </motion.div>

      {/* Hero Content with Masked Text Reveals */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center text-atelier-bg flex flex-col items-center"
      >
        {/* Brand Pretitle */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.25, ease: 'easeOut' }}
          className="mb-4"
        >
          <span className="text-[11px] sm:text-xs tracking-[0.38em] uppercase text-atelier-accent font-semibold font-sans">
            Maison Atelier · Edition 2026
          </span>
        </motion.div>

        {/* Staggered Masked Word Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide font-light mb-6 flex flex-wrap justify-center gap-x-3 sm:gap-x-5 leading-[1.08] select-none">
          {headlineWords.map((word, idx) => (
            <div key={idx} className="overflow-hidden py-1">
              <motion.span
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{
                  duration: 0.95,
                  delay: 0.35 + idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </div>
          ))}
        </h1>

        {/* Subtitle Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl text-sm sm:text-base text-atelier-bg/85 font-light leading-relaxed mb-10 tracking-editorial"
        >
          Thoughtfully curated essentials for a life of quiet sophistication. Sculptural silhouettes, unlined double-face cashmere, and bespoke leathercraft.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <Link
            to="/shop"
            className="w-full sm:w-auto px-9 py-4 bg-atelier-bg text-atelier-dark text-xs tracking-luxury uppercase font-semibold hover:bg-atelier-accent hover:text-white transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group"
            data-cursor="SHOP"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
          <Link
            to="/about"
            className="w-full sm:w-auto px-9 py-4 border border-white/40 hover:border-white text-white text-xs tracking-luxury uppercase font-medium backdrop-blur-sm hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
            data-cursor="STORY"
          >
            Discover Our Story
          </Link>
        </motion.div>
      </motion.div>

      {/* Vertical Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-atelier-bg/70 hover:text-white transition-colors cursor-pointer select-none"
        onClick={() => {
          window.scrollTo({ top: window.innerHeight - 70, behavior: 'smooth' });
        }}
      >
        <span className="text-[9px] tracking-widest-luxury uppercase font-sans">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 stroke-[1.5]" />
        </motion.div>
      </motion.div>
    </section>
  );
};
