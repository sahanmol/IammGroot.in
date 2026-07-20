/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          darkBg: '#090d16',      // Premium deep dark cyber blue
          darkCard: '#121b2d',    // Dark card background
          darkBorder: '#1e2d4a',  // Subtle deep border
          lightBg: '#f8fafc',     // Sleek slate-50 light background
          lightCard: '#ffffff',   // White light card
          lightBorder: '#e2e8f0', // Slate-200 border
          primary: '#6366f1',     // Indigo tech accent
          primaryHover: '#4f46e5',
          sponsored: '#d97706',   // Deep amber for sponsored content badge
          sponsoredBg: 'rgba(217, 119, 6, 0.08)',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 1.5s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
