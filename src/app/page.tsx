import React from "react"
import SectionSubscribe2 from "@/components/SectionSubscribe2"
import BackgroundSection from "@/components/BackgroundSection"
import BgGlassmorphism from "@/components/BgGlassmorphism"
import { TaxonomyType } from "@/data/types"
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox"
import SectionGridCategoryBox from "@/app/SectionGridCategoryBox"
// import SectionHero3 from "@/app/(server-components)/SectionHero3"
import CardCategory6 from "@/components/CardCategory6"
import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces"
// import SectionHero from './(server-components)/SectionHero'
import SearchForm from './list/SearchForm'
import DestinationGridBox from './destination/DestinationGridBox'

const DEMO_CATS_2: TaxonomyType[] = [
  {
    id: "1",
    href: "/list",
    name: "Georgia Tours",
    taxonomy: "category",
    count: 188288,
    thumbnail: "https://miajupiter.com/media/tour-img01/georgia-tours-georgia-tour-3-tbilisi3.jpg",
  },
  {
    id: "222",
    href: "/list",
    name: "Kazakhstan Weekend Tours Kolsay Lakes",
    taxonomy: "category",
    count: 188288,
    thumbnail:'https://miajupiter.com/media/tour-img01/kazakhstan-tours-weekend-tour-1-kolsay-lakes.jpg',
  },
  {
    id: "3",
    href: "/list",
    name: "Sevanavank - Caucasus Group Tour",
    taxonomy: "category",
    count: 188288,
    thumbnail:'https://miajupiter.com/media/tour-img01/tours-caucasus-group-tour-sevanavank4.jpg',
  },
  {
    id: "4",
    href: "/list",
    name: "Uzbekistan-Tajikistan Tour",
    taxonomy: "category",
    count: 188288,
    thumbnail:'https://miajupiter.com/media/tour-img01/uzbekistan-tours-uzbekistan-tajikistan-tour-1-bukhara2.jpg',
  },
  {
    id: "5",
    href: "/list",
    name: "Silk Road Group Tour",
    taxonomy: "category",
    count: 188288,
    thumbnail:'https://miajupiter.com/media/tour-img01/tours-silk-road-group-tour-ararat1.jpg'
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
      <div className="container hidden md:block relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        <div className={`nc-HeroSearchForm w-full py-5 lg:py-0 mt-10`}    >
            <SearchForm />
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
        <DestinationGridBox  />

        {/* SECTION */}
        {/* <div className="relative py-16">
          <BackgroundSection /> */}
          {/* <SectionGridAuthorBox boxCard="box2" /> */}
        {/* </div> */}

        {/* <SectionGridFeaturePlaces /> */}

        {/* SECTION */}
        {/* <SectionSubscribe2 /> */}
      </div>
    </main>
  )
}

export default PageHome3
