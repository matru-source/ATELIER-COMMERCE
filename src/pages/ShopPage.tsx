import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Grid3X3, Grid2X2, X } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { FilterState, ProductCategory } from '../types';
import { ProductCard } from '../components/common/ProductCard';
import { ProductFilters } from '../components/shop/ProductFilters';
import { FilterDrawer } from '../components/shop/FilterDrawer';

export const ShopPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as ProductCategory | null;
  const searchParam = searchParams.get('search');
  const isNewParam = searchParams.get('filter') === 'new';

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [columns, setColumns] = useState<3 | 4>(4);

  const [filters, setFilters] = useState<FilterState>({
    category: categoryParam || 'All',
    minPrice: 0,
    maxPrice: 100000,
    selectedColors: [],
    selectedSizes: [],
    sortBy: isNewParam ? 'newest' : 'featured',
    inStockOnly: false,
  });

  // Extract unique categories, colors, sizes from products
  const availableCategories: ProductCategory[] = [
    'All',
    'Clothing',
    'Bags',
    'Footwear',
    'Accessories',
    'Lifestyle',
    'Home Objects',
  ];

  const availableColors = useMemo(() => {
    const map = new Map<string, string>();
    PRODUCTS.forEach((p) => {
      p.colors.forEach((c) => map.set(c.name, c.hex));
    });
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, []);

  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => {
      p.sizes.forEach((s) => set.add(s));
    });
    return Array.from(set).slice(0, 8);
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category
      if (filters.category !== 'All' && product.category !== filters.category) {
        return false;
      }
      // Search param from URL
      if (searchParam) {
        const query = searchParam.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(query) ||
          product.tagline.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query);
        if (!matches) return false;
      }
      // Price
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }
      // Color
      if (filters.selectedColors.length > 0) {
        const hasColor = product.colors.some((c) => filters.selectedColors.includes(c.name));
        if (!hasColor) return false;
      }
      // Size
      if (filters.selectedSizes.length > 0) {
        const hasSize = product.sizes.some((s) => filters.selectedSizes.includes(s));
        if (!hasSize) return false;
      }
      // In stock
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'alpha-asc') return a.name.localeCompare(b.name);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [filters, searchParam]);

  const clearFilter = (type: 'category' | 'color' | 'size', value?: string) => {
    if (type === 'category') setFilters((p) => ({ ...p, category: 'All' }));
    if (type === 'color' && value) {
      setFilters((p) => ({ ...p, selectedColors: p.selectedColors.filter((c) => c !== value) }));
    }
    if (type === 'size' && value) {
      setFilters((p) => ({ ...p, selectedSizes: p.selectedSizes.filter((s) => s !== value) }));
    }
  };

  return (
    <div className="pt-28 pb-24 bg-atelier-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Breadcrumb */}
        <div className="border-b border-atelier-border pb-8 mb-10">
          <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold block mb-2">
            The Permanent Archive
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-5xl text-atelier-text font-normal tracking-wide">
                {filters.category === 'All' ? 'All Creations' : filters.category}
              </h1>
              {searchParam && (
                <p className="text-xs text-atelier-text-secondary mt-1 font-light">
                  Showing results for query: <strong className="text-atelier-text font-medium">"{searchParam}"</strong>
                </p>
              )}
            </div>

            {/* Sort & Grid Toggle Controls */}
            <div className="flex items-center gap-4">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsFilterDrawerOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 border border-atelier-border text-xs tracking-luxury uppercase font-medium bg-white"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-atelier-accent" />
                <span>Filters</span>
              </button>

              {/* Sort Selector */}
              <div className="flex items-center text-xs">
                <span className="text-atelier-text-secondary mr-2 uppercase tracking-luxury text-[10px] hidden sm:inline">
                  Sort:
                </span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters((p) => ({ ...p, sortBy: e.target.value as any }))}
                  aria-label="Sort creations"
                  className="bg-transparent border border-atelier-border py-1.5 px-3 text-xs text-atelier-text focus:outline-none focus:border-atelier-text font-medium"
                >
                  <option value="featured">Curator's Choice</option>
                  <option value="newest">Newest Editions</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="alpha-asc">Alphabetical (A–Z)</option>
                </select>
              </div>

              {/* Desktop Column Views */}
              <div className="hidden lg:flex items-center border border-atelier-border p-0.5 bg-white">
                <button
                  onClick={() => setColumns(3)}
                  className={`p-1.5 transition-colors ${columns === 3 ? 'bg-atelier-dark text-atelier-bg' : 'text-atelier-text-secondary hover:text-atelier-text'}`}
                  title="3 Column Editorial View"
                >
                  <Grid2X2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setColumns(4)}
                  className={`p-1.5 transition-colors ${columns === 4 ? 'bg-atelier-dark text-atelier-bg' : 'text-atelier-text-secondary hover:text-atelier-text'}`}
                  title="4 Column Grid View"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {(filters.category !== 'All' || filters.selectedColors.length > 0 || filters.selectedSizes.length > 0) && (
            <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-atelier-border/60">
              <span className="text-[10px] tracking-luxury uppercase text-atelier-text-secondary">
                Active:
              </span>
              {filters.category !== 'All' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-atelier-bg-secondary text-xs text-atelier-text border border-atelier-border">
                  {filters.category}
                  <button onClick={() => clearFilter('category')}>
                    <X className="w-3 h-3 text-atelier-text-secondary hover:text-atelier-text" />
                  </button>
                </span>
              )}
              {filters.selectedColors.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-atelier-bg-secondary text-xs text-atelier-text border border-atelier-border"
                >
                  {c}
                  <button onClick={() => clearFilter('color', c)}>
                    <X className="w-3 h-3 text-atelier-text-secondary hover:text-atelier-text" />
                  </button>
                </span>
              ))}
              {filters.selectedSizes.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-atelier-bg-secondary text-xs text-atelier-text border border-atelier-border"
                >
                  Size: {s}
                  <button onClick={() => clearFilter('size', s)}>
                    <X className="w-3 h-3 text-atelier-text-secondary hover:text-atelier-text" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Main Layout: Filters Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <ProductFilters
              filters={filters}
              setFilters={setFilters}
              availableCategories={availableCategories}
              availableColors={availableColors}
              availableSizes={availableSizes}
              totalCount={filteredProducts.length}
            />
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center border border-atelier-border bg-white p-12">
                <h3 className="font-serif text-2xl text-atelier-text mb-2">No Creations Found</h3>
                <p className="text-xs text-atelier-text-secondary max-w-sm mx-auto mb-6 leading-relaxed">
                  No catalog items match your selected filter criteria. Try adjusting or clearing your filters.
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      category: 'All',
                      minPrice: 0,
                      maxPrice: 100000,
                      selectedColors: [],
                      selectedSizes: [],
                      sortBy: 'featured',
                      inStockOnly: false,
                    })
                  }
                  className="px-6 py-2.5 bg-atelier-dark text-atelier-bg text-xs tracking-luxury uppercase font-medium hover:bg-atelier-accent transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className={`grid gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12 ${
                  columns === 3
                    ? 'grid-cols-2 sm:grid-cols-3'
                    : 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                }`}
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        setFilters={setFilters}
        availableCategories={availableCategories}
        availableColors={availableColors}
        availableSizes={availableSizes}
        totalCount={filteredProducts.length}
      />
    </div>
  );
};
