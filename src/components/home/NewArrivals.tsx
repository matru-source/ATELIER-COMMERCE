import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';

export const NewArrivals: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'Clothing' | 'Bags' | 'Footwear'>('ALL');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (!p.isNewArrival) return false;
    if (selectedFilter === 'ALL') return true;
    return p.category === selectedFilter;
  }).slice(0, 8);

  const filterTabs: Array<'ALL' | 'Clothing' | 'Bags' | 'Footwear'> = ['ALL', 'Clothing', 'Bags', 'Footwear'];

  return (
    <section className="py-24 sm:py-32 bg-atelier-bg border-t border-atelier-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold block mb-2">
              Autumn / Winter 2026
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-atelier-text font-normal tracking-wide">
              NEW ARRIVALS
            </h2>
            <p className="text-xs sm:text-sm text-atelier-text-secondary mt-2 tracking-editorial font-light">
              Discover the latest additions to our considered collection.
            </p>
          </div>

          {/* Quick Category Switcher with Animated Pill */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none bg-stone-100 p-1 rounded-sm border border-atelier-border/80">
            {filterTabs.map((tab) => {
              const isSelected = selectedFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setSelectedFilter(tab)}
                  className={`relative text-xs tracking-luxury uppercase px-3.5 py-1.5 transition-colors whitespace-nowrap ${
                    isSelected ? 'text-atelier-bg font-semibold' : 'text-atelier-text-secondary hover:text-atelier-text'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-atelier-dark z-0"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab === 'ALL' ? 'View All' : tab}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4-Column Product Grid with Layout Transitions */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA to Shop All */}
        <div className="text-center mt-16 sm:mt-20">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 border border-atelier-text text-atelier-text hover:bg-atelier-dark hover:text-atelier-bg text-xs tracking-luxury uppercase font-medium transition-all duration-300"
            data-cursor="ARCHIVE"
          >
            <span>Explore Entire Archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
