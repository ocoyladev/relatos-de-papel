/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B2C35',
          light: '#B54E59',
          dark: '#5E1D24',
        },
        secondary: {
          DEFAULT: '#D9A566',
          light: '#E5BE88',
          dark: '#B78542',
        },
        text: {
          DEFAULT: '#2D2926',
          light: '#595650',
        },
        background: '#F5F2ED',
        accent: '#496E8C',
        success: '#5B8C58',
        warning: '#E3B23C',
        error: '#D9534F',
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Open Sans', 'sans-serif'],
      },
      transitionDuration: {
        '400': '400ms',
      },
      spacing: {
        '128': '32rem',
      },
      minHeight: {
        'screen-without-header': 'calc(100vh - 64px)',
      },
      animation: {
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};