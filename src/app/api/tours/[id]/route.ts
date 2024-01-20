import { NextRequest, NextResponse } from 'next/server'
import  * as api from '@/utils/apiHelper'


export async function GET(req:NextRequest, { params }: { params: { id: string } }) {
  return api.Get({pathName:`/tours/${params.id}`})
}
