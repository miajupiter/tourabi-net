import flatpickr from "flatpickr"
import { FC, InputHTMLAttributes, useEffect } from "react"

export interface DateInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}
export const DateInput: FC<DateInputProps> = ({
  className = "",
  ...args
}) => {
  useEffect(() => {
    // Init flatpickr
    flatpickr(".form-datepicker", {
      mode: "single",
      static: true,
      monthSelectorType: "static",
      // monthSelectorType: "dropdown",
      // dateFormat: "M j, Y",

      dateFormat: "Y-m-d",
      prevArrow:
        '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
      nextArrow:
        '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    })
  }, [])

  return (
    // <div className="relative z-20 bg-transparent dark:bg-form-input">
    <div className='relative z11-2011 bg-tran11sparent dark:bg-fo11rm-inp11ut'>
      <div className="relative">
        <input
          type='date'
          // className={`relative form-datepicker z-20 w-full appearance-none rounded-[4px] border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
          className={`form-datepicker z11-1120 w-full rounded border-[1.5px] border-stroke 11bg-tra11nsparent px-3 pb-2.5 pt-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${className}`}
          // placeholder="mm/dd/yyyy"
          data-class="flatpickr-right"

          {...args}
        />

        <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
          <i className="fa-solid fa-calendar-days"></i>
        </span>
      </div>
    </div>
  )
}

export default DateInput
