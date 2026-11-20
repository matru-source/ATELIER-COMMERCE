import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS } from '../../data/collections';

export const FeaturedCollections: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-atelier-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold block mb-2">
            The Edit
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-atelier-text font-normal tracking-wide">
            CURATED FOR THE CONSIDERED LIFE.
          </h2>
          <div className="w-12 h-[1px] bg-atelier-accent/60 mx-auto mt-6" />
        </div>

        {/* 3 Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {COLLECTIONS.map((col, idx) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col"
              data-cursor="EXPLORE"
            >
              {/* Image with zoom effect */}
              <Link
                to={`/collections/${col.id}`}
                className="relative aspect-[3/4] overflow-hidden bg-atelier-bg-secondary block"
              >
                <img
                  src={col.heroImage}
                  alt={col.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                
                {/* Number Indicator */}
                <span className="absolute top-4 right-4 text-[10px] tracking-widest uppercase font-serif text-white/80 bg-black/35 backdrop-blur-md px-2 py-0.5">
                  0{idx + 1} / 03
                </span>

                {/* Season Tag */}
                <span className="absolute top-4 left-4 text-[9px] tracking-widest-luxury uppercase text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1">
                  {col.season}
                </span>

                {/* Subtitle */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent block mb-1">
                    {col.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl tracking-wide font-light">
                    {col.title}
                  </h3>
                </div>
              </Link>

              {/* Text info and link */}
              <div className="pt-5 flex flex-col justify-between flex-1">
                <p className="text-xs text-atelier-text-secondary leading-relaxed mb-4">
                  {col.description}
                </p>
                <Link
                  to={`/collections/${col.id}`}
                  className="inline-flex items-center gap-2 text-xs tracking-luxury uppercase font-semibold text-atelier-text group-hover:text-atelier-accent transition-colors pt-1"
                >
                  <span>Explore Collection ({col.productCount})</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
