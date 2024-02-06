"use client"

import React, { FC, useEffect, useState } from 'react'
import facebookSvg from '@/images/Facebook.svg'
import twitterSvg from '@/images/Twitter.svg'
import googleSvg from '@/images/Google.svg'
import Input from '@/shared/Input'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Image from 'next/image'
import Link from 'next/link'
import Select from '@/shared/Select'
import { useLanguage } from '@/i18n'
import SelectLanguage from '../SelectLanguage'
import InputWithLabel from '@/shared/InputWithLabel'
import SectionHero3 from '@/app/SectionHero3'
import LoginBackground from '../LoginBackground'
import Logo from '@/shared/Logo'
// import { signIn, signOut, useSession } from "next-auth/react"

// import {authOptions} from '@/app/api/auth/[...nextauth]'

export interface PageLoginProps { }
export interface LoginProps {
  email?: string
  password?: string

}

const PageLogin: FC<PageLoginProps> = ({ }) => {
  const { t } = useLanguage()

  const [loginInfo, setLoginInfo] = useState<LoginProps>({ email: '', password: '' })
  const Login = () => (
    <form className="relative bg-white dark:bg-neutral-900 w-full flex flex-col rounded-[8px] border border-neutral-200 dark:border-neutral-700 space-y-3 p-4 md:p-6"
      action='#' method='post'>
      <h2 className=' flex items-center text-3xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100'>
        {t('login')}
      </h2>
      <InputWithLabel className='my-4' type='email' label={t('email_address')} required
        onChange={(e: any) => setLoginInfo({ ...loginInfo, email: e.target.value })}
      />
      <InputWithLabel className='my-4' type='password' label={t('password')} required
        onChange={(e: any) => setLoginInfo({ ...loginInfo, password: e.target.value })}
      />
      <div className='flex justify-end'>
        <Link href='/login' className='text-sm underline font-medium'>
          {t('forgot_password?')}
        </Link>
      </div>

      <ButtonPrimary type='submit'>{t('continue')}</ButtonPrimary>
      <span className='block text-center text-neutral-700 dark:text-neutral-300'>
        {t('new_user?')} {` `}
        <Link href='/signup' className='font-semibold underline'>
          {t('create_an_account')}
        </Link>
      </span>
    </form>
  )
  return (
    <div className={`nc-PageLogin`}>
      <div className="relative container-fluid p-0 m-0 ">
        <LoginBackground className="relative" />
        <div className='absolute top-3 start-5'>
          <Logo width={150} />
        </div>
        <div className='absolute top-5 end-5'>
          <SelectLanguage className='bg-transparent' />
        </div>
        <div className='absolute top-[20vh] start-0 px-5 w-[100%] md:w-[400px] md:top-[30vh] md:start-10'>
    {Login()}
        </div>
      </div>

    </div>
  )
}

export default PageLogin
