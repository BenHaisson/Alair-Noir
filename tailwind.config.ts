import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dark (hero, footer, booking)
        noir:      '#0A0A0A',
        charcoal:  '#111110',
        // Light sections
        parchment: '#FAF9F7',
        platinum:  '#F0EDE8',
        silver:    '#E8E4DC',
        // Text — light backgrounds
        graphite:  '#1C1A18',
        slate:     '#4A4540',
        stone:     '#8C8580',
        // Text — dark backgrounds
        ivory:     '#F6F2E9',
        cream:     '#D6C7B0',
        muted:     '#A89E8B',
        // Accent — gold treated as warm cream (never dominant)
        gold:      '#D6C7B0',
        // Legacy aliases kept for existing classes
        black:     '#0A0A0A',
        forest:    '#0E1F16',
        moss:      '#2F4A33',
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
