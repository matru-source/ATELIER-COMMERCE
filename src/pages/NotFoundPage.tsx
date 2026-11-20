import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-36 pb-36 bg-atelier-bg min-h-screen flex items-center justify-center text-center px-4">
      <div className="max-w-md mx-auto space-y-6">
        <span className="text-[10px] tracking-[0.4em] uppercase text-atelier-accent font-semibold block">
          Error 404
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-atelier-text font-light tracking-wide">
          PAGE NOT FOUND
        </h1>
        <p className="text-xs sm:text-sm text-atelier-text-secondary leading-relaxed font-light">
          The archive or page you are seeking may have been renamed, retired, or temporarily relocated to private curation.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="px-8 py-3.5 bg-atelier-dark text-atelier-bg text-xs tracking-luxury uppercase font-semibold hover:bg-atelier-accent transition-colors flex items-center justify-center gap-2"
          >
            <span>Return to Sanctuary (Home)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/shop"
            className="px-8 py-3.5 border border-atelier-border text-atelier-text hover:border-atelier-text text-xs tracking-luxury uppercase font-medium transition-colors"
          >
            Explore Collections
          </Link>
        </div>
      </div>
    </div>
  );
};
