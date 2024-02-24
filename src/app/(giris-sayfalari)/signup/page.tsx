"use client"

import React, { FC, FormEvent, useEffect, useState } from "react"
import { countries } from 'country-list-json'
import ButtonSecondary from '@/shared/ButtonSecondary'
import ButtonPrimary from '@/shared/ButtonPrimary'
// import dynamic from 'next/dynamic'
import Logo from '@/shared/Logo'
import { useLanguage } from '@/hooks/i18n'
import SelectLanguage from '../SelectLanguage'
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



export interface PageSignUpProps { }
export interface MemberProps {
  email: string
  password: string
  firstName: string
  lastName: string
  phoneNumber: string
  gender: string
  dateOfBirth: string
  address: {
    region: string
    cityName: string
    citySubdivisionName: string
    district: string
    streetName: string
    buildingNumber: string
    buildingName: string
    blockName: string
    room: string
    postalZone: string
    country: {
      identificationCode: string
      name: string
    }
  }
  companyLegalName: string
  // address_region?: string
  // address_cityName?: string
  // address_citySubdivisionName?: string
  // address_district?: string
  // address_streetName?: string
  // address_buildingNumber?: string
  // address_buildingName?: string
  // address_blockName?: string
  // address_room?: string
  // address_postalZone?: string
  // address_country_identificationCode?: string
  // address_country_name?: string
  // companyLegalName?: string
  // taxOffice?: string
  // taxNumber?: string
  // bankAccountName?: string
  // ibanNo?: string
  // swiftCode?: string
  // ethereumWallet?: string
  // bitcoinWallet?: string
}

const defaultMember = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  gender: '',
  dateOfBirth: '',
  address: {
    region: '',
    cityName: '',
    citySubdivisionName: '',
    district: '',
    streetName: '',
    buildingNumber: '',
    buildingName: '',
    blockName: '',
    room: '',
    postalZone: '',
    country: {
      identificationCode: '',
      name: '',
    }
  },
  companyLegalName: ''
}

const maxStep = 3


const PageSignUp: FC<PageSignUpProps> = ({ }) => {
  const { t, lang, changeLanguage } = useLanguage()
  const [stepIndex, setStepIndex] = useState(0)
  const [member, setMember] = useState<MemberProps>(defaultMember)
  const [rePassword, setRePassword] = useState('')
  const [authCode, setAuthCode] = useState('')

  const Step1 = () => (
    <form onSubmit={(e) => {
      e.preventDefault()
      if (member.password != rePassword) {
        alert(t('Password is not equal to Retype password'))
        return
      }
      fetch(`${process.env.NEXT_PUBLIC_API_URI}/auth/checkLogin`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: member.email })
        })
        .then(ret => ret.json())
        .then(result => {

          if (result.success) {
            alert(t('Email already exists'))
          } else {
            setStepIndex(stepIndex + 1)
          }
        })
        .catch((err: any) => {
          console.log('err:', err)
        })
    }}>
      <h2 className="text-2xl font-semibold">{t('Authentication')}</h2>
      <div className="w-[50%] border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="grid grid-cols-1 space-y-4 mt-4">
        <InputWithLabel
          label={t('Email')}
          required
          type="email"
          defaultValue={''}
          onChange={(e) => setMember({ ...member, email: e.target.value })}
        />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5'>
          <InputWithLabel
            required
            type="password"
            label={t('Password')}
            defaultValue={''}
            onChange={(e) => setMember({ ...member, password: e.target.value })}
          />
          <InputWithLabel
            required
            type="password"
            label={t('Retype Password')}
            defaultValue={''}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-5 mt-10">
        <ButtonPrimary type='submit'>{t('Continue')}</ButtonPrimary>
      </div>
    </form>
  )


  const Step2 = () => (
    <form onSubmit={(e) => {
      e.preventDefault()

      // setStepIndex(stepIndex + 1)
      signupPost()
    }}>
      <h2 className="text-2xl font-semibold">{t('Your Information')}</h2>
      <div className="w-[50%] border-b border-neutral-200 dark:border-neutral-700"></div>

      <div className="space-y-4 mt-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
          <InputWithLabel
            required
            type="text"
            label={t('First name')}
            defaultValue={member.firstName}
            onChange={(e) => setMember({ ...member, firstName: e.target.value })}
          />

          <InputWithLabel
            required
            type="text"
            label={t('Last name')}
            defaultValue={member.lastName}
            onChange={(e) => setMember({ ...member, lastName: e.target.value })}
          />

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
          <SelectWithLabel
            required
            label={t('Country')}
            onChange={(e) => {
              member.address.country.identificationCode = e.target.value
              setMember(member)
            }}
          >
            {countries.map((ulke, index) => (
              <option key={index} value={ulke.code}>{ulke.name}</option>
            ))}
          </SelectWithLabel>
          {/* <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              {t('Country')}
            </label>
            <Select
              className=''
              defaultValue={member.address.country.identificationCode}
              onChange={(e) => {
                member.address.country.identificationCode = e.target.value
                setMember(member)
              }}
            >
              {countries.map((ulke, index) => (
                <option key={index} value={ulke.code}>{ulke.name}</option>
              ))}
            </Select>

          </div> */}
          <InputWithLabel
            label={t('Company/Firm Legal Name')}
            required
            type="text"

            defaultValue={member.companyLegalName}
            onChange={(e) => setMember({ ...member, companyLegalName: e.target.value })}
          />

        </div>

      </div>

      <div className="flex justify-end space-x-5 mt-10">
        <ButtonSecondary type='button' onClick={() => setStepIndex(stepIndex - 1)}>{t('Go back')}</ButtonSecondary>
        <ButtonPrimary type='submit'>{t('Continue')}</ButtonPrimary>
      </div>
    </form>
  )



  const signupPost = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/auth/signup`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member)
      })
      .then(ret => ret.json())
      .then(result => {
        console.log('result:', result)
        if (result.success) {
          setStepIndex(stepIndex + 1)
        } else {
          alert(result.error)
        }
      })
      .catch((err: any) => {
        console.log('err:', err)
      })
  }
  const verifyPost = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/auth/verify`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: member?.email, authCode: authCode })
      })
      .then(ret => ret.json())
      .then(result => {
        console.log('result:', result)
        if (result.success) {
          // setStepIndex(stepIndex + 1)
          window.location.href = `/login`
          // useRouter().push('/login')
          // redirect('/login')
        } else {
          alert(result.error)
        }
      })
      .catch((err: any) => {
        console.log('err:', err)
      })
  }
  const verifyPage = () => (
    <form onSubmit={(e) => {
      e.preventDefault()
      verifyPost()
    }}>
      <h2 className="text-2xl font-semibold">{t('Email verification')}</h2>
      <div className="w-[50%] border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="grid grid-cols-1 gap-8 md:gap-5">
        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            {t('Email')}
          </label>
          <input
            readOnly
            type="email"
            placeholder={t('Email')}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            defaultValue={member.email}
            onChange={(e) => setMember({ ...member, email: e.target.value })}
          />
        </div>
        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            {t('Auth Code')}
          </label>
          <input
            type="text"
            placeholder={t('Auth Code')}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            defaultValue={''}
            onChange={(e) => setAuthCode(e.target.value)}
          />
        </div>
      </div>


      <div className="flex justify-end space-x-5 mt-10">
        <ButtonSecondary type='button' onClick={() => setStepIndex(stepIndex - 1)}>{t('Go back')}</ButtonSecondary>
        <ButtonPrimary type='submit'>{t('Verify')}</ButtonPrimary>
      </div>
    </form>
  )

  return (
    <div className={`nc-PageAddListing1 h-screen max-w-3xl mx-auto p-4`} >
      <div className="mt-20 md:mt-32 space-y-4">
        <div className='flex justify-between items-center'>

          <div className='flex flex-3 items-center '>
            <h2 className=" text-3xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 ">
              {t('Signup')}
            </h2>
          </div>
          <div className='flex flex-1 justify-end items-start' style={{ width: '180px' }}>
            <div className="text-4xl font-semibold">{stepIndex + 1}{" "}</div>
            <div className="text-lg text-neutral-500 dark:text-neutral-400">{"/"}{maxStep}</div>
          </div>
        </div>
        <div className="w-full flex flex-col rounded-[8px] border border-neutral-200 dark:border-neutral-700 space-y-3 p-4 pb-8">

          <div className={`${stepIndex != 0 ? 'hidden' : ''}`}>{Step1()}</div>
          <div className={`${stepIndex != 1 ? 'hidden' : ''}`}>{Step2()}</div>
          <div className={`${stepIndex != 2 ? 'hidden' : ''}`}>{verifyPage()}</div>
        </div>
      </div>
    </div>
  )

}

export default PageSignUp
