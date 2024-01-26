'use client'

import React, { FC, useState, useEffect } from 'react'
import AddToHomeScreen from './AddToHomeScreen/AddToHomeScreen'
import Link from 'next/link'
import useUserAgent from './useUserAgent'

export interface PageInstallProps { }

const PageInstall: FC<PageInstallProps> = ({ }) => {
  const [welcomeMessage, setWelcomeMessage] = useState<string>('Checking device...')
  const { isMobile, userAgentString, userAgent } = useUserAgent()

  useEffect(() => {
    const welcomeMessage = isMobile ? 'You are on a mobile device.' : 'You are on a desktop device. Please use a mobile device to view this app.'
    setWelcomeMessage(welcomeMessage)
  }, [isMobile])

  return (
    <div className={`nc-PageInstall`}>
      <div className='container mb-24 lg:mb-32'>
        <h2 className='my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
          Install Application
        </h2>
        {/* <div className='max-w-md mx-auto space-y-6'> */}
        <div className='w-full'>
          <p className='text-2xl'>{welcomeMessage}</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt esse fugit dicta iusto blanditiis numquam, odit repudiandae, recusandae nemo natus, veritatis quidem itaque adipisci sed alias tempore consequatur officia distinctio!</p>
          {userAgentString && <p className="text-center text-xs text-gray-400">{userAgentString}</p>}
        <AddToHomeScreen />
        </div>
      </div>
    </div>
  )
}

export default PageInstall
