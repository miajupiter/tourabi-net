"use client"

import React, { useState, useEffect } from "react"
import Heading from '@/shared/Heading'
import DestinationCard from './DestinationCard'
import { useLanguage } from '@/hooks/i18n'
import { useLogin } from '@/hooks/useLogin'

export interface DestinationGridBoxProps {
  headingCenter?: boolean
  className?: string
  gridClassName?: string
}


const DestinationGridBox: React.FC<DestinationGridBoxProps> = ({
  headingCenter = true,
  className = "",
  gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}) => {
  const { t } = useLanguage()
  const { token } = useLogin()
  const [list, setList] = useState([])
  const [pullData, setPullData] = useState(false)

  const getList = async () => {

    const ret = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/haham/destinations?pageSize=100`, {
      method: 'GET', headers: { 'Content-Type': 'application/json', token }
    })

    if (ret.ok) {
      const result = await ret.json()
      if (result.success) {
        setList(result.data.docs)
      } else {
        alert(result.error)
      }
    } else {
      console.log('ret.statusText:', ret.statusText)
    }
  }

  useEffect(() => {
    if (!pullData) {
      setPullData(true)
      getList()
    }

  }, [])

  return (
    <div className={`nc-DestinationGridBox relative ${className}`}>
      <Heading
        desc={t('Let\'s discover great tours with together')}
        isCenter={true}
      >
        <i className="fa-solid fa-map-location-dot text-4xl"></i>{` `} {t('Destinations')}
      </Heading>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {list && list.length > 0 && list.map((item: any, index) => <>
          <div key={index.toString()} >
            {item.images && item.images.length > 0 && item.images[0].src && <>
              {/* <DestinationCard  title={item.title} country={item.country || ''} imageSrc={item.images[0].src} id={item._id} /> */}
              {DestinationCard({ title: item.title, country: item.country, imageSrc: item.images[0].src, id: item._id })}
            </>}
          </div>
        </>)}
      </div>
    </div>
  )
}

export default DestinationGridBox
