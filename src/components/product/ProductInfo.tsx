import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, Minus, ShieldCheck, Truck, RotateCcw, ChevronDown, Star, Sparkles, Check } from 'lucide-react';
import { Product, ProductVariantColor } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { SizeGuideModal } from './SizeGuideModal';

interface ProductInfoProps {
  product: Product;
  selectedColor: ProductVariantColor;
  setSelectedColor: (color: ProductVariantColor) => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  selectedColor,
  setSelectedColor,
}) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('desc');
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setIsAddedSuccess(true);
    showToast('Acquisition Added', `${product.name} added to your bag.`, 'success');
    setTimeout(() => setIsAddedSuccess(false), 2200);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    navigate('/checkout');
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-[11px] text-atelier-text-secondary tracking-luxury uppercase">
        <Link to="/" className="hover:text-atelier-text transition-colors">Home</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-atelier-text transition-colors">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-atelier-text truncate">{product.name}</span>
      </nav>

      {/* Header Info */}
      <div>
        {product.badge && (
          <span className="inline-block text-[9px] tracking-widest-luxury uppercase px-2.5 py-1 bg-atelier-dark text-atelier-bg font-semibold mb-3">
            {product.badge}
          </span>
        )}

        <h1 className="font-serif text-3xl sm:text-4xl text-atelier-text font-normal tracking-wide">
          {product.name}
        </h1>

        <p className="text-xs sm:text-sm text-atelier-text-secondary mt-1 tracking-editorial font-light">
          {product.tagline}
        </p>

        {/* Price and Ratings */}
        <div className="mt-4 flex items-center justify-between border-b border-atelier-border pb-4">
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-serif text-atelier-text font-medium">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-atelier-text-secondary line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-atelier-text-secondary">
            <div className="flex text-amber-700">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-700 text-amber-700'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-medium text-atelier-text">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        </div>
      </div>

      {/* Color Swatch Selection */}
      <div className="space-y-2 pt-1">
        <div className="flex justify-between items-center text-xs">
          <span className="uppercase tracking-luxury text-atelier-text-secondary font-medium">
            Shade: <strong className="text-atelier-text">{selectedColor.name}</strong>
          </span>
        </div>
        <div className="flex items-center gap-3">
          {product.colors.map((color) => {
            const isSelected = selectedColor.name === color.name;
            return (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 ${
                  isSelected ? 'border-atelier-text scale-110 shadow-sm' : 'border-transparent hover:scale-105'
                }`}
                title={color.name}
              >
                <span
                  className="w-full h-full rounded-full block border border-black/10"
                  style={{ backgroundColor: color.hex }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Size Selection */}
      <div className="space-y-2.5 pt-2">
        <div className="flex justify-between items-center text-xs">
          <span className="uppercase tracking-luxury text-atelier-text-secondary font-medium">
            Select Size: <strong className="text-atelier-text">{selectedSize}</strong>
          </span>
          <button
            onClick={() => setIsSizeGuideOpen(true)}
            className="text-[11px] text-atelier-accent hover:underline flex items-center gap-1 uppercase tracking-wider"
          >
            Size Guide
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 text-xs transition-all border ${
                  isSelected
                    ? 'border-atelier-dark bg-atelier-dark text-atelier-bg font-semibold'
                    : 'border-atelier-border bg-white text-atelier-text hover:border-atelier-text'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity & CTAs */}
      <div className="space-y-4 pt-4">
        <div className="flex gap-4 items-center">
          {/* Quantity Selector */}
          <div className="flex items-center border border-atelier-border bg-white h-12 px-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 text-atelier-text-secondary hover:text-atelier-text"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-4 text-xs font-semibold text-atelier-text min-w-[32px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 text-atelier-text-secondary hover:text-atelier-text"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Bag Button */}
          <button
            onClick={handleAddToCart}
            className={`flex-1 h-12 text-xs tracking-luxury uppercase font-semibold flex items-center justify-center gap-2 transition-all shadow-md ${
              isAddedSuccess
                ? 'bg-emerald-800 text-white'
                : 'bg-atelier-dark text-atelier-bg hover:bg-atelier-accent'
            }`}
          >
            {isAddedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Atelier Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add to Bag · {formatPrice(product.price * quantity)}</span>
              </>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => {
              toggleWishlist(product);
              showToast(
                isFavorited ? 'Removed from Wishlist' : 'Saved to Wishlist',
                product.name,
                'info'
              );
            }}
            className={`h-12 w-12 border flex items-center justify-center transition-colors flex-shrink-0 ${
              isFavorited
                ? 'border-atelier-dark bg-atelier-dark text-atelier-accent'
                : 'border-atelier-border bg-white text-atelier-text hover:border-atelier-text'
            }`}
            title={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
            aria-label="Toggle wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-atelier-accent stroke-atelier-accent' : 'stroke-[1.75]'}`} />
          </button>
        </div>

        {/* Buy Now instant checkout */}
        <button
          onClick={handleBuyNow}
          className="w-full h-12 border border-atelier-text text-atelier-text hover:bg-atelier-bg-secondary text-xs tracking-luxury uppercase font-medium transition-colors"
        >
          Express Acquisition (Buy Now)
        </button>
      </div>

      {/* Assurance Perks */}
      <div className="grid grid-cols-3 gap-2 py-4 border-y border-atelier-border text-center text-[10px] text-atelier-text-secondary">
        <div className="flex flex-col items-center gap-1">
          <Truck className="w-4 h-4 text-atelier-accent" />
          <span>Complimentary Delivery</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <RotateCcw className="w-4 h-4 text-atelier-accent" />
          <span>30-Day Doorstep Returns</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-atelier-accent" />
          <span>Certified Origin & Purity</span>
        </div>
      </div>

      {/* Accordions */}
      <div className="divide-y divide-atelier-border border-b border-atelier-border text-xs">
        {/* Description */}
        <div className="py-3">
          <button
            onClick={() => toggleAccordion('desc')}
            className="w-full flex items-center justify-between text-left font-serif text-base text-atelier-text font-normal py-1"
          >
            <span>Description & Silhouette</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openAccordion === 'desc' ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {openAccordion === 'desc' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden pt-2 pb-2 text-atelier-text-secondary leading-relaxed space-y-2"
              >
                <p>{product.longDescription}</p>
                <ul className="list-disc list-inside space-y-1 pt-1 text-atelier-text">
                  {product.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Materials */}
        <div className="py-3">
          <button
            onClick={() => toggleAccordion('materials')}
            className="w-full flex items-center justify-between text-left font-serif text-base text-atelier-text font-normal py-1"
          >
            <span>Composition & Provenance</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openAccordion === 'materials' ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {openAccordion === 'materials' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden pt-2 pb-2 text-atelier-text-secondary leading-relaxed space-y-1.5"
              >
                {product.materials.map((m, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-atelier-accent flex-shrink-0" />
                    <span className="text-atelier-text">{m}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Care */}
        <div className="py-3">
          <button
            onClick={() => toggleAccordion('care')}
            className="w-full flex items-center justify-between text-left font-serif text-base text-atelier-text font-normal py-1"
          >
            <span>Longevity & Care Guide</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openAccordion === 'care' ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {openAccordion === 'care' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden pt-2 pb-2 text-atelier-text-secondary leading-relaxed space-y-1.5"
              >
                {product.careInstructions.map((c, i) => (
                  <p key={i}>· {c}</p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Shipping */}
        <div className="py-3">
          <button
            onClick={() => toggleAccordion('shipping')}
            className="w-full flex items-center justify-between text-left font-serif text-base text-atelier-text font-normal py-1"
          >
            <span>White-Glove Shipping & Returns</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openAccordion === 'shipping' ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {openAccordion === 'shipping' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden pt-2 pb-2 text-atelier-text-secondary leading-relaxed space-y-2"
              >
                <p>
                  Every order above ₹5,000 qualifies for complimentary insured transit with temperature-controlled courier packaging and linen garment covers.
                </p>
                <p>
                  Estimated doorstep transit: 3 to 5 business days. 30-day doorstep exchange and return service included.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
};
