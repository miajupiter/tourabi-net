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


  return (
    <>
      <Header3 className={''} />
      <div ref={anchorRef} className='h-1 absolute invisible'></div>
    </>
  )
}

export default SiteHeader
