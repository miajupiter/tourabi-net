"use client"

import DarkModeSwitcher from '@/shared/DarkModeSwitcher'
import React, { FC } from "react"
import SelectLanguage from './SelectLanguage'
import LoginBackground from './LoginBackground'
import Logo from '@/shared/Logo'
import { useLanguage } from '@/hooks/i18n'
export interface CommonLayoutProps {
  children?: React.ReactNode
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  const { t } = useLanguage()

  return (
    <>

      <div className={`nc-PageLogin`}>
        <div className="relative container-fluid h-screen p-0 m-0 ">
          {children}
          
          <div className='absolute top-3 start-5'>
            <Logo width={150} />
          </div>
          <div className='absolute top-5 end-5'>
            <div className='flex justify-end items-center space-x-3'>
              <div className='hidden md:block '>
                <DarkModeSwitcher />
              </div>
              <SelectLanguage className='bg-transparent' />
            </div>
          </div>




        </div>
      </div>
    </>)
}

export default CommonLayout
