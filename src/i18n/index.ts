import { useEffect } from "react"

import __ar from './__ar.json'
import __az from './__az.json'
import __de from './__de.json'
import __en from './__en.json'
import __es from './__es.json'
import __fa from './__fa.json'
import __fr from './__fr.json'
import __it from './__it.json'
import __jp from './__jp.json'
import __kr from './__kr.json'
import __nl from './__nl.json'
import __pl from './__pl.json'
import __pt from './__pt.json'
import __ro from './__ro.json'
import __ru from './__ru.json'
import __tr from './__tr.json'
import __zh from './__zh.json'
import { createGlobalState } from "react-hooks-global-state"


export const LANG_LISTS: any = {
  ar: __ar,
  az: __az,
  de: __de,
  en: __en,
  es: __es,
  fa: __fa,
  fr: __fr,
  it: __it,
  jp: __jp,
  kr: __kr,
  nl: __nl,
  pl: __pl,
  pt: __pt,
  ro: __ro,
  ru: __ru,
  tr: __tr,
}

const initialState = { lang: 'en' }
const { useGlobalState } = createGlobalState(initialState)

export const useLanguage = () => {
  const [lang, setLang] = useGlobalState('lang')
  
  useEffect(() => {
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', "en")
    }
    setLang(localStorage.getItem('lang') || 'en')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  
  const t = (key: string) => {
    const key2 = key.replace(/\s/g, '_').toLowerCase()

    const list = LANG_LISTS[lang || 'en'] || __en

    if (Object.keys(list).includes(key2)) {
      return list[key2] as string
    } else if (Object.keys(list).includes(key)) {
      return list[key] as string
    } else {
      return key
    }
  }
  
  const changeLanguage=(language:string)=>{
    localStorage.setItem('lang',language)
    setLang(language)

  }
  return {
    t,
    lang,
    changeLanguage,
  }
}
