"use client"

import React, { FC, FormEvent, useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import { countries } from 'country-list-json'
import Label from "@/components/Label"
// import Avatar from "@/shared/Avatar"
import ButtonPrimary from "@/shared/ButtonPrimary"
import Input from "@/shared/Input"
import Select from "@/shared/Select"
import Textarea from "@/shared/Textarea"
import { useLogin } from '@/hooks/useLogin'
// import { awsUploadFile, getToken } from '@/utils/apiHelper'
// import ButtonSecondary from '@/shared/ButtonSecondary'
import { putItem, getItem } from '@/utils/apiHelper/fetch'
import { useLanguage } from '@/hooks/i18n'
import InputWithLabel from '@/shared/InputWithLabel'
import SelectWithLabel from '@/shared/SelectWithLabel'
import DateInputWithLabel from '@/shared/DateInputWithLabel'
import FormCard from '@/shared/FormCard'
import TextareaWithLabel from '@/shared/TextareaWithLabel'
import Image from 'next/image'
export interface MyProfileType {
  _id?: string
  name?: string
  email?: string
  firstName?: string
  lastName?: string
  gender?: string
  image?: string
  dateOfBirth?: string
  phoneNumber?: string
  address: {
    room?: string,
    streetName?: string,
    blockName?: string,
    buildingName?: string,
    buildingNumber?: string,
    citySubdivisionName?: string,
    cityName?: string,
    postalZone?: string,
    postbox?: string,
    region?: string,
    district?: string,
    country: {
      identificationCode?: string,
      name?: string
    }
  }
  bio?: string
  discount: {
    rate?: number,
    additionalAmount?: number
  },
  balance?: number
  currency?: string
  status?: string
  reviewMessage?: string
  reviewedBy?: string
  reviewDate?: string
  companyLegalName?: string
  taxOffice?: string
  taxNumber?: string
  companyLogo?: string,
  paymentInfo: {
    bankAccountName: string,
    ibanNo: string,
    creditCard: {
      holderName: string,
      cardNo: string,
      validYear: string,
      validMonth: string,
      ccv: string,
    },
    ethereumWallet: string,
    bitcoinWallet: string,
  }
}
export interface AccountPageProps { }

const AccountPage = () => {

  // const [sessionToken, setSessionToken] = useState('')
  const { t } = useLanguage()
  const { token } = useLogin()
  const [pullData, setPullData] = useState(false)
  const [me, setMe] = useState<MyProfileType | null>(null)
  // const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)


  const handleSubmit = async (file: File) => {

    const response = await fetch('/api/upload', {
      method: 'POST', headers: { 'Content-Type': 'application/json', token: token },
      body: JSON.stringify({ filename: `profiles/${me?._id}`, contentType: file.type }),
    })

    if (response.ok) {
      const { url, fields } = await response.json()
      const formData = new FormData()
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string)
      })
      formData.append('file', file)

      const uploadResponse = await fetch(url, { method: 'POST', body: formData })

      if (uploadResponse.ok) {
        if (me) {
          me.image = `${url}/${fields.key}`
          putItem('/me?partial=true', token, { image: me.image })
            .then(result => setMe({ ...me, ...result }))
            .catch(err => alert(err))
        }
      } else {
        alert(uploadResponse.statusText)
      }
    } else {
      alert(response.statusText)
    }
  }


  useEffect(() => {
    if (!pullData) {
      setPullData(true)
      getItem('/me', token)
        .then(data => setMe(data))
        .catch(err => console.log('getMyProfile err:', err))

    }

  }, [])


  return (<>
    {me &&

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">{t('Account infomation')}</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 flex items-start">
            <div className="relative rounded-full overf11low-hidden flex">
              <img className='w-32 h-32 rounded-full self-center' src={me.image} alt="tourabi" width={100} height={100} />
              <div className="absolute  inset-0 pt-8 rounded-full  bg-black bg-opacity-30 flex flex-col items-center justify-center text-blue-200 cursor-pointer">
                <i className="fa-solid fa-pen-to-square text-lg"></i>

                <span className="mt-1 text-xs">Change Image</span>
              </div>
              <input type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
                onChange={(e) => {
                  const files = e.target.files
                  if (files) {
                    handleSubmit(files[0])
                  }
                }}
              />
            </div>
          </div>
          <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
            <div className='grid grid-cols-1 gap-4 my-3'>
              <Label>Account status:<span className='uppercase'>{me.status}</span></Label>
              {(me.status == 'declined' || me.status == 'error') && <>
                <Label>{me.reviewMessage}</Label>
              </>}
            </div>
            <FormCard title={me.email || ''} id='account-info' defaultOpen={true}
              bodyClassName='grid grid-cols-1 space-y-3'
            >

              <div className='grid grid-cols-2 gap-4'>
                <InputWithLabel
                  label={t('First name')}
                  defaultValue={me.firstName}
                  onChange={e => setMe({ ...me, firstName: e.target.value })}
                />
                <InputWithLabel
                  label={t('Last name')}
                  defaultValue={me.lastName}
                  onChange={e => setMe({ ...me, lastName: e.target.value })}
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <SelectWithLabel
                  label={t('Gender')}
                  defaultValue={me.gender}
                  onSelect={e => setMe({ ...me, gender: e.currentTarget.value })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </SelectWithLabel>

                <DateInputWithLabel
                  label={t('Date of birth')}
                  defaultValue={me.dateOfBirth || ''}
                  onBlur={e => setMe({ ...me, dateOfBirth: e.target.value })}
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <InputWithLabel
                  label={t('Phone number')}
                  type={'tel'}
                  defaultValue={me.phoneNumber}
                  onChange={(e) => setMe({ ...me, phoneNumber: e.target.value })}
                />
              </div>
              <TextareaWithLabel
                label={t('About your company')}
                rows={5}
                defaultValue={`${me.bio}`}
                onChange={(e) => setMe({ ...me, bio: e.target.value })}
              />
            </FormCard>

            {/* Adress */}
            <FormCard title={t('Address')} id='account-address' defaultOpen={false}
              bodyClassName='grid grid-cols-1 md:grid-cols-3 gap-4 space-y-3'
            >
              <InputWithLabel label={t('Street name')}
                className='col-span-3'
                defaultValue={me.address.streetName}
                onChange={e => {
                  me.address.streetName = e.target.value
                  setMe({ ...me, address: me.address })
                }}
              />
              <InputWithLabel label={t('Building name')}
                className='col-span-1'
                defaultValue={me.address.buildingName}
                onChange={e => {
                  me.address.buildingName = e.target.value
                  setMe({ ...me, address: me.address })
                }}
              />
              <InputWithLabel label={t('Building number')}
                className='col-span-1'
                defaultValue={me.address.buildingNumber}
                onChange={e => {
                  me.address.buildingNumber = e.target.value
                  setMe({ ...me, address: me.address })
                }}
              />
              <InputWithLabel label={t('Block name')}
                className='col-span-1'
                defaultValue={me.address.blockName}
                onChange={e => {
                  me.address.blockName = e.target.value
                  setMe({ ...me, address: me.address })
                }}
              />
              <InputWithLabel label={t('Apartment number')}
                className='col-span-1'
                defaultValue={me.address.room}
                onChange={e => {
                  me.address.room = e.target.value
                  setMe({ ...me, address: me.address })
                }}
              />
              <InputWithLabel label={t('City Subdivision')}
                className='col-span-1'
                defaultValue={me.address.citySubdivisionName}
                onChange={e => {
                  me.address.citySubdivisionName = e.target.value
                  setMe({ ...me, address: me.address })
                }}
              />
              <InputWithLabel label={t('District')}
                className='col-span-1'
                defaultValue={me.address.district}
                onChange={e => {
                  me.address.district = e.target.value
                  setMe({ ...me, address: me.address })
                }}
              />
              <InputWithLabel label={t('City')}
                className='col-span-1'
                defaultValue={me.address.cityName}
                onChange={e => {
                  me.address.cityName = e.target.value
                  setMe({ ...me, address: me.address })
                }}
              />
              <InputWithLabel label={t('Region')}
                className='col-span-1'
                defaultValue={me.address.region}
                onChange={e => {
                  me.address.region = e.target.value
                  setMe({ ...me, address: me.address })
                }}
              />
              <InputWithLabel label={t('Postal zone')}
                className='col-span-1'
                defaultValue={me.address.postalZone}
                onChange={e => {
                  me.address.postalZone = e.target.value
                  setMe({ ...me, address: me.address })
                }}
              />
              <SelectWithLabel
                className='col-span-1'
                label={t('Country')}
                defaultValue={me.address.country.identificationCode}
                onChange={e => {
                  me.address.country = {
                    identificationCode: e.target.value,
                    name: e.target.options.item(e.target.selectedIndex)?.text
                  }
                  setMe({ ...me, address: me.address })
                }}
              >
                {countries.map((ulke, index) => (
                  <option key={index} value={ulke.code}>{ulke.name}</option>
                ))}
              </SelectWithLabel>
            </FormCard>
            {/* /end Adress */}

            {/* Company informations */}
            <FormCard title={t('Company informations')} id='account-company-info' defaultOpen={false}
              bodyClassName='grid grid-cols-1 md:grid-cols-4 gap-4 space-y-3'
            >
              <InputWithLabel
                className='col-span-4'
                label={t('Company legal name')}
                defaultValue={me.companyLegalName}
                onChange={(e) => setMe({ ...me, companyLegalName: e.target.value })}
              />
              <InputWithLabel
                className='col-span-2'
                label={t('Tax office')}
                defaultValue={me.taxOffice}
                onChange={(e) => setMe({ ...me, taxOffice: e.target.value })}
              />
              <InputWithLabel
                className='col-span-2'
                label={t('Tax number')}
                defaultValue={me.taxNumber}
                onChange={(e) => setMe({ ...me, taxNumber: e.target.value })}
              />
              <div className='col-span-4 h-42'>
                <div className='w-full  mx-w-80 border p-4'>
                  qwerty company logo here
                </div>
              </div>
            </FormCard>
            {/* /end Company informations */}


            {/* Payment Info */}
            {/* <FormCard title={t('Payment info')} id='account-payment-info' defaultOpen={false}
              bodyClassName='grid grid-cols-1 md:grid-cols-4 gap-4 space-y-3'
            >
              <div className='col-span-4'>
                <div className='flex flex-row'>
                  <InputWithLabel
                    className='basis-1/4'
                    label={t('Account name')}
                    defaultValue={me.paymentInfo.bankAccountName}
                    onChange={(e) => {
                      me.paymentInfo.bankAccountName = e.target.value
                      setMe({ ...me, paymentInfo: me.paymentInfo })
                    }}
                  />
                  <InputWithLabel
                    className='basis-3/4'
                    label={t('Iban number')}
                    defaultValue={me.paymentInfo.ibanNo}
                    onChange={(e) => {
                      me.paymentInfo.ibanNo = e.target.value
                      setMe({ ...me, paymentInfo: me.paymentInfo })
                    }}
                  />
                </div>
              </div>

              <FormCard id='account-payment-creditcard'
                className='col-span-4'
                title={t('Credit card')}
                defaultOpen={false}
                bodyClassName=' grid grid-cols-2 md:grid-cols-4 gap-4'
                icon={(<><i className="fa-brands fa-cc-visa"></i><i className="fa-brands fa-cc-mastercard"></i></>)}
              >

                <InputWithLabel
                  className='col-span-4'
                  label={t('Holder name')}
                  defaultValue={me.paymentInfo.creditCard.holderName}
                  onChange={(e) => {
                    me.paymentInfo.creditCard.holderName = e.target.value
                    setMe({ ...me, paymentInfo: me.paymentInfo })
                  }}
                />
                <InputWithLabel
                  className='col-span-4'
                  label={t('Card number')}
                  defaultValue={me.paymentInfo.creditCard.cardNo}
                  onChange={(e) => {
                    me.paymentInfo.creditCard.cardNo = e.target.value
                    setMe({ ...me, paymentInfo: me.paymentInfo })
                  }}
                />
                <InputWithLabel
                  className='col-span-1'
                  label={t('Valid month')}
                  placeholder='mm'
                  defaultValue={me.paymentInfo.creditCard.validMonth}
                  onChange={(e) => {
                    me.paymentInfo.creditCard.validMonth = e.target.value
                    setMe({ ...me, paymentInfo: me.paymentInfo })
                  }}
                />
                <InputWithLabel
                  className='col-span-1'
                  label={t('Valid year')}
                  placeholder='yy'
                  defaultValue={me.paymentInfo.creditCard.validYear}
                  onChange={(e) => {
                    me.paymentInfo.creditCard.validYear = e.target.value
                    setMe({ ...me, paymentInfo: me.paymentInfo })
                  }}
                />
                <InputWithLabel
                  className='col-span-1'
                  label={t('CCV')}
                  type='password'
                  defaultValue={me.paymentInfo.creditCard.ccv}
                  onChange={(e) => {
                    me.paymentInfo.creditCard.ccv = e.target.value
                    setMe({ ...me, paymentInfo: me.paymentInfo })
                  }}
                />
              </FormCard>
              <InputWithLabel
                className='col-span-4'
                label={t('Ethereum wallet')}
                defaultValue={me.paymentInfo.ethereumWallet}
                onChange={(e) => {
                  me.paymentInfo.ethereumWallet = e.target.value
                  setMe({ ...me, paymentInfo: me.paymentInfo })
                }}
              />
              <InputWithLabel
                className='col-span-4'
                label={t('Bitcoin wallet')}
                defaultValue={me.paymentInfo.bitcoinWallet}
                onChange={(e) => {
                  me.paymentInfo.bitcoinWallet = e.target.value
                  setMe({ ...me, paymentInfo: me.paymentInfo })
                }}
              />
            </FormCard> */}
            {/* /end Company informations */}
            <div className="pt-2">
              <ButtonPrimary
                onClick={() => {
                  putItem('/me', token, me)
                    .then(() => location.reload())
                    .catch(err => alert(err))
                }}>
                {t('Update')}
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    }
  </>
  )
}

export default AccountPage
