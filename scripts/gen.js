const fs = require('fs')

/**
 * @param {string} path
 * @param {any} data
 */
function gen(path, data) {
  fs.writeFile(path, JSON.stringify(data), (err) => {
    if (err) {
      return console.error(err)
    }
    console.log(`write ${path} successfully`)
  })
}

module.exports = gen
