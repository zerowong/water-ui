const colors = require('tailwindcss/colors')

const purge = ['./src/**/*.tsx']

if (process.env.NODE_ENV === 'development') {
  purge.push('./playground/**/*.tsx', './playground/index.html')
}

module.exports = {
  mode: 'jit',
  purge,
  darkMode: 'media',
  theme: {
    colors: {
      teal: colors.teal,
      green: colors.green,
      sky: colors.sky,
      blue: colors.blue,
      gray: colors.gray,
      white: colors.white,
      black: colors.black,
      red: colors.red,
    },
  },
}
