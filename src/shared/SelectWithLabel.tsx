import React, { InputHTMLAttributes, useState } from "react"
import { Select } from './Select'
export interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string
  className?: string
  selectClassName?: string
  labelClassName?: string
}

export const SelectWithLabel: React.FC<SelectProps> = ({
  className = "",
  selectClassName = "",
  labelClassName = "",
  label = "label",
  children,
  ...args
}) => {

  return (
    <div className={`${className}`}>
      <label className={`mb-3 block text-sm font-medium text-black dark:text-white ${labelClassName}`}>
        {label}
      </label>
      <Select
        className={`${selectClassName}`}
        {...args}
      >
        {children}
      </Select>
    </div>
  )
}


export default SelectWithLabel
