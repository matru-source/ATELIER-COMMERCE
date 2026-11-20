import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-28 pb-28 bg-atelier-bg min-h-screen">
      {/* Hero Brand Editorial */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold block mb-3">
            The Atelier Manifesto
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-atelier-text font-normal tracking-wide mb-6">
            THE ART OF QUIET LIVING
          </h1>
          <p className="text-sm sm:text-base text-atelier-text-secondary leading-relaxed font-light max-w-2xl mx-auto">
            Atelier Commerce was founded on a singular conviction: true luxury does not shout. It whispers through architectural tailoring, tactile virgin fibres, and timeless material restraint.
          </p>
          <div className="w-12 h-[1px] bg-atelier-accent/50 mx-auto mt-8" />
        </div>

        {/* Large Editorial Hero Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-stone-200">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop"
            alt="Maison Atelier Campaign"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-8 left-8 text-white max-w-md">
            <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent block mb-1">
              Established 2026
            </span>
            <h3 className="font-serif text-2xl font-light">
              Crafted without compromise for the considered life.
            </h3>
          </div>
        </div>
      </section>

      {/* Chapter 1: The Three Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-atelier-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <div className="space-y-4">
            <span className="font-serif text-lg text-atelier-accent">01 / ARCHITECTURE</span>
            <h3 className="font-serif text-2xl text-atelier-text font-normal">
              Proportion Over Ornament
            </h3>
            <p className="text-xs sm:text-sm text-atelier-text-secondary leading-relaxed font-light">
              We design garments and home artifacts as three-dimensional volumes. Sharp peak lapels, intentional drape, forward pleats, and unlined double-face cashmere coats that move like architecture around the body.
            </p>
          </div>

          <div className="space-y-4">
            <span className="font-serif text-lg text-atelier-accent">02 / HERITAGE</span>
            <h3 className="font-serif text-2xl text-atelier-text font-normal">
              Historic Family Mills
            </h3>
            <p className="text-xs sm:text-sm text-atelier-text-secondary leading-relaxed font-light">
              We partner exclusively with multi-generational artisanal workshops: virgin wool spinning in Biella, vegetable-tanned saddlery in Tuscany, hand-hammered brass in Jaipur, and wood-fired ceramics in Kyoto.
            </p>
          </div>

          <div className="space-y-4">
            <span className="font-serif text-lg text-atelier-accent">03 / LONGEVITY</span>
            <h3 className="font-serif text-2xl text-atelier-text font-normal">
              Permanent Restraint
            </h3>
            <p className="text-xs sm:text-sm text-atelier-text-secondary leading-relaxed font-light">
              We reject the frantic churn of seasonal fashion calendars. Our catalog constitutes a permanent, evolving library where every piece is created to outlive fleeting micro-trends and deepen with age.
            </p>
          </div>
        </div>
      </section>

      {/* Split Section: The Materials */}
      <section className="py-20 bg-atelier-bg-secondary border-y border-atelier-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold">
                Pure Materiality
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-atelier-text font-normal leading-tight">
                VIRGIN FIBRES & GEOLOGICAL STONE
              </h2>
              <p className="text-xs sm:text-sm text-atelier-text-secondary leading-relaxed font-light">
                We believe the tactile experience of a garment precedes its visual appearance. By utilizing strictly natural, unadulterated fibres — 30-momme sandwashed mulberry silk, 15.2 micron inner Mongolian cashmere, and solid Roman travertine — we forge creations with genuine organic integrity.
              </p>
              <div className="space-y-2 pt-2 text-xs text-atelier-text">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-atelier-accent" />
                  <span>100% Certified Biodegradable Natural Fibres</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-atelier-accent" />
                  <span>Full-grain Vegetable-Tanned Tuscan Saddlery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-atelier-accent" />
                  <span>Natural Volcanic Ash & Roman Travertine</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[4/3] overflow-hidden bg-stone-300">
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop"
                alt="Travertine and natural textures"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Flagships & Showrooms */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold block mb-2">
          Global Presence
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-atelier-text font-normal mb-12">
          FLAGSHIP ATELIERS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left border border-atelier-border p-8 bg-white">
          <div>
            <h4 className="font-serif text-lg text-atelier-text font-medium">Mumbai</h4>
            <p className="text-xs text-atelier-text-secondary mt-1">
              42 Altamount Road, Cumballa Hill<br />
              Flagship Residence & Salon
            </p>
            <span className="text-[11px] text-atelier-accent mt-2 block">Daily 11am – 8pm</span>
          </div>

          <div>
            <h4 className="font-serif text-lg text-atelier-text font-medium">Paris</h4>
            <p className="text-xs text-atelier-text-secondary mt-1">
              18 Rue de Richelieu, 1er Arr.<br />
              European Archival Showroom
            </p>
            <span className="text-[11px] text-atelier-accent mt-2 block">Tue – Sun 10am – 7pm</span>
          </div>

          <div>
            <h4 className="font-serif text-lg text-atelier-text font-medium">Milan</h4>
            <p className="text-xs text-atelier-text-secondary mt-1">
              Via della Spiga 22, Quadrilatero<br />
              Tailoring & Leather Laboratory
            </p>
            <span className="text-[11px] text-atelier-accent mt-2 block">Mon – Sat 10am – 7:30pm</span>
          </div>

          <div>
            <h4 className="font-serif text-lg text-atelier-text font-medium">Tokyo</h4>
            <p className="text-xs text-atelier-text-secondary mt-1">
              5-7-22 Minami-Aoyama, Minato-ku<br />
              Ceramic & Lifestyle Sanctuary
            </p>
            <span className="text-[11px] text-atelier-accent mt-2 block">Wed – Mon 11am – 8pm</span>
          </div>
        </div>

        <div className="mt-12">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-atelier-dark text-atelier-bg text-xs tracking-luxury uppercase font-semibold hover:bg-atelier-accent transition-colors"
          >
            <span>Book Private VIP Viewing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
};
