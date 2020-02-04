import React, { Fragment } from 'react'
import { ExampleButton } from '@legend/ui'
import { 
  I18nProvider, 
  I18nLanguages, 
  useI18nLocale, 
  useI18nLang,
} from '@legend/helper-react-hooks'
import notes from './i18n.notes.md'

export default {
  title: 'i18n',
  parameters: { notes }
}

function I18nText () {
  const [text] = useI18nLocale({
    [I18nLanguages.ZH_CN]: '你好',
    [I18nLanguages.EN_US]: 'Hello'
  })

  return <div>{text}</div>
}

function GlobalI18nCancelButton () {
  const [locale] = useI18nLocale({
    [I18nLanguages.ZH_CN]: {
      create: '创建',
      cancel: '取消',
    },
    [I18nLanguages.EN_US]: {
      create: 'Create',
      cancel: 'Cancel'
    }
  })

  return <ExampleButton>{ locale.cancel }</ExampleButton>
}

function LocalI18nCreateButton () {
  const [locale] = useI18nLocale({
    [I18nLanguages.ZH_CN]: { btn: '创建' },
    [I18nLanguages.EN_US]: { btn: 'Create' }
  })

  return <ExampleButton>{locale.btn}</ExampleButton>
}

function ButtonGroup () {
  const [lang, setLang] = useI18nLang()
  return (
    <Fragment>
      <div>current language: {lang}</div>
      <ExampleButton 
        style={{ marginRight: 20 }}
        onClick={() => setLang(I18nLanguages.ZH_CN)}>简体中文</ExampleButton>
      <ExampleButton onClick={() => setLang(I18nLanguages.EN_US)}>English</ExampleButton>
    </Fragment>
  )
}



export function i18n () {
  return (
    <I18nProvider>
      <I18nText />
      <GlobalI18nCancelButton />
      <LocalI18nCreateButton />
      <ButtonGroup />
    </I18nProvider>
  )
}

i18n.story = {
  parameters: { notes },
}