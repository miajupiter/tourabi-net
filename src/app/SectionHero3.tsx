"use client"
import React, { FC } from "react"
// import imagePng from "@/images/travelhero2.png";
import Image from "next/image"
import ButtonPrimary from "@/shared/ButtonPrimary"
import ButtonSecondary from '@/shared/ButtonSecondary'

export interface SectionHero3Props {
  className?: string
}

const SectionHero3: FC<SectionHero3Props> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionHero3 relative ${className}`}
      data-nc-id="SectionHero3"
    >
      <div className="absolute z-10 inset-x-0 top-[10%] sm:top-[15%] text-center flex flex-col items-center max-w-2xl mx-auto space-y-4 lg:space-y-5 xl:space-y-8">
        <span className="sm:text-lg md:text-xl font-semibold text-neutral-900">
          {' '}
        </span>
        <h2 className="font-bold text-slate-100  text-xl sm:text-xl md:text-2xl lg:text-4xl xl:text-6xl !leading-[115%] "
          style={{textShadow:'1px 1px 3px black'}}
        >
          <span className='text-[#0093D2]'>tour</span><span className='text-[#A3C616]'>Abi</span> is the world's best tour portal
        </h2>
        <ButtonSecondary
          sizeClass="px-6 py-3 lg:px-8 lg:py-4 rounded-lg"
          fontSize="text-sm sm:text-base lg:text-lg font-medium"
          onClick={()=>{
            // window.scrollBy(0,700)
            window.scrollTo(0,700)
          }}
        >
          Get started 🚀🥰
        </ButtonSecondary>
      </div>
      {/* <div className="relative aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3 lg:aspect-w-16 lg:aspect-h-9 xl:aspect-h-8 "> */}
      <div className="relative h-[85vh] w-full p-0 m-0">
        <Image
          fill

          className="absolute inset-0 object-cover top-0"
          src={'https://tourabi.s3.eu-central-1.amazonaws.com/destinations/silk-road.jpg'}
          alt="hero"
          // width={900}
          // height={600}
          priority
        />
      </div>
    </div>
  )
}

export default SectionHero3