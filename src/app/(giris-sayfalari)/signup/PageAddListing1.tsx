import React, { FC } from "react"
import Input from "@/shared/Input"
import Select from "@/shared/Select"
import FormItem from "./FormItem"


const PageAddListing1 = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold">Choosing listing categories</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="space-y-8">
        <FormItem
          label="Place name"
          desc="A catchy name usually includes: House name + Room name + Featured property + Tourist destination"
        >
          <Input placeholder="Places name" />
        </FormItem>
        <FormItem
          label="Place name"
          desc="A catchy name usually includes: House name + Room name + Featured property + Tourist destination"
        >
          <Input placeholder="Places name" />
        </FormItem>
        <FormItem
          label="Rental form"
          desc="Entire place: Guests have the whole place to themselves—there's a private entrance and no shared spaces. A bedroom, bathroom, and kitchen are usually included."
        >
          <Select>
            <option value="Hotel">Entire place</option>
            <option value="Private room">Private room</option>
            <option value="Share room">Share room</option>
          </Select>
        </FormItem>
      </div>
    </>
  )
}

export default PageAddListing1
