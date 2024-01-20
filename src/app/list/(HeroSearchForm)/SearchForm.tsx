import React, { FC } from 'react'
import LocationInput from './LocationInput'
import GuestsInput from './GuestsInput'
import DatesRangeInput from './DatesRangeInput'

const StaySearchForm: FC<{}> = ({ }) => {
  const renderForm = () => {
    return (
      <form className='w-full relative mt-8 flex rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 '>
        <LocationInput className='flex-[1.5]' />
        <div className='self-center border-r border-slate-200 dark:border-slate-700 h-8'></div>
        <DatesRangeInput className='flex-1' />
        <div className='self-center border-r border-slate-200 dark:border-slate-700 h-8'>111</div>
        <GuestsInput className='flex-1' />
      </form>
    )
  }

  return renderForm()
}

export default StaySearchForm
