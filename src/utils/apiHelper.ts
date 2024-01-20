import { NextResponse } from 'next/server'
import axios, { AxiosError } from 'axios'

const tempToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiI2NWFhMDlhYjdhMTA3YWNmZmY5MDVlZjIiLCJpYXQiOjE3MDU2NDI0MTEsImV4cCI6MTc5MjA0MjQxMX0.Cfr5KPV7XVRpTVidy297F_MxiO3DMjx_iIHNolgQ9w4'
export interface RestResultType {
  success: boolean,
  error?: string | { name?: string, message: string }
  data?: string | any
}

export interface GetRequestType {
  pathName: string
  page?:number | 1
  pageSize?:number | 8
  query?: {}
  headers?: {}
}

export interface PostRequestType extends GetRequestType {
  body?: any,
}


export interface PutRequestType extends GetRequestType {
  body?: any,
}
export interface DeleteRequestType extends GetRequestType {
}

export async function Get(params: GetRequestType) {
  try {
    const url = `${process.env.API_URI}${params.pathName}?page=${params.page}&pageSize=${params.pageSize}`
    let headers = Object.assign({}, params.headers, { 'token': tempToken })
    const resp = await axios.get(url, { headers: headers, responseType: 'json' })
    return NextResponse.json(resp.data)
  } catch (err) {
    return ErrorResponse(err as AxiosError)
  }
}

export async function Post(params: PostRequestType) {
  try {
    const url = `${process.env.API_URI}${params.pathName}`
    const headers = Object.assign({}, params.headers, { 'Content-Type': 'application/json', 'token': tempToken })
    const resp = await axios.post(url, params.body, { headers: headers })
    return NextResponse.json(resp.data)
  } catch (err) {
    return ErrorResponse(err as AxiosError)
  }
}

export async function Put(params: PutRequestType) {
  try {
    const url = `${process.env.API_URI}${params.pathName}`
    const headers = Object.assign({}, params.headers, { 'token': tempToken })
    const resp = await axios.post(url, params.body, { headers: headers })
    return NextResponse.json(resp.data)
  } catch (err) {
    return ErrorResponse(err as AxiosError)
  }
}


export async function Delete(params: DeleteRequestType) {
  try {
    const url = `${process.env.API_URI}${params.pathName}`
    const headers = Object.assign({}, params.headers, { 'Content-Type': 'application/json; charset=UTF-8', 'token': tempToken })
    const resp = await axios.delete(url, { headers: headers, responseType: 'json', })
    return NextResponse.json(resp.data)
  } catch (err) {

    return ErrorResponse(err as AxiosError)
  }
}


function ErrorResponse(err: AxiosError): NextResponse {
  var e = err as AxiosError
  return NextResponse.json(e.response?.data || 'Error', { status: e.response?.status,  statusText: e.response?.statusText })
}