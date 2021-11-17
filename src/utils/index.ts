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

/**
 * 组件标识
 */
export const ComponentIdentifier = {
  Form: 'water-ui/form',
  FormItem: 'water-ui/form-item',
  Button: 'water-ui/button',
  Input: 'water-ui/input',
  TextArea: 'water-ui/textarea',
  Dialog: 'water-ui/dialog',
}

export const heroiconSolid = 'w-5 h-5 overflow-hidden inline-block'
export const heroiconOutline = 'w-6 h-6 overflow-hidden inline-block'
