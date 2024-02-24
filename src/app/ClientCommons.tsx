"use client"

import React, { useEffect, useState } from "react"
import { redirect, usePathname } from "next/navigation"
import { useThemeMode } from "@/hooks/useThemeMode"

const ClientCommons = () => {
  const pathName = usePathname()
  useThemeMode()

  useEffect(() => {
    if ((localStorage.getItem('token') || '').length<10 && !(pathName == '/login' || pathName.startsWith('/signup'))) {
      redirect('/login')
      return
    }
    if ((localStorage.getItem('token') || '').length>10 && (pathName == '/login' || pathName.startsWith('/signup'))) {
      redirect('/')
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
  }, [pathName])

  return <></>
}

export default ClientCommons
