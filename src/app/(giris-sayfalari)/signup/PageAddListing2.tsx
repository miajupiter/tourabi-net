"use client"

import { MapPinIcon } from "@heroicons/react/24/solid"
import LocationMarker from "@/components/AnyReactComponent/LocationMarker"
import Label from "@/components/Label"
import GoogleMapReact from "google-map-react"
import React, { FC } from "react"
import ButtonSecondary from "@/shared/ButtonSecondary"
import Input from "@/shared/Input"
import Select from "@/shared/Select"
import FormItem from "./FormItem"


const PageAddListing2 = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold">Your place location</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        <ButtonSecondary>
          <MapPinIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
          <span className="ml-3">Use current location</span>
        </ButtonSecondary>
        {/* ITEM */}
        <FormItem label="Country/Region">
          <Select>
            <option value="Viet Nam">Viet Nam</option>
            <option value="Thailand">Thailand</option>
            <option value="France">France</option>
            <option value="Singapore">Singapore</option>
            <option value="Jappan">Jappan</option>
            <option value="Korea">Korea</option>
            <option value="...">...</option>
          </Select>
        </FormItem>
        <FormItem label="Street">
          <Input placeholder="..." />
        </FormItem>
        <FormItem label="Room number (optional)">
          <Input />
        </FormItem>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
          <FormItem label="City">
            <Input />
          </FormItem>
          <FormItem label="State">
            <Input />
          </FormItem>
          <FormItem label="Postal code">
            <Input />
          </FormItem>
        </div>
        <div>
          <Label>Detailed address</Label>
          <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            1110 Pennsylvania Avenue NW, Washington, DC 20230
          </span>

        </div>
      </div>
    </>
  )
}

export default PageAddListing2
