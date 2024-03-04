"use client"

import React, { FC, Fragment, useState, useEffect } from 'react'
import LocationGridBox from '../LocationGridBox'
import { useLogin } from '@/hooks/useLogin'
import { StaticImageData } from 'next/image'
import AliAbiMDXViewer from '@/components/Editor/AliAbiMDXEditor'
export interface PageLocationProps {
  params: { id: string }
}


export interface LocationItemType {
  _id: string
  title: string
  destination: string
  country: string
  description: string

  images?: []

}


const PageLocation: FC<PageLocationProps> = ({ params }: { params: { id: string } }) => {
  const { token } = useLogin()
  const [pullData, setPullData] = useState(false)
  const [item, setItem] = useState<LocationItemType>()

  const getItem = async (id: string) => {
    try {
      const ret = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/haham/locations/${id}`, {
        method: 'GET', headers: { 'Content-Type': 'application/json', token: token }
      })
      const result = await ret.json()
      if (result.success) {
        setItem(result.data)
      } else {
        alert(result.error)
      }
    } catch (err: any) {
      console.log('tryErr:', err.message || err)
    }
  }

  useEffect(() => {
    if (!pullData) {
      setPullData(true)
      // window.scrollTo(0, 0)
      getItem(params.id)
    }

  }, [])


  return (
    <div className={`container my-20`}>
      {item && <>
        <div className='grid grid-cols-3 space-x-4'>
          {item.images && item.images.map((itemImg: any, index: number) =>
            <div key={index}>
              <img className='rounded-[4px]' src={itemImg.src || ''} alt={`${item.title}`} />
            </div>
          )}

        </div>
        <h2 className='text-4xl mt-10 mb-10 capitalize '>{item.title}</h2>
        <h2 className='text-2xl mt-10 mb-10 '>{item.country || ''}</h2>
        <div className='w-[50%] border-b border-neutral-200 dark:border-neutral-700'></div>
        <AliAbiMDXViewer markdown={item.description || ''} />
      </>
      }
      <div className='mt-20 mb-10'>
        {/* <LocationGridBox headingCenter={true} /> */}
        {LocationGridBox({ headingCenter: true })}
      </div>
    </div>
  )
}

export default PageLocation
