import React, { FC } from 'react'
// import LocationInput from './LocationInput'
import DestinationInput from './DestinationInput'
import GuestsInput from './GuestsInput'
import DatesRangeInput from './DatesRangeInput'
import ButtonSubmit from './ButtonSubmit'

const SearchForm: FC<{}> = ({ }) => {

  return (
    <form className='w-full relative  hidden md:flex rounded-md shadow-lg border border-opacity-20 border-slate-600 shadow-slate-700 dark:shadow-2xl  bg-slate-100 dark:bg-neutral-800 '>
      <DestinationInput className='flex-1' />
      <div className='self-center border-r border-slate-200 dark:border-slate-700 h-8'></div>
      <DatesRangeInput className='flex-1' />
      <div className='self-center border-r border-slate-200 dark:border-slate-700 h-8'></div>
      <GuestsInput className='flex-1' />
      <div className='pr-2 xl:pr-4 pt-2'>
        <ButtonSubmit href='/list' />
      </div>
    </form>
  )

}

export default SearchForm
