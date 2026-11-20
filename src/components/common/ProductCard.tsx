import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Plus, Check } from 'lucide-react';
import { Product } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [isQuickAdded, setIsQuickAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      isFavorited ? 'Removed from Wishlist' : 'Saved to Wishlist',
      product.name,
      'info'
    );
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.colors[0], product.sizes[0], 1);
    setIsQuickAdded(true);
    showToast('Acquisition Added', `${product.name} added to your bag.`, 'success');
    setTimeout(() => setIsQuickAdded(false), 2000);
  };

  return (
    <motion.div
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      data-cursor="VIEW"
    >
      {/* Image Container with Smooth Zoom & Transition */}
      <Link
        to={`/product/${product.id}`}
        className="relative w-full aspect-[3/4] overflow-hidden bg-atelier-bg-secondary block"
      >
        {/* Primary Image */}
        <motion.img
          src={product.images[0]}
          alt={product.name}
          className={`w-full h-full object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isHovered && product.secondaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          loading="lazy"
        />

        {/* Secondary Image on Hover */}
        {product.secondaryImage && (
          <img
            src={product.secondaryImage}
            alt={`${product.name} alternate view`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100 pointer-events-none'
            }`}
            loading="lazy"
          />
        )}

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-atelier-dark/90 backdrop-blur-sm text-atelier-bg text-[9px] tracking-luxury uppercase px-2.5 py-1 font-medium z-10">
            {product.badge}
          </span>
        )}

        {/* Wishlist Button with Heart Animation */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-10 ${
            isFavorited
              ? 'bg-atelier-dark text-atelier-accent scale-105'
              : 'bg-white/85 hover:bg-white text-atelier-text hover:text-atelier-accent opacity-0 group-hover:opacity-100'
          }`}
          title={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-label="Wishlist"
        >
          <motion.div
            animate={isFavorited ? { scale: [1, 1.35, 1] } : { scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-atelier-accent stroke-atelier-accent' : 'stroke-[1.75]'}`} />
          </motion.div>
        </button>

        {/* Quick Add Slide-up Action Bar */}
        <div className="absolute inset-x-3 bottom-3 z-10 overflow-hidden">
          <motion.button
            onClick={handleQuickAdd}
            initial={false}
            animate={{
              y: isHovered ? 0 : 50,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`w-full py-2.5 px-3 text-[11px] tracking-luxury uppercase font-medium flex items-center justify-center gap-1.5 backdrop-blur-md transition-colors ${
              isQuickAdded
                ? 'bg-emerald-800 text-white'
                : 'bg-atelier-dark/95 hover:bg-atelier-accent text-atelier-bg shadow-lg'
            }`}
          >
            {isQuickAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </motion.button>
        </div>
      </Link>

      {/* Product Information */}
      <div className="pt-3 pb-1 flex flex-col flex-1">
        <div className="flex items-center justify-between text-[11px] text-atelier-text-secondary mb-1">
          <span className="uppercase tracking-editorial">{product.category}</span>
          {/* Color Dots */}
          <div className="flex items-center gap-1">
            {product.colors.map((color) => (
              <span
                key={color.name}
                className="w-2.5 h-2.5 rounded-full border border-atelier-border/80"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="font-serif text-base text-atelier-text hover:text-atelier-accent transition-colors font-normal line-clamp-1"
        >
          {product.name}
        </Link>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-xs font-semibold text-atelier-text">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-[11px] text-atelier-text-secondary line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
