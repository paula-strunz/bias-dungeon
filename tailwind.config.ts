import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dungeon: {
          bg: '#1a1a2e',
          ink: '#0f0f1a',
          parchment: '#f0e6d3',
          parchmentDark: '#d8ccb1',
        },
        avatar: {
          explorer: '#ef4444',
          spark: '#eab308',
          guardian: '#22c55e',
          strategist: '#3b82f6',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        pixelSoft: ['VT323', '"Press Start 2P"', 'monospace'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
