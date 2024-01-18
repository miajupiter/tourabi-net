import BackgroundSection from "@/components/BackgroundSection"
import BgGlassmorphism from "@/components/BgGlassmorphism"
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox"
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories"
import SectionSubscribe2 from "@/components/SectionSubscribe2"
import React, { ReactNode } from "react"
// import SectionHeroArchivePage from "../(server-components)/SectionHeroArchivePage";
import QwSectionHeroArchivePage from '../(server-components)/QwSectionHeroArchivePage'
import QwHeroSearchForm from '../(client-components)/(HeroSearchForm)/QwHeroSearchForm'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`nc-ListingStayPage relative `}>
      <BgGlassmorphism />

      {/* SECTION HERO */}
      {/* <div className="container pt-10 pb-24 lg:pt-16 lg:pb-28">
        (stay-listins)/listing-stay/page.tsx
        <QwSectionHeroArchivePage currentPage="Tours" currentTab="Tours" />
      </div> */}
      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        <QwHeroSearchForm className='mt-10' />
      </div>

      {children}

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
    </div>
  )
}

export default Layout
