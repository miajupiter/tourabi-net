// import {useLogin} from '@/hooks/useLogin'
export const getItem=(path:string,token:string)=>new Promise<any>((resolve, reject) => {
  // const {token}=useLogin()
  fetch(`${process.env.NEXT_PUBLIC_API_URI}${path}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', token: token }
  })
    .then(ret => ret.json())
    .then(result => {
      if (result.success) {
        resolve(result.data)
      } else {
        reject(result.error)
      }
    }).catch(reject)
})

export const getList=(path:string,token:string)=>new Promise<any>((resolve, reject) => {
  // const {token}=useLogin()
  fetch(`${process.env.NEXT_PUBLIC_API_URI}${path}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', token: token }
  })
    .then(ret => ret.json())
    .then(result => {
      if (result.success) {
        resolve(result.data)
      } else {
        reject(result.error)
      }
    }).catch(reject)
})

export const putItem=(path:string,token:string,item:any)=>new Promise<any>((resolve, reject) => {
  // const {token}=useLogin()
  fetch(`${process.env.NEXT_PUBLIC_API_URI}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', token: token },
    body: JSON.stringify(item)
  })
    .then(ret => ret.json())
    .then(result => {
      if (result.success) {
        resolve(result.data)
      } else {
        reject(result.error)
      }
    }).catch(reject)
})

export const postItem=(path:string,token:string,item:any)=>new Promise<any>((resolve, reject) => {
  // const {token}=useLogin()
  fetch(`${process.env.NEXT_PUBLIC_API_URI}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', token: token },
    body: JSON.stringify(item)
  })
    .then(ret => ret.json())
    .then(result => {
      if (result.success) {
        resolve(result.data)
      } else {
        reject(result.error)
      }
    }).catch(reject)
})

export const deleteItem=(path:string,token:string)=>new Promise<any>((resolve, reject) => {
  // const {token}=useLogin()
  fetch(`${process.env.NEXT_PUBLIC_API_URI}${path}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', token: token }
  })
    .then(ret => ret.json())
    .then(result => {
      if (result.success) {
        resolve(result.data)
      } else {
        reject(result.error)
      }
    }).catch(reject)
})

export interface SearchParamProps {
  filter?:any
  sort?:any
  select?:any
  populate?:any
  limit?:number
}
export const searchList=(path:string,token:string,searchParam:SearchParamProps)=>new Promise<any>((resolve, reject) => {
  // const {token}=useLogin()
  fetch(`${process.env.NEXT_PUBLIC_API_URI}${path}`, {
    method: 'SEARCH',
    headers: { 'Content-Type': 'application/json', token: token },
    body: JSON.stringify(searchParam)
  })
    .then(ret => ret.json())
    .then(result => {
      if (result.success) {
        resolve(result.data)
      } else {
        reject(result.error)
      }
    }).catch(reject)
})