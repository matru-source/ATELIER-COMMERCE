import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Truck, ArrowRight, Printer } from 'lucide-react';
import { Order } from '../types';
import { formatPrice, formatDate } from '../utils/formatters';

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const latest = localStorage.getItem('atelier_latest_order');
      if (latest) {
        const parsed = JSON.parse(latest);
        if (parsed.id === orderId || !orderId) {
          setOrder(parsed);
          return;
        }
      }
      const history = JSON.parse(localStorage.getItem('atelier_orders') || '[]');
      const found = history.find((o: Order) => o.id === orderId);
      if (found) setOrder(found);
    } catch (e) {
      console.error(e);
    }
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-28 pb-28 bg-atelier-bg min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Animated Checkmark and Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            className="w-16 h-16 rounded-full bg-atelier-accent/20 text-atelier-accent mx-auto flex items-center justify-center mb-4"
          >
            <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
          </motion.div>

          <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold block mb-1">
            Acquisition Confirmed
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-atelier-text font-normal tracking-wide">
            THANK YOU FOR YOUR PATRONAGE
          </h1>
          <p className="text-xs sm:text-sm text-atelier-text-secondary mt-2">
            Order Reference: <strong className="text-atelier-text font-mono font-semibold">{orderId || order?.id || 'ATL-849201'}</strong>
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white border border-atelier-border p-6 sm:p-10 shadow-sm space-y-8">
          {/* Order Header Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-atelier-border gap-4 text-xs">
            <div>
              <span className="text-atelier-text-secondary block">Date of Acquisition</span>
              <span className="font-medium text-atelier-text">{formatDate(order?.date)}</span>
            </div>
            <div>
              <span className="text-atelier-text-secondary block">Estimated White-Glove Arrival</span>
              <span className="font-medium text-emerald-800 font-serif text-sm">
                {order?.estimatedDeliveryDate || 'Within 3 to 4 business days'}
              </span>
            </div>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 text-atelier-text-secondary hover:text-atelier-text underline uppercase text-[11px]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
          </div>

          {/* Purchased Items List */}
          <div className="space-y-4">
            <h4 className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold">
              Selected Creations
            </h4>
            <div className="divide-y divide-atelier-border/60">
              {order?.items && order.items.length > 0 ? (
                order.items.map((item, idx) => (
                  <div key={idx} className="py-4 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.images[item.selectedColor.imageIndex] || item.product.images[0]}
                        alt={item.product.name}
                        className="w-14 h-18 object-cover bg-stone-100 flex-shrink-0"
                      />
                      <div>
                        <h5 className="font-serif text-sm text-atelier-text font-medium">{item.product.name}</h5>
                        <p className="text-[11px] text-atelier-text-secondary mt-0.5">
                          {item.selectedColor.name} · Size: {item.selectedSize} · Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-atelier-text">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-4 text-xs text-atelier-text-secondary">
                  Bouclé Wool Peak Lapel Coat (Onyx Black · Size 38)
                </div>
              )}
            </div>
          </div>

          {/* Destination & Payment Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-atelier-border text-xs">
            <div>
              <h5 className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold mb-2">
                Shipping Destination
              </h5>
              <p className="font-medium text-atelier-text">{order?.shippingAddress.fullName || 'Eleanor Vance'}</p>
              <p className="text-atelier-text-secondary mt-0.5">
                {order?.shippingAddress.addressLine1 || '42 Altamount Road, Cumballa Hill'}
              </p>
              <p className="text-atelier-text-secondary">
                {order?.shippingAddress.city || 'Mumbai'}, {order?.shippingAddress.state || 'Maharashtra'} - {order?.shippingAddress.postalCode || '400026'}
              </p>
              <p className="text-atelier-text-secondary mt-1">
                {order?.shippingAddress.email || 'patron@ateliercommerce.com'}
              </p>
            </div>

            <div>
              <h5 className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold mb-2">
                Financial Summary
              </h5>
              <div className="space-y-1.5 text-atelier-text-secondary">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-atelier-text font-medium">{formatPrice(order?.subtotal || 68500)}</span>
                </div>
                {order?.discount && order.discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Privilege Voucher:</span>
                    <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>White-Glove Delivery:</span>
                  <span>{order?.shippingFee === 0 ? 'Complimentary' : formatPrice(order?.shippingFee || 0)}</span>
                </div>
                <div className="flex justify-between border-t border-atelier-border pt-1.5 text-sm font-semibold text-atelier-text">
                  <span>Total Settled:</span>
                  <span>{formatPrice(order?.total || 68500)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Tracking Link Banner */}
          <div className="p-4 bg-atelier-bg-secondary flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-atelier-accent flex-shrink-0" />
              <span className="text-atelier-text">
                Insured Carrier: <strong>BlueDart Luxury Express</strong> ({order?.trackingNumber || 'BD-84920124IN'})
              </span>
            </div>
            <Link
              to={`/track-order?id=${orderId || order?.id || 'ATL-849201'}`}
              className="text-atelier-accent hover:underline font-semibold flex items-center gap-1"
            >
              <span>Track Live Timeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom Navigation CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/shop"
            className="w-full sm:w-auto px-8 py-3.5 bg-atelier-dark text-atelier-bg text-xs tracking-luxury uppercase font-semibold hover:bg-atelier-accent transition-colors text-center"
          >
            Continue Discovering Archive
          </Link>
          <Link
            to={`/track-order?id=${orderId || order?.id || 'ATL-849201'}`}
            className="w-full sm:w-auto px-8 py-3.5 border border-atelier-text text-atelier-text hover:bg-atelier-bg-secondary text-xs tracking-luxury uppercase font-medium transition-colors text-center"
          >
            Track This Acquisition
          </Link>
        </div>
      </div>
    </div>
  );
};
