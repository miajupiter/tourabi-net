"use client"

import { Popover, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
// import Avatar from "@/shared/Avatar"
import SwitchDarkMode2 from "@/shared/SwitchDarkMode2"
import Link from "next/link"

// import { useSession } from 'next-auth/react'
import { useLogin } from '@/hooks/useLogin'
import { useLanguage } from '@/hooks/i18n'
interface Props {
  className?: string
}

// const SignInSvg = ({ width = '1.5em', height = '1.5em' }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24"><path fill="currentColor" d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8z"></path>
//   </svg>
// )

export default function AvatarDropdown({ className = "" }: Props) {
  const { t } = useLanguage()
  // const { data: session, status } = useSession()
  const { token, user, logoutUser } = useLogin()
  return (
    <>

      {!token && <Link href="/api/auth/signin" className='text-xl self-center'>
        {/* <SignInSvg width='36px' height='36px' /> */}
        <i className="fa-solid fa-right-to-bracket"></i>
      </Link>}
      {token && user &&
        <Popover className={`AvatarDropdown relative flex ${className}`}>
          {({ open, close }) => (
            <>
              <Popover.Button
                className={`self-center w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center`}
              >
                <img className='absolute inset-0 w-10 h-10 sm:w-10 sm:h-10 object-cover rounded-full self-center' src={user && user.image || ''} alt="tourabi" />

              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 w-screen max-w-[260px] px-4 top-full -right-10 sm:right-0 sm:px-0">
                  <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-7 px-6">
                      <div className="flex items-center space-x-3">
                        {/* <Avatar sizeClass="w-12 h-12" userName='ali tek' /> */}
                        <img className='inset-0 w-12 h-12 object-cover rounded-full' src={user && user.image || ''} alt="tourabi" />
                        <div className="flex-grow">
                          <h4 className="font-semibold">{user.name || ''}</h4>
                          <p className="text-xs mt-0.5">{user.email || ''}</p>
                        </div>
                      </div>

                      <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

                      <Link
                        href={"/account"}
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        onClick={() => close()}
                      >
                        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                          <i className="fa-solid fa-user"></i>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium ">{t('My Account')}</p>
                        </div>
                      </Link>


                      <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />





                      <Link
                        // href={"/api/auth/signout"}
                        href="#"
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        onClick={() => {
                          logoutUser()
                          close()
                        }}
                      >
                        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                          <i className="fa-solid fa-right-from-bracket"></i>
                        </div>
                        <div className="ml-4">

                          <p className="text-sm font-medium ">{"Log out"}</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      }
    </>
  )
}
