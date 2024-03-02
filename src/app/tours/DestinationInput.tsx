"use client"

import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline"
import React, { useState, useRef, useEffect, FC } from "react"
import ClearDataButton from "./ClearDataButton"
//  import { DESTINATION_LIST, DestinationType} from '@/data/destinations'

export interface DestinationType {
  _id: string
  title: string
}
export interface DestinationInputProps {
  placeHolder?: string
  desc?: string
  className?: string
  divHideVerticalLineClass?: string
  autoFocus?: boolean,
  destinationList?: DestinationType[]

  onChange?: (_id: string, title: string) => void
}

const DestinationInput: FC<DestinationInputProps> = ({
  autoFocus = false,
  placeHolder = "Destination",
  desc = "What kind of tour do you want?",
  className = "nc-flex-1.5",
  divHideVerticalLineClass = "left-10 -right-0.5",
  destinationList,
  onChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [_id, set_id] = useState("")
  const [title, setTitle] = useState("")
  const [textFilter, setTextFilter] = useState("")
  const [showPopover, setShowPopover] = useState(autoFocus)

  useEffect(() => {
    setShowPopover(autoFocus)
  }, [autoFocus])

  useEffect(() => {
    if (eventClickOutsideDiv) {
      document.removeEventListener("click", eventClickOutsideDiv)
    }
    showPopover && document.addEventListener("click", eventClickOutsideDiv)
    return () => {
      document.removeEventListener("click", eventClickOutsideDiv)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPopover])

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showPopover])

  const eventClickOutsideDiv = (event: MouseEvent) => {
    if (!containerRef.current) return
    // CLICK IN_SIDE
    if (!showPopover || containerRef.current.contains(event.target as Node)) {
      return
    }
    // CLICK OUT_SIDE
    setShowPopover(false)
  }

  const handleSelectLocation = (_id: string, title: string) => {
    set_id(_id)
    setTitle(title)
    setTextFilter('')
    setShowPopover(false)
    if (onChange != undefined) onChange(_id, title)
  }

  const renderRecentSearches = () => {
    return (
      <>
        <h3 className="block mt-2 sm:mt-0 px-4 sm:px-8 font-semibold text-base sm:text-lg text-neutral-800 dark:text-neutral-100">
          Recent searches
        </h3>
        <div className="mt-2">
          {destinationList && destinationList.filter(e=>e.title.toLocaleLowerCase().startsWith(textFilter.toLocaleLowerCase())).map((item, index) => (
            <span
              onClick={() => handleSelectLocation(item._id, item.title)}
              key={index}
              className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
            >
              <span className="block text-neutral-400">
                <ClockIcon className="h-4 sm:h-6 w-4 sm:w-6" />
              </span>
              <span className="block font-medium text-neutral-700 dark:text-neutral-200">
                {item.title}
              </span>
            </span>
          ))}
        </div>
      </>
    )
  }

  const renderSearchValue = () => {
    return (
      <>
        {destinationList && destinationList.map((item, index) => (
          <span
            onClick={() => handleSelectLocation(item._id, item.title)}
            key={index}
            className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
          >
            <span className="block text-neutral-400">
              <ClockIcon className="h-4 w-4 sm:h-6 sm:w-6" />
            </span>
            <span className="block font-medium text-neutral-700 dark:text-neutral-200">
              {item.title}
            </span>
          </span>
        ))}
      </>
    )
  }

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      <div
        onClick={() => setShowPopover(true)}
        className={`flex z-10 flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left  ${showPopover ? "nc-hero-field-focused" : ""
          }`}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <MapPinIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow">
          <input
            className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
            placeholder={placeHolder}
            value={title || textFilter}
            autoFocus={showPopover}
            onChange={(e) => {
              console.log('DestinationInput e.target.value:', e.target.value)
              console.log('DestinationInput e.currentTarget.value:', e.currentTarget.value)
              setTextFilter(e.target.value)
            }}
            ref={inputRef}
          />
          <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
            <span className="line-clamp-1">{!!_id ? placeHolder : desc}</span>
          </span>
          {_id && showPopover && (
            <ClearDataButton
              onClick={() => {
                set_id("")
                setTitle("")
                setTextFilter("")
                if (onChange != undefined) onChange(_id, title)
              }}
            />
          )}
        </div>
      </div>

      {showPopover && (
        <div
          className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white dark:bg-neutral-800 ${divHideVerticalLineClass}`}
        ></div>
      )}

      {showPopover && (
        <div className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[500px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
          {_id ? renderSearchValue() : renderRecentSearches()}
        </div>
      )}
    </div>
  )
}

export default DestinationInput
