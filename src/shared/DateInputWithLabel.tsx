import React, { InputHTMLAttributes, useState } from "react"
import DateInput from './DateInput'
import Input from './Input'
export interface DateInputProps extends InputHTMLAttributes<HTMLInputElement> {

  label?: string
  className?: string
  inputClassName?: string
  labelClassName?: string

}

export const DateInputWithLabel: React.FC<DateInputProps> = ({
  className = "",
  inputClassName = "",
  labelClassName = "",
  type = "text",
  label = "label",
  ...args
}) => {

  return (
    <div className={`${className}`}>
      <label className={`mb-1 ms-2 block text-sm font-medium text-black dark:text-white ${labelClassName}`}>
        {label}
      </label>
      <Input type={'date'}
        className={`py-2 ${inputClassName}`}
        placeholder={label}
        {...args}
      />
    </div>
  )
}


export default DateInputWithLabel
