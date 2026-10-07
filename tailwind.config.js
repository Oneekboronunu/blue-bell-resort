/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        resort: {
          primary: '#0B3C8C', // Deep Blue
          primaryLight: '#1B4F9B',
          primaryDark: '#072559',
          navy: '#061838',
          gold: '#C5A880',
          goldLight: '#DFCCAB',
          goldDark: '#9C7A4A',
          sand: '#FAF7F2',
          sandDark: '#F3EFE6',
          sandMuted: '#EAE4D9',
          cream: '#FCFAF7',
          charcoal: '#1A202C',
          muted: '#6B7280',
          accent: '#D4AF37',
        },
        brand: {
          50: '#f0f5ff',
          100: '#e5edff',
          200: '#cddbfe',
          300: '#b4c6fd',
          400: '#7e9bfb',
          500: '#3b6cf6',
          600: '#0B3C8C', // Blue Bell Primary
          700: '#093275',
          800: '#072559',
          900: '#061838',
          950: '#030c1d',
        },
      },
      fontFamily: {
        serif: [
          'Playfair Display',
          'Cormorant Garamond',
          'Georgia',
          'Cambria',
          'serif',
        ],
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Noto Sans Bengali"',
          '"Hind Siliguri"',
          'sans-serif',
        ],
        bengali: [
          '"Hind Siliguri"',
          '"Anek Bangla"',
          '"Noto Sans Bengali"',
          'sans-serif',
        ],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(11, 60, 140, 0.05)',
        card: '0 4px 20px -2px rgba(11, 60, 140, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 20px 35px -5px rgba(11, 60, 140, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        elevated: '0 25px 50px -12px rgba(11, 60, 140, 0.25)',
        gold: '0 4px 20px -2px rgba(197, 168, 128, 0.35)',
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '10px',
        'lg': '14px',
        'xl': '20px',
        '2xl': '28px',
      }
    },
  },
  plugins: [],
};
