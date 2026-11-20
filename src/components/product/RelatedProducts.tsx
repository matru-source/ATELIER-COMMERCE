import React from 'react';
import { Product } from '../../types';
import { ProductCard } from '../common/ProductCard';

interface RelatedProductsProps {
  currentProduct: Product;
  allProducts: Product[];
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProduct,
  allProducts,
}) => {
  // Find products in same category or collection, excluding the current one
  const related = allProducts
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        (p.category === currentProduct.category || p.collectionId === currentProduct.collectionId)
    )
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="pt-20 border-t border-atelier-border">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold block mb-2">
          Coordinated Dressing
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-atelier-text font-normal tracking-wide">
          Complete the Look
        </h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
};
