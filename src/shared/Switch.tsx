import { FC, useState } from "react"
import { v4 } from "uuid"
export interface SwitchProps {
  className?:string
  defaultValue?:boolean
  onSwitch?: (checked:boolean) => void
}
export const Switch: FC<SwitchProps> = ({className="", defaultValue=false, onSwitch}) => {
  const [enabled, setEnabled] = useState<boolean>(defaultValue)
  const id = v4()

  return (
    <div className={`${className}`}>
      <label
        htmlFor={id}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={id}
            className="sr-only"
            onChange={() => {
              
              if(typeof onSwitch=='function'){
                onSwitch(!enabled)
              }
              setEnabled(!enabled)
            }}
          />
          <div className={`block h-8 w-14 rounded-full ${enabled?"bg-blue-600":"bg-neutral-700"}`}></div>
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${enabled && "!right-1 !translate-x-full"}`}
          ></div>
        </div>
      </label>
    </div>
  )
}

export default Switch
