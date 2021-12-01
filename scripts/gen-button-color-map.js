const gen = require('./gen')

const colors = ['teal', 'green', 'sky', 'blue', 'gray', 'red']

const colorMap = {}

for (const color of colors) {
  colorMap[color] = {
    bg: `bg-${color}-100`,
    text900: `text-${color}-900`,
    hoverBg: `hover:bg-${color}-200`,
    focusRing: `focus:ring-${color}-300`,
    text500: `text-${color}-500`,
  }
}

gen('./button-color-map.json', colorMap)
