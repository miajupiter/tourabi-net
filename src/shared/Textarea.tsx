import React, { TextareaHTMLAttributes } from "react"

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}

// eslint-disable-next-line react/display-name
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", children, ...args }) => {
    return (
      <textarea

        className={`w-full rounded-md border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-slate-500 dark:bg-transparent dark:text-white dark:focus:border-primary ${className}`}
        rows={4}
        {...args}
      >
        {children}
      </textarea>
    )
  }
)

export default Textarea
