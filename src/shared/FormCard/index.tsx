"use client"

import React, { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import FormCardGroup from "./FormCardGroup"
import { ChevronDown } from '@/shared/ChevronDown'

export enum FormCardType {
  DEFAULT,
  STATIC,
}


interface FormCardProps {
  id: string
  title: string
  icon?: any
  defaultOpen?: boolean
  className?: string
  headerClassName?: string
  bodyClassName?: string
  // formCardOpen: boolean
  // setFormCardOpen?: (arg: boolean) => void

  children?: React.ReactNode
  cardType?: FormCardType
}

const getFormCardState = (id: string, defaultValue: boolean) => {
  if (typeof window == "undefined") return defaultValue
  let obj: any = {}
  try {
    obj = JSON.parse(localStorage.getItem('formCard-expanded') || '{}')
  } catch { }
  if (obj[id] != undefined) {
    return obj[id]
  } else {
    return defaultValue
  }
}

const setFormCardState = (id: string, isOpen: boolean) => {
  if (typeof window != 'undefined') {
    let obj: any = {}
    try {
      obj = JSON.parse(localStorage.getItem('formCard-expanded') || '{}')
    } catch { }
    obj[id] = isOpen
    localStorage.setItem('formCard-expanded', JSON.stringify(obj))
  }
}

const FormCard = ({ id, title, icon, defaultOpen = true, className,
  headerClassName, bodyClassName, cardType = FormCardType.DEFAULT, children }: FormCardProps) => {

  // const pathname = usePathname()


  const [formCardExpanded, setFormCardExpanded] = useState(getFormCardState(id, defaultOpen))

  return (
    <FormCardGroup activeCondition={formCardExpanded} id={id}>
      {(handleClick, open) => {
        setFormCardState(id, open)
        return (
          <React.Fragment>
            <div className={`rounded-[4px] text-slate-900 dark:text-slate-100 border  border-stroke border-opacity-50 shadow dark:border-strokedark
             bg-white dark:bg-slate-900  ${className}`}>
              {cardType === FormCardType.DEFAULT && <>
                <Link href="#"
                  className={`group relative flex items-center justify-between gap-2.5 rounded-sm px-4 py-2 font-bold
                  border-b border-stroke border-opacity-15 dark:border-opacity-15  hover:bg-[#F2F2F2]
                dark:hover:bg-[rgba(56,48,163,0.37)] ${headerClassName}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleClick()
                  }}
                >
                  <div className="block text-lg space-x-3 rounded-tl rounded-tr">
                    {icon && <>{icon}</>} <span>{title}</span>
                  </div>
                  <ChevronDown open={open} />
                </Link>
              </>}
              {cardType === FormCardType.STATIC && <>
                <div className={`group relative items-center justify-between gap-2.5 rounded-sm px-4 py-2 font-bold
                  border-b border-stroke border-opacity-15 dark:border-opacity-15
                  block text-lg  space-x-3 rounded-tl rounded-tr`}>
                  {icon && <>{icon}</>} <span>{title}</span>
                </div>
              </>}
              <div className={` ${cardType === FormCardType.DEFAULT && !open && "hidden"} p-4 transition-transform duration-150 ease-in-out ${bodyClassName} `}>
                {children}
              </div>
            </div>
          </React.Fragment>
        )
      }}
    </FormCardGroup>

  )
}

export default FormCard
