import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black:  '#0A0A0A',
        forest: '#0E1F16',
        moss:   '#2F4A33',
        stone:  '#A89E8B',
        cream:  '#D6C7B0',
        ivory:  '#F6F2E9',
        gold:   '#D4AF37',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        inter:     ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
