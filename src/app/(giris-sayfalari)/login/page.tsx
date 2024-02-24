"use client"
import React, { useEffect, FC, FormEvent, FormEventHandler, useState, ChangeEvent } from 'react'

import ButtonPrimary from '@/shared/ButtonPrimary'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/hooks/i18n'
// import { useLogin, LoginProps } from '@/yeni_auth'
import SelectLanguage from '../SelectLanguage'
import InputWithLabel from '@/shared/InputWithLabel'
import SectionHero3 from '@/app/SectionHero3'
import LoginBackground from '../LoginBackground'
import Logo from '@/shared/Logo'
// import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import { getCsrfToken } from 'next-auth/react'
import { getURL } from 'next/dist/shared/lib/utils'
import { useLogin } from '@/hooks/useLogin'
// import { signIn, signOut, useSession } from "next-auth/react"

// import {authOptions} from '@/app/api/auth/[...nextauth]'
export interface LoginProps {
  email?: string
  password?: string

}

export interface PageLoginProps {

}


const PageLogin: FC<PageLoginProps> = ({ }) => {
  const { t } = useLanguage()
  const { loginUser } = useLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    loginUser(email, password, '/')
    // fetch(`${process.env.NEXT_PUBLIC_API_URI}/auth/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email: email, password: password })
    // }).then(ret => ret.json())
    //   .then(result => {

    //     if (result.success) {
    //       localStorage.setItem('token', result.data.token)
    //       localStorage.setItem('user', JSON.stringify(result.data.user))
    //       location.href = '/'
    //     } else {
    //       setError(result.error)
    //     }
    //   })
    //   .catch((err: any) => {
    //     console.log('err:', err)
    //   })
  }

  useEffect(() => {

  }, [t,email,password])

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
          <form className="relative bg-white dark:bg-neutral-900 w-full flex flex-col rounded-[8px] border border-neutral-200 dark:border-neutral-700 space-y-3 p-4 md:p-6"
            onSubmit={handleSubmit}
          // action={`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/credentials`}
          // method='POST'
          >
            {/* <input type="hidden" name="csrfToken" id="csrfToken" value={`${csrfToken}`} /> */}
            <h2 className=' flex items-center text-3xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100'>
              {t('login')}
            </h2>
            {error &&
              <div className='flex w-full text-red-700 font-bold'>
                {error}
              </div>
            }
            <InputWithLabel className='my-4' type='email' label={t('email_address')} required
              // defaultValue={'alitek@gmail.com'}
              name='email'
              id="email"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
            <InputWithLabel className='my-4' type='password' label={t('password')} required
              // defaultValue={'atabar18'}
              name='password'
              id='password'
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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
        </div>
        <div className='absolute bottom-2 w-full '>
          <div className='flex justify-center space-x-3 text-slate-100'>
            <a href='#'>Tour Abi</a>
            <a href='#'>About</a>
            <a href='#'>Contact</a>
            <a href='#'>Help</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageLogin
