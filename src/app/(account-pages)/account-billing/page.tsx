"use client"

import React, { useState } from "react"
import ButtonPrimary from "@/shared/ButtonPrimary"
import InvoicePage from './Invoice'

const AccountBilling = () => {
  const [show, setShow] = useState(false)
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* HEADING */}
      <h2 className="text-3xl font-semibold">Payments & payouts</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="max-w-2xl">
        <span className="text-xl font-semibold block">Payout methods</span>
        <br />
        <span className="text-neutral-700 dark:text-neutral-300 block">
          {` When you receive a payment for a reservation, we call that payment
              to you a "payout." Our secure payment system supports several
              payout methods, which can be set up below. Go to FAQ.`}
          <br />
          <br />
          To get paid, you need to set up a payout method Airbnb releases
          payouts about 24 hours after a guest’s scheduled check-in time. The
          time it takes for the funds to appear in your account depends on your
          payout method. Learn more
        </span>
        <div className="pt-10">
          <ButtonPrimary onClick={() => setShow(!show)}>Show Invoice</ButtonPrimary>
        </div>
        {show && <div>
          {/* <InvoicePage invoiceNo='939044' invoiceDate='2024-03-04'  currency='USD' subTotal={900} taxTotal={180} 
          totalAmount={1080} /> */}
          {InvoicePage({
            invoiceNo: '939044', invoiceDate: '2024-03-04',
            currency: 'USD', subTotal: 900, taxTotal: 180, 
            totalAmount: 1080,
            vendor:{
              name:'TourAbi Digital Tourism Services A.G.',
              addressText:"Defrr 24. Koln Germany",
              taxNumber:"847546001",
              taxOffice:"Schgoff"
            },
            customer:{
              name:'Cem 2 Alione Tour and Organisation Company',
              addressText:"2001/1 St. 2/2 Miarkoru Torbali Izmir",
              taxNumber:"833024432",
              taxOffice:"Torbali"
            }
          })}
        </div>}
      </div>
    </div>
  )
}

export default AccountBilling
