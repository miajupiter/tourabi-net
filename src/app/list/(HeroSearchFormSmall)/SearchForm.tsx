import React, { FC } from "react"
import LocationInput from "./LocationInput"
import GuestsInput from "./GuestsInput"
import DatesRangeInput from "./DatesRangeInput"
import { SearchFormFields } from "../type"

export interface SearchFormProps {
  defaultFieldFocus?: SearchFormFields
}

const SearchForm: FC<SearchFormProps> = ({ defaultFieldFocus }) => {
  const renderForm = () => {
    return (
      <form className="relative flex rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
        <LocationInput
          // onInputDone={() => setDateFocused("startDate")}
          className="flex-[1.5]"
          autoFocus={defaultFieldFocus === "location"}
        />
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <DatesRangeInput className="flex-[1.2]" />

        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <GuestsInput
          className="flex-1"
          autoFocus={defaultFieldFocus === "guests"}
          submitLink="/list"
        />
      </form>
    )
  }

  return renderForm()
}

export default SearchForm
