module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.svelte'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'deep-purple': '#1E132C',
        'purple': '#382358',
        'light-purple': '#D8BFFF',
        'orange': '#FF7D34',
        'green': '#CDFF8D',
      },
      fontFamily: {
        'chicago': 'Chicago',
        'anon': '"Anonymous Pro"',
        'quick': 'Quicksand',
        'noto': '"Noto Sans Display"',
      },
      gridTemplateColumns: {
        'nav': '20% 1fr 1fr 1fr 1fr 20%;',
        'wallet-nav': '20% 1fr 20%;',
      },
      animation: {
        font: 'font 2s infinite alternate',
      },
      keyframes: {
        font: {
          '0%': { 'font-variation-settings': 'wght 100' },
          '100%': { 'font-variation-settings': 'wght 900' }
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
