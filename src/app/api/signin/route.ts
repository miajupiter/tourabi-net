import { NextRequest, NextResponse } from 'next/server'
import  * as api from '@/utils/apiHelper'

export async function GET(request: Request) {
  return NextResponse.json({success:true,data:'ok:get'})
}

export async function POST(req: NextRequest) {
  const data=await req.json()
  const result=await api.Post({
    pathName:'/auth/socialLogin',
    body:data,
  })
  
  //return NextResponse.json({success:true,data:'post ok'})
  
  return result
}
