// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
      },
      keyframes: {
        glow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 0px #ffffff)' },
          '50%': { filter: 'drop-shadow(0 0 8px #ffffff)' },
        },
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
