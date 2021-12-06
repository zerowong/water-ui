import React, { Children, isValidElement, cloneElement } from 'react'
import classNames from 'classnames'
import { ComponentIdentifier } from '../utils'

/**
 * 24栅格系统
 */
export interface FormColumn {
  /**
   * 栅格占位格数
   */
  span?: number
  /**
   * 栅格偏移格数
   */
  offest?: number
}

/**
 * 表单提交数据对象
 */
export type FormValues = Record<string, any>

export interface FormProps extends React.ComponentProps<'form'> {
  children?: React.ReactNode
  /**
   * 标签布局
   */
  labelCol?: FormColumn
  /**
   * 表单组件布局
   */
  wrapperCol?: FormColumn
  /**
   * 提交表单回调事件
   */
  onFinish?: (formData: FormValues) => void
  /**
   * 是否显示标签后的冒号
   */
  colon?: boolean
}

export function Form(props: FormProps) {
  const {
    children,
    labelCol,
    wrapperCol,
    onFinish,
    colon = true,
    onSubmit,
    ...rest
  } = props

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmit?.(e)
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const fromValues: FormValues = {}
    for (const [name, value] of formData) {
      const nameArr = name.split(',')
      if (nameArr.length === 1) {
        fromValues[name] = value
      } else {
        let ptr = fromValues
        for (let i = 0, l = nameArr.length; i < l; i++) {
          if (i === l - 1) {
            ptr[nameArr[i]] = value
          } else {
            ptr[nameArr[i]] = { ...ptr[nameArr[i]] }
            ptr = ptr[nameArr[i]]
          }
        }
      }
    }
    onFinish?.(fromValues)
  }

  return (
    <form onSubmit={handleSubmit} {...rest}>
      {Children.map(children, (item) => {
        if (
          isValidElement(item) &&
          typeof item.type !== 'string' &&
          item.type.prototype.$$typeof === Symbol.for(ComponentIdentifier.FormItem)
        ) {
          const mergedProps = {
            labelCol: item.props.labelCol ?? labelCol,
            wrapperCol: item.props.wrapperCol ?? wrapperCol,
            colon: item.props.colon ?? colon,
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
  /**
   * 标签
   */
  label?: React.ReactNode
  /**
   * 标签布局
   */
  labelCol?: FormColumn
  /**
   * 表单组件布局
   */
  wrapperCol?: FormColumn
  /**
   * 是否显示标签后的冒号
   */
  colon?: boolean
  /**
   * 字段名，支持数组
   */
  name?: string | string[]
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

const shouldInjectComponents: string[] = [
  ComponentIdentifier.Input,
  ComponentIdentifier.TextArea,
]

Form.Item = function FormItem(props: FormItemProps) {
  const {
    children,
    label,
    labelCol = { span: 1, offest: 0 },
    wrapperCol = { span: 0, offest: 0 },
    colon = true,
    name,
  } = props

  labelCol.span ?? (labelCol.span = 1)
  labelCol.offest ?? (labelCol.offest = 0)
  wrapperCol.span ?? (wrapperCol.span = 0)
  wrapperCol.offest ?? (wrapperCol.offest = 0)
  const wrapperColBase = labelCol.span + labelCol.offest + 1

  return (
    <div className={classNames('grid grid-cols-[repeat(24,minmax(0,1fr))] items-center')}>
      <label
        className={classNames(
          colSet[labelCol.offest ? labelCol.offest : 1].start,
          colSet[wrapperColBase].end
        )}
      >
        {label}
        {label && colon && ':'}
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
        {Children.map(children, (item) => {
          if ((Array.isArray(name) && name.length === 0) || !name) {
            return item
          }
          if (isValidElement(item) && typeof item.type !== 'string') {
            const key = Symbol.keyFor(item.type.prototype.$$typeof)
            if (key && shouldInjectComponents.indexOf(key) !== -1) {
              return cloneElement(item, { name })
            }
          }
          return item
        })}
      </div>
    </div>
  )
}

Form.prototype.$$typeof = Symbol.for(ComponentIdentifier.Form)
Form.Item.prototype.$$typeof = Symbol.for(ComponentIdentifier.FormItem)
