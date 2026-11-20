import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductInfo } from '../components/product/ProductInfo';
import { RelatedProducts } from '../components/product/RelatedProducts';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id);

  const [selectedColor, setSelectedColor] = useState(
    product ? product.colors[0] : { name: '', hex: '', imageIndex: 0 }
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product) {
      setSelectedColor(product.colors[0]);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="pt-36 pb-32 text-center bg-atelier-bg min-h-screen">
        <h2 className="font-serif text-3xl text-atelier-text mb-4">Creation Not Found</h2>
        <p className="text-xs text-atelier-text-secondary mb-6">
          This piece may have been retired to our private archives.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-atelier-dark text-atelier-bg text-xs tracking-luxury uppercase font-medium hover:bg-atelier-accent transition-colors"
        >
          Return to Archive
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-atelier-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-[10px] tracking-widest-luxury uppercase text-atelier-text-secondary hover:text-atelier-text transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Archive</span>
          </Link>
        </div>

        {/* Gallery & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-5">
            <ProductInfo
              product={product}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
          </div>
        </div>

        {/* Related Creations */}
        <div className="mt-20">
          <RelatedProducts currentProduct={product} allProducts={PRODUCTS} />
        </div>
      </div>
    </div>
  );
};
