import React, { InputHTMLAttributes, useState } from "react"
import uniqueId from 'lodash/uniqueId'
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string
  fontClass?: string
  rounded?: string
  label?: string
  className?: string
  inputClassName?: string
  labelClassName?: string
  id?: string
  key?: string | number
  onChange?:any
}

// eslint-disable-next-line react/display-name
const InputWithLabel = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      inputClassName = "",
      labelClassName = "",
      sizeClass = "h-11 px-4 py-3",
      fontClass = "text-sm font-normal",
      rounded = "rounded-[4px]",
      children,
      type = "text",
      label = "label",
      key,
      onChange,
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
            <input type={type} id={id} className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-[4px] border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${inputClassName}`}
              placeholder={' '}
              onChange={onChange}
              {...args} />
            <label htmlFor={id} className={`absolute text-sm  text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${labelClassName}`}>{args && args.required?'*':''}{label}</label>
          </div>
        }
      </>
    )
  }
)

export default InputWithLabel
