import React, { InputHTMLAttributes, useState } from "react"
import Input from './Input'
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

  label?: string
  placeholder?: string
  className?: string
  inputClassName?: string
  labelClassName?: string

}

export const InputWithLabel: React.FC<InputProps> = ({ className, inputClassName, labelClassName, type, label, placeholder, ...args }) => {
  const myOnFocus=(e:React.FocusEvent<HTMLInputElement, Element>)=>{
    if(args.onFocus!=undefined){
      args.onFocus(e)
    }else{
      e.target.select()
    }
  }
  return (
    <div className={`${className}`}>
      <label className={`mb-1 ms-2 block text-sm font-medium text-black dark:text-white ${labelClassName}`}>
        {label || placeholder}
      </label>
      <Input type={type}
        placeholder={placeholder || label || ""}
        className={`${inputClassName}`}
        onFocus={myOnFocus}
        {...args}
      />
    </div>
  )
}


export default InputWithLabel
