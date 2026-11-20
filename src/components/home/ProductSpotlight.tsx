import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export const ProductSpotlight: React.FC = () => {
  // Signature spotlight product: Saddle Leather Structured Tote
  const spotlightProduct = PRODUCTS.find((p) => p.id === 'saddle-leather-tote') || PRODUCTS[0];
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleDirectAdd = () => {
    addToCart(spotlightProduct, spotlightProduct.colors[selectedColorIndex], spotlightProduct.sizes[0], 1);
    showToast('Acquisition Added', `${spotlightProduct.name} added to your bag.`, 'success');
  };

  return (
    <section className="py-24 sm:py-32 bg-atelier-bg border-t border-atelier-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Large Image on Left with Crossfade */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative aspect-[4/5] bg-stone-100 overflow-hidden"
            data-cursor="DISCOVER"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedColorIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={spotlightProduct.images[selectedColorIndex] || spotlightProduct.images[0]}
                alt={spotlightProduct.name}
                className="w-full h-full object-cover object-center"
              />
            </AnimatePresence>
            <span className="absolute top-4 left-4 bg-atelier-dark text-atelier-bg text-[9px] tracking-luxury uppercase px-3 py-1 font-medium">
              Signature Artifact
            </span>
          </motion.div>

          {/* Details on Right */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col space-y-6"
          >
            <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold">
              Spotlight Focus · {spotlightProduct.category}
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-atelier-text font-normal leading-tight">
              {spotlightProduct.name}
            </h2>

            <p className="text-xl sm:text-2xl font-serif text-atelier-text font-light">
              {formatPrice(spotlightProduct.price)}
            </p>

            <p className="text-xs sm:text-sm text-atelier-text-secondary leading-relaxed font-light">
              {spotlightProduct.description}
            </p>

            {/* Color Swatch Selection */}
            <div className="pt-2">
              <span className="text-[11px] text-atelier-text-secondary uppercase tracking-luxury block mb-2.5">
                Hue: <strong className="text-atelier-text">{spotlightProduct.colors[selectedColorIndex]?.name}</strong>
              </span>
              <div className="flex items-center gap-3">
                {spotlightProduct.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 ${
                      selectedColorIndex === idx ? 'border-atelier-text scale-110 shadow-sm' : 'border-transparent hover:scale-105'
                    }`}
                    title={color.name}
                  >
                    <span
                      className="w-full h-full rounded-full block border border-black/10"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleDirectAdd}
                className="w-full sm:w-auto px-8 py-3.5 bg-atelier-dark text-atelier-bg text-xs tracking-luxury uppercase font-semibold hover:bg-atelier-accent transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Acquire Creation</span>
                <Check className="w-3.5 h-3.5" />
              </button>

              <Link
                to={`/product/${spotlightProduct.id}`}
                className="w-full sm:w-auto px-6 py-3.5 border border-atelier-border text-atelier-text hover:border-atelier-text text-xs tracking-luxury uppercase font-medium transition-colors flex items-center justify-center gap-2 group"
              >
                <span>Discover Details</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
