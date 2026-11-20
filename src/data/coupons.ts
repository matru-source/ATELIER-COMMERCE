import { Coupon } from '../types';

export const COUPONS: Coupon[] = [
  {
    code: 'ATELIER10',
    discountPercent: 10,
    description: 'Privilege 10% reduction on your entire atelier selection.',
    minSpend: 0,
  },
  {
    code: 'WELCOME15',
    discountPercent: 15,
    description: 'Welcome tier 15% reduction for our considered patrons.',
    minSpend: 5000,
  },
  {
    code: 'ARCHIVE20',
    discountPercent: 20,
    description: 'Special seasonal 20% archival discovery reduction.',
    minSpend: 15000,
  }
];
