module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.svelte'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'deep-purple': '#1E132C',
        'purple': '#382358',
        'orange': '#FF7D34',
        'green': '#CDFF8D',
      },
      fontFamily: {
        'chicago': 'Chicago',
        'anon': '"Anonymous Pro"',
      },
      gridTemplateColumns: {
        'nav': '20% 1fr 1fr 1fr 1fr 20%;',
        'wallet-nav': '20% 1fr 20%;',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
