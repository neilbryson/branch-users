module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '800px',
      md: '1200px',
      lg: '1600px',
      xl: '1920px',
      '2xl': '2400px',
    },
    fontFamily: {
      sans: ['Work Sans', 'sans-serif'],
      mono: ['ui-monospace', 'monospace'],
    },
  },
  plugins: [],
};
