"use client"
import { useEffect } from "react"

import { createGlobalState } from "react-hooks-global-state"

const initialState = { token: '', user: null }
const { useGlobalState } = createGlobalState(initialState)

export const useLogin = () => {
  const [token, setToken] = useGlobalState('token')
  const [user, setUser] = useGlobalState<any>('user')

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token') as string)
    }else{
      setToken('')
    }


    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user') || ''))
    } else {
      setUser(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])




  const logoutUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    location.href = '/login'
  }
  return {
    token,
    user,
    logoutUser,
  }
}
