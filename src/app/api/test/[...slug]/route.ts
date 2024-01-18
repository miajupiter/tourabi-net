import { url } from 'inspector'
import type { NextResponse, NextRequest } from 'next/server'
import { urlToHttpOptions } from 'url'

export async function GET(req: Request,{ params }: { params: { slug: string } }) {
  let query=new URL(req.url)
  console.log('req.url:', query)
  console.log('params from ...slug:', params)

  return new Response('Lorem ipsum dolor sit amet, consectetur adip')
}
