import React, { FC } from 'react'
// import LocationInput from './LocationInput'
import DestinationInput from './DestinationInput'
import GuestsInput from './GuestsInput'
import DatesRangeInput from './DatesRangeInput'
import ButtonSubmit from './ButtonSubmit'

const SearchForm: FC<{}> = ({ }) => {

  return (
    <form className='w-full relative mt-8 hidden md:flex rounded-full shadow-xl dark:shadow-2xl  bg-white dark:bg-neutral-800 '>
      <DestinationInput className='flex-1' />
      <div className='self-center border-r border-slate-200 dark:border-slate-700 h-8'></div>
      <DatesRangeInput className='flex-1' />
      <div className='self-center border-r border-slate-200 dark:border-slate-700 h-8'></div>
      <GuestsInput className='flex-1' />
      <div className='pr-2 xl:pr-4 pt-5'>
        <ButtonSubmit href='/list' />
      </div>
    </form>
  )

}

export default SearchForm
