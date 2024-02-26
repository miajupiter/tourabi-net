"use client"

import Logo from "@/shared/Logo"
import SocialsList1 from "@/shared/SocialsList1"
import { CustomLink } from "@/data/types"
import React from "react"
import FooterNav from "./FooterNav"
import { useSession } from "next-auth/react"
// import SessionData from "@/shared/session-data"


export interface WidgetFooterMenu {
  id: string
  title: string
  menus: CustomLink[]
}

const widgetMenus: WidgetFooterMenu[] = [
  // {
  //   id: "5",
  //   title: "Getting started",
  //   menus: [
  //     { href: "#", label: "Installation" },
  //     { href: "#", label: "Release Notes" },
  //     { href: "#", label: "Upgrade Guide" },
  //     { href: "#", label: "Browser Support" },
  //     { href: "#", label: "Editor Support" },
  //   ],
  // },
  {
    id: "1",
    title: "Explore",
    menus: [
      { href: "/destination", label: "Destinations" },
      { href: "/tours", label: "Tours" },
      // { href: "#", label: "Design systems" },
      // { href: "#", label: "Pricing" },
      // { href: "#", label: "Security" },
    ],
  },
  {
    id: "2",
    title: "Resources",
    menus: [
      { href: "/install", label: "Install App" },
      { href: "https://github.com/miajupiter/tourabi-api", label: "API Resources" },
      { href: "https://github.com/miajupiter/tourabi-net", label: "Frontside Resources" },
      // { href: "#", label: "Developers" },
      // { href: "#", label: "Learn design" },
      // { href: "#", label: "Releases" },
    ],
  },
  {
    id: "4",
    title: "Community",
    menus: [
      // { href: "/login", label: "Login" },
      { href: "/subscription", label: "Subscription" },
      // { href: "#", label: "Community Resources" },
      // { href: "#", label: "Contributing" },
      // { href: "#", label: "Concurrent Mode" },
    ],
  },
]

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-yellow-500 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-100  dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }


  return (
    <>
      <FooterNav />

      <div className="nc-Footer relative bg-[#0090d7] text-white dark:bg-neutral-800  py-12 lg:py-18 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
          <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
            <div className="col-span-2 md:col-span-1">
              <Logo classNameImg='w-[160px] md:w-[220px]' />
            </div>
            
          </div>
            {widgetMenus.map(renderWidgetMenuItem)}
            <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2.5 lg:items-start" />

        </div>

      </div>

    </>
  )
}

export default Footer
