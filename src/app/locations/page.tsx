"use client"

import React, { FC } from 'react'
import LocationGridBox from './LocationGridBox'

export interface PageLocationListProps { }

const PageLocationList: FC<PageLocationListProps> = ({ }) => {

  return (
    <div className={`container mt-10 mb-12 `}>
      <div className='mt-20 mb-10'>
        <LocationGridBox headingCenter={true} />
      </div>
    </div>
  )
}

export default PageLocationList
