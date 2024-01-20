import { NextRequest, NextResponse } from 'next/server'
import  * as api from '@/utils/apiHelper'


export async function GET(req:NextRequest) {
  return api.Get({pathName:'/tours?pageSize=12'})
}
