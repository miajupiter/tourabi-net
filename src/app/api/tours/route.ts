import { NextRequest, NextResponse } from 'next/server'
import * as api from '@/utils/apiHelper'


export async function GET(req: NextRequest) {
  let query = new URL(req.url)

  const page = (query.searchParams.get('page') || 1) as number
  const pageSize = (query.searchParams.get('pageSize') || 8) as number

  const dd={ pathName: '/tours', page: page, pageSize: pageSize }
  console.log('dd:',dd)
  return api.Get({ pathName: '/tours', page: page, pageSize: pageSize })
}
