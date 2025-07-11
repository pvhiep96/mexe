// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './app/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '475px', // optional
      },
      colors: {
        primary: '#2563eb',
        goldenrod: '#fcde50',
      },
    },
  },
  plugins: [],
};
export default config;
