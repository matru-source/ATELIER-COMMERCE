import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ShieldCheck, RefreshCw, Award, Compass } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-atelier-dark text-atelier-bg pt-16 pb-12 border-t border-atelier-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Core Promises */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-14 border-b border-atelier-dark-border/80">
          <div className="flex items-start gap-3">
            <Compass className="w-5 h-5 text-atelier-accent flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-serif text-sm tracking-wide text-white">Considered Design</h5>
              <p className="text-[11px] text-atelier-dark-muted mt-1 leading-relaxed">
                Intentional silhouettes, quiet proportions, and timeless longevity.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-atelier-accent flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-serif text-sm tracking-wide text-white">Italian Craftsmanship</h5>
              <p className="text-[11px] text-atelier-dark-muted mt-1 leading-relaxed">
                Hand-finished in heritage workshops across Tuscany, Biella, and Civitanova.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-atelier-accent flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-serif text-sm tracking-wide text-white">White-Glove Delivery</h5>
              <p className="text-[11px] text-atelier-dark-muted mt-1 leading-relaxed">
                Complimentary luxury insured delivery on all acquisitions above ₹5,000.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 text-atelier-accent flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-serif text-sm tracking-wide text-white">Effortless Returns</h5>
              <p className="text-[11px] text-atelier-dark-muted mt-1 leading-relaxed">
                30-day complimentary door-to-door concierge returns & exchanges.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-14 border-b border-atelier-dark-border/80">
          {/* Brand Intro */}
          <div className="md:col-span-4 space-y-4">
            <div>
              <span className="font-serif text-3xl tracking-widest-luxury font-light text-white">ATELIER</span>
              <span className="block text-[8px] tracking-[0.35em] text-atelier-accent font-sans mt-0.5">COMMERCE</span>
            </div>
            <p className="text-xs text-atelier-dark-muted leading-relaxed max-w-sm">
              Thoughtfully curated essentials for a life of quiet sophistication. Bridging timeless Italian tailoring, full-grain saddlery, and monolithic interior artifacts.
            </p>
            <div className="text-xs text-atelier-dark-muted pt-2 space-y-1">
              <p>Maison Atelier · Flagship Atelier: 42 Altamount Road, Mumbai</p>
              <p>Concierge: clientcare@ateliercommerce.com</p>
            </div>
          </div>

          {/* Shop Links */}
          <div className="md:col-span-2 space-y-3">
            <h6 className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold">
              The Collection
            </h6>
            <ul className="space-y-2 text-xs text-atelier-dark-muted">
              <li><Link to="/shop?category=Clothing" className="hover:text-white transition-colors">Architectural Tailoring</Link></li>
              <li><Link to="/shop?category=Bags" className="hover:text-white transition-colors">Saddlery & Leather</Link></li>
              <li><Link to="/shop?category=Footwear" className="hover:text-white transition-colors">Sculptural Footwear</Link></li>
              <li><Link to="/shop?category=Accessories" className="hover:text-white transition-colors">Mongolian Cashmere</Link></li>
              <li><Link to="/shop?category=Home Objects" className="hover:text-white transition-colors">Travertine Artifacts</Link></li>
              <li><Link to="/collections" className="hover:text-white transition-colors">All Curations</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="md:col-span-2 space-y-3">
            <h6 className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold">
              Client Care
            </h6>
            <ul className="space-y-2 text-xs text-atelier-dark-muted">
              <li><Link to="/track-order" className="hover:text-white transition-colors">Track Acquisition</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Private Styling Appointment</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Our Philosophy & Mills</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Boutique Directory</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition-colors">Saved Creations</Link></li>
            </ul>
          </div>

          {/* Newsletter Newsletter */}
          <div className="md:col-span-4 space-y-4">
            <h6 className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold">
              A Note From Atelier
            </h6>
            <p className="text-xs text-atelier-dark-muted leading-relaxed">
              Be the first to discover new editions, private viewings, and thoughtful essays on considered design.
            </p>
            {isSubscribed ? (
              <div className="p-3 bg-atelier-dark-surface border border-atelier-accent/40 text-xs text-atelier-bg flex items-center gap-2">
                <Check className="w-4 h-4 text-atelier-accent" />
                <span>You are now included in our private correspondence.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex border-b border-atelier-dark-border focus-within:border-atelier-accent transition-colors">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full py-2.5 bg-transparent text-xs text-white placeholder-atelier-dark-muted focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="p-2 text-atelier-accent hover:text-white transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[10px] text-atelier-dark-muted block">
                  By subscribing you agree to our quiet privacy standards. No frequent spam.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-atelier-dark-muted gap-4">
          <div className="flex items-center gap-6 text-[11px]">
            <span>© {new Date().getFullYear()} ATELIER COMMERCE Inc. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Crafted for the considered life.</span>
          </div>

          {/* Supported Payments */}
          <div className="flex items-center gap-3 text-[10px] tracking-wider uppercase text-atelier-dark-muted">
            <span className="px-2 py-1 bg-atelier-dark-surface border border-atelier-dark-border">UPI</span>
            <span className="px-2 py-1 bg-atelier-dark-surface border border-atelier-dark-border">VISA</span>
            <span className="px-2 py-1 bg-atelier-dark-surface border border-atelier-dark-border">MASTERCARD</span>
            <span className="px-2 py-1 bg-atelier-dark-surface border border-atelier-dark-border">AMEX</span>
            <span className="px-2 py-1 bg-atelier-dark-surface border border-atelier-dark-border">APPLE PAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
