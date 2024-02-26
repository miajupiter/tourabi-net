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
  const getList = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/destinations?pageSize=100`, {
      method: 'GET', headers: { 'Content-Type': 'application/json', token }
    })
      .then(ret => ret.json())
      .then(result => {
        if (result.success) {
          setList(result.data.docs)
        } else {
          alert(result.error)
        }
      })
      .catch((err) => {
        console.log('getList err', err)
      })
  }

  useEffect(() => {
    if (!pullData) {
      setPullData(true)
      getList()
    }

  }, [t, token])
  return (
    <div className={`nc-DestinationGridBox relative ${className}`}>
      <Heading
        desc={t('Let\'s discover great tours with together')}
        isCenter={true}
      >
        {t('Destinations')}
      </Heading>
      <div className="grid grid-cols-12 gap-y-2 gap-x-4">
        {list && list.map((item: any, index) => (
          <div key={index} className="col-span-12 sm:col-span-6 md:col-span-4 gap-6">
            <DestinationCard title={item.title} country={item.country || ''} imageSrc={(item.images || []).length > 0 ? item.images[0].src || '' : ''} id={item._id} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DestinationGridBox
