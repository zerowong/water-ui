const gen = require('./gen')

const colors = ['teal', 'green', 'sky', 'blue', 'gray', 'red']

const colorMap = {}

for (const color of colors) {
  colorMap[color] = {
    border: `border-${color}-500`,
    hoverBorder: `hover:border-${color}-500`,
  }
}

gen('./input-textarea-color-map.json', colorMap)
