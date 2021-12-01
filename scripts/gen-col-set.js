const gen = require('./gen')

const colSet = [
  {
    start: '',
    end: '',
  },
]

for (let i = 1; i < 25; i++) {
  colSet.push({
    start: i > 13 ? `col-start-[${i}]` : `col-start-${i}`,
    end: i > 13 ? `col-end-[${i}]` : `col-end-${i}`,
  })
}

gen('./col-set.json', colSet)
