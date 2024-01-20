'use client'
import React, { FC, useEffect, useState } from 'react'
// import { DEMO_STAY_LISTINGS } from '@/data/listings'
import { TourDataType } from '@/data/types'
import Pagination from '@/shared/Pagination'
// import TabFilters from '../(stay-listings)/TabFilters'
// import Heading2 from '@/shared/Heading2'
import TourCard from './TourCard'
import BackgroundSection from "@/components/BackgroundSection"

import SectionGridAuthorBox from "@/components/SectionGridAuthorBox"
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories"
import SectionSubscribe2 from "@/components/SectionSubscribe2"
import TourSearchForm from './SearchForm'
// import * as api from '@/utils/apiHelper'
export interface PageListProps {
  // className?: string
  // data?: TourDataType[]
}

// const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8)
const INIT_DATA: TourDataType[] = []

const PageList: FC<PageListProps> = ({
  // className = '',
  // data = INIT_DATA,
}) => {
  const [docs, setDocs] = useState<TourDataType[]>([])
  const [pullData, setPullData] = useState(false)
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [pageCount, setPageCount] = useState(0)
  const [totalDocs, setTotalDocs] = useState(0)


  const getTourList = async () => {
    const ret = await fetch('/api/tours')
    const result = await ret.json()
    console.log('result:', result)
    if (result.success && result.data) {
      setPageNo(result.data.page as number)
      setPageSize(result.data.pageSize)
      setPageCount(result.data.pageCount)
      setTotalDocs(result.data.totalDocs)
      setDocs(result.data.docs as TourDataType[])
    }
    setPullData(true)
  }


  useEffect(function () {
    if (!pullData) {
      getTourList()
    }
  }, [])

  return (
    <>
    {/* <div
        className={`nc-SectionGridFilterCard ${className}`}
        data-nc-id='SectionGridFilterCard'
      > */}
      <div
        className={`nc-SectionGridFilterCard`}
        data-nc-id='SectionGridFilterCard'
      >
        <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
          <div className={`nc-HeroSearchForm w-full py-5 lg:py-0 mt-10`}    >

            <TourSearchForm />
          </div>
        </div>

        <div className="container relative space-y-24 mb-24 ">
          <div className='grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {docs.map((tour) => {
              tour.featuredImage = '/img/tours' + tour.featuredImage
              return (
                <TourCard key={tour.id} data={tour} />
              )
            })}
          </div>
          <div className='flex mt-16 justify-center items-center'>
            <Pagination />
          </div>
        </div>

        {/* <div className="container relative space-y-24 mb-24 ">
          <div className='grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {data.map((stay) => (
              <StayCard2 key={stay.id} data={stay} />
            ))}
          </div>
          <div className='flex mt-16 justify-center items-center'>
            <Pagination />
          </div>
        </div> */}
      </div>

      <div className="container overflow-hidden">
        {/* SECTION 1 */}
        section1
        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore by types of stays"
            subHeading="Explore houses based on 10 types of stays"
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
          />
        </div>

        {/* SECTION */}
        <SectionSubscribe2 className="py-24 lg:py-28" />

        {/* SECTION */}
        <div className="relative py-16 mb-24 lg:mb-28">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div>
      </div>
    </>
  )
}

export default PageList