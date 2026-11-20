/**
 * Format a number into Indian Rupee (INR) currency format: ₹28,500
 */
export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format date for luxury order presentation: 24 November 2026
 */
export const formatDate = (dateString?: string): string => {
  const date = dateString ? new Date(dateString) : new Date();
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

/**
 * Calculate estimated delivery window
 */
export const getEstimatedDelivery = (daysFromNow: number = 4): string => {
  const target = new Date();
  target.setDate(target.getDate() + daysFromNow);
  return target.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};
