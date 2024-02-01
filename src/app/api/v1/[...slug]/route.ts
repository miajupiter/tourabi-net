import { NextRequest, NextResponse } from 'next/server'
// import * as api from '@/utils/apiHelper'
import { auth } from "auth"
import type { Session } from "next-auth"
import { NextAuthRequest } from 'next-auth/lib'

import { cookies } from "next/dist/client/components/headers"
export interface ApiV1Props {
  params: {
    slug: []
  }
}

export function getSessionToken(){
  let sessionToken=cookies().get("tourabi.sessionToken")
  console.log(`sessionToken:`,sessionToken)
  if(sessionToken && sessionToken.value){
    return sessionToken.value
  }else{
    return ''
  }
}

export async function getFetchParams(req:NextRequest, p:ApiV1Props){
  const session: Session | null = await auth()
  console.log('session:', session)
  const token = getSessionToken()
  const pathName='/' + p.params.slug.join('/')
  let searchParams:string[]=[]
  let queryString=''
  new URL(req.url).searchParams.forEach((val,key)=>{
    searchParams.push(`${key}=${val}`)
  })
  if(searchParams.length>0){
    queryString='?' + searchParams.join('&')
  }
  let result={
    url : `${process.env.NEXT_PUBLIC_API_URI}${pathName}${queryString}`,
    headers:Object.assign({}, { 
      'email': session?.user.email || '',
      'token': token
    })
  }
  return result
}

export  async function GET(req:NextRequest, p:ApiV1Props) {
  console.log('api/v1/GET')
  let sessionToken=cookies().get("tourabi.sessionToken")
  console.log(`sessionToken2:`,sessionToken)
  const session: Session | null = await auth()
  console.log('session:', session)
  const config=await getFetchParams(req,p)
  console.log(`config:`,config)
  const ret=await fetch(config.url,{method:'GET',headers:config.headers})
  const resp=await ret.json()
  return NextResponse.json(resp)
}

export async function POST(req:NextRequest, p:ApiV1Props) {
  const config=await getFetchParams(req,p)
  const body=await req.json()
  const ret=await fetch(config.url,{method:'POST',headers:config.headers, body:body})
  const resp=await ret.json()
  return NextResponse.json(resp)
}

export async function PUT(req: NextRequest, p: ApiV1Props) {
  const config=await getFetchParams(req,p)
  const body=await req.json()
  const ret=await fetch(config.url,{method:'PUT',headers:config.headers, body:body})
  const resp=await ret.json()
  return NextResponse.json(resp)
}
export async function DELETE(req: NextRequest, p: ApiV1Props) {
  const config=await getFetchParams(req,p)
  const ret=await fetch(config.url,{method:'DELETE',headers:config.headers})
  const resp=await ret.json()
  return NextResponse.json(resp)
}