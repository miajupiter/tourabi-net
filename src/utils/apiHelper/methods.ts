"use server"

import { NextResponse } from 'next/server'
import { getToken } from './getToken'

export interface RestResultType {
  success: boolean,
  error?: string | { name?: string, message: string }
  data?: string | any
}

export interface GetRequestType {

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


export async function Get(pathName: string, params?: GetRequestType) {
  try {
    const token=await getToken()
    console.log('token:',token)
    const headers = Object.assign({}, (params?.headers || {}), { 'Content-Type': 'application/json','token': token })
    const ret = await fetch(`${process.env.NEXT_PUBLIC_API_URI}${pathName}`, { method: 'GET', headers: headers })
    const resp = await ret.json()
    return NextResponse.json(resp)
  } catch (err: any) {
    console.log('err:',err)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}

export async function Post(pathName: string, params: PostRequestType) {
  try {
    const token=await getToken()
    const headers = Object.assign({}, (params.headers || {}), { 'Content-Type': 'application/json','token': token })
    const ret = await fetch(`${process.env.NEXT_PUBLIC_API_URI}${pathName}`, { method: 'POST', body: params.body, headers: headers })
    const resp = await ret.json()
    return NextResponse.json(resp.data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}

export async function Put(pathName: string, params: PutRequestType) {
  try {
    const token=await getToken()
    const headers = Object.assign({}, (params.headers || {}), { 'Content-Type': 'application/json','token': token })
    const ret = await fetch(`${process.env.NEXT_PUBLIC_API_URI}${pathName}`, { method: 'PUT', body: params.body, headers: headers })
    const resp = await ret.json()
    return NextResponse.json(resp.data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}


export async function Delete(pathName: string, params: DeleteRequestType) {
  try {
    const token=await getToken()
    const headers = Object.assign({}, (params.headers || {}), { 'Content-Type': 'application/json','token': token })
    const ret = await fetch(`${process.env.NEXT_PUBLIC_API_URI}${pathName}`, { method: 'DELETE', headers: headers })
    const resp = await ret.json()
    return NextResponse.json(resp)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}