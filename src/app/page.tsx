import React from "react"
import SectionSubscribe2 from "@/components/SectionSubscribe2"
import BackgroundSection from "@/components/BackgroundSection"
import BgGlassmorphism from "@/components/BgGlassmorphism"
import { TaxonomyType } from "@/data/types"
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox"
import SectionGridCategoryBox from "@/components/SectionGridCategoryBox"
// import SectionHero3 from "@/app/(server-components)/SectionHero3"
import CardCategory6 from "@/components/CardCategory6"
import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces"
// import SectionHero from './(server-components)/SectionHero'
import TourSearchForm from './list/SearchForm'

const DEMO_CATS_2: TaxonomyType[] = [
  {
    id: "1",
    href: "/list",
    name: "Georgia Tours",
    taxonomy: "category",
    count: 188288,
    // thumbnail: "https://images.pexels.com/photos/5764100/pexels-photo-5764100.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    thumbnail: "/img/tours/georgia-tours-georgia-tour-3-tbilisi3.jpg",
  },
  {
    id: "222",
    href: "/list",
    name: "Kazakhstan Weekend Tours Kolsay Lakes",
    taxonomy: "category",
    count: 188288,
    thumbnail:'/img/tours/kazakhstan-tours-weekend-tour-1-kolsay-lakes.jpg',
    // thumbnail: "https://images.pexels.com/photos/2869499/pexels-photo-2869499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "3",
    href: "/list",
    name: "Sevanavank - Caucasus Group Tour",
    taxonomy: "category",
    count: 188288,
    thumbnail:'/img/tours/tours-caucasus-group-tour-sevanavank4.jpg',
    // thumbnail: "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "4",
    href: "/list",
    name: "Uzbekistan-Tajikistan Tour",
    taxonomy: "category",
    count: 188288,
    thumbnail:'/img/tours/uzbekistan-tours-uzbekistan-tajikistan-tour-1-bukhara2.jpg',
    // thumbnail: "https://images.pexels.com/photos/247532/pexels-photo-247532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "5",
    href: "/list",
    name: "Silk Road Group Tour",
    taxonomy: "category",
    count: 188288,
    thumbnail:'/img/tours/tours-silk-road-group-tour-ararat1.jpg'
    // thumbnail:
    //   "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
]

function PageHome3() {
  return (
    <main className="nc-PageHome3 relative overflow-hidden">
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      {/* SECTION HERO */}
      {/* <div className="container px-1 sm:px-4 mb-24 ">
        <SectionHero3 className="" />
      </div> */}
      {/* SECTION HERO */}
      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        <div className={`nc-HeroSearchForm w-full py-5 lg:py-0 mt-10`}    >
            <TourSearchForm />
          </div>
      </div>
      <div className="container relative space-y-24 mb-24 ">
        {/* SECTION 1 */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
            <CardCategory6 taxonomy={DEMO_CATS_2[0]} />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 grid grid-rows-2 gap-6">
            <CardCategory6 taxonomy={DEMO_CATS_2[3]} />
            <CardCategory6 taxonomy={DEMO_CATS_2[1]} />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
            <CardCategory6 taxonomy={DEMO_CATS_2[4]} />
          </div>
        </div>

        {/* SECTION */}
        <SectionGridCategoryBox />

        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionGridAuthorBox boxCard="box2" />
        </div>

        <SectionGridFeaturePlaces />

        {/* SECTION */}
        <SectionSubscribe2 />
      </div>
    </main>
  )
}

export default PageHome3
