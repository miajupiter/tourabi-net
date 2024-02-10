import React, { SelectHTMLAttributes, useState } from "react"
import uniqueId from 'lodash/uniqueId'
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  sizeClass?: string
  label?: string
  className?: string
  selectClassName?: string
  labelClassName?: string
  id?: string
  key?: string | number
}

// eslint-disable-next-line react/display-name
const SelectWithLabel = React.forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      className = "",
      selectClassName = "",
      labelClassName = "",
      sizeClass = "h-12",
      children,
      label = "label",
      key,
      ...args
    },
    ref
  ) => {
    const [id, setId] = useState('')
    useState(() => {
      setId(uniqueId('input-'))
    })

    return (
      <>
        {id &&
          <div key={key || ('div-' + id)} className={`relative ${className}`}>
            <select
              id={id}
              className={`nc-Select block ${sizeClass} ${className} block px-2.5 h-12 py-2.5 w-full text-sm rounded-[4px] border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900`}
              {...args} >
              {children}
            </select>
            <label htmlFor={id} className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${labelClassName}`}>{args && args.required?'*':''}{label}</label>
          </div>
        }
      </>
    )
  }
)

export default SelectWithLabel
