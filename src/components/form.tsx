import React, { Children, isValidElement, cloneElement } from 'react'
import classNames from 'classnames'
import { ComponentIdentifier } from '../utils/constants'

interface FormColumn {
  span?: number
  offest?: number
}

type FormValues = Record<string, any>

export interface FormProps {
  children?: React.ReactNode
  labelCol?: FormColumn
  wrapperCol?: FormColumn
  onFinish?: (formData: FormValues) => void
}

export function Form(props: FormProps) {
  const { children, labelCol, wrapperCol, onFinish } = props

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const fromValues: FormValues = {}
    for (const [name, value] of formData) {
      fromValues[name] = value
    }
    onFinish?.(fromValues)
  }

  return (
    <form onSubmit={handleSubmit}>
      {Children.map(children, (item) => {
        if (
          isValidElement(item) &&
          typeof item.type !== 'string' &&
          item.type.prototype.$$typeof ===
            Symbol.for(ComponentIdentifier.FormItem)
        ) {
          const mergedProps = {
            labelCol: item.props.labelCol ?? labelCol,
            wrapperCol: item.props.wrapperCol ?? wrapperCol,
          }
          return cloneElement(item, mergedProps)
        } else {
          return item
        }
      })}
    </form>
  )
}

interface FormItemProps {
  children?: React.ReactNode
  label?: React.ReactNode
  labelCol?: FormColumn
  wrapperCol?: FormColumn
}

Form.Item = function FormItem(props: FormItemProps) {
  const {
    children,
    label,
    labelCol = { span: 1, offest: 0 },
    wrapperCol = { span: 11, offest: 0 },
  } = props

  if (labelCol && !labelCol.span) {
    labelCol.span = 1
  }

  if (wrapperCol && !wrapperCol.span) {
    wrapperCol.span = 11
  }

  const labelColClass = {
    span: `col-span-${labelCol.span ?? 1}`,
    offest: labelCol.offest ? `col-start-${labelCol.offest + 1}` : '',
  }

  const wrapperColClass = {
    span: `col-span-${wrapperCol.span ?? 11}`,
    offest: wrapperCol.offest
      ? `col-start-${
          wrapperCol.offest + (labelCol.span ?? 1) + (labelCol.offest ?? 0) + 1
        }`
      : '',
  }

  return (
    <div className={classNames('grid grid-cols-24 items-center')}>
      <label className={classNames(labelColClass.span, labelColClass.offest)}>
        {label}
        {label && ':'}
      </label>
      <div className={classNames(wrapperColClass.span, wrapperColClass.offest)}>
        {children}
      </div>
    </div>
  )
}

Form.prototype.$$typeof = Symbol.for(ComponentIdentifier.Form)
Form.Item.prototype.$$typeof = Symbol.for(ComponentIdentifier.FormItem)
