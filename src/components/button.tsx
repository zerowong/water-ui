import React from 'react'
import classNames from 'classnames'
import { Transition } from '@headlessui/react'
import { Icon } from './icon'

type ButtonProps = JSX.IntrinsicElements['button'] & {
  /**
   * 加载态，加载时按钮为`disabled`状态
   */
  loading?: boolean
  /**
   * 颜色
   */
  color?: 'teal' | 'green' | 'sky' | 'blue' | 'gray' | 'red'
  /**
   * 图标，置于左侧
   */
  icon?: React.ReactNode
  /**
   * 适应容器宽度
   */
  block?: boolean
  /**
   * 文本模式，该模式下将只有`color`,`block`生效
   */
  text?: boolean
  /**
   * 链接模式，该模式下将只有`color`,`block`生效
   */
  link?: boolean
  /**
   * 容器类名
   */
  wrapperClassName?: string
  /**
   * 容器样式
   */
  wrapperStyle?: React.CSSProperties
}

const colorClassMap = {
  'teal': 'bg-teal-100 text-teal-900',
  'green': 'bg-green-100 text-green-900',
  'sky': 'bg-sky-100 text-sky-900',
  'blue': 'bg-blue-100 text-blue-900',
  'gray': 'bg-gray-100 text-gray-900',
  'red': 'bg-red-100 text-red-900',
}

const focusColorClassMap = {
  'teal': 'hover:bg-teal-200 focus:ring-teal-300',
  'green': 'hover:bg-green-200 focus:ring-green-300',
  'sky': 'hover:bg-sky-200 focus:ring-sky-300',
  'blue': 'hover:bg-blue-200 focus:ring-blue-300',
  'gray': 'hover:bg-gray-200 focus:ring-gray-300',
  'red': 'hover:bg-red-200 focus:ring-red-300',
}

const textColorClassMap = {
  'teal': 'text-teal-500',
  'green': 'text-green-500',
  'sky': 'text-sky-500',
  'blue': 'text-blue-500',
  'gray': 'text-gray-500',
  'red': 'text-red-500',
}

/**
 * 按钮
 */
export function Button(props: ButtonProps) {
  const {
    loading = false,
    children,
    className,
    color = 'sky',
    icon,
    block,
    text,
    link,
    disabled,
    wrapperClassName,
    wrapperStyle,
    ...rest
  } = props

  return (
    <button
      className={classNames(
        'disabled:cursor-not-allowed disabled:opacity-50 my-3',
        {
          'inline-flex justify-center items-center rounded-md px-4 py-2 shadow-sm transition duration-300 text-center':
            !(text || link),
          // 文本、链接模式无背景色和文字颜色加深
          [colorClassMap[color]]: !(text || link),
          // 文本、链接模式在加载中、禁用时没有聚焦边框
          [`focus:ring-2 ${focusColorClassMap[color]}`]:
            !(text || link) && !(loading || disabled),
          // 文本、链接模式颜色
          [textColorClassMap[color]]: text || link,
          'w-full': block,
          'hover:underline': link,
        },
        className
      )}
      disabled={loading || disabled}
      {...rest}
    >
      {text || link ? (
        children
      ) : (
        <>
          <Transition
            show={loading && !icon}
            enter="transition-all ease-out duration-300"
            enterFrom="transform-gpu opacity-0 scale-0 w-0"
            enterTo="transform-gpu opacity-100 scale-100 w-5"
            leave="transition-all ease-in duration-200"
            leaveFrom="transform-gpu opacity-100 scale-100 w-5"
            leaveTo="transform-gpu opacity-0 scale-0 w-0"
          >
            <Icon name="loading" className="animate-spin mr-1" />
          </Transition>
          <div className={wrapperClassName} style={wrapperStyle}>
            {icon && (
              <span className={classNames({ 'mr-1': children })}>
                {loading ? (
                  <Icon name="loading" className="animate-spin" />
                ) : (
                  icon
                )}
              </span>
            )}
            {children}
          </div>
        </>
      )}
    </button>
  )
}
