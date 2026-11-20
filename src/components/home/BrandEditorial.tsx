import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const BrandEditorial: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section ref={containerRef} className="py-24 sm:py-32 bg-atelier-bg-secondary/60 border-t border-atelier-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Lifestyle Photography with subtle parallax */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] overflow-hidden bg-stone-200"
            data-cursor="EDITORIAL"
          >
            <motion.img
              style={{ y: imgY }}
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop"
              alt="Atelier Craftsmanship and Philosophy"
              className="w-full h-[115%] object-cover object-center will-change-transform"
              loading="lazy"
            />
            {/* Subtle corner badge */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-5 py-3.5 border border-atelier-border max-w-xs hidden sm:block shadow-sm">
              <span className="text-[9px] tracking-widest-luxury uppercase text-atelier-accent font-semibold block mb-0.5">
                Bespoke Atelier
              </span>
              <p className="text-[11px] text-atelier-text font-serif italic leading-relaxed">
                “Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.”
              </p>
            </div>
          </motion.div>

          {/* Right: Editorial Typography */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col justify-center space-y-6"
          >
            <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold">
              Editorial Manifesto
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-atelier-text font-normal leading-[1.1] tracking-tight">
              LESS, BUT BETTER.
            </h2>

            <p className="text-sm sm:text-base text-atelier-text-secondary leading-relaxed font-light">
              Every piece tells a story of thoughtful design, exceptional craftsmanship, and timeless simplicity. We reject disposable micro-trends in favor of permanent architectural forms.
            </p>

            <p className="text-xs sm:text-sm text-atelier-text-secondary leading-relaxed font-light">
              By collaborating exclusively with family-owned heritage mills in Biella, Civitanova Marche, and Kyoto, our creations emerge from patience, ethical responsibility, and quiet material honesty.
            </p>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-atelier-dark text-atelier-bg text-xs tracking-luxury uppercase font-semibold hover:bg-atelier-accent transition-colors shadow-sm group"
                data-cursor="READ"
              >
                <span>Our Philosophy</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
