"use client"

import React, { FC, Fragment, useState, useEffect } from 'react'
import DestinationGridBox from '../DestinationGridBox'
import { useLogin } from '@/hooks/useLogin'
import { StaticImageData } from 'next/image'
import AliAbiMDXViewer from '@/components/Editor/AliAbiMDXEditor'
export interface PageDestinationProps {
  params: { id: string }
}


export interface DestinationItemType {
  id: string
  title: string
  country: string
  description: string

  images?: []

}


const PageDestination: FC<PageDestinationProps> = ({ params }: { params: { id: string } }) => {
  const { token } = useLogin()
  const [pullData, setPullData] = useState(false)
  const [item, setItem] = useState<DestinationItemType>()

  const getItem = (id: string) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/destinations/${id}`, {
      method: 'GET', headers: { 'Content-Type': 'application/json', token }
    })
      .then(ret => ret.json())
      .then(result => {
        if (result.success) {
          setItem(result.data)
        } else {
          alert(result.error)
        }
      })
      .catch(err => {
        console.log('getItem err:', err)
      })
  }
  useEffect(() => {
    if (!pullData) {
      setPullData(true)
      window.scrollTo(0, 0)
      getItem(params.id)
    }

  }, [])


  return (
    <div className={`container my-20`}>
      {item &&
        <div>
          <div className='grid grid-cols-3 space-x-4'>
            {item.images && item.images.map((itemImg: any, index: number) =>
              <div key={index}>
                <img className='rounded-[4px]' src={itemImg.image} alt={`${item.title}`} />
              </div>
            )}

          </div>
          <h2 className='text-4xl mt-10 mb-10 capitalize '>{item.title}</h2>
          <h2 className='text-2xl mt-10 mb-10 '>{item.country || ''}</h2>
          <div className='w-[50%] border-b border-neutral-200 dark:border-neutral-700'></div>
          <AliAbiMDXViewer markdown={item.description || ''} />
        </div>
      }
      <div className='mt-20 mb-10'>
        <DestinationGridBox headingCenter={true} />
      </div>
    </div>
  )
}

export default PageDestination
