import React, { useState, createElement } from 'react'
import classNames from 'classnames'
import { Transition } from '@headlessui/react'
import { CloseFillIcon, EyeOpenIcon, EyeCloseIcon } from './icon'
import { inputValueToStr, ComponentIdentifier } from '../utils'
import type { Colors } from '../typings'

interface InputProps extends React.ComponentProps<'input'> {
  /**
   * 容器类名
   */
  wrapperClassName?: string
  /**
   * 容器样式
   */
  wrapperStyle?: React.CSSProperties
  /**
   * 是否有边框，默认`true`
   */
  bordered?: boolean
  /**
   * 边框颜色
   */
  borderColor?: Colors
  /**
   * 可以点击清除图标删除内容
   */
  clearable?: boolean
  /**
   * 输入框点击清空按钮时触发
   */
  onClear?: () => void
  /**
   * 内联模式
   */
  inline?: boolean
}

const colorMap = {
  'teal': { 'border': 'border-teal-500', 'hoverBorder': 'hover:border-teal-500' },
  'green': { 'border': 'border-green-500', 'hoverBorder': 'hover:border-green-500' },
  'sky': { 'border': 'border-sky-500', 'hoverBorder': 'hover:border-sky-500' },
  'blue': { 'border': 'border-blue-500', 'hoverBorder': 'hover:border-blue-500' },
  'gray': { 'border': 'border-gray-500', 'hoverBorder': 'hover:border-gray-500' },
  'red': { 'border': 'border-red-500', 'hoverBorder': 'hover:border-red-500' },
}

export function Input(props: InputProps) {
  const {
    bordered = true,
    clearable = false,
    borderColor = 'sky',
    value,
    onChange,
    type,
    defaultValue,
    inline,
    wrapperClassName,
    wrapperStyle,
    className,
    disabled,
    onFocus,
    onBlur,
    onClear,
    ...rest
  } = props

  const [innerValue, setInnerValue] = useState(defaultValue ?? '')
  const handleValueChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInnerValue(e.target.value)
  }

  const [wrapperHover, setWrapperHover] = useState(false)
  const handleWrapperMouseEnter = () => {
    setWrapperHover(true)
  }
  const handleWrapperMouseLeave = () => {
    setWrapperHover(false)
  }

  const [inputIsFocus, setInputIsFocus] = useState(false)
  const handleInputFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setInputIsFocus(true)
    onFocus?.(e)
  }
  const handleInputBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setInputIsFocus(false)
    onBlur?.(e)
  }

  const [innerType, setInnerType] = useState(type)

  const resetValue = () => {
    if (value === undefined || value === null) {
      setInnerValue('')
    }
    onClear?.()
  }

  const renderIcon = (type?: string) => {
    switch (type) {
      case 'password':
        return createElement(innerType === 'password' ? EyeCloseIcon : EyeOpenIcon, {
          className: 'text-gray-400 cursor-pointer hover:text-gray-500 text-lg ml-2 icon',
          onClick() {
            return setInnerType(innerType === 'password' ? 'text' : 'password')
          },
        })
      default:
        return (
          <Transition
            as="span"
            show={
              clearable &&
              inputValueToStr(value ?? innerValue).length > 0 &&
              wrapperHover &&
              !disabled
            }
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 scale-0"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-0"
            className="ml-2"
          >
            <CloseFillIcon
              className="text-gray-400 cursor-pointer hover:text-gray-500"
              onClick={resetValue}
            />
          </Transition>
        )
    }
  }

  return (
    <div
      className={classNames(
        'transition duration-300 inline-flex items-center px-3',
        {
          'border rounded': bordered,
          'w-full': !inline,
          'w-75': inline,
          'cursor-text': !disabled,
          'bg-gray-300': disabled,
          [colorMap[borderColor].hoverBorder]: bordered && !disabled,
          [colorMap[borderColor].border]: bordered && inputIsFocus,
        },
        wrapperClassName
      )}
      style={wrapperStyle}
      onMouseEnter={handleWrapperMouseEnter}
      onMouseLeave={handleWrapperMouseLeave}
    >
      <input
        className={classNames(
          'outline-none py-2 flex-grow disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400 transition duration-300',
          className
        )}
        value={value ?? innerValue}
        onChange={onChange ?? handleValueChange}
        type={innerType}
        disabled={disabled}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
      {renderIcon(type)}
    </div>
  )
}

Input.prototype.$$typeof = Symbol.for(ComponentIdentifier.Input)
