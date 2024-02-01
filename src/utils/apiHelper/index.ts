export { getToken } from './getToken'
// export { awsClient } fro./!!__awsClient.ts.bakent'
export { awsGetObject } from './awsGetObject'
export { awsPutObject } from './awsPutObject'

import { NextResponse } from 'next/server'


// export interface RestResultType {
//   success: boolean,
//   error?: string | { name?: string, message: string }
//   data?: string | any
// }

// export interface GetRequestType {
//   page?: number | 1
//   pageSize?: number | 8
//   query?: {}
//   headers?: {}
// }

// export interface PostRequestType extends GetRequestType {
//   body?: any,
// }


// export interface PutRequestType extends GetRequestType {
//   body?: any,
// }
// export interface DeleteRequestType extends GetRequestType {
// }


// export async function Get(pathName: string, params: GetRequestType) {
//   try {
//     const url = `${process.env.NEXT_PUBLIC_API_URI}${pathName}?page=${params.page}&pageSize=${params.pageSize}`
//     let headers = Object.assign({}, params.headers, { 'token': 'tempToken' })
//     const ret = await fetch(url, { method: 'GET', headers: headers })
//     const resp = await ret.json()
//     return NextResponse.json(resp)
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 })
//   }
// }

// export async function Post(pathName: string, params: PostRequestType) {
//   try {
//     const url = `${process.env.NEXT_PUBLIC_API_URI}${pathName}`
//     const headers = Object.assign({}, params.headers, { 'Content-Type': 'application/json', 'token': 'tempToken' })
//     const ret = await fetch(url, { method: 'POST', body: params.body, headers: headers })
//     const resp = await ret.json()
//     return NextResponse.json(resp.data)
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 })
//   }
// }

// export async function Put(pathName: string, params: PutRequestType) {
//   try {
//     const url = `${process.env.NEXT_PUBLIC_API_URI}${pathName}`
//     const headers = Object.assign({}, params.headers, { 'Content-Type': 'application/json', 'token': 'tempToken' })
//     const ret = await fetch(url, { method: 'PUT', body: params.body, headers: headers })
//     const resp = await ret.json()
//     return NextResponse.json(resp.data)
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 })
//   }
// }


// export async function Delete(pathName: string, params: DeleteRequestType) {
//   try {
//     const url = `${process.env.NEXT_PUBLIC_API_URI}${pathName}?page=${params.page}&pageSize=${params.pageSize}`
//     let headers = Object.assign({}, params.headers, { 'token': 'tempToken' })
//     const ret = await fetch(url, { method: 'DELETE', headers: headers })
//     const resp = await ret.json()
//     return NextResponse.json(resp)
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 })
//   }
// }