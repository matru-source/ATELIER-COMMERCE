import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-none flex-shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`relative w-16 h-20 sm:w-20 sm:h-24 overflow-hidden border-2 transition-all flex-shrink-0 bg-stone-100 ${
              selectedIndex === idx
                ? 'border-atelier-text opacity-100 scale-100 shadow-sm'
                : 'border-transparent opacity-60 hover:opacity-100 scale-95'
            }`}
          >
            <img
              src={img}
              alt={`${productName} thumbnail ${idx + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </button>
        ))}
      </div>

      {/* Main Large Image */}
      <div
        className="relative flex-1 aspect-[3/4] bg-stone-100 overflow-hidden group select-none"
        data-cursor="ZOOM"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedIndex}
            src={images[selectedIndex] || images[0]}
            alt={`${productName} perspective ${selectedIndex + 1}`}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full object-cover object-center cursor-zoom-in"
            onClick={() => setIsZoomOpen(true)}
          />
        </AnimatePresence>

        {/* Counter Badge */}
        <span className="absolute top-4 left-4 text-[10px] tracking-widest font-mono uppercase bg-black/40 backdrop-blur-md text-white px-2.5 py-1">
          0{selectedIndex + 1} / 0{images.length}
        </span>

        {/* Arrow Navigation on Hover */}
        <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="p-2 rounded-full bg-white/80 hover:bg-white text-atelier-text pointer-events-auto shadow-md transition-all"
            aria-label="Previous view"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="p-2 rounded-full bg-white/80 hover:bg-white text-atelier-text pointer-events-auto shadow-md transition-all"
            aria-label="Next view"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom trigger icon */}
        <button
          onClick={() => setIsZoomOpen(true)}
          className="absolute bottom-4 right-4 p-2.5 bg-atelier-dark/80 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Enlarge image"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Fullscreen Zoom Modal */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsZoomOpen(false)}
          >
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-6 right-6 p-3 text-white hover:text-atelier-accent transition-colors"
              aria-label="Close zoom"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>

            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              src={images[selectedIndex] || images[0]}
              alt={productName}
              className="max-w-full max-h-[90vh] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
