import React, { FC, useEffect, useState } from 'react'
// import LocationInput from './LocationInput'
import DestinationInput, { DestinationType } from './DestinationInput'
import GuestsInput from './GuestsInput'
import DatesRangeInput from './DatesRangeInput'
import ButtonSubmit from './ButtonSubmit'
import { useLogin } from '@/hooks/useLogin'

export interface SearchFormProps {

  onSearch?: (destinationId: string, destinationTitle: string, dateFilter: string) => void
}

const SearchForm: FC<SearchFormProps> = ({ onSearch }) => {
  const { token } = useLogin()
  const [pullData, setPullData] = useState(false)
  const [destinationList, setDestinationList] = useState<DestinationType[]>([])
  const [destinationId, setDestinationId] = useState('')
  const [destinationTitle, setDestinationTitle] = useState('')

  const getDestinations = async () => {
    const ret = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/destinations`, {
      method: 'SEARCH',
      headers: { 'Content-Type': 'application/json', token: token },
      body: JSON.stringify({ limit: 100, select: '_id title' })
    })
    if (ret.ok) {
      const result = await ret.json()
      if (result.success) {
        setDestinationList(result.data.docs)
      } else {
        alert(result.error)
      }
    } else console.log('ret.statusText:', ret.statusText)

  }

  useEffect(() => {
    if (!pullData) {
      setPullData(true)
      getDestinations()
    }
  }, [])

  return (
    <form className='w-full relative  hidden md:flex rounded-md shadow-lg border border-opacity-20 border-slate-600 shadow-slate-700 dark:shadow-2xl  bg-slate-100 dark:bg-neutral-800 '>
      <DestinationInput className='flex-1'
        destinationList={destinationList}
        onChange={(_id: string, title: string) => {
          if (destinationTitle != title) {
            setDestinationId(_id)
            setDestinationTitle(title)
            if (onSearch) {
              onSearch(_id, title, "")
            }
          }
          // console.log('onChange _id:', _id, ' title:', title)
        }}
      />
      <div className='self-center border-r border-slate-200 dark:border-slate-700 h-8'></div>
      <DatesRangeInput className='flex-1' />
      <div className='self-center border-r border-slate-200 dark:border-slate-700 h-8'></div>
      <GuestsInput className='flex-1' />
      <div className='pr-2 xl:pr-4 pt-2'>
        <ButtonSubmit onClick={() => {
          if (onSearch) {
            onSearch(destinationId, destinationTitle, "")
          }

        }} />
      </div>
    </form>
  )

}

export default SearchForm
