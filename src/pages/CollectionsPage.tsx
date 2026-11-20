import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import { COLLECTIONS } from '../data/collections';

export const CollectionsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-28 bg-atelier-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold block mb-3">
            Atelier Curations
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-atelier-text font-normal tracking-wide mb-6">
            COLLECTIONS
          </h1>
          <p className="text-xs sm:text-sm text-atelier-text-secondary leading-relaxed font-light max-w-xl mx-auto">
            Thoughtfully grouped assemblies of architectural tailoring, Italian leathercraft, and monolithic living objects.
          </p>
          <div className="w-12 h-[1px] bg-atelier-accent/50 mx-auto mt-6" />
        </div>

        {/* Collections Stack */}
        <div className="space-y-24">
          {COLLECTIONS.map((col, idx) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image side */}
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <Link
                  to={`/collections/${col.id}`}
                  className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden bg-stone-200 block group"
                >
                  <img
                    src={col.heroImage}
                    alt={col.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                  <span className="absolute top-4 left-4 bg-atelier-dark/90 backdrop-blur-md text-atelier-bg text-[9px] tracking-widest-luxury uppercase px-3 py-1 font-medium">
                    {col.season}
                  </span>
                </Link>
              </div>

              {/* Text side */}
              <div className={`lg:col-span-5 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div>
                  <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold block mb-2">
                    {col.subtitle}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-atelier-text font-normal tracking-wide">
                    {col.title}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-atelier-text-secondary leading-relaxed font-light">
                  {col.description}
                </p>

                {/* Curator note */}
                <div className="p-4 bg-atelier-bg-secondary border-l-2 border-atelier-accent text-xs">
                  <div className="flex items-center gap-1.5 text-atelier-text font-medium mb-1">
                    <Compass className="w-3.5 h-3.5 text-atelier-accent" />
                    <span className="tracking-luxury uppercase text-[10px]">Curator's Statement</span>
                  </div>
                  <p className="text-atelier-text-secondary italic text-[11px] leading-relaxed">
                    "{col.curatorNote}"
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    to={`/collections/${col.id}`}
                    className="inline-flex items-center gap-3 px-8 py-3.5 bg-atelier-dark text-atelier-bg text-xs tracking-luxury uppercase font-semibold hover:bg-atelier-accent transition-colors shadow-sm group"
                  >
                    <span>Discover Edition ({col.productCount} pieces)</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
