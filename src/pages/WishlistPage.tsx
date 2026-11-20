import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { ProductCard } from '../components/common/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleMoveAllToBag = () => {
    wishlist.forEach((prod) => {
      addToCart(prod, prod.colors[0], prod.sizes[0], 1);
    });
    showToast('Transferred to Bag', `${wishlist.length} creations moved to your bag.`, 'success');
  };

  return (
    <div className="pt-28 pb-24 bg-atelier-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-atelier-border pb-8 mb-12 gap-4">
          <div>
            <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold block mb-2">
              Private Curations
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-atelier-text font-normal tracking-wide">
              SAVED CREATIONS
            </h1>
            <p className="text-xs text-atelier-text-secondary mt-1 tracking-editorial font-light">
              {wishlist.length === 0
                ? 'Your private wishlist is presently empty.'
                : `${wishlist.length} timeless piece${wishlist.length > 1 ? 's' : ''} preserved in your consideration.`}
            </p>
          </div>

          {wishlist.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleMoveAllToBag}
                className="px-5 py-2.5 bg-atelier-dark text-atelier-bg text-xs tracking-luxury uppercase font-semibold hover:bg-atelier-accent transition-colors flex items-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move All to Bag</span>
              </button>
              <button
                onClick={clearWishlist}
                className="px-4 py-2.5 border border-atelier-border text-atelier-text-secondary hover:text-rose-600 text-xs tracking-luxury uppercase transition-colors"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {wishlist.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto border border-atelier-border bg-white p-10">
            <div className="w-16 h-16 rounded-full bg-atelier-bg-secondary flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-atelier-accent stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-2xl text-atelier-text mb-2">No Saved Pieces</h3>
            <p className="text-xs text-atelier-text-secondary leading-relaxed mb-6 font-light">
              Tap the heart icon on any silhouette, bag, or ceramic piece while browsing to preserve it in your personal edit.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-atelier-dark text-atelier-bg text-xs tracking-luxury uppercase font-semibold hover:bg-atelier-accent transition-colors"
            >
              <span>Explore The Archive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12">
            {wishlist.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
