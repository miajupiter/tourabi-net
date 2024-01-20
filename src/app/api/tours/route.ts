import { NextRequest, NextResponse } from 'next/server'
import * as api from '@/utils/apiHelper'


export async function GET(req: NextRequest) {
  let query = new URL(req.url)
  console.log('req.url:', query.pathname)

  const page = (query.searchParams.get('page') || 1) as number
  const pageSize = (query.searchParams.get('pageSize') || 8) as number

  return api.Get({ pathName: '/tours', page: page, pageSize: pageSize })
}
