import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sabbia: '#FAF8F5',
        terracotta: {
          50: '#FDF4F0',
          100: '#FBE8DF',
          200: '#F6D0BE',
          300: '#EFB196',
          400: '#E78D6A',
          500: '#E07A5F',
          600: '#C95A3E',
          700: '#A94732',
          800: '#8B3C2C',
          900: '#723528',
        },
        mare: {
          50: '#F0F7FA',
          100: '#DAEDF2',
          200: '#B8DBE6',
          300: '#89C1D4',
          400: '#5BA5BF',
          500: '#3B89A8',
          600: '#2C6D8E',
          700: '#1B4965',
          800: '#153B52',
          900: '#123146',
        },
        oro: '#D4A373',
        crema: '#F4E4CD',
        notte: '#1A1A2E',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
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
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
