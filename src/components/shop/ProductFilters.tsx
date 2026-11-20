import React from 'react';
import { FilterState, ProductCategory } from '../../types';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

interface ProductFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  availableCategories: ProductCategory[];
  availableColors: { name: string; hex: string }[];
  availableSizes: string[];
  totalCount: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  setFilters,
  availableCategories,
  availableColors,
  availableSizes,
  totalCount,
}) => {
  const handleCategoryChange = (cat: ProductCategory) => {
    setFilters((prev) => ({ ...prev, category: cat }));
  };

  const handleColorToggle = (colorName: string) => {
    setFilters((prev) => {
      const exists = prev.selectedColors.includes(colorName);
      return {
        ...prev,
        selectedColors: exists
          ? prev.selectedColors.filter((c) => c !== colorName)
          : [...prev.selectedColors, colorName],
      };
    });
  };

  const handleSizeToggle = (size: string) => {
    setFilters((prev) => {
      const exists = prev.selectedSizes.includes(size);
      return {
        ...prev,
        selectedSizes: exists
          ? prev.selectedSizes.filter((s) => s !== size)
          : [...prev.selectedSizes, size],
      };
    });
  };

  const resetAllFilters = () => {
    setFilters({
      category: 'All',
      minPrice: 0,
      maxPrice: 100000,
      selectedColors: [],
      selectedSizes: [],
      sortBy: 'featured',
      inStockOnly: false,
    });
  };

  const hasActiveFilters =
    filters.category !== 'All' ||
    filters.selectedColors.length > 0 ||
    filters.selectedSizes.length > 0 ||
    filters.minPrice > 0 ||
    filters.maxPrice < 100000 ||
    filters.inStockOnly;

  return (
    <div className="space-y-8 pr-4">
      {/* Header and Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-atelier-border">
        <div className="flex items-center gap-2 text-atelier-text">
          <SlidersHorizontal className="w-4 h-4 text-atelier-accent" />
          <span className="text-xs tracking-luxury uppercase font-semibold">Refine Archive</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetAllFilters}
            className="flex items-center gap-1 text-[11px] text-atelier-text-secondary hover:text-atelier-text underline uppercase"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold mb-3">
          Category
        </h4>
        <div className="space-y-1.5 text-xs">
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`w-full text-left py-1.5 px-2.5 transition-colors flex items-center justify-between ${
                filters.category === cat
                  ? 'bg-atelier-bg-secondary text-atelier-text font-semibold'
                  : 'text-atelier-text-secondary hover:text-atelier-text'
              }`}
            >
              <span>{cat}</span>
              {filters.category === cat && <span className="w-1.5 h-1.5 rounded-full bg-atelier-accent" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold mb-3">
          Price Bracket
        </h4>
        <div className="space-y-2 text-xs">
          {[
            { label: 'All Values', min: 0, max: 100000 },
            { label: 'Under ₹30,000', min: 0, max: 30000 },
            { label: '₹30,000 – ₹55,000', min: 30000, max: 55000 },
            { label: 'Above ₹55,000', min: 55000, max: 100000 },
          ].map((bracket) => {
            const isSelected = filters.minPrice === bracket.min && filters.maxPrice === bracket.max;
            return (
              <button
                key={bracket.label}
                onClick={() => setFilters((p) => ({ ...p, minPrice: bracket.min, maxPrice: bracket.max }))}
                className={`w-full text-left py-1 px-2.5 transition-colors ${
                  isSelected
                    ? 'font-semibold text-atelier-text bg-atelier-bg-secondary'
                    : 'text-atelier-text-secondary hover:text-atelier-text'
                }`}
              >
                {bracket.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Colors Swatches */}
      <div>
        <h4 className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold mb-3">
          Color Palette
        </h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {availableColors.map((color) => {
            const isSelected = filters.selectedColors.includes(color.name);
            return (
              <button
                key={color.name}
                onClick={() => handleColorToggle(color.name)}
                className={`flex items-center gap-2 p-1.5 border transition-colors ${
                  isSelected
                    ? 'border-atelier-text bg-atelier-bg-secondary text-atelier-text font-medium'
                    : 'border-atelier-border/70 text-atelier-text-secondary hover:border-atelier-border'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-black/15 flex-shrink-0"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="truncate text-[11px]">{color.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h4 className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold mb-3">
          Dimensions & Size
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {availableSizes.map((size) => {
            const isSelected = filters.selectedSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`px-2.5 py-1 text-[11px] border transition-colors ${
                  isSelected
                    ? 'border-atelier-dark bg-atelier-dark text-atelier-bg'
                    : 'border-atelier-border text-atelier-text hover:border-atelier-dark'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result Count indicator */}
      <div className="pt-4 border-t border-atelier-border text-xs text-atelier-text-secondary">
        Showing <strong className="text-atelier-text">{totalCount}</strong> curated creation{totalCount === 1 ? '' : 's'}
      </div>
    </div>
  );
};
