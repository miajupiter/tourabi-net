"use client"

import { Route } from "@/routers/types"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

export const Nav = () => {
  const pathname = usePathname()

  const listNav = [
    {href:"/account", text:"My Profile"},
    {href:"/account-orders", text:"My Orders"},
    {href:"/account-billing", text:"Billing & Payments"},
    // "/account-savelists",
    // "/account-password",
  ]

  return (
    <div className="container">
      <div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
        {listNav.map((item,index) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={index}
              href={item.href}
              className={`block py-5 md:py-8 border-b-2 flex-shrink-0 capitalize ${isActive
                  ? "border-primary-500 font-medium"
                  : "border-transparent"
                }`}
            >
              {item.text}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
