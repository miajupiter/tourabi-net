"use client"

import React, { useEffect, useState } from 'react'
import { useLogin } from '@/hooks/useLogin'

import { TourDataType } from '@/data/types'

import TourCard from './TourCard'

import SearchForm from './SearchForm'
import Pagination from '@/shared/Pagination'
export interface ItemListProps { }

const ItemList = ({ }: ItemListProps) => {
  const {token}=useLogin()
  const [pullData, setPullData] = useState(false)
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(12)
  const [pageCount, setPageCount] = useState(1)
  const [docs, setDocs] = useState<TourDataType[]>([])

  const getList = (sayfaNo: number) => {
   
    setPageNo(sayfaNo)

    fetch(`${process.env.NEXT_PUBLIC_API_URI}/tours?page=${sayfaNo}&pageSize=${pageSize}`, { headers: { token: token } })
      .then(ret => ret.json())
      .then((result: any) => {
        console.log('result:', result)
        if (result && result.data) {
          setPageCount(result.data.pageCount as number)
          // setTotalDocs(result.data.totalDocs as number)
          setDocs(result.data.docs as TourDataType[])
        } else {
          setPageCount(1)
          // setTotalDocs(0)
          setDocs([])
        }
      }).catch(console.error)

  }


  // const Sayfalar = () => {
  //   let dizi = []
  //   let i = 0
  //   while (i < pageCount) {
  //     dizi.push(i + 1)
  //     i++
  //   }
  //   return (
  //     <nav className={`nc-Pagination inline-flex space-x-1 text-base font-medium`}>
  //       {dizi.map((no, index) => {
  //         if (no == pageNo) {
  //           return <span
  //             key={no}
  //             className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white`}
  //           >
  //             {no}
  //           </span>
  //         } else {
  //           return <button
  //             key={no}
  //             className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700`}
  //             onClick={() => getList(no,sessionToken)}
  //           >{no}</button>
  //         }
  //       })}
  //     </nav>
  //   )
  // }

  useEffect(() => {
    if(!pullData){
      setPullData(true)
      getList(1)
    }

  }, [])

  return (
    <div
      className={`nc-SectionGridFilterCard`}
      data-nc-id='SectionGridFilterCard'
    >
      <div className="hidden md:flex justify-center container relative space-y-24 mb-12 lg:space-y-28 md:mb-18">
        <div className={`nc-HeroSearchForm w-full lg:w-[900px] self-center py-5 lg:py-0 mt-10`}    >

          <SearchForm />
        </div>
      </div>
      {docs &&
        <div className="container relative space-y-12 mb-8 mt-2">
          
          <div className='grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
            {docs.map((tour: TourDataType) => <TourCard key={tour.id} data={tour} />)}
          </div>
          <div className='flex mt-4 justify-center items-center'>
            <Pagination pageNo={pageNo} pageCount={pageCount} buttonClick={(no:number)=>getList(no)} />
          </div>
        </div>
      }

    </div>

  )
}

export default ItemList
