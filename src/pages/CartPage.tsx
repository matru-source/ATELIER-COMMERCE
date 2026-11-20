import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, Truck, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
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

  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ text: string; success: boolean } | null>(null);
  const navigate = useNavigate();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponFeedback({ text: res.message, success: res.success });
    if (res.success) setCouponCode('');
  };

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 bg-atelier-bg min-h-screen">
        <div className="max-w-xl mx-auto px-4 text-center py-16 border border-atelier-border bg-white">
          <div className="w-16 h-16 rounded-full bg-atelier-bg-secondary flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-atelier-accent" />
          </div>
          <h1 className="font-serif text-3xl text-atelier-text mb-2">Your Bag is Empty</h1>
          <p className="text-xs text-atelier-text-secondary leading-relaxed mb-8 max-w-sm mx-auto font-light">
            You have not yet added any creations to your bag. Discover our latest autumn/winter outerwear and leather goods.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-atelier-dark text-atelier-bg text-xs tracking-luxury uppercase font-semibold hover:bg-atelier-accent transition-colors"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-atelier-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="border-b border-atelier-border pb-6 mb-10 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold block mb-2">
              Order Review
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-atelier-text font-normal tracking-wide">
              SHOPPING BAG
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-atelier-text-secondary hover:text-rose-600 underline uppercase tracking-luxury"
          >
            Clear Entire Bag
          </button>
        </div>

        {/* Free Shipping Banner */}
        <div className="bg-atelier-bg-secondary border border-atelier-border p-4 mb-8">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="flex items-center gap-2 font-medium text-atelier-text">
              <Truck className="w-4 h-4 text-atelier-accent" />
              {freeShippingRemaining === 0 ? (
                <span className="text-emerald-800 font-semibold">Complimentary White-Glove Shipping Unlocked</span>
              ) : (
                <span>
                  Add <strong className="text-atelier-text font-semibold">{formatPrice(freeShippingRemaining)}</strong> more to receive complimentary delivery
                </span>
              )}
            </span>
            <span className="font-medium text-atelier-text-secondary">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-atelier-border h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${freeShippingRemaining === 0 ? 'bg-emerald-700' : 'bg-atelier-accent'}`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* 2-Column Bag Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Items Table */}
          <div className="lg:col-span-8 space-y-6">
            <div className="border border-atelier-border bg-white divide-y divide-atelier-border">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`}
                  className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between"
                >
                  <div className="flex gap-4 items-center">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="w-20 h-28 sm:w-24 sm:h-32 bg-stone-100 flex-shrink-0 overflow-hidden"
                    >
                      <img
                        src={item.product.images[item.selectedColor.imageIndex] || item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform"
                      />
                    </Link>

                    <div className="space-y-1">
                      <span className="text-[10px] tracking-wider uppercase text-atelier-accent">
                        {item.product.category}
                      </span>
                      <Link
                        to={`/product/${item.product.id}`}
                        className="font-serif text-lg text-atelier-text hover:text-atelier-accent transition-colors font-medium block"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-atelier-text-secondary">
                        Shade: {item.selectedColor.name} · Size: {item.selectedSize}
                      </p>
                      <p className="text-xs font-semibold text-atelier-text pt-1">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity and Line Total */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                    <div className="flex items-center border border-atelier-border bg-atelier-bg">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedColor.name,
                            item.selectedSize,
                            item.quantity - 1
                          )
                        }
                        className="p-2 text-atelier-text-secondary hover:text-atelier-text"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-semibold text-atelier-text min-w-[28px] text-center">
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
                        className="p-2 text-atelier-text-secondary hover:text-atelier-text"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-atelier-text">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor.name, item.selectedSize)}
                        className="text-atelier-text-secondary hover:text-rose-600 transition-colors p-1"
                        title="Remove from bag"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <Link
                to="/shop"
                className="text-xs tracking-luxury uppercase text-atelier-text hover:text-atelier-accent font-medium transition-colors"
              >
                ← Continue Discovering Archive
              </Link>
            </div>
          </div>

          {/* Right Summary Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border border-atelier-border bg-white p-6 space-y-6 shadow-sm">
              <h3 className="font-serif text-xl text-atelier-text font-normal border-b border-atelier-border pb-3">
                Summary
              </h3>

              {/* Coupon Engine */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-atelier-bg border border-atelier-border text-xs">
                    <div>
                      <span className="font-semibold text-atelier-text">{appliedCoupon.code}</span>
                      <span className="text-emerald-700 ml-2">({appliedCoupon.discountPercent}% off applied)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-atelier-text-secondary hover:text-rose-600 underline uppercase"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                    <label className="text-[10px] tracking-luxury uppercase text-atelier-text-secondary font-medium block">
                      Privilege Voucher
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="ATELIER10 or WELCOME15"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs border border-atelier-border uppercase tracking-wider focus:outline-none focus:border-atelier-text"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-atelier-dark text-atelier-bg text-xs tracking-luxury uppercase font-medium hover:bg-atelier-accent transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponFeedback && (
                      <p className={`text-[11px] ${couponFeedback.success ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {couponFeedback.text}
                      </p>
                    )}
                  </form>
                )}
              </div>

              {/* Calculations */}
              <div className="space-y-2.5 text-xs border-t border-atelier-border pt-4">
                <div className="flex justify-between text-atelier-text-secondary">
                  <span>Subtotal</span>
                  <span className="font-medium text-atelier-text">{formatPrice(subtotal)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Privilege Voucher Reduction</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-atelier-text-secondary">
                  <span>White-Glove Delivery</span>
                  <span>{shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}</span>
                </div>

                <div className="border-t border-atelier-border pt-3 flex justify-between text-base font-semibold text-atelier-text">
                  <span>Total Amount</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-atelier-dark text-atelier-bg text-xs tracking-luxury uppercase font-semibold hover:bg-atelier-accent transition-colors flex items-center justify-center gap-2 shadow-md group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-atelier-text-secondary pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-atelier-accent" />
                <span>Encrypted Security · Doorstep Signature Verification</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
