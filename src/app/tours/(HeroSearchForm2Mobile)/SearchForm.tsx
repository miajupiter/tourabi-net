"use client"

import converSelectedDateToString from "@/utils/converSelectedDateToString"
import React, { useState } from "react"
import { GuestsObject } from "../type"
import GuestsInput from "./GuestsInput"
import DestinationInput from "./DestinationInput"
import DatesRangeInput from "./DatesRangeInput"

const SearchForm = () => {
  //
  const [fieldNameShow, setFieldNameShow] = useState<"destination" | "dates" | "guests">("destination")
  
  const [destinationInputTo, setDestinationInputTo] = useState("")
  const [guestInput, setGuestInput] = useState<GuestsObject>({
    guestAdults: 0,
    guestChildren: 0,
    guestBaby: 0,
  })
  let tarih1=new Date(new Date().setMonth(new Date().getMonth()+1))
  let tarih2=new Date(tarih1.getTime())
  tarih2.setDate(tarih2.getDate()+7)
  

  const [startDate, setStartDate] = useState<Date | null>(
    tarih1
  )
  const [endDate, setEndDate] = useState<Date | null>(
    tarih2
  )
  //

  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const renderInputDestination = () => {
    const isActive = fieldNameShow === "destination"
    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 ${isActive
            ? "rounded-2xl shadow-lg"
            : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
          }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow("destination")}
          >
            <span className="text-neutral-400">Where</span>
            <span>{destinationInputTo || "Destination"}</span>
          </button>
        ) : (
          <DestinationInput
            defaultValue={destinationInputTo}
            onChange={(value) => {
              setDestinationInputTo(value)
              // setFieldNameShow("dates")
              setFieldNameShow("guests")
            }}
          />
        )}
      </div>
    )
  }

  const renderInputDates = () => {
    const isActive = fieldNameShow === "dates"

    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${isActive
            ? "rounded-2xl shadow-lg"
            : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
          }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4  `}
            onClick={() => setFieldNameShow("dates")}
          >
            <span className="text-neutral-400">When</span>
            <span>
              {startDate
                ? converSelectedDateToString([startDate, endDate])
                : "Add date"}
            </span>
          </button>
        ) : (
          <DatesRangeInput />
        )}
      </div>
    )
  }

  const renderInputGuests = () => {
    const isActive = fieldNameShow === "guests"
    let guestSelected = ""
    if (guestInput.guestAdults || guestInput.guestChildren) {
      const guest =
        (guestInput.guestAdults || 0) + (guestInput.guestChildren || 0)
      guestSelected += `${guest} guests`
    }

    if (guestInput.guestBaby) {
      guestSelected += `, ${guestInput.guestBaby} Baby`
    }

    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${isActive
            ? "rounded-2xl shadow-lg"
            : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
          }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow("guests")}
          >
            <span className="text-neutral-400">Who</span>
            <span>{guestSelected || `Add guests`}</span>
          </button>
        ) : (
          <GuestsInput defaultValue={guestInput} onChange={setGuestInput} />
        )}
      </div>
    )
  }

  return (
    <div>
      <div className="w-full space-y-5">
        {/*  */}
        {renderInputDestination()}
        {/*  */}
        {renderInputDates()}
        {/*  */}
        {renderInputGuests()}
      </div>
    </div>
  )
}

export default SearchForm
