import React from 'react'
import classNames from 'classnames'

export function LoadingIcon(props: React.ComponentProps<'svg'>) {
  const { className, ...rest } = props

  return (
    <svg
      className={classNames('animate-spin mr-1 icon', className)}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path d="M512.511 21.483c-271.163 0-491.028 219.86-491.028 491.028 0 271.173 219.856 491.03 491.028 491.03 26.554 0 48.08-21.527 48.08-48.08 0-26.554-21.526-48.08-48.08-48.08-218.065 0-394.869-176.804-394.869-394.87 0-218.06 176.813-394.869 394.87-394.869 218.065 0 394.869 176.804 394.869 394.87 0 26.553 21.526 48.08 48.08 48.08 26.553 0 48.08-21.527 48.08-48.08 0-271.173-219.857-491.03-491.03-491.03z"></path>
    </svg>
  )
}
