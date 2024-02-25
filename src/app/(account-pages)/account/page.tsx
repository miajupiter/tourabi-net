"use client"

import React, { FC, FormEvent, useState, useEffect } from "react"

import Label from "@/components/Label"
// import Avatar from "@/shared/Avatar"
import ButtonPrimary from "@/shared/ButtonPrimary"
import Input from "@/shared/Input"
import Select from "@/shared/Select"
import Textarea from "@/shared/Textarea"
import { useLogin } from '@/hooks/useLogin'
// import { awsUploadFile, getToken } from '@/utils/apiHelper'
// import ButtonSecondary from '@/shared/ButtonSecondary'

export interface MyProfileType {
  _id?: string
  id?: string
  name?: string
  username?: string
  email?: string
  image?: string
  gender?: string
  dateOfBirth?: string
  phoneNumber?: string
  address?: {
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
    country?: {
      identificationCode?: string,
      name?: string
    } | null,
  }
  bio?: string
}
export interface AccountPageProps { }

const AccountPage = () => {

  // const [sessionToken, setSessionToken] = useState('')
  const { token } = useLogin()

  const [me, setMe] = useState<MyProfileType | null>(null)
  // const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)


  const getMyProfile = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/me`, { method: 'GET', headers: { 'Content-Type': 'application/json', token: token } })
      .then(ret => ret.json())
      .then(resp => {
        if (resp && resp.data) {
          setMe(resp.data)
        } else {
          setMe(null)
        }
      }).catch(console.log)

  }
  const updateMyProfile = () => {
    if (!token) {
      console.log('token required')
      return
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/me`, { method: 'PUT', headers: { 'Content-Type': 'application/json', token: token }, body: JSON.stringify(me) })
      .then(ret => ret.json())
      .then(resp => {
        console.log('Basarili', resp)
      }).catch(console.log)
  }

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  const handleSubmit = async (file: File) => {

    if (!file) {
      alert('Please select a file to upload.')
      return
    }

    setUploading(true)
    console.log(process.env.NEXT_PUBLIC_BASE_URL + '/api/upload')
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/api/upload',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: `profiles/${me?._id}`, contentType: file.type }),
      }
    )

    if (response.ok) {
      const { url, fields } = await response.json()
      console.log('url2:', url)
      console.log('fields2:', fields)
      const formData = new FormData()
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string)
      })
      formData.append('file', file)

      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      if (uploadResponse.ok) {
        console.log(url + fields.key)
        const imgUrl = `${url}${fields.key}`
        setMe({ ...me, image: imgUrl })
        // alert('Upload successful!')
      } else {
        console.error('S3 Upload Error:', uploadResponse)
        alert('Upload failed.')
      }
    } else {
      alert('Failed to get pre-signed URL.')
    }

    setUploading(false)
  }

  useEffect(() => {


    getMyProfile()
  }, [token])

  useEffect(() => {
    console.log('useeffect 2')
  }, [])

  useEffect(() => {
    console.log('useeffect 3')
  }, [])

  return (
    <>

      {me &&

        <div className="space-y-6 sm:space-y-8">
          <h2 className="text-3xl font-semibold">Account infomation</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 flex items-start">
              <div className="relative rounded-full overf11low-hidden flex">

                <img className='w-32 h-32 rounded-full self-center' src={me.image} alt="tourabi" width={100} height={100} />
                <div className="absolute  inset-0 pt-8 rounded-full  bg-black bg-opacity-30 flex flex-col items-center justify-center text-blue-200 cursor-pointer">
                  {/* <i className="fa-solid fa-photo-film text-lg"></i> */}
                  <i className="fa-solid fa-pen-to-square text-lg"></i>

                  <span className="mt-1 text-xs">Change Image</span>
                </div>
                <input
                  type="file"
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
              <div>
                <Label>id:{me.id} | _id:{me._id}</Label>
              </div>
              <div>
                <Label>upload status:{uploading ? 'yukleniyor' : ''}</Label>
              </div>
              <div>
                <Label>Name</Label>
                <Input className="mt-1.5" defaultValue={`${me.name}`} onChange={(e) => setMe({ ...me, name: e.target.value })} />
              </div>
              <div>
                <Label>Gender</Label>
                <Select className="mt-1.5" defaultValue={`${me.gender}`} onChange={(e) => setMe({ ...me, gender: e.target.value })}  >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
              </div>

              <div>
                <Label>Username</Label>
                <Input className="mt-1.5" defaultValue={`${me.username}`} onChange={(e) => setMe({ ...me, username: e.target.value })} />
              </div>

              <div>
                <Label>Email</Label>
                <Input className="mt-1.5" defaultValue={`${me.email}`} readOnly onChange={(e) => setMe({ ...me, email: e.target.value })} />
              </div>
              <div className="max-w-lg">
                <Label>Date of birth</Label>
                <Input className="mt-1.5" type="date" defaultValue={`${me.dateOfBirth}`} onChange={(e) => setMe({ ...me, dateOfBirth: e.target.value })} />
              </div>
              <div>
                <Label>Addess Street</Label>
                <Input className="mt-1.5" defaultValue={`${me.address && me.address.streetName}`} onChange={(e) => setMe({ ...me, address: { streetName: e.target.value } })} />
              </div>
              <div>
                <Label>Addess District</Label>
                <Input className="mt-1.5" defaultValue={`${me.address && me.address.district}`} onChange={(e) => setMe({ ...me, address: { district: e.target.value } })} />
              </div>
              <div>
                <Label>Addess City</Label>
                <Input className="mt-1.5" defaultValue={`${me.address && me.address.cityName}`} onChange={(e) => setMe({ ...me, address: { cityName: e.target.value } })} />
              </div>
              <div>
                <Label>Addess Region</Label>
                <Input className="mt-1.5" defaultValue={`${me.address && me.address.region}`} onChange={(e) => setMe({ ...me, address: { region: e.target.value } })} />
              </div>
              <div>
                <Label>Phone number</Label>
                <Input className="mt-1.5" type='tel' defaultValue={`${me.phoneNumber}`} onChange={(e) => setMe({ ...me, phoneNumber: e.target.value })} />
              </div>
              <div>
                <Label>About you</Label>
                <Textarea className="mt-1.5" defaultValue={`${me.bio}`} onChange={(e) => setMe({ ...me, bio: e.target.value })} />
              </div>
              <div className="pt-2">
                <ButtonPrimary type='button' onClick={() => updateMyProfile()}>Update info</ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default AccountPage
