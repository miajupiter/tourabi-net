import { useLanguage } from '@/i18n'
import Select from '@/shared/Select'
import React, {FC, useEffect, useState } from 'react'

export interface SelectLanguageProps {
  // onChangeLang?:any
  // defaultValue?:string
  className?:string
}

const SelectLanguage:FC<SelectLanguageProps> = ({
  className=''
}) => {
  const { lang , changeLanguage } = useLanguage()
  return (
    <div className='flex items-center'>
      <i className='la la-language text-4xl'></i>
      <select className={`nc-Select block w-full text-sm rounded-[4px] border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-transparent dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 h-11 ${className}`}
       value={lang} onChange={(e) => changeLanguage(e.target.value as string)} >
        <option value="en">English</option>
        <option value="es">Española</option>
        <option value="de">Deutsch</option>
        <option value="pt">Português</option>
        <option value="ar">عربي</option>
        <option value="nl">Nederlands</option>
        <option value="fr">Français</option>
        <option value="fa">فارسی</option>
        <option value="it">Italiano</option>
        <option value="jp">日本人</option>
        <option value="pl">Polski</option>
        <option value="ro">Română</option>
        <option value="ru">Русский</option>
        <option value="kr">한국어</option>
        <option value="az">Azərbaycan</option>
        <option value="tr">Türkçe</option>
        <option value="zh">中国人</option>
      </select>
    </div>
  )
}

export default SelectLanguage