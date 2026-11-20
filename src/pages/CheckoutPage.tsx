import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { ArrowLeft, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ShippingAddress, DeliveryMethod, PaymentMethodType, Order } from '../types';
import { AddressForm } from '../components/checkout/AddressForm';
import { PaymentMethodSelector } from '../components/checkout/PaymentMethodSelector';
import { CheckoutSummary } from '../components/checkout/CheckoutSummary';
import { getEstimatedDelivery } from '../utils/formatters';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    subtotal,
    shippingFee,
    discountAmount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  });

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('upi');
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ShippingAddress, string>> = {};

    if (!address.fullName.trim()) errs.fullName = 'Full name is required.';
    if (!address.email.trim() || !address.email.includes('@')) {
      errs.email = 'Valid email is required for shipping updates.';
    }
    if (!address.phone.trim() || address.phone.length < 10) {
      errs.phone = 'Valid 10-digit mobile number required.';
    }
    if (!address.addressLine1.trim()) errs.addressLine1 = 'Address line is required.';
    if (!address.city.trim()) errs.city = 'City is required.';
    if (!address.state.trim()) errs.state = 'State / Province is required.';
    if (!address.postalCode.trim()) errs.postalCode = 'PIN / Postal code is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 180, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Calculate final shipping with deliveryMethod
    const finalDeliveryFee = deliveryMethod === 'express' ? shippingFee + 450 : shippingFee;
    const finalTotal = subtotal - discountAmount + finalDeliveryFee;
    const orderId = `ATL-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString(),
      items: [...cart],
      shippingAddress: { ...address },
      deliveryMethod,
      paymentMethod,
      subtotal,
      shippingFee: finalDeliveryFee,
      discount: discountAmount,
      couponCode: appliedCoupon?.code,
      total: finalTotal,
      status: 'Order Placed',
      estimatedDeliveryDate: getEstimatedDelivery(deliveryMethod === 'express' ? 2 : 4),
      trackingNumber: `BD-${Math.floor(10000000 + Math.random() * 90000000)}IN`,
      carrier: 'BlueDart Luxury Express',
    };

    setTimeout(() => {
      try {
        // Save order to history
        const existingOrders = JSON.parse(localStorage.getItem('atelier_orders') || '[]');
        localStorage.setItem('atelier_orders', JSON.stringify([newOrder, ...existingOrders]));
        localStorage.setItem('atelier_latest_order', JSON.stringify(newOrder));
      } catch (err) {
        console.error('Failed to store order:', err);
      }

      // Celebrate with confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#A18A6B', '#171715', '#EDEAE3', '#DEDAD1'],
        });
      } catch {}

      clearCart();
      setIsSubmitting(false);
      navigate(`/order-confirmation/${orderId}`);
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="pt-36 pb-32 text-center bg-atelier-bg min-h-screen">
        <h2 className="font-serif text-3xl text-atelier-text mb-4">No Items to Checkout</h2>
        <p className="text-xs text-atelier-text-secondary mb-6">
          Your shopping bag has no creations. Add pieces from the collection first.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-atelier-dark text-atelier-bg text-xs tracking-luxury uppercase font-medium hover:bg-atelier-accent transition-colors"
        >
          Explore Archive
        </Link>
      </div>
    );
  }

  const computedShipping = deliveryMethod === 'express' ? shippingFee + 450 : shippingFee;
  const computedTotal = subtotal - discountAmount + computedShipping;

  return (
    <div className="pt-28 pb-28 bg-atelier-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-atelier-border pb-6 mb-10 flex items-center justify-between">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-[10px] tracking-widest-luxury uppercase text-atelier-text-secondary hover:text-atelier-text transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Collection</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-atelier-text">
            <Lock className="w-3.5 h-3.5 text-atelier-accent" />
            <span className="font-semibold tracking-wide uppercase text-[10px]">Secure Encrypted Checkout</span>
          </div>
        </div>

        {/* Form and Summary */}
        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Client info, Delivery & Payment */}
            <div className="lg:col-span-7 space-y-10">
              <AddressForm
                address={address}
                setAddress={setAddress}
                errors={errors}
              />

              <PaymentMethodSelector
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                deliveryMethod={deliveryMethod}
                setDeliveryMethod={setDeliveryMethod}
                shippingFee={shippingFee}
              />
            </div>

            {/* Right Column: Order Summary & Placement */}
            <div className="lg:col-span-5 space-y-6">
              <div className="sticky top-28">
                <CheckoutSummary
                  items={cart}
                  subtotal={subtotal}
                  shippingFee={computedShipping}
                  discountAmount={discountAmount}
                  total={computedTotal}
                  appliedCoupon={appliedCoupon}
                  onApplyCoupon={applyCoupon}
                  onRemoveCoupon={removeCoupon}
                />

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-atelier-dark text-atelier-bg text-xs tracking-luxury uppercase font-semibold hover:bg-atelier-accent transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>Authorizing Acquisition...</span>
                    ) : (
                      <span>Confirm & Place Order</span>
                    )}
                  </button>

                  <p className="text-[10px] text-atelier-text-secondary text-center mt-3 leading-relaxed">
                    By clicking Confirm, you accept Atelier’s Terms of Acquisition and White-Glove Guarantee.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
