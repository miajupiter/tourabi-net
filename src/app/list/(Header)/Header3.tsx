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

import { SearchFormFields } from "../type"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import HeroSearchFormSmall from '../(HeroSearchFormSmall)/HeroSearchFormSmall'
import HeroSearchForm2Mobile from '../(HeroSearchForm2Mobile)/HeroSearchForm2Mobile'

interface Header3Props {
  className?: string
}

let WIN_PREV_POSITION = 0
if (typeof window !== "undefined") {
  WIN_PREV_POSITION = (window as any).scrollY
}

const Header3: FC<Header3Props> = ({ className = "" }) => {
  const headerInnerRef = useRef<HTMLDivElement>(null)
  //
  const [showHeroSearch, setShowHeroSearch] =
    useState<SearchFormFields | null>()
  // const [currentTab, setCurrentTab] = useState<SearchTab>("Cars")

  useOutsideAlerter(headerInnerRef, () => {
    setShowHeroSearch(null)
    // setCurrentTab("Cars")
  })

  let pathname = usePathname()
  //

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

  //
  const renderHeroSearch = () => {
    return (
      <div
        className={`absolute inset-x-0 top-0 transition-all will-change-[transform,opacity] ${showHeroSearch
          ? "visible"
          : "-translate-x-0 -translate-y-[90px] scale-x-[0.395] scale-y-[0.6] opacity-0 invisible pointer-events-none"
          }`}
      >
        <div className={`w-full max-w-4xl mx-auto pb-6`}>
          <HeroSearchFormSmall
            defaultFieldFocus={showHeroSearch || undefined}
          // onTabChange={setCurrentTab}
          // defaultTab={currentTab}
          />
        </div>
      </div>
    )
  }

  const renderButtonOpenHeroSearch = () => {
    return (
      <div
        className={`w-full relative flex items-center justify-between border border-neutral-200 dark:border-neutral-6000 rounded-full shadow hover:shadow-md transition-all ${showHeroSearch
          ? "-translate-x-0 translate-y-20 scale-x-[2.55] scale-y-[1.8] opacity-0 pointer-events-none invisible"
          : "visible"
          }`}
      >
        <div className="flex items-center font-medium text-sm">
          <span
            onClick={() => setShowHeroSearch("location")}
            className="block pl-5 pr-4 cursor-pointer py-3"
          >
            Location
          </span>
          <span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
          <span
            onClick={() => setShowHeroSearch("dates")}
            className="block px-4 cursor-pointer py-3 "
          >
            Check In
          </span>
          <span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
          <span
            onClick={() => {
              setShowHeroSearch("guests")
            }}
            className="block px-4 cursor-pointer font-normal py-3"
          >
            Add guests
          </span>
        </div>

        <div
          className="flex-shrink-0 ml-auto pr-2 cursor-pointer"
          onClick={() => setShowHeroSearch("location")}
        >
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-6000  text-white">
            <MagnifyingGlassIcon className="w-5 h-5" />
          </span>
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        className={`nc-Header nc-Header-3 fixed z-40 top-0 inset-0 bg-black/30 dark:bg-black/50 transition-opacity will-change-[opacity] ${showHeroSearch ? "visible" : "invisible opacity-0 pointer-events-none"
          }`}
      ></div>
      {showHeroSearch && <div id="nc-Header-3-anchor"></div>}
      <header ref={headerInnerRef} className={`sticky top-0 z-40 bg-white dark:bg-neutral-900 ${className}`}>
        <div className='flex h-8 bg-[#0090d7]'></div>
        <div
          className={`bg-white dark:bg-neutral-900 absolute inset-x-0 top-8 transition-transform will-change-[transform,opacity]
           ${showHeroSearch ? "duration-75" : ""}   `}
        ></div>

        <div className="relative px-4 lg:container h-[140px] md:h-[88px] flex-grow">
          <div className="flex-1 flex justify-between items-center">

            <div className="relative z-10  md:flex flex-1 items-center">
              <Logo />
            </div>

            <div className=" md:flex relative z-10 flex-1 justify-end text-neutral-700 dark:text-neutral-100">
              <div className=" flex space-x-1 justify-end">
                <div className='hidden md:flex'>
                  <NotifyDropdown />
                  <AvatarDropdown />
                </div>
                <MenuBar />
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
