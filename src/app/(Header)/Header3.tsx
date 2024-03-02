"use client"

import React, { FC, useEffect, useRef, useState } from "react"
import Logo from "@/shared/Logo"
import useOutsideAlerter from "@/hooks/useOutsideAlerter"
import NotifyDropdown from "./NotifyDropdown"
import AvatarDropdown from "./AvatarDropdown"
import MenuBar from "@/shared/MenuBar"

// import HeroSearchForm2MobileFactory from "../(client-components)/(HeroSearchForm2Mobile)/HeroSearchForm2MobileFactory"
// import HeroSearchFormSmall from "../(client-components)/(HeroSearchFormSmall)/HeroSearchFormSmall"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { SearchFormFields } from "../tours/type"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import HeroSearchFormSmall from '../(HeroSearchFormSmall)/HeroSearchFormSmall'
import HeroSearchForm2Mobile from '../(HeroSearchForm2Mobile)/HeroSearchForm2Mobile'
import IconMapEdit from '@/images/TdesignMapEdit.svg'
import { useLanguage } from '@/hooks/i18n'
interface Header3Props {
  className?: string
}

let WIN_PREV_POSITION = 0
if (typeof window !== "undefined") {
  WIN_PREV_POSITION = (window as any).scrollY
}

const Header3: FC<Header3Props> = ({ className = "" }) => {
  const {t}=useLanguage()
  const headerInnerRef = useRef<HTMLDivElement>(null)

  const [showHeroSearch, setShowHeroSearch] = useState<SearchFormFields | null>()

  useOutsideAlerter(headerInnerRef, () => {
    setShowHeroSearch(null)
  })

  let pathname = usePathname()

  const handleEvent = () => {
    window.requestAnimationFrame(handleHideSearchForm)
  }

  const handleHideSearchForm = () => {
    if (!document.querySelector("#nc-Header-3-anchor")) {
      return
    }
    //
    let currentScrollPos = window.scrollY
    if (
      WIN_PREV_POSITION - currentScrollPos > 100 ||
      WIN_PREV_POSITION - currentScrollPos < -100
    ) {
      setShowHeroSearch(null)
    } else {
      return
    }
    WIN_PREV_POSITION = currentScrollPos
  }


  useEffect(() => {
    setShowHeroSearch(null)
  }, [pathname])

  // HIDDEN WHEN SCROLL EVENT
  useEffect(() => {
    window.addEventListener("scroll", handleEvent)
    return () => {
      window.removeEventListener("scroll", handleEvent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
     
      <header ref={headerInnerRef} className={`sticky top-0 z-40 bg-white dark:bg-neutral-900 ${className}`}>
        <div className='flex h-8 bg-[#0090d7]'></div>
        <div
          className={`bg-white dark:bg-neutral-900 absolute inset-x-0 top-8 transition-transform will-change-[transform,opacity]
           ${showHeroSearch ? "duration-75" : ""}   `}
        ></div>

        <div className="relative px-4 lg:container h-[140px] md:h-[88px] flex-grow">
          <div className="flex-1 flex justify-between items-center">

            <div className="relative z-10  md:flex flex-2 items-center">
              <Logo className='h-24 md:h-full' />
            </div>

            <div className=" md:flex relative z-10 flex-1 h-24 justify-end text-neutral-700 dark:text-neutral-100">
              <div className=" flex space-x-1 justify-end ">
                <div className='hidden md:flex items-center text-center'>
                  <div className='mx-3 text-sm'>
                    <Link href="/destinations" >
                      <i className='fa-solid fa-map-location-dot text-4xl' ></i><br />
                      <span className=''>Destinations</span>
                    </Link>
                  </div>
                  <div className='mx-3 text-sm'>
                    <Link href="/locations" >
                      <i className='fa-solid fa-mountain-city text-4xl' ></i><br />
                      <span className=''>Locations</span>
                    </Link>
                  </div>
                  <div className='text-sm mx-3'>
                    <Link href="https://wa.me/994506807191" target='_blank' >
                      <i className='fa-brands fa-whatsapp text-4xl'></i><br />
                      {/* <span className=''>{'+994 50 680 71 91'}</span> */}
                      <span className=''>{t('Support')}</span>
                    </Link>
                  </div>
                  <div className='text-sm mx-3'>
                    <Link href="/tours">
                      <i className='fa-solid fa-search text-4xl'></i><br />
                      <span className=''>Search</span>
                    </Link>
                  </div>
                  <div className='text-4xl mx-3'>
                    <NotifyDropdown />
                  </div>
                </div>
                <div className='mt-8 md:mt-0 self-center'>
                  <AvatarDropdown />
                </div>

                <MenuBar className='mt-8 md:mt-0 ' />
              </div>
            </div>
          </div>
        </div>
        <div className='relative flex h-8 bg-[#97b816]'></div>
        <div className="relative px-4 lg:container flex-grow">
          <div className="self-center flex-1 md:hidden w-full max-w-md mx-auto mb-30">
            <HeroSearchForm2Mobile />
          </div>
        </div>
      </header>

    </>
  )
}

export default Header3
