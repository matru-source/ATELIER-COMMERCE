import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, category }) => {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  const apparelSizes = [
    { it: '38', fr: '34', uk: '6', us: '2', bustCm: '82', bustIn: '32.3', waistCm: '64', waistIn: '25.2', hipCm: '90', hipIn: '35.4' },
    { it: '40', fr: '36', uk: '8', us: '4', bustCm: '86', bustIn: '33.9', waistCm: '68', waistIn: '26.8', hipCm: '94', hipIn: '37.0' },
    { it: '42', fr: '38', uk: '10', us: '6', bustCm: '90', bustIn: '35.4', waistCm: '72', waistIn: '28.3', hipCm: '98', hipIn: '38.6' },
    { it: '44', fr: '40', uk: '12', us: '8', bustCm: '94', bustIn: '37.0', waistCm: '76', waistIn: '29.9', hipCm: '102', hipIn: '40.2' },
    { it: '46', fr: '42', uk: '14', us: '10', bustCm: '98', bustIn: '38.6', waistCm: '80', waistIn: '31.5', hipCm: '106', hipIn: '41.7' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-atelier-bg border border-atelier-border max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-atelier-text-secondary hover:text-atelier-text"
              aria-label="Close size guide"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-atelier-accent mb-1">
              <Ruler className="w-4 h-4" />
              <span className="text-[10px] tracking-widest-luxury uppercase font-semibold">Atelier Fit Scale</span>
            </div>
            <h3 className="font-serif text-2xl text-atelier-text font-normal mb-2">
              International Size Chart · {category}
            </h3>
            <p className="text-xs text-atelier-text-secondary mb-6 leading-relaxed">
              Our tailoring aligns with classic continental European sizing. For an oversized editorial drape, select your standard size. For a fitted contour, we advise taking one size down.
            </p>

            {/* Unit Toggle */}
            <div className="flex justify-end mb-4">
              <div className="inline-flex border border-atelier-border p-0.5 bg-atelier-bg-secondary text-xs">
                <button
                  onClick={() => setUnit('cm')}
                  className={`px-3 py-1 font-medium transition-colors ${
                    unit === 'cm' ? 'bg-atelier-dark text-atelier-bg' : 'text-atelier-text-secondary'
                  }`}
                >
                  Metric (cm)
                </button>
                <button
                  onClick={() => setUnit('in')}
                  className={`px-3 py-1 font-medium transition-colors ${
                    unit === 'in' ? 'bg-atelier-dark text-atelier-bg' : 'text-atelier-text-secondary'
                  }`}
                >
                  Imperial (in)
                </button>
              </div>
            </div>

            {/* Size Table */}
            <div className="overflow-x-auto border border-atelier-border bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-atelier-bg-secondary/70 border-b border-atelier-border text-atelier-text font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">IT</th>
                    <th className="p-3">FR</th>
                    <th className="p-3">UK</th>
                    <th className="p-3">US</th>
                    <th className="p-3">Bust ({unit})</th>
                    <th className="p-3">Waist ({unit})</th>
                    <th className="p-3">Hips ({unit})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-atelier-border/50 text-atelier-text">
                  {apparelSizes.map((row, idx) => (
                    <tr key={idx} className="hover:bg-atelier-bg/50">
                      <td className="p-3 font-medium">{row.it}</td>
                      <td className="p-3">{row.fr}</td>
                      <td className="p-3">{row.uk}</td>
                      <td className="p-3">{row.us}</td>
                      <td className="p-3">{unit === 'cm' ? row.bustCm : row.bustIn}</td>
                      <td className="p-3">{unit === 'cm' ? row.waistCm : row.waistIn}</td>
                      <td className="p-3">{unit === 'cm' ? row.hipCm : row.hipIn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-4 border-t border-atelier-border flex items-center justify-between text-[11px] text-atelier-text-secondary">
              <span>Need bespoke sizing advice?</span>
              <a href="mailto:clientcare@ateliercommerce.com" className="text-atelier-accent hover:underline font-medium">
                Inquire with Concierge →
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
