"use client"

import { useEffect } from "react"
import useLocalStorage from "./useLocalStorage"
import { v4 as uuid } from 'uuid'
import { createGlobalState } from "react-hooks-global-state"
import { redirect, useRouter } from 'next/navigation'
import { useLanguage } from '@/hooks/i18n'

const initialState = { isLoggedIn: false }
const { useGlobalState } = createGlobalState(initialState)

export const useLogin = () => {
  const { t } = useLanguage()
  const [token, setToken] = useLocalStorage('token', '')
  const [user, setUser] = useLocalStorage<any>('user', undefined)
  const [deviceId, setDeviceId] = useLocalStorage('deviceId', uuid())
  const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn")

  const router = useRouter()


  const logoutUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    // localStorage.removeItem('deviceId')
    location.href = '/login'
  }

  const loginUser = (email: string, password: string, redirectTo?: string) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password, deviceId: localStorage.getItem('deviceId') || deviceId || '' })
    })
      .then(ret => ret.json())
      .then(result => {

        if (result.success) {
          console.log('loginUser result', result.data)
          localStorage.setItem('token', result.data.token)
          localStorage.setItem('user', JSON.stringify(result.data.user))
          setToken(result.data.token)
          setUser(result.data.user)
          if (redirectTo) {
            if (window != undefined) {
              window.location.href = redirectTo
            } else {
              router.push(redirectTo)
            }
          }

        } else {
          alert(t(result.error))
        }
      })
      .catch((err: any) => {
        alert(t(err.message || err || 'error'))
      })

  }

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])


  return {
    isLoggedIn,
    token,
    user,
    logoutUser,
    loginUser,
  }
}
