import React, { FC, ReactNode } from 'react'
import imagePng from '@/images/hero-right2.png'
import QwHeroSearchForm, {
  SearchTab,
} from '../(client-components)/(HeroSearchForm)/QwHeroSearchForm'
import Image, { StaticImageData } from 'next/image'

export interface QwSectionHeroArchivePageProps {
  className?: string
  listingType?: ReactNode
  currentPage: 'Tours' | 'Experiences' | 'Cars' | 'Flights'
  currentTab: SearchTab
  rightImage?: StaticImageData
}

const QwSectionHeroArchivePage: FC<QwSectionHeroArchivePageProps> = ({
  className = '',
  listingType,
  currentPage,
  currentTab='Tours',
  rightImage = imagePng,
}) => {
  return (
    <div
      className={`nc-SectionHeroArchivePage flex flex-col relative ${className}`}
      data-nc-id='SectionHeroArchivePage'
    >
      <div className='flex flex-col lg:flex-row lg:items-center'>
        <div className='flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-6 lg:space-y-10 pb-14 lg:pb-64 xl:pb-80 xl:pr-14 lg:mr-10 xl:mr-0'>
          qwerty dance
        </div>
        <div className='flex-grow'>
          {/* <Image
            className='w-full'
            src={rightImage}
            alt='hero'
            priority
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
          /> */}
          qwerty resim cisim ,sekil 
        </div>
      </div>

      <div className='hidden lg:flow-root w-full'>
        <div className='z-10 lg:-mt-40 xl:-mt-56 w-full'>
          <QwHeroSearchForm currentPage={'Tours'} currentTab={currentTab} className='mt-10' />
        </div>
      </div>
    </div>
  )
}


export default QwSectionHeroArchivePage
