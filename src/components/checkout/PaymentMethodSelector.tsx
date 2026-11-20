import React, { useState } from 'react';
import { CreditCard, QrCode, Banknote, ShieldCheck } from 'lucide-react';
import { PaymentMethodType, DeliveryMethod } from '../../types';

interface PaymentMethodSelectorProps {
  paymentMethod: PaymentMethodType;
  setPaymentMethod: (method: PaymentMethodType) => void;
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  shippingFee: number;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  paymentMethod,
  setPaymentMethod,
  deliveryMethod,
  setDeliveryMethod,
  shippingFee,
}) => {
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const formatCardNumber = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 16);
    const parts = cleaned.match(/[\s\S]{1,4}/g) || [];
    setCardNumber(parts.join(' '));
  };

  const formatExpiry = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 3) {
      setCardExpiry(`${cleaned.slice(0, 2)}/${cleaned.slice(2)}`);
    } else {
      setCardExpiry(cleaned);
    }
  };

  return (
    <div className="space-y-8">
      {/* Delivery Speed Selection */}
      <div className="space-y-4">
        <div className="border-b border-atelier-border pb-3">
          <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold block mb-1">
            Step 2
          </span>
          <h3 className="font-serif text-2xl text-atelier-text font-normal">
            Dispatch Method
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div
            onClick={() => setDeliveryMethod('standard')}
            className={`p-4 border cursor-pointer transition-all ${
              deliveryMethod === 'standard'
                ? 'border-atelier-dark bg-white shadow-sm ring-1 ring-atelier-dark'
                : 'border-atelier-border bg-atelier-bg hover:border-atelier-dark'
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-atelier-text">Standard White-Glove Transit</span>
              <span className="text-atelier-text font-medium">{shippingFee === 0 ? 'Free' : '₹500'}</span>
            </div>
            <p className="text-[11px] text-atelier-text-secondary leading-relaxed">
              3 to 5 business days. Insured delivery in bespoke linen garment covers.
            </p>
          </div>

          <div
            onClick={() => setDeliveryMethod('express')}
            className={`p-4 border cursor-pointer transition-all ${
              deliveryMethod === 'express'
                ? 'border-atelier-dark bg-white shadow-sm ring-1 ring-atelier-dark'
                : 'border-atelier-border bg-atelier-bg hover:border-atelier-dark'
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-atelier-text">Express Priority Courier</span>
              <span className="text-atelier-text font-medium">₹450</span>
            </div>
            <p className="text-[11px] text-atelier-text-secondary leading-relaxed">
              1 to 2 business days. Direct flight courier handling with real-time GPS link.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-4">
        <div className="border-b border-atelier-border pb-3">
          <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold block mb-1">
            Step 3
          </span>
          <h3 className="font-serif text-2xl text-atelier-text font-normal">
            Settlement Method
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-3 text-xs">
          {[
            { id: 'upi', label: 'UPI / QR', icon: QrCode },
            { id: 'card', label: 'Debit / Card', icon: CreditCard },
            { id: 'cod', label: 'Cash on Hand', icon: Banknote },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = paymentMethod === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setPaymentMethod(item.id as PaymentMethodType)}
                className={`p-3.5 border flex flex-col items-center justify-center gap-2 transition-all ${
                  isSelected
                    ? 'border-atelier-dark bg-white shadow-sm ring-1 ring-atelier-dark'
                    : 'border-atelier-border bg-atelier-bg hover:border-atelier-dark'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'text-atelier-dark' : 'text-atelier-text-secondary'}`} />
                <span className={`font-medium ${isSelected ? 'text-atelier-text font-semibold' : 'text-atelier-text-secondary'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Payment Details Interface */}
        <div className="p-5 border border-atelier-border bg-white mt-4">
          {paymentMethod === 'upi' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 bg-stone-100 border border-atelier-border p-1.5 flex items-center justify-center flex-shrink-0">
                  <div className="w-full h-full bg-atelier-dark flex flex-col items-center justify-center text-atelier-bg p-1">
                    <QrCode className="w-8 h-8 text-atelier-accent" />
                    <span className="text-[7px] tracking-wider uppercase mt-0.5">SCAN UPI</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <h5 className="font-serif text-sm text-atelier-text font-medium">Instant UPI Transfer</h5>
                  <p className="text-[11px] text-atelier-text-secondary leading-snug">
                    Scan with Google Pay, PhonePe, Paytm, or enter your VPA handle below.
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] tracking-luxury uppercase text-atelier-text-secondary font-medium">
                  Enter VPA / UPI ID
                </label>
                <input
                  type="text"
                  placeholder="username@okhdfcbank"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full p-2.5 border border-atelier-border text-xs focus:outline-none focus:border-atelier-text"
                />
              </div>
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="space-y-4 text-xs">
              {/* Elegant Credit Card Mockup */}
              <div className="w-full max-w-xs mx-auto p-4 bg-gradient-to-tr from-stone-900 to-stone-800 text-atelier-bg rounded-lg shadow-lg border border-stone-700/60 mb-4">
                <div className="flex justify-between items-start mb-6">
                  <span className="font-serif text-sm tracking-widest text-atelier-accent">ATELIER PRIVILEGE</span>
                  <span className="text-[10px] tracking-wider text-stone-400 uppercase">CHIP & PIN</span>
                </div>
                <div className="font-mono text-sm tracking-widest mb-4">
                  {cardNumber || '•••• •••• •••• ••••'}
                </div>
                <div className="flex justify-between items-end text-[10px]">
                  <div>
                    <span className="text-stone-400 block text-[8px] uppercase">Cardholder</span>
                    <span className="font-medium tracking-wide uppercase">{cardName || 'PATRON NAME'}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[8px] uppercase">Expires</span>
                    <span className="font-mono">{cardExpiry || 'MM/YY'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] tracking-luxury uppercase text-atelier-text-secondary font-medium">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="4111 2222 3333 4444"
                    value={cardNumber}
                    onChange={(e) => formatCardNumber(e.target.value)}
                    className="w-full p-2.5 border border-atelier-border text-xs focus:outline-none focus:border-atelier-text font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] tracking-luxury uppercase text-atelier-text-secondary font-medium">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Eleanor Vance"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full p-2.5 border border-atelier-border text-xs focus:outline-none focus:border-atelier-text"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] tracking-luxury uppercase text-atelier-text-secondary font-medium">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => formatExpiry(e.target.value)}
                      className="w-full p-2.5 border border-atelier-border text-xs focus:outline-none focus:border-atelier-text font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] tracking-luxury uppercase text-atelier-text-secondary font-medium">
                      Security CVV
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="•••"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                      className="w-full p-2.5 border border-atelier-border text-xs focus:outline-none focus:border-atelier-text font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'cod' && (
            <div className="text-xs space-y-2 text-atelier-text-secondary">
              <div className="flex items-center gap-2 text-atelier-text font-medium">
                <Banknote className="w-4 h-4 text-atelier-accent" />
                <span>Cash on Delivery Verification</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Payment is accepted upon courier arrival in exact cash or via mobile UPI QR scan upon inspection. An OTP verification is sent prior to delivery dispatch.
              </p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-atelier-border flex items-center gap-2 text-[10px] text-atelier-text-secondary">
            <ShieldCheck className="w-4 h-4 text-atelier-accent" />
            <span>End-to-end 256-bit encrypted checkout architecture. (Razorpay / Stripe abstraction ready)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
