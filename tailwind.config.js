module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    colors: {
      primary: '#CA3535',
      lightgray: '#BBBBBB',
      darkgray: '#444444',
      white: '#FFFFFF',
      black: '#000000',
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
}
