"use client"

import React, { useEffect, useState } from "react"
import { redirect, usePathname } from "next/navigation"
import { useThemeMode } from "@/utils/useThemeMode"
// import { useLogin } from '@/yeni_auth'
// import { useSession } from 'next-auth/react'

const ClientCommons = () => {
  // const {data:session, status} = useSession()
  // const {status}=useLogin()
  const [token, setToken] = useState('')
  const pathName = usePathname()
  // if((window.localStorage.getItem('token') || '')=='' && !(pathName=='/login' || pathName.startsWith('/signup')) ){
  //   redirect('/login')
  //   return
  // }
  // console.log('pathname:',usePathname())
  // console.log('status:',status)
  useThemeMode()

  const pathname = usePathname()
  //  CUSTOM THEME STYLE
  useEffect(() => {
    setToken(localStorage.getItem('token') || '')
    if ((localStorage.getItem('token') || '') == '' && !(pathName == '/login' || pathName.startsWith('/signup'))) {
      redirect('/login')
      return
    }
    const $body = document.querySelector("body")
    if (!$body) return

    let newBodyClass = ""


    newBodyClass = "theme-purple-blueGrey"


    newBodyClass && $body.classList.add(newBodyClass)
    return () => {
      newBodyClass && $body.classList.remove(newBodyClass)
    }
  }, [pathname, token])

  return <></>
}

export default ClientCommons
