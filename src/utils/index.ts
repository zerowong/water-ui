export function inputValueToStr(
  arg: string | number | readonly string[] | undefined
) {
  if (typeof arg === 'string') {
    return arg
  }
  if (typeof arg === 'number') {
    return arg.toString()
  }
  if (arg instanceof Array) {
    return arg.join(',')
  }
  return ''
}
