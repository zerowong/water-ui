import React, { useState } from 'react'
import classNames from 'classnames'
import { Transition } from '@headlessui/react'
import { Icon } from './icon'
import { inputValueToStr } from '../utils'

type TextAreaProps = JSX.IntrinsicElements['textarea'] & {
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

export function TextArea(props: TextAreaProps) {
  const {
    bordered = true,
    clearable = false,
    value,
    onChange,
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

  const [innerValue, setInnerValue] = useState(defaultValue)
  const handleValueChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
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
  const handleInputFocus: React.FocusEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setInputIsFocus(true)
    onFocus?.(e)
  }
  const handleInputBlur: React.FocusEventHandler<HTMLTextAreaElement> = (e) => {
    setInputIsFocus(false)
    onBlur?.(e)
  }

  const resetValue = () => {
    if (value === undefined || value === null) {
      setInnerValue('')
    }
    onClear?.()
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
          'hover:border-sky-500': bordered && !disabled,
          'border-sky-500': bordered && inputIsFocus,
        },
        wrapperClassName
      )}
      style={wrapperStyle}
      onMouseEnter={handleWrapperMouseEnter}
      onMouseLeave={handleWrapperMouseLeave}
    >
      <textarea
        className={classNames(
          'outline-none py-2 flex-grow disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400 transition duration-300',
          className
        )}
        value={value ?? innerValue}
        onChange={onChange ?? handleValueChange}
        disabled={disabled}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
      <Transition
        as="span"
        show={
          clearable &&
          inputValueToStr(value ?? innerValue).length > 0 &&
          wrapperHover &&
          !disabled
        }
        enter="transition ease-out duration-300"
        enterFrom="transform-gpu opacity-0 scale-0"
        enterTo="transform-gpu opacity-100 scale-100"
        leave="transition ease-in duration-200"
        leaveFrom="transform-gpu opacity-100 scale-100"
        leaveTo="transform-gpu opacity-0 scale-0"
        className="ml-2"
      >
        <Icon
          name="close-fill"
          className="text-gray-400 cursor-pointer hover:text-gray-500"
          onClick={resetValue}
        />
      </Transition>
    </div>
  )
}
