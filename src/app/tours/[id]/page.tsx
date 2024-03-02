"use client"

import React, { FC, Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ArrowRightIcon, Squares2X2Icon } from '@heroicons/react/24/outline'
import CommentListing from '@/components/CommentListing'
import FiveStartIconForRate from '@/components/FiveStartIconForRate'
import StartRating from '@/components/StartRating'
import Avatar from '@/shared/Avatar'
import Badge from '@/shared/Badge'
import ButtonCircle from '@/shared/ButtonCircle'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import ButtonClose from '@/shared/ButtonClose'
import Input from '@/shared/Input'
import LikeSaveBtns from '@/components/LikeSaveBtns'
import Image, { StaticImageData } from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Amenities_demos, PHOTOS } from './constant'
import StayDatesRangeInput from '../DatesRangeInput'
import GuestsInput from '../GuestsInput'
// import SectionDateRange from './SectionDateRange'
// import { Route } from 'next'
// import { getToken } from '@/utils/apiHelper'
import { AliAbiMDXViewer } from '@/components/Editor/AliAbiMDXEditor'
import { useLanguage } from '@/hooks/i18n'
import { useLogin } from '@/hooks/useLogin'

// import PlaceHolder from '@/images/placeholder-large.png'
// import PlaceHolderSmall from '@/images/placeholder-small.png'

export interface PageDetailProps {
  params: { id: string }
}

export interface TourItemType {
  id: string
  title: string
  description: string
  duration: number
  places: string
  images: StaticImageData[] | []
  priceTable: []
  travelPlan: []
  currency: string
  price?: number
  singleSupplement: number
  inclusions: string
  exclusions: string

}


const PageDetail: FC<PageDetailProps> = ({ params }: { params: { id: string } }) => {
  const { t } = useLanguage()
  const { token } = useLogin()
  let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false)

  const thisPathname = usePathname()
  const router = useRouter()
  const [sessionToken, setSessionToken] = useState('')
  const [item, setItem] = useState<TourItemType>()
  const [pullData, setPullData] = useState(false)

  // const getItem = (itemId: string) => {
  //   fetch(`${process.env.NEXT_PUBLIC_API_URI}/tours/${itemId}`, { headers: { 'token': token } })
  //     .then(ret => ret.json())
  //     .then(result => {
  //       if (result.success) {
  //         setItem(result.data)
  //       } else if (result.error) {
  //         alert(result.error)
  //       }
  //     }).catch(err => {
  //       alert(err.message || err || 'error')
  //     })
  // }
  const getItem = async (itemId: string) => {
    const ret = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/tours/${itemId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'token': token }
    })
    if (ret.ok) {
      const result = await ret.json()
      if (result.success) {
        setItem(result.data)
      } else if (result.error) {
        alert(result.error)
      }
    }else{
      console.log('ret.statusText:',ret.statusText)
    }
  }


  const renderSection1 = () => {

    return (
      <div className='listingSection__wrap !space-y-6'>
        {/* 1 */}
        <div className='flex justify-between items-center'>
          <Badge name={'qwerty'} />
          <LikeSaveBtns />
        </div>

        {/* 2 */}
        <h2 className='text-2xl sm:text-3xl lg:text-3xl font-semibold'>
          {item && item.title} {` `}
          {!item && <div className='stripe medium-stripe lazy-loading ' style={{ height: '40px' }}>{` `}</div>}
        </h2>

        {/* 3 */}
        <div className='flex items-center space-x-4'>
          <StartRating point={4.9} reviewCount={216} />
          <span>·</span>
          <span>
            <i className='las la-map'></i>
            <span className='ml-1'>{` `} {item && item.places}</span>
          </span>
        </div>

        {/* 4 */}
        {/* <div className='flex items-center'>
          <Avatar hasChecked sizeClass='h-10 w-10' radius='rounded-full' />
          <span className='ml-2.5 text-neutral-500 dark:text-neutral-400'>
            Hosted by{' '}
            <span className='text-neutral-900 dark:text-neutral-200 font-medium'>
              Kevin Francis
            </span>
          </span>
        </div> */}

        {/* 5 */}
        <div className='w-full border-b border-neutral-100 dark:border-neutral-700' />

        {/* 6 */}
        <div className='flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300'>
          <div className='flex items-center space-x-3 '>
            <i className=' las la-sun text-2xl '></i>
            <span className=''>
              {item && item.duration} <span className='hidden sm:inline-block'>days</span>
            </span>
          </div>
          <div className='flex items-center space-x-3'>
            {/* <i className=' las la-map-marker-alt text-2xl'></i> */}
            <i className=' las la-map text-2xl'></i>
            <span className=' '>
              {item && item.places.split(',').length} <span className='hidden sm:inline-block'>places</span>
            </span>
          </div>
          <div className='flex items-center space-x-3'>
            <i className=' las la-bath text-2xl'></i>
            <span className=' '>
              3 <span className='hidden sm:inline-block'>baths</span>
            </span>
          </div>
          {/* <div className='flex items-center space-x-3'>
            <i className=' las la-door-open text-2xl'></i>
            <span className=' '>
              2 <span className='hidden sm:inline-block'>bedrooms</span>
            </span>
          </div> */}
        </div>
      </div>
    )
  }

  const renderDescription = () => {

    return (
      <div className='listingSection__wrap'>
        <h2 className='text-2xl font-semibold'>{item && item.title || '...'}</h2>
        <div className='w-14 border-b border-neutral-200 dark:border-neutral-700'></div>
        <div className='text-neutral-6000 dark:text-neutral-300'>

          {item && item.description && <>
            <AliAbiMDXViewer markdown={item.description} />
          </>}

        </div>
      </div>
    )
  }

  const travelPlanStep = (plan: any, index: number) => (
    <div key={index} className={`flex-grow p-3 rounded-lg ${index % 2 == 1 ? ' bg-slate-100 dark:bg-[#1f273a]' : ''}`}>
      <div className="flex justify-start space-x-3">
        <div className="flex flex-col">
          <div className="text-sm font-bold">
            {index + 1}. {t('Day')}
          </div>
          {/* <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              subtitle
            </span> */}
        </div>
        <div className="flex font-bold text-blue-700 dark:text-yellow-500">
          {plan.title}
        </div>
      </div>
      <span className="block mt-3 mb-5 text-neutral-6000 dark:text-neutral-300">
        {plan.description}
      </span>
    </div>
  )

  const renderTravelPlan = () => {
    return (
      <div className='listingSection__wrap'>
        <div>
          <h2 className='text-2xl font-semibold'>
            <i className='fa-solid fa-list-ol text-green-600'></i> {t('Travel Plan')}
          </h2>
          {/* <span className='block mt-2 text-neutral-500 dark:text-neutral-400'>
            {` About the property's amenities and services`}
          </span> */}
        </div>
        <div className='w-14 border-b border-neutral-200 dark:border-neutral-700'></div>

        {/* <div className='grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 '> */}
        <div className='text-sm text-neutral-700 dark:text-neutral-300 '>
          {item && item.travelPlan.map((e: any, index: number) => travelPlanStep(e, index))}

        </div>

      </div>
    )
  }

  const renderSidebar = () => {
    const fiyat = item && (item.price || 0) || 0
    const pBirim = item && item.currency || ''
    return (
      <div className='listingSectionSidebar__wrap shadow-xl'>
        {/* PRICE */}
        <div className='flex justify-between'>
          <span className='text-3xl font-semibold'>
            {fiyat > 0 && <span>{fiyat}<small>{pBirim}</small></span>}
            <span className='ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400'>
              {item && item.duration + ' Days'}
            </span>
          </span>
          <StartRating />
        </div>

        {/* FORM */}
        <form className='flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl '>
          <StayDatesRangeInput className='flex-1 z-[11]' />
          <div className='w-full border-b border-neutral-200 dark:border-neutral-700'></div>
          <GuestsInput className='flex-1' />
        </form>

        {/* SUM */}
        {/* <div className='flex flex-col space-y-4'>
          <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
            <span>$119 x 3 night</span>
            <span>$357</span>
          </div>
          <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
            <span>Service charge</span>
            <span>$0</span>
          </div>
          <div className='border-b border-neutral-200 dark:border-neutral-700'></div>
          <div className='flex justify-between font-semibold'>
            <span>Total</span>
            <span>$199</span>
          </div>
        </div> */}

        {/* SUBMIT */}
        <ButtonPrimary href={'/checkout'}>Buy</ButtonPrimary>
      </div >
    )
  }

  const renderHeader = () => {
    const SmallImage = ({ index, itemSrc }: { index: number, itemSrc: string }) => (
      // <div key={index} className={`relative rounded-md sm:rounded-xl overflow-hidden ${index >= 3 ? 'hidden sm:block' : ''}`} >
      <div key={index} className={`relative rounded-[3px] overflow-hidden ${index >= 3 ? 'hidden sm:block' : ''}`} >
        <div className='aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5'>
          {itemSrc &&
            <Image
              priority
              fill
              // className={`object-cover rounded-md sm:rounded-xl`}
              className={`object-cover rounded-[3px]`}
              src={itemSrc}
              alt=''
              sizes='400px'

            />
          }
          {!itemSrc &&
            <div
              // className={`object-cover rounded-md sm:rounded-xl bg-slate-500 400px lazy-loading`}
              className={`object-cover rounded-[3px] bg-slate-500 400px laz11y-load11ing`}
            >{` `}</div>
          }
        </div>
        <div
          className='absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer'
        // onClick={handleOpenModalImageGallery}
        />
      </div>
    )


    return (
      <header className='rounded-[3px] bg-white dark:bg-neutral-900 mt-8'>
        <div className='relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2'>
          <div
            className='col-span-2 row-span-3 sm:row-span-2 relative rounded-[3px] overflow-hidden cursor-pointer'
          // onClick={handleOpenModalImageGallery}
          >
            {item && item.images.length >= 1 &&
              <Image
                priority
                fill
                className={`object-cover rounded-[3px]`}
                // src={PHOTOS[0]}
                src={item.images[0].src}
                alt='qwerty'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'

              />
            }
            {!(item && item.images.length >= 1) &&
              <div
                className={`object-cover rounded-[3px] bg-slate-500 w-[650px] h-[530px]`}
              >{` `}</div>
            }
            <div
              className='absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer'
            />
          </div>


          <SmallImage index={1} itemSrc={item && item.images.length > 1 && item.images[1].src || ''} />
          <SmallImage index={2} itemSrc={item && item.images.length > 2 && item.images[2].src || ''} />
          <SmallImage index={3} itemSrc={item && item.images.length > 3 && item.images[3].src || ''} />
          <SmallImage index={4} itemSrc={item && item.images.length > 4 && item.images[4].src || ''} />

          <button
            className='absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10'
          // onClick={handleOpenModalImageGallery}
          >
            <Squares2X2Icon className='w-5 h-5' />
            <span className='ml-2 text-neutral-800 text-sm font-medium'>
              Show all photos
            </span>
          </button>
        </div>
      </header>

    )
  }

  const renderInclusionsExclusions = () => {

    return (
      <div className='listingSection__wrap'>
        <div className='grid grid-cols-1 md:grid-cols-2 space-x-2'>
          <div className='flex flex-col'>
            <h2 className='text-2xl font-semibold'>
              <i className='fa-solid fa-file-circle-plus text-blue-600'></i> {t('Inclusions')}
            </h2>
            <div className='w-full border-b border-neutral-200 dark:border-neutral-700'></div>
            <div className='text-neutral-6000 dark:text-neutral-300'>

              {item && item.inclusions && <>
                <AliAbiMDXViewer markdown={item.inclusions} />
              </>}

            </div>
          </div>
          <div className='flex flex-col'>
            <h2 className='text-2xl font-semibold'>
              <i className='fa-solid fa-file-circle-minus text-red-600'></i> {t('Exclusions')}
            </h2>
            <div className='w-full border-b border-neutral-200 dark:border-neutral-700'></div>
            <div className='text-neutral-6000 dark:text-neutral-300'>

              {item && item.exclusions && <>
                <AliAbiMDXViewer markdown={item.exclusions} />
              </>}

            </div>
          </div>
        </div>

      </div>
    )
  }

  useEffect(() => {
    if (!pullData) {
      getItem(params.id)
      setPullData(true)
    }
  }, [])



  return (
    <div className='container nc-ListingStayDetailPage mb-20'>
      {/*  HEADER */}
      {renderHeader()}
      {/* MAIN */}
      <main className=' relative z-10 mt-11 flex flex-col lg:flex-row '>
        {/* CONTENT */}
        <div className='w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10'>
          {renderSection1()}
          {renderDescription()}
          {renderTravelPlan()}
          {renderInclusionsExclusions()}
        </div>

        {/* SIDEBAR */}
        <div className='hidden lg:block flex-grow mt-14 lg:mt-0'>
          <div className='sticky top-28'>{renderSidebar()}</div>
        </div>
      </main>
    </div>
  )
}

export default PageDetail
