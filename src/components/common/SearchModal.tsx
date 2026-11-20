import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';
import { PRODUCTS } from '../../data/products';
import { formatPrice } from '../../utils/formatters';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, recentSearches, addRecentSearch, clearRecentSearches } = useSearch();
  const [localQuery, setLocalQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setLocalQuery('');
    }
  }, [isSearchOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  const queryClean = localQuery.trim().toLowerCase();

  const searchResults = queryClean
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(queryClean) ||
          p.category.toLowerCase().includes(queryClean) ||
          p.tagline.toLowerCase().includes(queryClean) ||
          p.materials.some((m) => m.toLowerCase().includes(queryClean))
      )
    : [];

  const handleSelectSearch = (term: string) => {
    addRecentSearch(term);
    setIsSearchOpen(false);
    navigate(`/shop?search=${encodeURIComponent(term)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      handleSelectSearch(localQuery.trim());
    }
  };

  const trendingCategories = ['Clothing', 'Bags', 'Footwear', 'Home Objects', 'Accessories'];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex flex-col justify-start items-center px-4 py-8 sm:py-16 overflow-y-auto"
        >
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="w-full max-w-3xl bg-atelier-bg shadow-2xl border border-atelier-border p-6 sm:p-10 relative my-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 right-6 p-2 text-atelier-text-secondary hover:text-atelier-text transition-colors rounded-full hover:bg-atelier-bg-secondary"
              aria-label="Close search"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Title */}
            <div className="mb-6">
              <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold block mb-1">
                Atelier Directory
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-atelier-text font-normal">
                Discover Curated Creations
              </h2>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="relative mb-8">
              <div className="relative flex items-center border-b-2 border-atelier-text">
                <Search className="w-5 h-5 text-atelier-accent mr-3 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search coats, leather bags, travertine, cashmere..."
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                  className="w-full py-3 bg-transparent text-lg sm:text-xl text-atelier-text placeholder-atelier-text-secondary/60 focus:outline-none font-serif tracking-wide"
                />
                {localQuery && (
                  <button
                    type="button"
                    onClick={() => setLocalQuery('')}
                    className="p-1 text-atelier-text-secondary hover:text-atelier-text mr-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 bg-atelier-dark text-atelier-bg text-xs tracking-luxury uppercase font-medium hover:bg-atelier-accent transition-colors ml-2 hidden sm:block"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Results or Suggestions */}
            {queryClean ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-atelier-text-secondary border-b border-atelier-border pb-2">
                  <span>Found {searchResults.length} creation{searchResults.length === 1 ? '' : 's'}</span>
                  <button
                    onClick={() => handleSelectSearch(localQuery)}
                    className="text-atelier-accent hover:underline flex items-center gap-1"
                  >
                    View in Shop <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {searchResults.length === 0 ? (
                  <div className="py-12 text-center text-atelier-text-secondary">
                    <p className="font-serif text-lg text-atelier-text mb-1">No creations match your query</p>
                    <p className="text-xs">Try searching for "Cashmere", "Tote", "Double Breasted", or "Travertine"</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-80 overflow-y-auto pr-1">
                    {searchResults.slice(0, 6).map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          addRecentSearch(product.name);
                          setIsSearchOpen(false);
                          navigate(`/product/${product.id}`);
                        }}
                        className="flex gap-3 p-2.5 rounded-sm hover:bg-atelier-bg-secondary cursor-pointer transition-colors border border-transparent hover:border-atelier-border"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-14 h-18 object-cover flex-shrink-0 bg-stone-100"
                        />
                        <div className="flex flex-col justify-center">
                          <span className="text-[10px] tracking-wider uppercase text-atelier-accent">
                            {product.category}
                          </span>
                          <h4 className="font-serif text-sm text-atelier-text line-clamp-1 font-medium">
                            {product.name}
                          </h4>
                          <span className="text-xs font-semibold text-atelier-text mt-0.5">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <span className="text-xs font-medium text-atelier-text-secondary tracking-luxury uppercase block mb-3">
                    Curated Categories
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {trendingCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigate(`/shop?category=${encodeURIComponent(cat)}`);
                        }}
                        className="px-3 py-1.5 bg-atelier-bg-secondary hover:bg-atelier-dark hover:text-atelier-bg text-xs text-atelier-text transition-colors tracking-wide"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-atelier-text-secondary tracking-luxury uppercase">
                        Recent Inquiries
                      </span>
                      <button
                        onClick={clearRecentSearches}
                        className="text-[11px] text-atelier-text-secondary hover:text-atelier-text underline"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => handleSelectSearch(term)}
                          className="flex items-center gap-1.5 px-3 py-1.5 border border-atelier-border hover:border-atelier-accent text-xs text-atelier-text transition-colors"
                        >
                          <Sparkles className="w-3 h-3 text-atelier-accent" />
                          <span>{term}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
