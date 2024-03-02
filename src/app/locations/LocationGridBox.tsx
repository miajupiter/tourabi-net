"use client"

import React, { useState, useEffect } from "react"
import Heading from '@/shared/Heading'
import LocationCard from './LocationCard'
import { useLanguage } from '@/hooks/i18n'
import { useLogin } from '@/hooks/useLogin'
import { getList } from '@/utils/apiHelper/fetch'

export interface LocationGridBoxProps {
  headingCenter?: boolean
  className?: string
  gridClassName?: string
}


const LocationGridBox: React.FC<LocationGridBoxProps> = ({
  headingCenter = true,
  className = "",
  gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}) => {
  const { t } = useLanguage()
  const { token } = useLogin()
  const [list, setList] = useState([])
  const [pullData, setPullData] = useState(false)

  // const getList = () => {
  //   fetch(`${process.env.NEXT_PUBLIC_API_URI}/locations?pageSize=100`, {
  //     method: 'GET', headers: { 'Content-Type': 'application/json', token }
  //   })
  //     .then(ret => ret.json())
  //     .then(result => {
  //       if (result.success) {
  //         setList(result.data.docs)
  //       } else {
  //         alert(result.error)
  //       }
  //     })
  //     .catch((err) => {
  //       console.log('getList err', err)
  //     })
  // }
  // const getList = async () => {

  //   const ret = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/locations?pageSize=100`, {
  //     method: 'GET', headers: { 'Content-Type': 'application/json', token }
  //   })

  //   if (ret.ok) {
  //     const result = await ret.json()
  //     if (result.success) {
  //       setList(result.data.docs)
  //     } else {
  //       alert(result.error)
  //     }
  //   } else {
  //     console.log('ret.statusText:', ret.statusText)
  //   }
  // }

  useEffect(() => {
    if (!pullData) {
      setPullData(true)
      getList('/locations',token)
      .then(data=>setList(data.docs))
      .catch(err=>alert(err))
    }

  }, [])

  return (
    <div className={`nc-LocationGridBox relative ${className}`}>
      <Heading
        desc={t('Let\'s discover great tours with together')}
        isCenter={true}
      >
        <i className="fa-solid fa-mountain-city text-4xl"></i>{` `} {t('Locations')}
      </Heading>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {list && list.length > 0 && list.map((item: any, index) => <>
          <div key={index.toString()} >
            {item.images && item.images.length > 0 && item.images[0].src && <>
              {LocationCard({ title: item.title, country: item.country, destination:item.destination, imageSrc: item.images[0].src, _id: item._id })}
            </>}
          </div>
        </>)}
      </div>
    </div>
  )
}

export default LocationGridBox
