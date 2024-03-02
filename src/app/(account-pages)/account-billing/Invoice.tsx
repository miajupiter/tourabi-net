"use client"

import { useLanguage } from '@/hooks/i18n'
import FormCard, { FormCardType } from '@/shared/FormCard'
import { FC } from 'react'

export interface InvoicePageProps {
  _id?: string
  invoiceNo?: string
  invoiceDate?: string
  vendor?: {
    name: string,
    addressText: string,
    taxOffice: string,
    taxNumber: string,
  }
  customer?: {
    name: string,
    addressText: string,
    taxOffice: string,
    taxNumber: string,
  }
  currency?: string
  subTotalWithoutDiscount?: number
  discountTotal?: number,
  subTotal?: number,
  taxTotal?: number
  totalAmount?: number
  lines?: any[]
}
const InvoicePage: FC<InvoicePageProps> = ({ _id, invoiceNo, invoiceDate, vendor, customer, currency, subTotalWithoutDiscount, subTotal, discountTotal, taxTotal, totalAmount, lines }) => {
  // const { t } = useLanguage()

  return <>
    <FormCard id="account-invoice-page"
      title={'Invoice1'}
      cardType={FormCardType.STATIC}
      bodyClassName='relative min-h-[500px]'
    >
      
        <div className='absolute top-0 end-2'>{invoiceDate}</div>
        <div className='absolute top-10 end-2'>{invoiceNo}</div>
        <div className='absolute top-0 start-2 border rounded-md p-2 w-[60%]'>
          {vendor?.name}<br />
          {vendor?.addressText}<br />
          {vendor?.taxOffice} - {vendor?.taxNumber}<br />
        </div>
        <div className='absolute top-24 start-2 font-medium border rounded-md p-2 w-[60%]'>
          {customer?.name}<br />
          {customer?.addressText}<br />
          {customer?.taxOffice} - {customer?.taxNumber}<br />
        </div>
        
        {/* <div className='w-full'>currency:{currency}</div>
      <div className='w-full'>subTotal:{subTotal}</div>
      <div className='w-full'>taxTotal:{taxTotal}</div> */}
        <div className='absolute bottom-2 end-2'>totalAmount:{totalAmount}</div>

    </FormCard>
  </>
}

export default InvoicePage