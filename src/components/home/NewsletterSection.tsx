import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setError('Please provide a valid email address.');
      return;
    }

    setIsSuccess(true);
  };

  return (
    <section className="py-24 sm:py-32 bg-atelier-bg border-t border-atelier-border text-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold block mb-3">
          Quiet Correspondence
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-atelier-text font-normal tracking-wide mb-4">
          A NOTE FROM ATELIER.
        </h2>
        <p className="text-xs sm:text-sm text-atelier-text-secondary leading-relaxed mb-10 max-w-lg mx-auto font-light">
          Be the first to discover new collections, thoughtful stories, and exclusive releases. Delivered with considered restraint.
        </p>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 bg-atelier-bg-secondary border border-atelier-accent/40 max-w-md mx-auto"
            >
              <div className="w-10 h-10 rounded-full bg-atelier-accent/15 text-atelier-accent mx-auto flex items-center justify-center mb-3">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg text-atelier-text mb-1">Welcome to the Atelier Circle</h4>
              <p className="text-xs text-atelier-text-secondary leading-relaxed">
                Thank you for your patronage. Our next edition will arrive softly in your inbox.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
              <div className="flex border-b-2 border-atelier-text focus-within:border-atelier-accent transition-colors pb-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 bg-transparent text-sm text-atelier-text placeholder-atelier-text-secondary/60 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-atelier-dark text-atelier-bg text-xs tracking-luxury uppercase font-semibold hover:bg-atelier-accent transition-colors flex items-center gap-1.5 flex-shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {error && (
                <p className="text-xs text-rose-600 text-left pt-1 font-medium">{error}</p>
              )}

              <p className="text-[10px] text-atelier-text-secondary/80 text-left pt-1">
                By subscribing, you confirm you have read and accepted our Privacy & Client Terms.
              </p>
            </form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
