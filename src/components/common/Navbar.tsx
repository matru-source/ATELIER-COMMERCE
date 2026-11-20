import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useSearch } from '../../context/SearchContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { setIsSearchOpen } = useSearch();

  const isHome = location.pathname === '/';

  // Track scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut: Cmd+K / Ctrl+K opens search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'SHOP', path: '/shop' },
    { label: 'COLLECTIONS', path: '/collections' },
    { label: 'NEW ARRIVALS', path: '/shop?filter=new' },
    { label: 'OUR STORY', path: '/about' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled
            ? 'bg-atelier-bg/95 backdrop-blur-md py-3.5 border-b border-atelier-border shadow-[0_4px_24px_rgba(0,0,0,0.03)]'
            : isHome
            ? 'bg-gradient-to-b from-black/50 via-black/20 to-transparent text-white py-6'
            : 'bg-atelier-bg py-5 border-b border-atelier-border'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo on Left */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              <Menu className={`w-5 h-5 ${!isScrolled && isHome ? 'text-white' : 'text-atelier-text'}`} />
            </button>

            <Link to="/" className="group flex flex-col items-start" data-cursor="ATELIER">
              <span className={`font-serif text-2xl sm:text-3xl tracking-widest-luxury font-light transition-colors duration-500 ${
                !isScrolled && isHome ? 'text-white' : 'text-atelier-text'
              }`}>
                ATELIER
              </span>
              <span className={`text-[8px] tracking-[0.35em] font-sans -mt-1 transition-colors duration-500 ${
                !isScrolled && isHome ? 'text-white/80' : 'text-atelier-text-secondary'
              }`}>
                COMMERCE
              </span>
            </Link>
          </div>

          {/* Navigation Links in Center (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path.includes('?') && location.search.includes('new'));
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`text-[11px] tracking-widest-luxury font-medium transition-all relative py-1.5 group ${
                    !isScrolled && isHome
                      ? 'text-white/90 hover:text-white'
                      : isActive
                      ? 'text-atelier-text font-semibold'
                      : 'text-atelier-text/80 hover:text-atelier-text'
                  }`}
                >
                  <span>{link.label}</span>

                  {/* Active Indicator Line */}
                  {isActive ? (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className={`absolute bottom-0 left-0 right-0 h-[1.5px] ${
                        !isScrolled && isHome ? 'bg-white' : 'bg-atelier-accent'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                        !isScrolled && isHome ? 'bg-white/60' : 'bg-atelier-accent/60'
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons on Right */}
          <div className="flex items-center space-x-5 sm:space-x-6">
            {/* Search with keyboard shortcut pill */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-1.5 transition-all flex items-center gap-1.5 focus:outline-none ${
                !isScrolled && isHome ? 'text-white hover:text-white/70' : 'text-atelier-text hover:text-atelier-accent'
              }`}
              title="Search catalogue (Ctrl+K / ⌘K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.75]" />
              <span className={`text-[9px] font-mono px-1.5 py-0.5 border rounded hidden xl:inline-block ${
                !isScrolled && isHome
                  ? 'border-white/30 text-white/70'
                  : 'border-atelier-border text-atelier-text-secondary'
              }`}>
                ⌘K
              </span>
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className={`p-1.5 transition-colors relative focus:outline-none ${
                !isScrolled && isHome ? 'text-white hover:text-white/70' : 'text-atelier-text hover:text-atelier-accent'
              }`}
              title="Saved creations"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.75]" />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.25, 1] }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="absolute -top-1 -right-1 bg-atelier-accent text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium shadow-sm"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </Link>

            {/* Cart Icon & Count */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`p-1.5 transition-colors relative focus:outline-none ${
                !isScrolled && isHome ? 'text-white hover:text-white/70' : 'text-atelier-text hover:text-atelier-accent'
              }`}
              title="Atelier shopping bag"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.75]" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.25, 1] }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="absolute -top-1 -right-1 bg-atelier-dark text-atelier-bg text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium shadow-sm border border-white/20"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Luxury Mobile Menu with Masked Reveals */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 bg-atelier-dark text-atelier-bg flex flex-col justify-between p-6 sm:p-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-atelier-dark-border pb-6">
              <div>
                <span className="font-serif text-2xl tracking-widest-luxury text-atelier-bg">ATELIER</span>
                <span className="block text-[8px] tracking-[0.3em] text-atelier-dark-muted">COMMERCE</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-atelier-bg/80 hover:text-white focus:outline-none rounded-full hover:bg-atelier-dark-surface transition-colors"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>

            {/* Menu Links with Staggered Slide */}
            <nav className="my-auto py-8 space-y-6">
              {navLinks.map((link, idx) => (
                <div key={link.label} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ delay: 0.12 + idx * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center justify-between text-3xl sm:text-4xl font-serif tracking-wide hover:text-atelier-accent transition-colors"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all text-atelier-accent" />
                    </Link>
                  </motion.div>
                </div>
              ))}

              <div className="pt-6 border-t border-atelier-dark-border space-y-4">
                <Link
                  to="/track-order"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-xs tracking-luxury uppercase text-atelier-dark-muted hover:text-white transition-colors"
                >
                  Track Atelier Acquisition →
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-xs tracking-luxury uppercase text-atelier-dark-muted hover:text-white transition-colors"
                >
                  Client Concierge & Flagship Salons →
                </Link>
              </div>
            </nav>

            {/* Footer Details */}
            <div className="border-t border-atelier-dark-border pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-atelier-dark-muted gap-4">
              <p>MUMBAI · MILAN · PARIS · TOKYO</p>
              <p className="text-[11px] font-sans">COMPLIMENTARY SHIPPING ABOVE ₹5,000</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
