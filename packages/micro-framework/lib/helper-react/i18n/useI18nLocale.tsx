import React, { createContext, useContext, useEffect, useState, FC } from 'react'
import { useLocalStorage } from '../localstorage/useLocalStorage'

export enum I18nLanguages {
  ZH_CN = 'zh-CN',
  EN_US = 'en-US',
}

export type I18nLocales = {
  [key: string]: { [key: string]: any } | string
}

export type I18nProps = {
  lang: I18nLanguages,
  setLang: (lang: I18nLanguages) => void,
  locales: I18nLocales,
}

export const I18nContext = createContext<Partial<I18nProps>>({
  lang: defLang()
})

function defLang() {
  let defaultLang: I18nLanguages
  if (window.navigator) {
    const { language, languages } = window.navigator
    defaultLang = (
      language ||
      languages && languages.length && languages[0] ||
      I18nLanguages.ZH_CN
    ) as I18nLanguages
  }
  else {
    defaultLang = I18nLanguages.ZH_CN
  }

  return defaultLang
}

export const I18nProvider: FC<{
  lang?: I18nLanguages,
  locales?: I18nLocales,
  storageKey?: string
}> = ({
  children,
  lang: propLang,
  locales: propLocales,
  storageKey
}) => {

    
    const [storageLang, setStorageLang] = useLocalStorage(
      storageKey || 'lang', propLang || defLang()
    )

    return (
      <I18nContext.Provider value={{
        lang: storageLang,
        setLang: setStorageLang,
        locales: propLocales,
      }}>
        {children}
      </I18nContext.Provider>
    )
  }

/**
 * 
 * @param componentLocales use this param as locales instead of I18Provider's locales prop
 */
export function useI18nLocale<T> (locales?: I18nLocales) {
  const { lang, locales: rootLocales } = useContext(I18nContext)
  
  const currentLocales = locales || rootLocales

  if (!currentLocales)
    throw new Error('please set a root locales or component locales at least')

  const [locale, setLocale] = useState(currentLocales[lang])

  useEffect(() => {
    setLocale(currentLocales[lang])
  }, [lang])

  return [locale, setLocale] as [T, typeof setLocale]
}

export const useI18nLang = () => {
  const { lang, setLang } = useContext(I18nContext)
  return [lang, setLang] as [I18nLanguages, typeof setLang]
}
