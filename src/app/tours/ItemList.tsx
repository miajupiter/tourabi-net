"use client"

import React, { FC, useEffect, useState } from 'react'
import { useLogin } from '@/hooks/useLogin'



import TourCard from './TourCard'

import SearchForm from './SearchForm'
import Pagination from '@/shared/Pagination'
import { TourDataType } from './page';
export interface ItemListProps { }

const ItemList: FC<ItemListProps> = ({ }) => {
  const { token } = useLogin()
  const [pullData, setPullData] = useState(false)
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(12)
  const [pageCount, setPageCount] = useState(1)
  const [totalDocs, setTotalDocs] = useState(1)
  const [docs, setDocs] = useState<TourDataType[]>([])

  const [location, setLocation] = useState('')

  // const getList = async (sayfaNo: number) => {
  //   setPageNo(sayfaNo)
  //   let filter:any={}
  //   if(place){
  //     filter.places ={
  //       $regex:place,$options:'is'
  //     }
  //   }
  //   const ret = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/tours?page=${sayfaNo}`, {
  //     method: 'SEARCH',
  //     headers: { 'Content-Type': 'application/json', token: token },
  //     body: JSON.stringify({filter:filter})
  //   })
  //   if (ret.ok) {
  //     const result = await ret.json()
  //     if (result.success) {
  //       setPageCount(result.data.pageCount as number)
  //       setTotalDocs(result.data.totalDocs as number)
  //       setDocs(result.data.docs as TourDataType[])
  //     } else {
  //       setPageCount(1)
  //       setTotalDocs(0)
  //       setDocs([])
  //       alert(result.error)
  //     }
  //   } else {
  //     console.log('ret.statusText:', ret.statusText)
  //   }
  // }
  const getList = async (sayfaNo: number, loc?:string) => {
    setPageNo(sayfaNo)
    let filter:any={}
    if(loc){
      setLocation(loc)
      filter.places ={
        $regex:loc,$options:'is'
      }
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/tours?page=${sayfaNo}`, {
      method: 'SEARCH',
      headers: { 'Content-Type': 'application/json', token: token },
      body: JSON.stringify({filter:filter})
    })
    .then(ret=>ret.json())
    .then(result=>{
      if (result.success) {
        setPageCount(result.data.pageCount as number)
        setTotalDocs(result.data.totalDocs as number)
        setDocs(result.data.docs as TourDataType[])
      } else {
        setPageCount(1)
        setTotalDocs(0)
        setDocs([])
        alert(result.error)
      }
    })
    .catch(console.log)
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
      <div className="hidden md:flex justify-center container relative space-y-24 mb-12 lg:space-y-28 md:mb-18">
        <div className={`nc-HeroSearchForm w-full lg:w-[900px] self-center py-5 lg:py-0 mt-10`}    >
          <SearchForm onSearch={async(destinationId,destinationTitle,dateFilter)=>{
            setLocation(destinationTitle)
            getList(1,destinationTitle)
          }} />
        </div>
      </div>
      <div className="container relative space-y-12 mb-8 mt-2">
        {docs && <>
          <div className='grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
            {docs.map((tour: TourDataType, index: number) => <div key={index}>
              <TourCard key={index} data={tour} />
            </div>
            )}
          </div>
          <div className='flex mt-4 justify-center items-center'>
            <Pagination pageNo={pageNo} pageCount={pageCount}
              onPageClick={(no: number) => getList(no,location)}
            />
          </div>
        </>}
      </div>
    </div>

  )
}

export default ItemList
