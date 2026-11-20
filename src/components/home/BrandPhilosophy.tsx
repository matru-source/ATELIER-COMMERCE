import React from 'react';
import { motion } from 'framer-motion';

export const BrandPhilosophy: React.FC = () => {
  const values = [
    {
      number: '01',
      title: 'CONSIDERED DESIGN',
      description:
        'Purging superfluous decoration in pursuit of pure form. Every seam, dart, and proportion is calibrated with intentional restraint.',
    },
    {
      number: '02',
      title: 'QUALITY FIRST',
      description:
        'Sourcing exclusively from historical heritage mills. 30-momme mulberry silk, Biella virgin wool twill, and vegetable-tanned Tuscan calfskin.',
    },
    {
      number: '03',
      title: 'TIMELESS LIVING',
      description:
        'Garments and objects engineered for decades of wear. Pieces that resist seasonal obsolescence and deepen in beauty with honest patina.',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-atelier-dark text-atelier-bg relative overflow-hidden bg-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold block mb-3">
            Core Creed
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal tracking-wide leading-tight">
            “DESIGNED TO LAST. MADE TO MATTER.”
          </h2>
          <div className="w-12 h-[1px] bg-atelier-accent/40 mx-auto mt-6" />
        </div>

        {/* 3 Pillars Grid with Animated Line Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {values.map((val, idx) => (
            <motion.div
              key={val.number}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: idx * 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="pt-8 flex flex-col justify-between relative"
            >
              {/* Horizontal line drawing in */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: 'easeOut' }}
                className="absolute top-0 left-0 right-0 h-[1px] bg-atelier-dark-border origin-left"
              />

              <div>
                <span className="font-serif text-sm text-atelier-accent tracking-widest block mb-4">
                  {val.number}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-light tracking-wide mb-3">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-atelier-dark-muted leading-relaxed font-light">
                  {val.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
