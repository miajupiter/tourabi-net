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
import convertNumbThousand from '@/utils/convertNumbThousand'
import FormCard from '@/shared/FormCard'
import { ListPageTable } from '@/components/Table'
import { getItem, searchList } from '@/utils/apiHelper/fetch'
import { useQRCode } from 'next-qrcode'
import Link from 'next/link'
// import PlaceHolder from '@/images/placeholder-large.png'
// import PlaceHolderSmall from '@/images/placeholder-small.png'

const TAX_RATE = 10 // %

interface AnaluciatorProps {
  item?: TourExpeditionProps,
  description?: string,
  quantity?: number,
  price?: number,
  priceWithoutDiscount?: number,
  discountTotal?: number,
  subTotal?: number,
  taxTotal?: number,
  totalAmount?: number,
}

export interface TourExpeditionProps {
  _id?: string,
  tourId?: string | any,
  expeditionNumber?: string,
  duration: number,
  dateFrom?: string,
  dateTo?: string,
  deadline?: string,
  price?: number,
  currency?: string,
  priceWithourDiscount?: number
  singleSupplement: {
    normal: number,
    economy: number,
    comfort: number
  },
  pricePerPerson: [{
    personCount: number,
    normal: number,
    economy: number,
    comfort: number
  }],
  quantitySold?: 0,
}

export interface OrderProps {
  item: TourExpeditionProps,
  description?: string,
  quantity: number,
  price: number,
  priceWithoutDiscount: number,
  discountTotal: number,
  subTotal: number,
  taxTotal: number,
  totalAmount: number,
}
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
  // priceTable: []
  travelPlan: []
  currency: string
  price: number
  priceWithoutDiscount: number
  singleSupplement: number
  inclusions: string
  exclusions: string

}


const PageDetail: FC<PageDetailProps> = ({ params }: { params: { id: string } }) => {
  const { t } = useLanguage()
  const { token } = useLogin()
  const { Canvas } = useQRCode()
  let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false)

  const thisPathname = usePathname()
  const router = useRouter()
  const [sessionToken, setSessionToken] = useState('')
  const [item, setItem] = useState<TourItemType>()
  const [expeditions, setExpeditions] = useState<any[]>([])
  const [pullData, setPullData] = useState(false)
  // const [selectedExpedition, setSelectedExpedition] = useState<any>()
  const [orderObject, setOrderObject] = useState<AnaluciatorProps>({ description: 'yeni', price: 0 })
  const [adult, setAdult] = useState(1)
  const [child, setChild] = useState(0)
  const [baby, setBaby] = useState(0)

  const getFormData = (itemId: string) => {
    getItem(`/haham/tours/${itemId}`, token)
      .then(data => {
        setItem(data)
        searchList(`/haham/tourExpeditions`, token, {
          filter: { tourId: itemId },
          limit: 10,
          populate: [{ path: 'tourId', select: '_id title' }]
        })
          .then((result) => {
            setExpeditions(result.docs)
          })
          .catch(console.log)
      })
      .catch(console.log)

  }


  const renderSection1 = () => {

    return (
      <div className='listingSection__wrap !space-y-6'>
        {/* 1 */}
        <div className='flex justify-between items-center'>
          <Badge name={''} />
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
          <span className='text-base'>
            <i className='las la-map'></i>
            <span className='ms-1'>{` `} {item && item.places}</span>
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
          {/* <div className='flex items-center space-x-3'>
            <i className=' las la-bath text-2xl'></i>
            <span className=' '>
              3 <span className='hidden sm:inline-block'>baths</span>
            </span>
          </div> */}
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
      <FormCard id="tour-item-description" title={item && item.title || t('Description')}
        icon={(<i className="fa-solid fa-tree-city"></i>)}
        defaultOpen={true}
        className='rounded-2xl p-0' bodyClassName='p-3'

      >
        {item && item.description && <>
          <AliAbiMDXViewer markdown={item.description} />
        </>}
      </FormCard>
    )
  }

  const travelPlanStep = (plan: any, index: number) => (
    <div key={index} className={`flex-grow p-3 rounded-lg ${index % 2 == 1 ? ' bg-slate-100 dark:bg-[#1f273a]' : ''}`}>
      <div className="flex justify-start space-x-3">
        <div className="flex flex-col">
          <div className="text-sm font-bold">
            {index + 1}. {t('Day')}
          </div>

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
    return (<>
      <FormCard id="tour-item-travel-plan" title={t('Travel Plan')}
        icon={(<i className='fa-solid fa-list-ol text-green-600'></i>)}
        defaultOpen={true}
        className='rounded-2xl p-0' bodyClassName='p-3'
      >

        <div className='text-sm text-neutral-700 dark:text-neutral-300 '>
          {item && item.travelPlan.map((e: any, index: number) => travelPlanStep(e, index))}
        </div>
      </FormCard>
    </>)
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

    return (<>
      <FormCard id="tour-item-incclusion-exclusions" title={t('Inclusion/Exclusions')} defaultOpen={true}
        icon={(<i className="fa-solid fa-plus-minus  border"></i>)}
        className='rounded-2xl p-0' bodyClassName='p-3'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 space-x-2'>
          <div className='flex flex-col'>
            <h2 className='text-2xl font-semibold'>
              <i className='fa-regular fa-circle-check te11xt-blue-600'></i> {t('Inclusions')}
            </h2>
            <div className='w-full border-b border-neutral-200 dark:border-neutral-700'></div>
            <div className='text-neutral-6000 dark:text-neutral-300'>

              {item && item.inclusions && <>
                <AliAbiMDXViewer markdown={item.inclusions} />
              </>}

            </div>
          </div>
          <div className='flex flex-col'>
            <h2 className='text-2xl font-semibold space-x-2'>
              <i className='fa-regular fa-circle-xmark te11xt-red-600'></i> {t('Exclusions')}
            </h2>
            <div className='w-full border-b border-neutral-200 dark:border-neutral-700'></div>
            <div className='text-neutral-6000 dark:text-neutral-300'>

              {item && item.exclusions && <>
                <AliAbiMDXViewer markdown={item.exclusions} />
              </>}

            </div>
          </div>
        </div>
      </FormCard>
    </>
    )
  }



  const renderSidebar = () => {
    // const fiyat = item && (item.price || 0) || 0
    // const pBirim = item && item.currency || ''
    return (<>
      <div className='listingSectionSidebar__wrap shadow-xl'>
        <div className='flex justify-between'>
          <span className='text-3xl font-semibold'>
            {orderObject.item && <div>
              {/* {item.price > 0 && item.priceWithoutDiscount > item.price && <>
                <span className="text-base opacity-60 line-through mx-3">
                  {item.currency == 'USD' && <>
                    US ${convertNumbThousand(item.priceWithoutDiscount)}
                  </>}
                  {item.currency != 'USD' && <>
                    {convertNumbThousand(item.priceWithoutDiscount)}<span className='text-base opacity-75'>{item.currency}</span>
                  </>}
                </span>
              </>} */}
              <span className="text-lg font-semibold bg-indigo-700 text-white py-1 px-2 rounded-md">
                {orderObject.item.price || 0 > 0 && <>
                  {orderObject.item.currency == 'USD' && <>
                    US ${convertNumbThousand(orderObject.item.price)}
                  </>}

                  {orderObject.item.currency != 'USD' && <>
                    {convertNumbThousand(orderObject.item.price)}<span className='text-base opacity-75'>{orderObject.item.currency}</span>
                  </>}
                </>}
                {orderObject.item.price || 0 <= 0 && <>
                  US $ <i className="fa-solid fa-phone"></i> ??
                </>}
              </span>
            </div>
            }

            <span className='ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400'>
              {item && item.duration + ' Days'}
            </span>
          </span>
          <StartRating />
        </div>

        <form className='flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl '>
          <StayDatesRangeInput className='flex-1 z-[11]' />
          <div className='w-full border-b border-neutral-200 dark:border-neutral-700'></div>
          <GuestsInput className='flex-1' onChange={(ad, ch, ba) => {
            setAdult(ad)
            setChild(ch)
            setBaby(ba)  //bebekleri hesaplamiyoruz
            orderObject.quantity = ad + ch
            orderObject.subTotal = (orderObject.price || 0) * orderObject.quantity
            orderObject.taxTotal = Math.round(100 * TAX_RATE * orderObject.subTotal / 100) / 100
            orderObject.totalAmount = orderObject.subTotal + orderObject.taxTotal
            setOrderObject(orderObject)

          }} />
        </form>

        {orderObject.item && <>
          <div className='flex flex-col space-y-4'>
            <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
              <span>{orderObject.item.tourId.title}</span>
              <span>{orderObject.item.expeditionNumber}</span>
              {orderObject.item.expeditionNumber && <>
                <Canvas text={orderObject.item.expeditionNumber || ''} options={{
                  errorCorrectionLevel: 'M', margin: 1, scale: 0.5, width: 48, color: { dark: '#000000FF', light: '#F2F2F2FF' },
                }} />
              </>}
            </div>
            <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
              <span>${orderObject.price} x {orderObject.quantity}</span>
              <span>${orderObject.subTotal}</span>

            </div>
            <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
              <span>Service charge</span>
              <span>$0</span>
            </div>
            <div className='border-b border-neutral-200 dark:border-neutral-700'></div>
            <div className='flex justify-between font-semibold'>
              <span>Tax Total({TAX_RATE}%)</span>
              <span>${orderObject.taxTotal}</span>
            </div>
            <div className='flex justify-between font-semibold'>
              <span>Total</span>
              <span>${orderObject.totalAmount}</span>
            </div>
          </div>
        </>}

        <ButtonPrimary href={'/checkout'}>Add My Order List</ButtonPrimary>

      </div >
    </>)
  }

  const renderTourExpeditions = () => {
    return (<>
      <FormCard id="tour-item-expeditions" title={t('Tour Expeditions & Dates & Prices')}
        icon={(<><i className="fa-solid fa-money-check-dollar"></i><i className='fa-solid fa-list-ol'></i></>)}
        defaultOpen={true}
        className='rounded-2xl p-0' bodyClassName='p-0'
        headerClassName='p-0'
      >
        <ListPageTable
          docs={expeditions} page={1} pageCount={1} pageSize={10} totalDocs={10}
          theadTrTdClassName='text-start'
          className='m-0 p-0 border-none'
          // rowCustomButton={()=>}
          onRenderRow={(tr, colItem, colIndex, rowIndex) => <>
            {colIndex == 0 && <>
              <div className='flex space-x-3'>
                <div className='flex-none'>
                  <Canvas text={tr.expeditionNumber || ''} options={{
                    errorCorrectionLevel: 'M', margin: 1, scale: 0.5, width: 48, color: { dark: '#000000FF', light: '#F2F2F2FF' },
                  }} />
                </div>
                <div className='flex-auto'>

                  <div className='flex justify-between items-center'>
                    <div className='flex flex-col'>
                      <h5 className='text-sm font-medium'>{tr.tourId.title}</h5>
                      <p className='text-[9px]'>{tr.expeditionNumber} </p>
                    </div>
                    <div className='text-[10px] px-2 py-1 bg-green-800 text-white rounded-full'>{tr.duration} Days</div>
                  </div>

                </div>
              </div>
            </>}
            {colIndex == 1 && <>
              <div className='flex flex-col'>
                <div className='text-[14px]'>{tr.dateFrom}</div>
                <div className='text-[14px]'>{tr.dateTo}</div>
              </div>

            </>}
            {colIndex == 2 && <>
              <div className='text-[14px]'>{tr.deadline}</div>
            </>}
            {colIndex == 3 && <>
              <div className='flex flex-col space-y-2 justify-normal items-center'>
                <div className='text-[12px] font-bold'>US ${convertNumbThousand(tr.price)}</div>
                <div className='line-through text-opacity-60 text-[12px]'>{convertNumbThousand(tr.priceWithoutDiscount)}</div>
              </div>
            </>}
            {colIndex == 4 && <>
              <Link href="#"
                className='px-3 py-1 rounded-lg bg-blue-700 text-white'
                onClick={(e) => {
                  e.preventDefault()
                  orderObject.item = { ...orderObject.item, ...tr }
                  orderObject.price = tr.price
                  orderObject.quantity = 1

                  // setSelectedExpedition(tr)
                  setOrderObject(orderObject)

                }}>Select ({tr.status})</Link>
            </>}
          </>}
          columns={[t('Tour & Expedition Number'), t('Dates'), t('Deadline'), t('Price'), t('Status')]}
        />
      </FormCard>
    </>)
  }


  const Analuciator: FC<AnaluciatorProps> = ({
    item, description, quantity, price, priceWithoutDiscount, discountTotal, subTotal, taxTotal, totalAmount
  }) => {
    subTotal = (price || 0) * (quantity || 0)
    taxTotal = 0.1 * subTotal
    totalAmount = subTotal + taxTotal
    return <>
      <div className='grid grid-cols-1 gap-4'>
        <div className='grid grid-cols-2 gap-4'>
          <span className='text-end'>subTotal: </span>
          <span className='text-end'>$ {convertNumbThousand(subTotal)}</span>

          <span className='text-end'>20% Tax:</span>
          <span className='text-end'>$ {convertNumbThousand(taxTotal)}</span>
          <div className='col-span-2 border-b border-opacity-20'>{` `}</div>

          <span className='text-end'>Total Amount:</span>
          <span className='text-end'>$ {convertNumbThousand(totalAmount)}</span>
        </div>
      </div>
    </>
  }


  useEffect(() => {
    if (!pullData) {
      setPullData(true)
      getFormData(params.id)
    }
  }, [])



  return (
    <div className='container nc-ListingStayDetailPage mb-20'>

      {renderHeader()}

      <main className=' relative z-10 mt-11 flex flex-col lg:flex-row '>
        {/* CONTENT */}
        <div className='w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10'>
          {renderSection1()}
          {renderTourExpeditions()}
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
