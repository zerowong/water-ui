import React from 'react'
import classNames from 'classnames'
import { Transition } from '@headlessui/react'
import { LoadingIcon } from './icon'
import { ComponentIdentifier } from '../utils'
import type { Colors } from '../typings'

interface ButtonProps extends React.ComponentProps<'button'> {
  /**
   * 加载态，加载时按钮为`disabled`状态
   */
  loading?: boolean
  /**
   * 颜色
   */
  color?: Colors
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
   * 前置图标容器类名
   */
  iconWrapperClassName?: string
  /**
   * 前置图标容器样式
   */
  iconWrapperStyle?: React.CSSProperties
}

const colorMap = {
  'teal': {
    'bg': 'bg-teal-100',
    'text900': 'text-teal-900',
    'hoverBg': 'hover:bg-teal-200',
    'focusRing': 'focus:ring-teal-300',
    'text500': 'text-teal-500',
  },
  'green': {
    'bg': 'bg-green-100',
    'text900': 'text-green-900',
    'hoverBg': 'hover:bg-green-200',
    'focusRing': 'focus:ring-green-300',
    'text500': 'text-green-500',
  },
  'sky': {
    'bg': 'bg-sky-100',
    'text900': 'text-sky-900',
    'hoverBg': 'hover:bg-sky-200',
    'focusRing': 'focus:ring-sky-300',
    'text500': 'text-sky-500',
  },
  'blue': {
    'bg': 'bg-blue-100',
    'text900': 'text-blue-900',
    'hoverBg': 'hover:bg-blue-200',
    'focusRing': 'focus:ring-blue-300',
    'text500': 'text-blue-500',
  },
  'gray': {
    'bg': 'bg-gray-100',
    'text900': 'text-gray-900',
    'hoverBg': 'hover:bg-gray-200',
    'focusRing': 'focus:ring-gray-300',
    'text500': 'text-gray-500',
  },
  'red': {
    'bg': 'bg-red-100',
    'text900': 'text-red-900',
    'hoverBg': 'hover:bg-red-200',
    'focusRing': 'focus:ring-red-300',
    'text500': 'text-red-500',
  },
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
    iconWrapperClassName,
    iconWrapperStyle,
    ...rest
  } = props

  return (
    <button
      className={classNames(
        'disabled:cursor-not-allowed disabled:opacity-50 my-2 h-10',
        {
          'rounded-md px-4 shadow-sm transition duration-300 text-center': !(
            text || link
          ),
          // 文本、链接模式无背景色和文字颜色加深
          [`${colorMap[color].bg} ${colorMap[color].text900}`]: !(text || link),
          // 文本、链接模式在加载中、禁用时没有聚焦边框
          [`focus:ring-2 ${colorMap[color].hoverBg} ${colorMap[color].focusRing}`]:
            !(text || link) && !(loading || disabled),
          // 文本、链接模式颜色
          [colorMap[color].text500]: text || link,
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
            as="span"
            show={loading && !icon}
            enter="transition-all ease-out duration-300"
            enterFrom="transform-gpu opacity-0 scale-0 w-0"
            enterTo="transform-gpu opacity-100 scale-100 w-5"
            leave="transition-all ease-in duration-200"
            leaveFrom="transform-gpu opacity-100 scale-100 w-5"
            leaveTo="transform-gpu opacity-0 scale-0 w-0"
            className="inline-block align-baseline"
          >
            <LoadingIcon />
          </Transition>
          <span
            className={classNames('inline-block align-baseline', iconWrapperClassName)}
            style={iconWrapperStyle}
          >
            {icon && (loading ? <LoadingIcon /> : icon)}
          </span>
          {typeof children === 'string' ? (
            <span className="inline-block align-middle">{children}</span>
          ) : (
            children
          )}
        </>
      )}
    </button>
  )
}

Button.prototype.$$typeof = Symbol.for(ComponentIdentifier.Button)
