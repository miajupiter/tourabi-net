"use client"

import { MapPinIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import React, { useState, useEffect, useRef, FC } from "react"
import { DESTINATION_LIST, DestinationType } from '@/data/destinations'

interface Props {
  onClick?: () => void
  onChange?: (value: string) => void
  className?: string
  defaultValue?: string
  headingText?: string
}

const DestinationInput: FC<Props> = ({
  onChange = () => { },
  className = "",
  defaultValue = "",
  headingText = "Where to?",
}) => {
  const [value, setValue] = useState("")
  const containerRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const handleSelectLocation = (item: string) => {
    // DO NOT REMOVE SETTIMEOUT FUNC
    setTimeout(() => {
      setValue(item)
      onChange && onChange(item)
    }, 0)
  }

  // const renderSearchValues = ({
  //   heading,
  //   items,
  // }: {
  //   heading: string
  //   items: string[]
  // }) => {
  //   return (
  //     <>
  //       <p className="block font-semibold text-base">
  //         {heading || "Destinations"}
  //       </p>
  //       <div className="mt-3">
  //         {items.map((item) => {
  //           return (
  //             <div
  //               className="py-2 mb-1 flex items-center space-x-3 text-sm"
  //               onClick={() => handleSelectLocation(item)}
  //               key={item}
  //             >
  //               <MapPinIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
  //               <span className="">{item}</span>
  //             </div>
  //           )
  //         })}
  //       </div>
  //     </>
  //   )
  // }

  return (
    <div className={`${className}`} ref={containerRef}>
      <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl">
          {headingText}
        </span>
        <div className="relative mt-5">
          <input
            className={`block w-full bg-transparent border px-4 py-3 pr-12 border-neutral-900 dark:border-neutral-200 rounded-xl focus:ring-0 focus:outline-none text-base leading-none placeholder-neutral-500 dark:placeholder-neutral-300 truncate font-bold placeholder:truncate`}
            placeholder={"Search destinations"}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            ref={inputRef}
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2">
            <MagnifyingGlassIcon className="w-5 h-5 text-neutral-700 dark:text-neutral-400" />
          </span>
        </div>
        <div className="mt-7">
          <p className="block font-semibold text-base">
            {"Destinations"}
          </p>
          <div className="mt-3">
            {DESTINATION_LIST.map((item) => {
              return (
                <div
                  className="py-2 mb-1 flex items-center space-x-3 text-sm"
                  onClick={() => handleSelectLocation(item.title)}
                  key={item.id}
                >
                  <MapPinIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                  <span className="">{item.title}</span>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </div>
  )
}

export default DestinationInput
