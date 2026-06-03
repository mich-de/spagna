import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sabbia: '#fcf7ec',
        terracotta: {
          50: '#e8f9f5',
          100: '#c5f3e4',
          200: '#9aeac8',
          300: '#6adea9',
          400: '#3bd48d',
          500: '#13c892',
          600: '#0fa175',
          700: '#0b7c5a',
          800: '#085840',
          900: '#043628',
        },
        mare: {
          50: '#f0f5f6',
          100: '#dce8eb',
          200: '#b7d1d6',
          300: '#8db4be',
          400: '#658c96',
          500: '#4b6d76',
          600: '#3b565d',
          700: '#2a3d43',
          800: '#1c2a2e',
          900: '#0f3e4a',
        },
        oro: '#ffc14a',
        crema: '#dde9ed',
        notte: '#0f3e4a',
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
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
