"use client"

import React, { useEffect, useState } from 'react'
import { TourDataType } from '@/data/types'
// import Pagination from '@/shared/Pagination'
import TourCard from './TourCard'

import SearchForm from './SearchForm'
import { tempToken } from '../../utils/apiHelper'
// import Pagination from '@/shared/Pagination'
export interface ItemListProps { }

const ItemList = ({ }: ItemListProps) => {

  const [pullData, setPullData] = useState(false)
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [pageCount, setPageCount] = useState(1)
  const [totalDocs, setTotalDocs] = useState(0)
  const [docs, setDocs] = useState<TourDataType[]>([])

  const getList = async (sayfaNo: number) => {
    // setDocs([])
    setPageNo(sayfaNo)
    const url = `${process.env.NEXT_PUBLIC_API_URI}/tours?page=${sayfaNo}&pageSize=${pageSize}`
    const ret = await fetch(url, { headers: { 'token': tempToken } })
    const result = await ret.json()
    if (result.success && result.data) {
      setPageCount(result.data.pageCount as number)
      setTotalDocs(result.data.totalDocs as number)
      setDocs(result.data.docs as TourDataType[])
    } else {
      setPageCount(1)
      setTotalDocs(0)
      setDocs([])
    }
  }


  const Sayfalar = () => {
    let dizi = []
    let i = 0
    while (i < pageCount) {
      dizi.push(i + 1)
      i++
    }
    return (
      <nav className={`nc-Pagination inline-flex space-x-1 text-base font-medium`}>
        {dizi.map((no, index) => {
          if (no == pageNo) {
            return <span
              key={no}
              className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white`}
            >
              {no}
            </span>
          } else {
            return <button
              key={no}
              className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700`}
              onClick={() => getList(no)}
            >{no}</button>
          }
        })}
      </nav>
    )
  }

  useEffect(() => {
    if (!pullData) {
      setPullData(true)
      getList(1)
    }
  }, [])

  return (
    <div
      className={`nc-SectionGridFilterCard`}
      data-nc-id='SectionGridFilterCard'
    >
      <div className="hidden md:block container relative space-y-24 mb-24 lg:space-y-28 md:mb-28">
        <div className={`nc-HeroSearchForm w-full py-5 lg:py-0 mt-10`}    >

          <SearchForm />
        </div>
      </div>

      <div className="container relative space-y-12 mb-24 mt-2">
        <div className='flex mt-4 justify-end items-center'>
          <Sayfalar />
        </div>
        <div className='grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {docs.map((tour: TourDataType) => <TourCard key={tour.id} data={tour} />)}
        </div>
        <div className='flex mt-4 justify-end items-center'>
          <Sayfalar />
        </div>
      </div>


    </div>

  )
}

export default ItemList
