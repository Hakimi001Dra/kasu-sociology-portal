import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        kasu: {
          green: '#1A4731',
          'green-mid': '#2D6E4A',
          'green-light': '#E8F2EC',
          gold: '#C8941A',
          'gold-light': '#F5E6C0',
        },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)'],
        inter: ['var(--font-inter)'],
        plex: ['var(--font-plex)'],
      },
    },
  },
  plugins: [],
}

export default config