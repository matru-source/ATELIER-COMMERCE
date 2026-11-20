import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedCollections } from '../components/home/FeaturedCollections';
import { NewArrivals } from '../components/home/NewArrivals';
import { BrandEditorial } from '../components/home/BrandEditorial';
import { ProductSpotlight } from '../components/home/ProductSpotlight';
import { BrandPhilosophy } from '../components/home/BrandPhilosophy';
import { NewsletterSection } from '../components/home/NewsletterSection';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedCollections />
      <NewArrivals />
      <BrandEditorial />
      <ProductSpotlight />
      <BrandPhilosophy />
      <NewsletterSection />
    </div>
  );
};
