"use client"

import React, { useEffect } from "react"
import { redirect, usePathname } from "next/navigation"
import { useThemeMode } from "@/utils/useThemeMode"
// import { useLogin } from '@/yeni_auth'
import { useSession } from 'next-auth/react'

const ClientCommons = () => {
  const {data:session, status} = useSession()
  // const {status}=useLogin()

  const pathName=usePathname()
  // if(status!='authenticated' && !(pathName=='/login' || pathName.startsWith('/signup')) ){
  //   redirect('/login')
  //   return
  // }
  // console.log('pathname:',usePathname())
  // console.log('status:',status)
  useThemeMode()

  const pathname = usePathname()
  //  CUSTOM THEME STYLE
  useEffect(() => {
    const $body = document.querySelector("body")
    if (!$body) return

    let newBodyClass = ""

    // if (pathname === "/home-3") {
    //   newBodyClass = "theme-purple-blueGrey"
    // }
    // if (pathname === "/home-2") {
    //   newBodyClass = "theme-cyan-blueGrey"
    // }

    newBodyClass = "theme-purple-blueGrey"
    // newBodyClass = "theme-cyan-blueGrey"

    newBodyClass && $body.classList.add(newBodyClass)
    return () => {
      newBodyClass && $body.classList.remove(newBodyClass)
    }
  }, [pathname])

  return <></>
}

export default ClientCommons
