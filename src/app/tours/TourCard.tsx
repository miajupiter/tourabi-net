`use client`

import React, { FC } from "react"
import GallerySlider from "@/components/GallerySlider"
// import { DEMO_STAY_LISTINGS } from "@/data/listings"
import { TourDataType } from './page'
// import StartRating from "@/components/StartRating"
// import BtnLikeIcon from "@/components/BtnLikeIcon"
// import SaleOffBadge from "@/components/SaleOffBadge"
// import Badge from "@/shared/Badge"
import Link from "next/link"
import { v4 } from 'uuid'
import convertNumbThousand from '@/utils/convertNumbThousand'
export interface TourCardProps {
  className?: string
  data?: TourDataType
  size?: "default" | "small"
}

// const DEMO_DATA = DEMO_STAY_LISTINGS[0]

const TourCard: FC<TourCardProps> = ({
  size = "default",
  className = "",
  data,
}) => {
  if(data){
    if(data.price==undefined || data.price==null) data.price=0
    if(data.priceWithoutDiscount==undefined || data.priceWithoutDiscount==null) data.priceWithoutDiscount=0
  }

  const { _id, title, description, images, places, price, priceWithoutDiscount, currency, duration, singleSupplement } = data as TourDataType
  

  const renderContent = () => {
    return (
      <div className={size === "default" ? "mt-3 space-y-3" : "mt-2 space-y-2"}>
        <div className="space-y-2">
          <div className='flex justify-between'>
            <div className="text-lg font-bold text-neutral-500 dark:text-neutral-400">
              {duration} days
            </div>
            <div>
              {price > 0 && priceWithoutDiscount>price  && <>
                <span className="text-base opacity-60 line-through mx-3">
                  {currency == 'USD' && <>
                    US ${convertNumbThousand(priceWithoutDiscount)}
                  </>}
                  {currency != 'USD' && <>
                    {convertNumbThousand(priceWithoutDiscount)}<span className='text-base opacity-75'>{currency}</span>
                  </>}
                </span>
              </>}
              <span className="text-lg font-semibold bg-indigo-700 text-white py-1 px-2 rounded-md">
                {price > 0 && <>
                  {currency == 'USD' && <>
                    US ${convertNumbThousand(price)}
                  </>}

                  {currency != 'USD' && <>
                    {convertNumbThousand(price)}<span className='text-base opacity-75'>{currency}</span>
                  </>}
                </>}
                {price <= 0 && <>
                 US $ <i className="fa-solid fa-phone"></i> ??
                </>}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">

            <h2
              className={`font-semibold w-full uppercase text-start text-neutral-900 dark:text-white ${size === "default" ? "text-base" : "text-base"
                }`}
            >
              {title}
              {/* <span className="line-clamp-1"></span> */}
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1.5">
            {size === "default" && (
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
            <span className="">{places}</span>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          {/* <span className="text-base font-semibold">
            {(price|| 0)>0 && (<>
            {price}
            {` `}
            <small className='opacity-50'>{currency}</small>
            </>)}
          </span> */}
          {/* {!!reviewStart && (
            <StartRating reviewCount={reviewCount} point={reviewStart} />
          )} */}
        </div>
      </div>
    )
  }



  return (
    <div className={`nc-StayCard2 group relative ${className}`}>
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`StayCard2_${v4()}`}
          ratioClass="aspect-w-12 aspect-h-11"
          galleryImgs={images}
          imageClass="rounded-[4px]"
          href={`/tours/${_id}`}
        />
        {/* <BtnLikeIcon isLiked={like} className="absolute right-3 top-3 z-[1]" />
        {saleOff && <SaleOffBadge className="absolute left-3 top-3" />} */}
      </div>
      <Link href={`/tours/${_id}`}>{renderContent()}</Link>
    </div>
  )
}

export default TourCard
