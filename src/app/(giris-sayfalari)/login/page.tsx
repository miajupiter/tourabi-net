"use client"
import React, { useEffect, FC, FormEvent, FormEventHandler, useState } from 'react'
import Link from "next/link"
import Image from 'next/image'
import Logo from '@/shared/Logo'
import LoginBackground from '../LoginBackground'
// import SecurityAbi from '@/images/security-abi.png'
import { useLanguage } from '@/hooks/i18n'
import { useLogin } from '@/hooks/useLogin'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Head from 'next/head'
import SelectLanguage from '../SelectLanguage'
import DarkModeSwitcher from '@/shared/DarkModeSwitcher'
import InputWithLabel from '@/shared/InputWithLabel'
// import InputWithLabel from '@/components/InputWithLabel'
// export const metadata: Metadata = {
//   title: "Login | TourAbi Admin Panel",
//   description: "This is Login Page for TourAbi Admin Panel",
//   // icons: [{
//   //   url: "/favicon.ico",
//   //   rel:"icon",
//   //   type: "image/x-icon",
//   //   sizes: "48x48",
//   // }]
// }

const LogInPage: FC = () => {
  const { loginUser } = useLogin()
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    loginUser(email, password, '/')
  }

  useEffect(() => {

  }, [t, email, password])
  return (
    <>
      <Head>
        <title>{`${t('Login page')} | TourAbi`}</title>
        <meta name="description" content="This is Login Page for TourAbi Admin Panel" />
      </Head>
      <LoginBackground className='relative'/>

      {/* Login Form  */}
      <div className='absolute top-[20vh] start-0 px-5 w-[100%] md:w-[600px] md:top-[30vh] md:start-10'>
        <div className="rounded-[8px] bg-slate-100 dark:bg-neutral-900 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 ">
            {/* Security Abi */}
            <div className="hidden md:block p-6">
              <img className='aspect-ratio h-full w-full' src="/img/security-abi.png" alt="security abi" />
            </div>
            {/* Security Abi */}

            {/* Form Input Elements */}
            <div className="">
              <div className="w-full p-4">
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  {t('Login')}
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className='grid grid-cols-1 gap-4 space-y-1'>
                    <InputWithLabel
                      type="email"
                      label={t('Email')}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputWithLabel
                      type="password"
                      label={t('Password')}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className='flex justify-end'>
                      <Link href='/forgotPassword' className='text-sm underline font-medium'>
                        {t('Forgot password?')}
                      </Link>
                    </div>
                    <ButtonPrimary type="submit"
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90">
                      {t('Login')}
                    </ButtonPrimary>

                    <div className='block text-center text-neutral-700 dark:text-neutral-300'>
                      {t('New user?')} {` `}
                      <Link href='/signup' className='font-semibold underline'>
                        {t('Create an account')}
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* Form Input Elements */}
          </div>
        </div>
      </div>
      {/* Login Form  */}

      {/* login footer */}
      <div className='absolute bottom-2 w-full '>
        <div className='flex justify-center space-x-3 text-slate-900 dark:text-slate-100 font-medium'>
          <a href='#'>{t('TourAbi')}</a>
          <a href='#'>{t('About')}</a>
          <a href='#'>{t('Contact')}</a>
          <a href='#'>{t('Help')}</a>
        </div>
      </div>
      {/*# login footer */}


    </>
  )
}

export default LogInPage


