import React, { Fragment } from 'react'
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react'
import classNames from 'classnames'

type DialogProps = Parameters<typeof HeadlessDialog>[0] & {
  /**
   * 标题
   */
  title?: React.ReactNode
  /**
   * aria-describedby，不可见
   */
  description?: React.ReactNode
  /**
   * 垂直居中
   */
  centered?: boolean
}

/**
 * 对话框
 */
export function Dialog(props: DialogProps) {
  const {
    open = false,
    children,
    title,
    description,
    centered,
    ...rest
  } = props

  return (
    <Transition show={open} as={Fragment}>
      <HeadlessDialog className="fixed inset-0 overflow-y-auto" {...rest}>
        <div
          className={classNames('min-h-screen flex justify-center', {
            'items-start': !centered,
            'items-center': centered,
          })}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <HeadlessDialog.Overlay className="fixed inset-0" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-out duration-300"
            enterFrom="transform-gpu opacity-0 scale-95"
            enterTo="transform-gpu opacity-100 scale-100"
            leave="transition-all ease-in duration-200"
            leaveFrom="transform-gpu opacity-100 scale-100"
            leaveTo="transform-gpu opacity-0 scale-95"
          >
            <div className="w-96 p-6 rounded-2xl shadow-md border border-gray-50 z-10">
              {title && (
                <>
                  <HeadlessDialog.Title className="text-lg font-medium text-center">
                    {title}
                  </HeadlessDialog.Title>
                  <hr className="mt-1 mb-1" />
                </>
              )}
              {description && (
                <HeadlessDialog.Description className="hidden">
                  {description}
                </HeadlessDialog.Description>
              )}
              {children}
            </div>
          </Transition.Child>
        </div>
      </HeadlessDialog>
    </Transition>
  )
}
