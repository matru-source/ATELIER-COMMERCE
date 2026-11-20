import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { FilterState, ProductCategory } from '../../types';
import { ProductFilters } from './ProductFilters';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  availableCategories: ProductCategory[];
  availableColors: { name: string; hex: string }[];
  availableSizes: string[];
  totalCount: number;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  availableCategories,
  availableColors,
  availableSizes,
  totalCount,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 w-full max-w-xs sm:max-w-sm bg-atelier-bg p-6 overflow-y-auto shadow-2xl border-r border-atelier-border flex flex-col justify-between lg:hidden"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-atelier-border mb-6">
                <span className="font-serif text-xl text-atelier-text">Refine Archive</span>
                <button
                  onClick={onClose}
                  className="p-1.5 text-atelier-text-secondary hover:text-atelier-text"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ProductFilters
                filters={filters}
                setFilters={setFilters}
                availableCategories={availableCategories}
                availableColors={availableColors}
                availableSizes={availableSizes}
                totalCount={totalCount}
              />
            </div>

            <div className="pt-6 border-t border-atelier-border mt-8">
              <button
                onClick={onClose}
                className="w-full py-3 bg-atelier-dark text-atelier-bg text-xs tracking-luxury uppercase font-semibold hover:bg-atelier-accent transition-colors"
              >
                Apply Filters ({totalCount})
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
