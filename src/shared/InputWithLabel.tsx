import React, { InputHTMLAttributes, useState } from "react"
import Input from './Input'
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

  label?: string
  className?: string
  inputClassName?: string
  labelClassName?: string

}

export const InputWithLabel: React.FC<InputProps> = ({
  className = "",
  inputClassName = "",
  labelClassName = "",
  type = "text",
  label = "label",
  ...args
}) => {

  return (
    <div className={`${className}`}>
      <label className={`mb-3 block text-sm font-medium text-black dark:text-white ${labelClassName}`}>
        {label}
      </label>
      <Input type={type} placeholder={label}
        {...args}
      />
    </div>
  )
}


export default InputWithLabel
