import React, { TextareaHTMLAttributes } from "react"
import Textarea from './Textarea'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  placeholder?: string
  className?: string
  inputClassName?: string
  labelClassName?: string

}

// eslint-disable-next-line react/display-name
export const TextareaWithLabel: React.FC<TextareaProps> = ({
  className = "",
  inputClassName = "",
  labelClassName = "",
  label = "",
  placeholder = "",
  children,
  ...args }) => {

  return (
    <div className={`${className}`}>
      <label className={`mb-3 block text-sm font-medium text-black dark:text-white ${labelClassName}`}>
        {label || placeholder}
      </label>
      <Textarea
        placeholder={label || placeholder || ""}
        {...args}
      >
        {children}
      </Textarea>
    </div>

  )
}

export default TextareaWithLabel
