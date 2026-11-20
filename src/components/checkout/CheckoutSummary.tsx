import React, { useState } from 'react';
import { CartItem, Coupon } from '../../types';
import { formatPrice } from '../../utils/formatters';

interface CheckoutSummaryProps {
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  total: number;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (code: string) => { success: boolean; message: string };
  onRemoveCoupon: () => void;
}

export const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  items,
  subtotal,
  shippingFee,
  discountAmount,
  total,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = onApplyCoupon(couponCode);
    setMessage({ text: res.message, success: res.success });
    if (res.success) setCouponCode('');
  };

  return (
    <div className="bg-white border border-atelier-border p-6 space-y-6">
      <div className="border-b border-atelier-border pb-4">
        <h3 className="font-serif text-xl text-atelier-text font-normal">
          Order Summary ({items.length})
        </h3>
      </div>

      {/* Items list */}
      <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
        {items.map((item) => (
          <div
            key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`}
            className="flex gap-3 text-xs"
          >
            <img
              src={item.product.images[item.selectedColor.imageIndex] || item.product.images[0]}
              alt={item.product.name}
              className="w-14 h-18 object-cover flex-shrink-0 bg-stone-100"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h5 className="font-serif text-sm text-atelier-text font-medium line-clamp-1">
                  {item.product.name}
                </h5>
                <p className="text-[11px] text-atelier-text-secondary mt-0.5">
                  {item.selectedColor.name} · Size: {item.selectedSize} · Qty: {item.quantity}
                </p>
              </div>
              <span className="font-semibold text-atelier-text">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Coupon Engine */}
      <div className="pt-2 border-t border-atelier-border">
        {appliedCoupon ? (
          <div className="flex items-center justify-between p-2.5 bg-atelier-bg border border-atelier-border text-xs">
            <div>
              <span className="font-semibold text-atelier-text">{appliedCoupon.code}</span>
              <span className="text-emerald-700 ml-2">({appliedCoupon.discountPercent}% off applied)</span>
            </div>
            <button
              onClick={onRemoveCoupon}
              className="text-xs text-atelier-text-secondary hover:text-rose-600 underline uppercase"
            >
              Remove
            </button>
          </div>
        ) : (
          <form onSubmit={handleApply} className="space-y-1.5">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Voucher Code (ATELIER10)"
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
            {message && (
              <p className={`text-[11px] ${message.success ? 'text-emerald-700' : 'text-rose-600'}`}>
                {message.text}
              </p>
            )}
          </form>
        )}
      </div>

      {/* Calculations */}
      <div className="pt-2 border-t border-atelier-border space-y-2 text-xs">
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
          <span>White-Glove Shipping</span>
          <span>{shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}</span>
        </div>

        <div className="border-t border-atelier-border pt-3 flex justify-between text-base font-semibold text-atelier-text">
          <span>Final Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
};
