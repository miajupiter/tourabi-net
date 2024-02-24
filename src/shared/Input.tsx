import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
}

// eslint-disable-next-line react/display-name
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      sizeClass = "",
      fontClass = "",
      rounded = "",
      children,
      type = "text",
      ...args
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        className={`w-full rounded-[4px] border-[1.5px] border-stroke bg-transparent text-sm font-normal px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${rounded} ${fontClass} ${sizeClass} ${className}`}
        placeholder={' '}
        {...args}
      />
    );
  }
);

export default Input;
