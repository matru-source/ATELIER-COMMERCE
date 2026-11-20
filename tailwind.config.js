/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        atelier: {
          bg: '#F7F5F0',
          'bg-secondary': '#EDEAE3',
          text: '#191919',
          'text-secondary': '#77746E',
          accent: '#A18A6B',
          'accent-hover': '#8C7658',
          border: '#DEDAD1',
          'border-light': '#E9E6DF',
          dark: '#171715',
          'dark-surface': '#20201D',
          'dark-border': '#2E2E2A',
          'dark-muted': '#A3A09A',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        'widest-luxury': '0.22em',
        'subtle-luxury': '0.08em',
      },
      aspectRatio: {
        'portrait': '3/4',
        'fashion': '4/5',
        'editorial': '16/10'
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
