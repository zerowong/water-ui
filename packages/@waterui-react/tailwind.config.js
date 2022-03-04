const content = ['./src/**/*.tsx']

if (process.env.NODE_ENV === 'development') {
  content.push('./playground/**/*.tsx', './playground/index.html')
}

module.exports = {
  content,
}
