/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A115F',
        },
        secondary: {
          DEFAULT: '#FCDE50',
        },
      },
      width: {
        'screen-minus-375': 'calc(100vw - 375px)',
      },
      backgroundImage: {
        footer: "url('/images/footer-background.jpg')",
      },
    },
  },
  plugins: [],
};
