/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Exo 2"', 'sans-serif'],
      },
      colors: {
        'space-dark': '#0a0f1f',
        'space-blue': '#101a3a',
        'light-blue': '#8a9dc3',
        'brand-cyan': '#22d3ee',
        'brand-purple': '#c084fc',
        'brand-pink': '#ff79c6',
        'glass-border': 'rgba(138, 157, 195, 0.3)',
        'card-bg': 'rgba(16, 26, 58, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'subtle-pulse': 'subtlePulse 2.5s infinite cubic-bezier(0.4, 0, 0.6, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        subtlePulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(34, 211, 238, 0.3)' },
          '50%': { boxShadow: '0 0 25px 10px rgba(34, 211, 238, 0)' },
        }
      },
      backgroundImage: {
        'stars-pattern': "url('/src/assets/stars-bg.png')",
      },
      boxShadow: {
        'glow-cyan': '0 0 15px rgba(34, 211, 238, 0.4)',
        'glow-purple': '0 0 15px rgba(192, 132, 252, 0.4)',
      }
    },
  },
  plugins: [],
}
