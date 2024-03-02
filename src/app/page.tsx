"use client"

import React, { FC, useEffect, useState } from "react"
import BackgroundSection from "@/components/BackgroundSection"
import BgGlassmorphism from "@/components/BgGlassmorphism"
// import { TaxonomyType } from "@/data/types"
// import SectionHero3 from "@/app/(server-components)/SectionHero3"
import CardCategory6 from "@/components/CardCategory6"
import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces"
import SearchForm from './tours/SearchForm'
import DestinationGridBox from './destinations/DestinationGridBox'
import SectionHero3 from './SectionHero3'
import Image from 'next/image'
import Link from 'next/link'
import convertNumbThousand from '@/utils/convertNumbThousand'
import { useLogin } from '@/hooks/useLogin'
import { useLanguage } from '@/hooks/i18n'
import { v4 } from 'uuid'
import Heading from '@/shared/Heading'


export interface ShowcaseItemProps {
  _id?: string
  title?: string
  duration?: number
  places?: string
  href?: string
  imageSrc?: string
  width?: number
  height?: number
}


const TourShowcase = () => {
  const { t } = useLanguage()
  const { token } = useLogin()
  const [pullData, setPullData] = useState(false)
  const [showcaseTours, setShowcaseTours] = useState<ShowcaseItemProps[]>([])

  const ShowcaseItem: FC<ShowcaseItemProps> = ({ title, places, duration, href = "/", imageSrc, width, height }) => {
    return (
      <Link href={href} className={`nc-CardCategory6 relative flex w-full group rounded-[4px] z-0 overflow-hidden`}>
        <div className="aspect-w-16 aspect-h-10 sm:aspect-h-12 xl:aspect-h-9 w-full h-0"></div>
        <Image
          priority
          fill
          alt=""
          src={imageSrc || ""}
          className="aspect-ratio object-cover rounded-[4px] group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 100%) 100vw, 100%"

        />
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 text-white">
          <span className="absolute inset-0 bg-gradient-to-t from-black/60"></span>
          <h2 className={`relative text-lg lg:text-xl font-semibold`}>{title}</h2>
          <p className={`mt-1.5 text-sm text-neutral-200 truncate`}>
            {places}
          </p>
          <span className={`relative block mt-1.5 text-sm text-neutral-100`}>
            {/* {convertNumbThousand(14562.36)} qwerty  */}
            {duration} {t('Days')}
          </span>
        </div>
      </Link>

    )
  }
  const getShowcaseTours = async () => {
    const ret = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/tours/showcase`,
      { method: 'GET', headers: { 'Content-Type': 'application/json', token } })
    if (ret.ok) {
      const result = await ret.json()
      if (result.success) {
        const dd = (result.data || []).map((tour: any, index: number) => {
          return {
            _id: tour._id,
            imageSrc: tour.image.src,
            title: tour.title,
            places: tour.places,
            duration: tour.duration,
            href: `/tours/${tour._id}`
          }
        })
        setShowcaseTours(dd)
      } else {
        alert(result.error)
      }
    }
  }

  useEffect(() => {
    if (!pullData) {
      setPullData(true)
      getShowcaseTours()
    }
  }, [])

  return (<>

    <div className="relative uppercase">
      <div className="text-center w-full max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold">{t('Showcase')}</h2>
      </div>
    </div>
    <div className="grid grid-cols-12 gap-6">
      {showcaseTours && <>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
          {showcaseTours.length > 0 && <ShowcaseItem {...showcaseTours[0]} />}
          {/* <CardCategory6 taxonomy={DEMO_CATS_2[0]} /> */}
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 grid grid-rows-2 gap-6">
          {showcaseTours.length > 1 && <ShowcaseItem {...showcaseTours[1]} />}
          {showcaseTours.length > 2 && <ShowcaseItem {...showcaseTours[2]} />}
          {/* <CardCategory6 taxonomy={DEMO_CATS_2[3]} />
          <CardCategory6 taxonomy={DEMO_CATS_2[1]} /> */}
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
          {showcaseTours.length > 3 && <ShowcaseItem {...showcaseTours[3]} />}
          {/* <CardCategory6 taxonomy={DEMO_CATS_2[4]} /> */}
        </div>
      </>}
    </div>
  </>)
}
function PageHome3() {

  return (
    <main className="nc-PageHome3 relative overflow-hidden">

      <BgGlassmorphism />

      <div className="container-fluid px-0 mb-12 ">
        <SectionHero3 className="" />
      </div>
      {/* SECTION HERO */}
      <div className="hidden md:flex justify-center container relative space-y-24 mb-12 lg:space-y-28 md:mb-18">
        <div className={`nc-HeroSearchForm w-full lg:w-[900px] self-center py-5 lg:py-0`}    >
          <SearchForm />
        </div>
      </div>

      <div className="container relative space-y-10 mb-12 ">
        <TourShowcase />
        <DestinationGridBox />

      </div>
    </main>
  )
}

export default PageHome3
