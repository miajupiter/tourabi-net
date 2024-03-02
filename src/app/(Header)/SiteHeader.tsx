'use client'

import React, { Fragment, useEffect, useRef, useState } from 'react'
import Header3 from './Header3'

const SiteHeader = () => {

  const [isTopOfPage, setIsTopOfPage] = useState(true)

  useEffect(() => {
    setIsTopOfPage(window.scrollY < 5)
  }, [])

  return (
    <div>


      <Header3 className={''} />

      {/* <div ref={anchorRef} className='h-1 absolute invisible'></div> */}

    </div>
  )
}

export default SiteHeader
