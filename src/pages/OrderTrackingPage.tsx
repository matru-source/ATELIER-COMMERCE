import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { Order } from '../types';

const STAGES = [
  { id: 1, title: 'Order Placed', desc: 'Acquisition authorized and recorded in Atelier archives.' },
  { id: 2, title: 'Atelier Inspection', desc: 'Hand inspection by atelier quality masters in Florence/Biella.' },
  { id: 3, title: 'Dispatched with Courier', desc: 'Securely packed in custom linen garment covers with tamper seals.' },
  { id: 4, title: 'Out for Delivery', desc: 'White-glove courier out for door-to-door presentation.' },
  { id: 5, title: 'Delivered', desc: 'Signed and delivered safely to client residence.' },
];

export const OrderTrackingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id') || 'ATL-849201';

  const [searchId, setSearchId] = useState(initialId);
  const [activeStage, setActiveStage] = useState(3); // Demo default to stage 3: Shipped
  const [orderData, setOrderData] = useState<Order | null>(() => {
    try {
      const history = JSON.parse(localStorage.getItem('atelier_orders') || '[]');
      const found = history.find((o: Order) => o.id === initialId);
      if (found) return found;
      const latest = localStorage.getItem('atelier_latest_order');
      if (latest) return JSON.parse(latest);
    } catch {}
    return null;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const history = JSON.parse(localStorage.getItem('atelier_orders') || '[]');
      const found = history.find((o: Order) => o.id.toLowerCase() === searchId.trim().toLowerCase());
      if (found) {
        setOrderData(found);
      }
    } catch {}
  };

  return (
    <div className="pt-28 pb-28 bg-atelier-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold block mb-2">
            White-Glove Logistics
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-atelier-text font-normal tracking-wide mb-4">
            TRACK YOUR ACQUISITION
          </h1>
          <p className="text-xs sm:text-sm text-atelier-text-secondary leading-relaxed font-light">
            Monitor real-time transit status, artisanal inspection stages, and estimated courier presentation.
          </p>
        </div>

        {/* Order Inquiry Input */}
        <div className="bg-white border border-atelier-border p-6 shadow-sm mb-10">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-atelier-accent absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Enter Order Number (e.g. ATL-849201)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-atelier-border text-xs uppercase tracking-wider focus:outline-none focus:border-atelier-text font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-atelier-dark text-atelier-bg text-xs tracking-luxury uppercase font-semibold hover:bg-atelier-accent transition-colors"
            >
              Locate Order
            </button>
          </form>

          {/* Interactive Stage Preview Switcher */}
          <div className="mt-4 pt-4 border-t border-atelier-border flex flex-wrap items-center justify-between text-[11px] text-atelier-text-secondary gap-2">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-atelier-accent" />
              Simulate Live Progression:
            </span>
            <div className="flex gap-1.5 flex-wrap">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveStage(s)}
                  className={`px-3 py-1 border text-[10px] uppercase tracking-wider transition-all duration-300 ${
                    activeStage === s
                      ? 'border-atelier-dark bg-atelier-dark text-atelier-bg font-semibold shadow-sm'
                      : 'border-atelier-border bg-stone-50 text-atelier-text hover:border-atelier-dark'
                  }`}
                >
                  Stage 0{s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tracking Timeline Card */}
        <div className="bg-white border border-atelier-border p-6 sm:p-10 shadow-sm space-y-10">
          {/* Top Status Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-atelier-border gap-4">
            <div>
              <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold block">
                Acquisition Reference
              </span>
              <h3 className="font-mono text-xl text-atelier-text font-semibold">
                {searchId || 'ATL-849201'}
              </h3>
              <p className="text-xs text-atelier-text-secondary mt-0.5">
                Carrier: <strong>BlueDart Luxury Express</strong> (Tracking: BD-92847192IN)
              </p>
            </div>

            <div className="sm:text-right">
              <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold block">
                Current Status
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeStage}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="font-serif text-lg text-emerald-800 font-medium block"
                >
                  {STAGES[activeStage - 1].title}
                </motion.span>
              </AnimatePresence>
              <p className="text-xs text-atelier-text-secondary mt-0.5">
                Est. Delivery: {orderData?.estimatedDeliveryDate || 'Within 48 hours'}
              </p>
            </div>
          </div>

          {/* 5-Stage Animated Timeline */}
          <div className="relative py-4">
            {/* Desktop Horizontal Line */}
            <div className="hidden md:block absolute top-9 left-12 right-12 h-0.5 bg-atelier-border z-0">
              <motion.div
                initial={false}
                animate={{ width: `${((activeStage - 1) / (STAGES.length - 1)) * 100}%` }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-atelier-accent"
              />
            </div>

            {/* Steps Container */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 relative z-10">
              {STAGES.map((stage) => {
                const isPassed = stage.id <= activeStage;
                const isCurrent = stage.id === activeStage;

                return (
                  <div key={stage.id} className="flex md:flex-col items-start md:items-center gap-4 md:text-center">
                    {/* Circle Indicator with Spring Reaction */}
                    <motion.div
                      animate={
                        isCurrent
                          ? { scale: [1, 1.12, 1], boxShadow: '0 0 0 6px rgba(161, 138, 107, 0.25)' }
                          : { scale: 1, boxShadow: '0 0 0 0px rgba(0,0,0,0)' }
                      }
                      transition={{ duration: 0.5 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-sm flex-shrink-0 transition-colors ${
                        isCurrent
                          ? 'bg-atelier-dark text-white ring-2 ring-atelier-accent'
                          : isPassed
                          ? 'bg-atelier-accent text-white'
                          : 'bg-atelier-bg border border-atelier-border text-atelier-text-secondary'
                      }`}
                    >
                      {isPassed && !isCurrent ? (
                        <CheckCircle2 className="w-5 h-5 stroke-[2]" />
                      ) : (
                        <span>0{stage.id}</span>
                      )}
                    </motion.div>

                    {/* Step Text */}
                    <div className="md:mt-3">
                      <h5 className={`font-serif text-sm font-medium ${isCurrent ? 'text-atelier-text font-semibold' : 'text-atelier-text/80'}`}>
                        {stage.title}
                      </h5>
                      <p className="text-[11px] text-atelier-text-secondary leading-snug mt-1 font-light">
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Courier Transit Activity Log */}
          <div className="pt-8 border-t border-atelier-border space-y-4">
            <h4 className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold">
              Live Transit Milestones
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex gap-4 items-start">
                <span className="font-mono text-[11px] text-atelier-text-secondary w-28 flex-shrink-0">
                  Today, 11:45 AM
                </span>
                <div>
                  <p className="font-medium text-atelier-text">Dispatched via Regional Air Cargo Hub</p>
                  <p className="text-atelier-text-secondary text-[11px]">En route to Mumbai Prime Delivery Hub</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="font-mono text-[11px] text-atelier-text-secondary w-28 flex-shrink-0">
                  Yesterday, 4:20 PM
                </span>
                <div>
                  <p className="font-medium text-atelier-text">Quality Inspection & Security Seals Affixed</p>
                  <p className="text-atelier-text-secondary text-[11px]">Artisanal packaging certified by Atelier Dispatch Desk</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="font-mono text-[11px] text-atelier-text-secondary w-28 flex-shrink-0">
                  Yesterday, 10:15 AM
                </span>
                <div>
                  <p className="font-medium text-atelier-text">Order Received & Archive Item Allocated</p>
                  <p className="text-atelier-text-secondary text-[11px]">Payment authorized and inventory reserved</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-atelier-bg border border-atelier-border flex items-center justify-between text-xs text-atelier-text-secondary">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-atelier-accent" />
              <span>Tamper-evident luxury wax seals intact</span>
            </div>
            <Link to="/contact" className="text-atelier-accent hover:underline">
              Contact Concierge →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
