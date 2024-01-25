'use client'

import React, { Fragment, useEffect, useRef, useState } from 'react'
import {
  ShoppingBagIcon as ShoppingCartIcon,
  Cog8ToothIcon as CogIcon,
} from '@heroicons/react/24/outline'
import { Popover, Transition } from '@headlessui/react'
import { PathName } from '@/routers/types'
import Link from 'next/link'
// import Header from './Header'
import Header3 from './(Header)/Header3'
import { usePathname } from 'next/navigation'
import { useThemeMode } from '@/utils/useThemeMode'

export type SiteHeaders = 'Header 1' | 'Header 2' | 'Header 3'

interface HomePageItem {
  name: string
  slug: PathName
}

let OPTIONS = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0,
}
let OBSERVER: IntersectionObserver | null = null


const SiteHeader = () => {
  const anchorRef = useRef<HTMLDivElement>(null)


  const [isTopOfPage, setIsTopOfPage] = useState(true)

  useEffect(() => {
    setIsTopOfPage(window.scrollY < 5)
  }, [])
  //
  // useThemeMode()
  //
  const pathname = usePathname()

  const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      setIsTopOfPage(entry.isIntersecting)
    })
  }


  const renderRadioHeaders = () => {
    return (
      <div className='mt-4'>
        <span className='text-sm font-medium'>Header Styles</span>
        <div className='mt-1.5 flex items-center space-x-2'>
          <div key={'header'}
            className={`py-1.5 px-3.5 flex items-center rounded-full font-medium text-xs cursor-pointer select-none bg-black text-white shadow-black/10 shadow-lg`} >
            qwerty
          </div>
        </div>
      </div>
    )
  }

  const renderRadioHomePages = () => {
    return (
      <div className='mt-4'>
        qwerty
      </div>
    )
  }

  // FOR DEMO PAGE
  const renderControlSelections = () => {
    return (
      <div className='ControlSelections relative z-40 hidden lg:block'>
        <div className='fixed right-3 top-1/4 z-40 flex items-center'>
          <Popover className='relative'>
            {({ open }) => (
              <>
                <Popover.Button
                  className={`p-2.5 bg-white hover:bg-neutral-100 dark:bg-primary-6000 dark:hover:bg-primary-700 rounded-xl shadow-xl border border-neutral-200 dark:border-primary-6000 z-10 focus:outline-none ${open ? ' focus:ring-2 ring-primary-500' : ''
                    }`}
                >
                  <CogIcon className='w-8 h-8' />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-200'
                  enterFrom='opacity-0 translate-y-1'
                  enterTo='opacity-100 translate-y-0'
                  leave='transition ease-in duration-150'
                  leaveFrom='opacity-100 translate-y-0'
                  leaveTo='opacity-0 translate-y-1'
                >
                  <Popover.Panel className='absolute right-0 z-10 mt-3 w-screen max-w-sm'>
                    <div className='rounded-2xl bg-white dark:bg-neutral-800 overflow-hidden nc-custom-shadow-1'>
                      <div className='relative p-6'>
                        <span className='text-xl font-semibold'>Customize</span>
                        <div className='w-full border-b border-neutral-200 dark:border-neutral-700 mt-4'></div>
                        {renderRadioHeaders()}
                        {renderRadioHomePages()}
                      </div>

                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      </div>
    )
  }

 

  return (
    <>
      {/* {renderControlSelections()} */}
      <Header3 className={''} />
      <div ref={anchorRef} className='h-1 absolute invisible'></div>
    </>
  )
}

export default SiteHeader
