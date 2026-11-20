import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [inputVal, setInputVal] = useState(query);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: inputVal });
  };

  const results = useMemo(() => {
    if (!query.trim()) return PRODUCTS;
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.materials.some((m) => m.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="pt-28 pb-28 bg-atelier-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold block mb-2">
            Archive Discovery
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-atelier-text font-normal tracking-wide mb-6">
            SEARCH THE ATELIER
          </h1>

          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-5 h-5 text-atelier-accent absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search by silhouette, material, or category..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full pl-12 pr-28 py-3.5 bg-white border border-atelier-border text-xs sm:text-sm text-atelier-text focus:outline-none focus:border-atelier-text font-serif tracking-wide"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-5 bg-atelier-dark text-atelier-bg text-[11px] tracking-luxury uppercase font-semibold hover:bg-atelier-accent transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        <div className="mb-6 flex justify-between items-center text-xs text-atelier-text-secondary border-b border-atelier-border pb-3">
          <span>
            {query ? (
              <>Results for <strong className="text-atelier-text font-medium">"{query}"</strong> ({results.length})</>
            ) : (
              <>Browsing Entire Archive ({results.length})</>
            )}
          </span>
        </div>

        {results.length === 0 ? (
          <div className="py-20 text-center border border-atelier-border bg-white p-10">
            <h3 className="font-serif text-2xl text-atelier-text mb-2">No Matching Creations</h3>
            <p className="text-xs text-atelier-text-secondary max-w-sm mx-auto">
              We could not locate any creations matching your search. Try searching for cashmere, wool, leather, or travertine.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
