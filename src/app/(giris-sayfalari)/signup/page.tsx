"use client"

import React, { FC, FormEvent, useEffect, useState } from "react"

import ButtonSecondary from '@/shared/ButtonSecondary'
import ButtonPrimary from '@/shared/ButtonPrimary'
// import dynamic from 'next/dynamic'
import Logo from '@/shared/Logo'
import { useLanguage } from '@/hooks/i18n'
import SelectLanguage from '../SelectLanguage'
import Input from "@/shared/Input"
import Select from "@/shared/Select"
import FormItem from "./FormItem"
import { MapPinIcon } from '@heroicons/react/24/solid'
import NcInputNumber from '@/components/NcInputNumber'
import Checkbox from '@/shared/Checkbox'
import Label from '@/components/Label'
import InputWithLabel from '@/shared/InputWithLabel'
import SelectWithLabel from '../../../shared/SelectWithLabel'
import { redirect, useRouter } from 'next/navigation'



export interface PageSignUpProps { }
export interface MemberProps {
  email?: string
  password?: string
  rePassword?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  gender?: string
  dateOfBirth?: string
  // address?: {
  //   region?: string
  //   cityName?: string
  //   citySubdivisionName?: string
  //   district?: string
  //   streetName?: string
  //   buildingNumber?: string
  //   buildingName?: string
  //   blockName?: string
  //   room?: string
  //   postalZone?: string
  //   country?: {
  //     identificationCode?: string
  //     name?: string
  //   }
  // }
  address_region?: string
  address_cityName?: string
  address_citySubdivisionName?: string
  address_district?: string
  address_streetName?: string
  address_buildingNumber?: string
  address_buildingName?: string
  address_blockName?: string
  address_room?: string
  address_postalZone?: string
  address_country_identificationCode?: string
  address_country_name?: string
  companyLegalName?: string
  taxOffice?: string
  taxNumber?: string
  bankAccountName?: string
  ibanNo?: string
  swiftCode?: string
  ethereumWallet?: string
  bitcoinWallet?: string
}


const maxStep = 4


const PageSignUp: FC<PageSignUpProps> = ({ }) => {
  const { t, lang, changeLanguage } = useLanguage()
  const [stepIndex, setStepIndex] = useState(0)
  const [member, setMember] = useState<MemberProps>()
  const [authCode, setAuthCode] = useState('')

  const Step1 = () => (
    <form onSubmit={(e) => {
      e.preventDefault()
      fetch(`${process.env.NEXT_PUBLIC_API_URI}/auth/checkLogin`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email:member?.email})
      })
      .then(ret => ret.json())
      .then(result => {
        
        if(result.success) {
          alert(t('email_already_exists'))
        }else{
          setStepIndex(stepIndex + 1)
        }
      })
      .catch((err: any) => {
        console.log('err:', err)
      })
    }}>
      <h2 className="text-2xl font-semibold">{t('login_information')}</h2>
      <div className="w-[50%] border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="space-y-4 mt-4">
        <InputWithLabel type='email' label={t('email_address')} required
          name="email"
          value={member?.email}
          onChange={(e: any) => setMember({ ...member, email: e.target.value })}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
          <InputWithLabel type='password' label={t('password')} required
            name="password"
            value={member?.password}
            onChange={(e: any) => setMember({ ...member, password: e.target.value })}
          />
          <InputWithLabel type='password' label={t('retype_password')} required
            name="rePassword"
            value={member?.rePassword}
            onChange={(e: any) => setMember({ ...member, rePassword: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
          <InputWithLabel type='text' label={t('first_name')} required
            name="firstName"
            value={member?.firstName}
            onChange={(e: any) => setMember({ ...member, firstName: e.target.value })}
          />
          <InputWithLabel type='text' label={t('last_name')} required
            name="lastName"
            value={member?.lastName}
            onChange={(e: any) => setMember({ ...member, lastName: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
          <InputWithLabel type='tel' label={t('phone_number')} required
            name="phoneNumber"
            value={member?.phoneNumber}
            onChange={(e: any) => setMember({ ...member, phoneNumber: e.target.value })}
          />
          <SelectWithLabel label={t('Gender')} required
            name="gender"
            value={member?.gender}
            onChange={(e: any) => setMember({ ...member, gender: e.target.value })}
          >
            <option value="">{''}</option>
            <option value="female">{t('Female')}</option>
            <option value="male">{t('Male')}</option>
            <option value="other">{t('Other')}</option>
          </SelectWithLabel>
          <InputWithLabel type='date' label={t('date_of_birth')} required
            name="dateOfBirth"
            value={member?.dateOfBirth}
            onChange={(e: any) => setMember({ ...member, dateOfBirth: e.target.value })}
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
      console.log('e', e)
      setStepIndex(stepIndex + 1)
    }}>
      <h2 className="text-2xl font-semibold">{t('your_address')}</h2>
      <div className="w-[50%] border-b border-neutral-200 dark:border-neutral-700"></div>

      <div className="space-y-4 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
          <SelectWithLabel label={t('Country')} required
            defaultValue={member?.address_country_identificationCode || ''}
            name="address_country_identificationCode"
            onChange={(e: any) => {
              // setMember({ ...member, address:{country:{identificationCode: e.target.value}} })
              setMember({ ...member, address_country_name: e.target.options[e.target.selectedIndex].text })
            }}
          >
            <option value="DE">{t('Germany')}</option>
            <option value="IT">{t('Italy')}</option>
            <option value="FR">{t('France')}</option>
            <option value="TR">{t('Turkey')}</option>
            <option value="AZ">{t('Azerbaijan')}</option>
            <option value="RU">{t('Russia')}</option>
          </SelectWithLabel>
          <InputWithLabel type='text' label={t('Region')}
            value={member?.address_region || ''}
            name="address_region"
            onChange={(e: any) => setMember({ ...member, address_region: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
          <InputWithLabel type='text' label={t('City')} required
            value={member?.address_cityName || ''}
            name="address_cityName"
            onChange={(e: any) => setMember({ ...member, address_cityName: e.target.value })}
          />
          <InputWithLabel type='text' label={t('District')}
            value={member?.address_district || ''}
            name="address_district"
            onChange={(e: any) => setMember({ ...member, address_district: e.target.value })}
          />
          <InputWithLabel type='text' label={t('Postal Zone')} required
            value={member?.address_postalZone || ''}
            name="address_postalZone"
            onChange={(e: any) => setMember({ ...member, address_postalZone: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 md:gap-5">
          <InputWithLabel type='text' label={t('Street')} required
            value={member?.address_streetName || ''}
            name="address_streetName"
            onChange={(e: any) => setMember({ ...member, address_streetName: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
          <InputWithLabel type='text' label={t('Building Number')}
            value={member?.address_buildingNumber || ''}
            name="address_buildingNumber"
            onChange={(e: any) => setMember({ ...member, address_buildingNumber: e.target.value })}
          />
          <InputWithLabel type='text' label={t('Building/site Name')}
            value={member?.address_buildingName || ''}
            name="address_buildingName"
            onChange={(e: any) => setMember({ ...member, address_buildingName: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
          <InputWithLabel type='text' label={t('Block')}
            value={member?.address_blockName || ''}
            name="address_blockName"
            onChange={(e: any) => setMember({ ...member, address_blockName: e.target.value })}
          />

          <InputWithLabel type='text' label={t('Room')}
            value={member?.address_room || ''}
            name="address_room"
            onChange={(e: any) => setMember({ ...member, address_room: e.target.value })}
          />
        </div>
        <div>
          <Label>Detailed address</Label>
          <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {member && <>
              {member?.address_streetName} {member?.address_buildingNumber},
              {member?.address_buildingName} {member?.address_blockName}
              {member?.address_room} {member?.address_district} {member?.address_postalZone}
              {member?.address_cityName}, {member?.address_region}/ {member?.address_country_identificationCode}
            </>}

          </span>

        </div>
      </div>

      <div className="flex justify-end space-x-5 mt-10">
        <ButtonSecondary type='button' onClick={() => setStepIndex(stepIndex - 1)}>{t('Go back')}</ButtonSecondary>
        <ButtonPrimary type='submit'>{t('Continue')}</ButtonPrimary>
      </div>
    </form>
  )


  const Step3 = () => (
    <form onSubmit={(e) => {
      e.preventDefault()
      // setStepIndex(stepIndex + 1)
      signupPost()
    }}>
      <h2 className="text-2xl font-semibold">{t('Legal Information')}</h2>
      <div className="w-[50%] border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="space-y-4 mt-4">
        <div className="grid grid-cols-1 gap-8 md:gap-5">
          <InputWithLabel type='text' label={t('company_legal_name')} required
            value={member?.companyLegalName || ''}
            onChange={(e: any) => setMember({ ...member, companyLegalName: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
          <InputWithLabel type='text' label={t('tax_office')} required
            value={member?.taxOffice || ''}
            onChange={(e: any) => setMember({ ...member, taxOffice: e.target.value })}
          />
          <InputWithLabel type='text' label={t('tax_number')} required
            value={member?.taxNumber || ''}
            onChange={(e: any) => setMember({ ...member, taxNumber: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
          <Checkbox label={t('agreement')} name="agreement" />
          <Checkbox label={t('terms_of_use')} name="terms_of_use" />
        </div>
      </div>
      <div className="flex justify-end space-x-5 mt-10">
        <ButtonSecondary type='button' onClick={() => setStepIndex(stepIndex - 1)}>{t('Go back')}</ButtonSecondary>
        <ButtonPrimary type='submit'>{t('Continue')}</ButtonPrimary>
      </div>
    </form>
  )


  // const Step4 = () => (
  //   <form onSubmit={(e) => {
  //     e.preventDefault()
  //     signupPost()
  //   }}>
  //     <h2 className="text-2xl font-semibold">{t('Payment Methods')}</h2>
  //     <div className="w-[50%] border-b border-neutral-200 dark:border-neutral-700"></div>
  //     <div className="space-y-4 mt-4">
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
  //         <InputWithLabel type='text' label={t('bank_account_name')}
  //           value={member?.bankAccountName || ''}
  //           onChange={(e: any) => setMember({ ...member, bankAccountName: e.target.value })}
  //         />
  //       </div>
  //       <div className="grid grid-cols-1 gap-8 md:gap-5">
  //         <InputWithLabel type='text' label={t('iban_no')}
  //           value={member?.ibanNo || ''}
  //           onChange={(e: any) => setMember({ ...member, ibanNo: e.target.value })}
  //         />
  //       </div>
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
  //         <InputWithLabel type='text' label={t('swift_code')}
  //           value={member?.swiftCode || ''}
  //           onChange={(e: any) => setMember({ ...member, swiftCode: e.target.value })}
  //         />
  //       </div>
  //       <div className="grid grid-cols-1 gap-8 md:gap-5">
  //         <InputWithLabel type='text' label={t('ethereum_wallet')}
  //           value={member?.ethereumWallet || ''}
  //           onChange={(e: any) => setMember({ ...member, ethereumWallet: e.target.value })}
  //         />
  //       </div>
  //       <div className="grid grid-cols-1 gap-8 md:gap-5">
  //         <InputWithLabel type='text' label={t('bitcoin_wallet')}
  //           value={member?.bitcoinWallet || ''}
  //           onChange={(e: any) => setMember({ ...member, bitcoinWallet: e.target.value })}
  //         />
  //       </div>
  //     </div>
  //     <div className="flex justify-end space-x-5 mt-10">
  //       <ButtonSecondary type='button' onClick={() => setStepIndex(stepIndex - 1)}>{t('Go back')}</ButtonSecondary>
  //       <ButtonPrimary type='submit'>{t('Sign up')}</ButtonPrimary>
  //     </div>
  //   </form>
  // )

  const signupPost = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/auth/signup`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member)
      })
      .then(ret => ret.json())
      .then(result => {
        console.log('result:',result)
        if(result.success) {
          setStepIndex(stepIndex + 1)
        }else{
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
        body: JSON.stringify({email:member?.email, authCode:authCode})
      })
      .then(ret => ret.json())
      .then(result => {
        console.log('result:',result)
        if(result.success) {
          // setStepIndex(stepIndex + 1)
          window.location.href=`/login`
          // useRouter().push('/login')
          // redirect('/login')
        }else{
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
      <div className="space-y-4 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
          <InputWithLabel type='email' label={t('email')} required
            value={member?.email || ''}
            readOnly
          />
        </div>
        <div className="grid grid-cols-1 gap-8 md:gap-5">
          <InputWithLabel type='text' label={t('auth_code')} required
            value={authCode || ''}
            onChange={(e: any) => setAuthCode(e.target.value)}
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
    <div
      className={`nc-PageAddListing1 max-w-3xl mx-auto p-4`}
    >
      <div className='flex justify-between items-center mb-12'>
        <div className=' '>
          <Logo width={150} />
        </div>

        <div className='flex justify-end items-start' style={{ width: '180px' }}>
          <SelectLanguage />
        </div>
      </div>
      <div className="space-y-4">
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
        {/* <form className='' onSubmit={handleSubmit}> */}
        <div className="w-full flex flex-col rounded-[8px] border border-neutral-200 dark:border-neutral-700 space-y-3 p-4 pb-8">
          <div className={`${stepIndex != 0 ? 'hidden' : ''}`}>{Step1()}</div>
          <div className={`${stepIndex != 1 ? 'hidden' : ''}`}>{Step2()}</div>
          <div className={`${stepIndex != 2 ? 'hidden' : ''}`}>{Step3()}</div>
          {/* <div className={`${stepIndex != 3 ? 'hidden' : ''}`}>{Step4()}</div> */}
          <div className={`${stepIndex != 3 ? 'hidden' : ''}`}>{verifyPage()}</div>
        </div>

        {/* <div className="flex justify-end space-x-5 mt-10">
            {stepIndex > 0 &&
              <ButtonSecondary onClick={() => setStepIndex(stepIndex - 1)}>{t('Go back')}</ButtonSecondary>
            }
            {stepIndex < maxStep - 1 &&
              <ButtonPrimary onClick={() => setStepIndex(stepIndex + 1)}>{t('Continue')}</ButtonPrimary>
            }
            {stepIndex == maxStep - 1 &&
              <ButtonPrimary onClick={() => alert('Register me')}>{t('Finish')}</ButtonPrimary>
              // <ButtonPrimary type='submit'>{t('Finish')}</ButtonPrimary>
            }
          </div> */}
        {/* </form> */}
      </div>
    </div>
  )

}

export default PageSignUp
