import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Sparkles, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    freeShippingThreshold,
    freeShippingRemaining,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    total,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; success: boolean } | null>(null);
  const navigate = useNavigate();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMessage({ text: res.message, success: res.success });
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-atelier-bg shadow-2xl flex flex-col border-l border-atelier-border"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-atelier-border flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl tracking-wide text-atelier-text font-normal">
                  Atelier Bag
                </h3>
                <p className="text-xs text-atelier-text-secondary mt-0.5 tracking-wider uppercase">
                  {cart.length === 0 ? 'Empty' : `${cart.length} unique creation${cart.length > 1 ? 's' : ''}`}
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-atelier-text-secondary hover:text-atelier-text transition-colors rounded-full hover:bg-atelier-bg-secondary"
                aria-label="Close Bag"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-atelier-bg-secondary/70 px-6 py-3.5 border-b border-atelier-border">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1.5 text-atelier-text font-medium">
                  <Truck className="w-3.5 h-3.5 text-atelier-accent" />
                  {freeShippingRemaining === 0 ? (
                    <span className="text-emerald-800 font-semibold">Complimentary Shipping Unlocked</span>
                  ) : (
                    <span>
                      Add <strong className="text-atelier-text font-semibold">{formatPrice(freeShippingRemaining)}</strong> for complimentary delivery
                    </span>
                  )}
                </span>
                <span className="text-[11px] font-mono text-atelier-text-secondary">{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-atelier-border/80 h-1.5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${freeShippingProgress}%` }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className={`h-full ${freeShippingRemaining === 0 ? 'bg-emerald-700' : 'bg-atelier-accent'}`}
                />
              </div>
            </div>

            {/* Items List with Animated Presence */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-atelier-bg-secondary flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-atelier-accent" />
                  </div>
                  <h4 className="font-serif text-xl text-atelier-text mb-2">Your Bag is Empty</h4>
                  <p className="text-xs text-atelier-text-secondary max-w-xs mb-6 leading-relaxed font-light">
                    Explore our curated collections of architectural tailoring, Italian leather goods, and refined lifestyle artifacts.
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/shop');
                    }}
                    className="px-6 py-3 bg-atelier-dark text-atelier-bg text-xs tracking-luxury uppercase font-medium hover:bg-atelier-accent transition-colors"
                  >
                    Discover The Collection
                  </button>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 30, transition: { duration: 0.25 } }}
                      className="flex gap-4 pb-6 border-b border-atelier-border/60 last:border-0"
                    >
                      <Link
                        to={`/product/${item.product.id}`}
                        onClick={() => setIsCartOpen(false)}
                        className="w-20 h-24 sm:w-24 sm:h-28 flex-shrink-0 bg-stone-100 overflow-hidden"
                      >
                        <img
                          src={item.product.images[item.selectedColor.imageIndex] || item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <Link
                              to={`/product/${item.product.id}`}
                              onClick={() => setIsCartOpen(false)}
                              className="font-serif text-base text-atelier-text hover:text-atelier-accent transition-colors line-clamp-1"
                            >
                              {item.product.name}
                            </Link>
                            <button
                              onClick={() => removeFromCart(item.product.id, item.selectedColor.name, item.selectedSize)}
                              className="text-atelier-text-secondary hover:text-rose-600 transition-colors p-1"
                              title="Remove creation"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <p className="text-xs text-atelier-text-secondary mt-1">
                            {item.selectedColor.name} · Size: {item.selectedSize}
                          </p>

                          <p className="text-xs font-medium text-atelier-text mt-1.5">
                            {formatPrice(item.product.price)}
                          </p>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-atelier-border bg-white">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedColor.name,
                                  item.selectedSize,
                                  item.quantity - 1
                                )
                              }
                              className="p-1.5 text-atelier-text-secondary hover:text-atelier-text transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-xs font-medium text-atelier-text min-w-[24px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedColor.name,
                                  item.selectedSize,
                                  item.quantity + 1
                                )
                              }
                              className="p-1.5 text-atelier-text-secondary hover:text-atelier-text transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-semibold text-atelier-text">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer Calculation & Actions */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-atelier-border bg-white space-y-4 shadow-sm">
                {/* Coupon Form with Privilege Tags */}
                {appliedCoupon ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-between p-2.5 bg-atelier-bg border border-atelier-border text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-atelier-accent" />
                      <span className="font-semibold text-atelier-text tracking-wide">{appliedCoupon.code}</span>
                      <span className="text-emerald-700 ml-1">({appliedCoupon.discountPercent}% off applied)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-atelier-text-secondary hover:text-rose-600 underline uppercase"
                    >
                      Remove
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Privilege Code (try ATELIER10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs border border-atelier-border bg-atelier-bg uppercase tracking-wider focus:outline-none focus:border-atelier-accent"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-atelier-dark text-atelier-bg text-xs tracking-luxury uppercase font-medium hover:bg-atelier-accent transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponMessage && (
                      <p className={`text-[11px] ${couponMessage.success ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {couponMessage.text}
                      </p>
                    )}
                  </form>
                )}

                {/* Subtotals */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-atelier-text-secondary">
                    <span>Subtotal</span>
                    <span className="font-medium text-atelier-text">{formatPrice(subtotal)}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Privilege Reduction</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-atelier-text-secondary">
                    <span>Estimated Shipping</span>
                    <span>{shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}</span>
                  </div>

                  <div className="border-t border-atelier-border pt-2 flex justify-between text-sm font-semibold text-atelier-text">
                    <span>Total Estimate</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 bg-atelier-dark text-atelier-bg text-xs tracking-luxury uppercase font-semibold flex items-center justify-center gap-2 hover:bg-atelier-accent transition-all shadow-md group"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-atelier-text-secondary pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-atelier-accent" />
                    <span>Complimentary Returns & White Glove Packaging</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
