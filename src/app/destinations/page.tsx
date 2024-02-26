"use client"

import React, { FC } from 'react'
import DestinationGridBox from './DestinationGridBox'

export interface PageDestinationListProps { }

const PageDestinationList: FC<PageDestinationListProps> = ({ }) => {

  return (
    <div className={`container mt-10 mb-12 `}>
      <div className='mt-20 mb-10'>
        <DestinationGridBox headingCenter={true} />
      </div>
    </div>
  )
}

export default PageDestinationList
