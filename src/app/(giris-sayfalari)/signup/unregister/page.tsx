"use client"

import React, { FC, FormEvent, useEffect, useState } from "react"
import { countries } from 'country-list-json'
import ButtonSecondary from '@/shared/ButtonSecondary'
import ButtonPrimary from '@/shared/ButtonPrimary'
// import dynamic from 'next/dynamic'
import Logo from '@/shared/Logo'
import { useLanguage } from '@/hooks/i18n'
import SelectLanguage from '../../SelectLanguage'
import Input from "@/shared/Input"
import Select from "@/shared/Select"
// import { MapPinIcon } from '@heroicons/react/24/solid'
import NcInputNumber from '@/components/NcInputNumber'
import Checkbox from '@/shared/Checkbox'
import InputWithLabel from '@/shared/InputWithLabel'
import SelectWithLabel from '@/shared/SelectWithLabel'
// import Label from '@/components/Label'
// import InputWithLabel from '@/shared/InputWithLabel'
// import SelectWithLabel from '../../../shared/SelectWithLabel'




const PageUnregister = ({ }) => {
  const { t, lang, changeLanguage } = useLanguage()

  const [email, setEmail] = useState('')



  return (
    <div className={`nc-PageAddListing1 h-screen max-w-3xl mx-auto p-4`} >
      <div className="mt-20 md:mt-32 space-y-4">
        <div className='flex justify-between items-center'>

          <div className='flex flex-3 items-center '>
            <h2 className=" text-3xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 ">
              {t('Unregister')}
            </h2>
          </div>

        </div>
        <div className="w-full flex flex-col rounded-[8px] border border-neutral-200 dark:border-neutral-700 space-y-3 p-4 pb-8">
          <input type='email' onChange={(e) => setEmail(e.target.value)} />

        </div>
        <div className="flex justify-end space-x-5 mt-10">
          <ButtonPrimary type='submit'>{t('Unregister')}</ButtonPrimary>
        </div>
      </div>
    </div>
  )

}

export default PageUnregister
