"use client";

import React, { FC } from 'react'


// import { TourDataType } from '@/data/types'
// import Pagination from '@/shared/Pagination'

// import TourCard from './TourCard'
import BackgroundSection from "@/components/BackgroundSection"
import ItemList from './ItemList'
import DestinationGridBox from '../destinations/DestinationGridBox'


export interface TourDataType {
  _id: string
  title: string

  description: string
  duration: number
  places: string
  inclusions: string
  exclutions: string
  images: []
  travelPlan: []
  priceTable: []

  currency: string
  singleSupplement: number

  price: number
  priceWithoutDiscount: number
}


export interface PageListProps {}


const PageList: FC<PageListProps> = ({}) => {
// const PageList: PageListProps = ({}) => {

  return (
    <div className='container-fluid mb-12 '>
      <ItemList  />

      <div className="container overflow-hidden">
        <div className="relative py-16">
          {/* <BackgroundSection /> */}
          <DestinationGridBox  />
        </div>

        {/* <SectionSubscribe2 className="py-24 lg:py-28" /> */}

        <div className="relative py-16 mb-24 lg:mb-28">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
        </div>
      </div>
    </div>
  )
}

export default PageList
