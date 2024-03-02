import React, { FC, SelectHTMLAttributes } from "react"

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string
  sizeClass?: string
}

export const Select: FC<SelectProps> = ({
  className = "",
  sizeClass = "",
  children,
  ...args
}) => {
  return (
    <select
      className={`w-full rounded-[4px] border-[1.5px] border-stroke bg-transparent px-3 py-2.5
      text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark
      dark:bg-form-input dark:text-white dark:focus:border-primary ${sizeClass} ${className}`}
      {...args}
    >
      {children}
    </select>
  )
}

export default Select
