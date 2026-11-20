import { Variants } from 'framer-motion';

// Refined luxury cubic bezier curves
export const luxuryEasing = [0.22, 1, 0.36, 1] as const;
export const editorialEasing = [0.16, 1, 0.3, 1] as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.85, ease: editorialEasing } 
  },
  exit: { opacity: 0, transition: { duration: 0.35 } }
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.9, ease: luxuryEasing } 
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.35 } }
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: luxuryEasing } 
  }
};

// Masked text reveal: parent container with overflow:hidden and children rising from y: 100%
export const maskedTextContainer = (stagger: number = 0.08, delay: number = 0.1): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    }
  }
});

export const maskedTextItem: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  }
};

export const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    }
  }
});

export const imageReveal: Variants = {
  hidden: { scale: 1.15, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    transition: { duration: 1.5, ease: editorialEasing } 
  }
};

export const slideInRight: Variants = {
  hidden: { x: '100%', opacity: 0.8 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.55, ease: [0.32, 0.72, 0, 1] } 
  },
  exit: { 
    x: '100%', 
    opacity: 0.8,
    transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } 
  }
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.75, ease: luxuryEasing } 
  },
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.35 } }
};

export const cardHover = {
  rest: { y: 0, transition: { duration: 0.4, ease: luxuryEasing } },
  hover: { y: -6, transition: { duration: 0.4, ease: luxuryEasing } }
};
