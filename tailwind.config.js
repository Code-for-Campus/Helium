module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    colors: {
      primary: '#171c26',
      lightgray: '#FAFAFA',
      darkgray: '#050505',
      white: '#FFFFFF',
      black: '#000000',
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
}
