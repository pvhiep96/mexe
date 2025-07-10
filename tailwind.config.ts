module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '475px', // Optional: Add extra small breakpoint
      },
      colors: {
        primary: '#2563eb', // Customize blue-500
      },
    },
  },
  plugins: [],
};
