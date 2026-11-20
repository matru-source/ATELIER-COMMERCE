import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { COLLECTIONS } from '../data/collections';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';

export const CollectionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const collection = COLLECTIONS.find((c) => c.id === id) || COLLECTIONS[0];

  const collectionProducts = PRODUCTS.filter((p) => p.collectionId === collection.id);

  return (
    <div className="pt-24 pb-24 bg-atelier-bg min-h-screen">
      {/* Hero Banner for Collection */}
      <div className="relative w-full h-[50vh] min-h-[380px] overflow-hidden bg-atelier-dark flex items-center justify-center text-center">
        <img
          src={collection.heroImage}
          alt={collection.title}
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.68]"
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-white space-y-3">
          <Link
            to="/collections"
            className="inline-flex items-center gap-1.5 text-[10px] tracking-widest-luxury uppercase text-atelier-accent hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>All Curations</span>
          </Link>
          <span className="block text-[10px] tracking-[0.3em] uppercase text-atelier-accent">
            {collection.season}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-wide">
            {collection.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 max-w-xl mx-auto font-light leading-relaxed">
            {collection.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Curator Note Banner */}
        <div className="max-w-2xl mx-auto text-center mb-16 pb-12 border-b border-atelier-border">
          <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold block mb-2">
            The Philosophy of This Edit
          </span>
          <p className="font-serif text-lg sm:text-xl text-atelier-text italic font-normal leading-relaxed">
            "{collection.curatorNote}"
          </p>
        </div>

        {/* Products in Collection */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12">
          {collectionProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
