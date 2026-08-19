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
        judiciary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#3949ab',
          800: '#1a237e',
          900: '#0d1442',
          950: '#060a24',
        },
        primary: {
          DEFAULT: '#1a237e',
          light: '#3949ab',
          dark: '#0d1442',
        },
        secondary: {
          DEFAULT: '#c62828',
          light: '#e53935',
          dark: '#b71c1c',
        },
        accent: {
          DEFAULT: '#f5c842',
          light: '#fdd835',
          dark: '#f9a825',
        },
        gold: {
          DEFAULT: '#d4af37',
          light: '#f5d76e',
          dark: '#aa8c2c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #0d1442 0%, #1a237e 50%, #c62828 100%)',
        'gradient-primary': 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
        'gradient-gold': 'linear-gradient(135deg, #d4af37 0%, #f5c842 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.9) 100%)',
        'gradient-dark-card': 'linear-gradient(135deg, rgba(13, 20, 66, 0.9) 0%, rgba(6, 10, 36, 0.9) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradientShift 15s ease infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'scan': 'scanLine 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' }
        }
      },
      boxShadow: {
        'glass': '0 20px 60px rgba(26, 35, 126, 0.1)',
        'glass-hover': '0 25px 70px rgba(26, 35, 126, 0.18)',
        'gold-glow': '0 0 25px rgba(245, 200, 66, 0.4)',
        'blue-glow': '0 0 30px rgba(57, 73, 171, 0.35)',
      }
    },
  },
  plugins: [],
}
