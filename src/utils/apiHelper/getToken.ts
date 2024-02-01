"use server"

import { cookies } from "next/headers"


export async function getToken() {
  const cookieStore = await cookies()
  const token = await cookieStore.get("tourabi.sessionToken")
  console.log('token:', token)
  if (token && token.value) {
    return token.value
  } else {
    return ''
  }
}
