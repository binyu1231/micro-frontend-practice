import React, { Fragment } from 'react'
import { ExampleButton } from '@legend/ui'
import { Dashboard } from '@module-data/dashboard'
import { 
  I18nLanguages,
  I18nProvider, 
  useI18nLang
} from '@legend/helper-react-hooks'

export default {
  title: 'Dashboard'
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

export function i18n() {
  return (
    <I18nProvider>
      <Dashboard access={{
        /** 标签云 */
        tagCloud: true,
        /** ID 图谱 */
        idGraph: true,
        /** 地域分布 */
        geo: true,
        /** 标签分布 */
        tagCoverage: true,
        /** 行业人群 */
        predefinedSegment: true,
        /** 基础属性 */
        demographics: true,
        /** 人均标签分布 */
        tagStatistics: true,
        /** 兴趣偏好 */
        preference: true,
        /** 近30天ID数量趋势 */
        idTrend: false,

      }} />
      <ButtonGroup />
    </I18nProvider>
  )
}