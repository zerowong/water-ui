import React, { Children, isValidElement, cloneElement } from 'react'
import classNames from 'classnames'
import { ComponentIdentifier } from '../utils'

export interface FormColumn {
  span?: number
  offest?: number
}

export type FormValues = Record<string, any>

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
          item.type.prototype.$$typeof === Symbol.for(ComponentIdentifier.FormItem)
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

export interface FormItemProps {
  children?: React.ReactNode
  label?: React.ReactNode
  labelCol?: FormColumn
  wrapperCol?: FormColumn
}

const colSet = [
  { 'start': '', 'end': '' },
  { 'start': 'col-start-1', 'end': 'col-end-1' },
  { 'start': 'col-start-2', 'end': 'col-end-2' },
  { 'start': 'col-start-3', 'end': 'col-end-3' },
  { 'start': 'col-start-4', 'end': 'col-end-4' },
  { 'start': 'col-start-5', 'end': 'col-end-5' },
  { 'start': 'col-start-6', 'end': 'col-end-6' },
  { 'start': 'col-start-7', 'end': 'col-end-7' },
  { 'start': 'col-start-8', 'end': 'col-end-8' },
  { 'start': 'col-start-9', 'end': 'col-end-9' },
  { 'start': 'col-start-10', 'end': 'col-end-10' },
  { 'start': 'col-start-11', 'end': 'col-end-11' },
  { 'start': 'col-start-12', 'end': 'col-end-12' },
  { 'start': 'col-start-13', 'end': 'col-end-13' },
  { 'start': 'col-start-[14]', 'end': 'col-end-[14]' },
  { 'start': 'col-start-[15]', 'end': 'col-end-[15]' },
  { 'start': 'col-start-[16]', 'end': 'col-end-[16]' },
  { 'start': 'col-start-[17]', 'end': 'col-end-[17]' },
  { 'start': 'col-start-[18]', 'end': 'col-end-[18]' },
  { 'start': 'col-start-[19]', 'end': 'col-end-[19]' },
  { 'start': 'col-start-[20]', 'end': 'col-end-[20]' },
  { 'start': 'col-start-[21]', 'end': 'col-end-[21]' },
  { 'start': 'col-start-[22]', 'end': 'col-end-[22]' },
  { 'start': 'col-start-[23]', 'end': 'col-end-[23]' },
  { 'start': 'col-start-[24]', 'end': 'col-end-[24]' },
  { 'start': 'col-start-[25]', 'end': 'col-end-[25]' },
]

Form.Item = function FormItem(props: FormItemProps) {
  const {
    children,
    label,
    labelCol = { span: 1, offest: 0 },
    wrapperCol = { span: 11, offest: 0 },
  } = props

  labelCol.span ?? (labelCol.span = 1)
  labelCol.offest ?? (labelCol.offest = 0)
  wrapperCol.span ?? (wrapperCol.span = 11)
  wrapperCol.offest ?? (wrapperCol.offest = 0)
  const wrapperColBase = labelCol.span + labelCol.offest + 1

  return (
    <div className={classNames('grid grid-cols-[repeat(24,minmax(0,1fr))] items-center')}>
      <label
        className={classNames(
          colSet[labelCol.offest ? labelCol.offest : 1].start,
          colSet[labelCol.span + labelCol.offest + 1].end
        )}
      >
        {label}
        {label && ':'}
      </label>
      <div
        className={classNames(
          colSet[wrapperCol.offest ? wrapperCol.offest + wrapperColBase : wrapperColBase]
            .start,
          colSet[
            wrapperCol.span ? wrapperCol.span + wrapperCol.offest + wrapperColBase : 25
          ].end
        )}
      >
        {children}
      </div>
    </div>
  )
}

Form.prototype.$$typeof = Symbol.for(ComponentIdentifier.Form)
Form.Item.prototype.$$typeof = Symbol.for(ComponentIdentifier.FormItem)
