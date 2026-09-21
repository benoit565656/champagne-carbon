import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          950: '#060606',
          900: '#0A0A0A',
          850: '#0F0F10',
          800: '#141416',
          700: '#1C1C1F',
          600: '#2A2A2E',
          border: '#222225',
          light: '#38383E',
        },
        gold: {
          DEFAULT: '#C9A24B',
          light: '#E5C378',
          dark: '#9E7E36',
          glow: 'rgba(201, 162, 75, 0.25)',
        },
        manila: {
          wine: '#9E1B32',
          wineDark: '#6E1022',
          wineLight: '#C52946',
          charcoal: '#222529',
        },
        silver: {
          DEFAULT: '#E1E3E6',
          muted: '#8A8D93',
          dark: '#55585E',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Bodoni Moda', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: {
        luxury: '0.2em',
        widest: '0.25em',
        ultra: '0.35em',
      },
    },
  },
  plugins: [],
};

export default config;
