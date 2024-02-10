"use client"

import React, { FC, useEffect, useState } from "react"

import ButtonSecondary from '@/shared/ButtonSecondary'
import ButtonPrimary from '@/shared/ButtonPrimary'
// import dynamic from 'next/dynamic'
import Logo from '@/shared/Logo'
import { useLanguage } from '@/i18n'
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
  const [isim, setIsim] = useState('')



  const Step1 = () => (
    <div>
      <h2 className="text-2xl font-semibold">{t('login_information')}</h2>
      <div className="w-[50%] border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="space-y-4 mt-4">
        <InputWithLabel type='email' label={t('email_address')} required
          value={member?.email}
          onChange={(e: any) => setMember({ ...member, email: e.target.value })}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
          <InputWithLabel type='password' label={t('password')} required
            value={member?.password}
            onChange={(e: any) => setMember({ ...member, password: e.target.value })}
          />
          <InputWithLabel type='password' label={t('retype_password')} required
            value={member?.rePassword}
            onChange={(e: any) => setMember({ ...member, rePassword: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
          <InputWithLabel type='text' label={t('first_name')} required
            value={member?.firstName}
            onChange={(e: any) => setMember({ ...member, firstName: e.target.value })}
          />
          <InputWithLabel type='text' label={t('last_name')} required
            value={member?.lastName}
            onChange={(e: any) => setMember({ ...member, lastName: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
          <InputWithLabel type='tel' label={t('phone_number')} required
            value={member?.phoneNumber}
            onChange={(e: any) => setMember({ ...member, phoneNumber: e.target.value })}
          />
          <SelectWithLabel label={t('Gender')} required
            value={member?.gender}
            onChange={(e: any) => setMember({ ...member, gender: e.target.value })}
          >
            <option value="">{''}</option>
            <option value="female">{t('Female')}</option>
            <option value="male">{t('Male')}</option>
            <option value="other">{t('Other')}</option>
          </SelectWithLabel>
          <InputWithLabel type='date' label={t('date_of_birth')} required
            value={member?.dateOfBirth}
            onChange={(e: any) => setMember({ ...member, dateOfBirth: e.target.value })}
          />
        </div>
      </div>
    </div>
  )


  const Step2 = () => (
    <div>
      <h2 className="text-2xl font-semibold">{t('your_address')}</h2>
      <div className="w-[50%] border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="space-y-4 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
          <SelectWithLabel label={t('Country')} required
            defaultValue={member?.address_country_identificationCode}
            onChange={(e: any) => {
              setMember({ ...member, address_country_identificationCode: e.target.value })
              // setMember({ ...member, address_country_name: e.target.options[e.target.selectedIndex].text })
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
            onChange={(e: any) => setMember({ ...member, address_region: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
          <InputWithLabel type='text' label={t('City')} required
            value={member?.address_cityName || ''}
            onChange={(e: any) => setMember({ ...member, address_cityName: e.target.value })}
          />
          <InputWithLabel type='text' label={t('District')}
            value={member?.address_district || ''}
            onChange={(e: any) => setMember({ ...member, address_district: e.target.value })}
          />
          <InputWithLabel type='text' label={t('Postal Zone')} required
            value={member?.address_postalZone || ''}
            onChange={(e: any) => setMember({ ...member, address_postalZone: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 md:gap-5">
          <InputWithLabel type='text' label={t('Street')} required
            value={member?.address_streetName || ''}
            onChange={(e: any) => setMember({ ...member, address_streetName: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
          <InputWithLabel type='text' label={t('Building Number')}
            value={member?.address_buildingNumber || ''}
            onChange={(e: any) => setMember({ ...member, address_buildingNumber: e.target.value })}
          />
          <InputWithLabel type='text' label={t('Building/site Name')}
            value={member?.address_buildingName || ''}
            onChange={(e: any) => setMember({ ...member, address_buildingName: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
          <InputWithLabel type='text' label={t('Block')}
            value={member?.address_blockName || ''}
            onChange={(e: any) => setMember({ ...member, address_blockName: e.target.value })}
          />

          <InputWithLabel type='text' label={t('Room')}
            value={member?.address_room || ''}
            onChange={(e: any) => setMember({ ...member, address_room: e.target.value })}
          />
        </div>
        <div>
          <Label>Detailed address</Label>
          <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {member && <>
              {member.address_streetName} {member.address_buildingNumber}, {member.address_buildingName} {member.address_blockName} {member.address_room} {member.address_district} {member.address_postalZone} {member.address_cityName}, {member.address_region}/ {member.address_country_identificationCode}
            </>}

          </span>

        </div>
      </div>
    </div>
  )


  const Step3 = () => (
    <div>
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
          <Checkbox label={t('agreement')} name="agreement"   />
          <Checkbox label={t('terms_of_use')} name="terms_of_use"   />
        </div>
      </div>
    </div>
  )


  const Step4 = () => (
    <div>
      <h2 className="text-2xl font-semibold">{t('Payment Methods')}</h2>
      <div className="w-[50%] border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="space-y-4 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
          <InputWithLabel type='text' label={t('bank_account_name')}
            value={member?.bankAccountName || ''}
            onChange={(e: any) => setMember({ ...member, bankAccountName: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 gap-8 md:gap-5">
          <InputWithLabel type='text' label={t('iban_no')}
            value={member?.ibanNo || ''}
            onChange={(e: any) => setMember({ ...member, ibanNo: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
          <InputWithLabel type='text' label={t('swift_code')}
            value={member?.swiftCode || ''}
            onChange={(e: any) => setMember({ ...member, swiftCode: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 gap-8 md:gap-5">
          <InputWithLabel type='text' label={t('ethereum_wallet')}
            value={member?.ethereumWallet || ''}
            onChange={(e: any) => setMember({ ...member, ethereumWallet: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 gap-8 md:gap-5">
          <InputWithLabel type='text' label={t('bitcoin_wallet')}
            value={member?.bitcoinWallet || ''}
            onChange={(e: any) => setMember({ ...member, bitcoinWallet: e.target.value })}
          />
        </div>
      </div>
    </div>
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
        <form className='' action='#' method='post'>
          <div className="w-full flex flex-col rounded-[8px] border border-neutral-200 dark:border-neutral-700 space-y-3 p-4 pb-8">
            <div className={`${stepIndex != 0 ? 'hidden' : ''}`}>{Step1()}</div>
            <div className={`${stepIndex != 1 ? 'hidden' : ''}`}>{Step2()}</div>
            <div className={`${stepIndex != 2 ? 'hidden' : ''}`}>{Step3()}</div>
            <div className={`${stepIndex != 3 ? 'hidden' : ''}`}>{Step4()}</div>
          </div>

          <div className="flex justify-end space-x-5 mt-10">
            {stepIndex > 0 &&
              <ButtonSecondary onClick={() => setStepIndex(stepIndex - 1)}>{t('Go back')}</ButtonSecondary>
            }
            {stepIndex < maxStep - 1 &&
              <ButtonPrimary onClick={() => setStepIndex(stepIndex + 1)}>{t('Continue')}</ButtonPrimary>
            }
            {stepIndex == maxStep - 1 &&
              <ButtonPrimary onClick={() => alert('Register me')}>{t('Finish')}</ButtonPrimary>
            }
          </div>
        </form>
      </div>
    </div>
  )

}

export default PageSignUp
