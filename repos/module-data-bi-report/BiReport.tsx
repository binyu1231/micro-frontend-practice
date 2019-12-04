import React, { FC, useState, useMemo } from 'react'
import { CardContentLayout, HeaderTab } from '@legend/ui'
import { ReportOverivew } from './report'
import { Card } from 'antd'
import { ReportEnum, BiApi } from './config'
import { last3DayMoment } from '@legend/kit'


export const BiReport: FC<{
  biApi: BiApi
}> = ({
  biApi
}) => {

  const [tabs, setTabs] = useState<HeaderTab[]>([
    { name: '整体统计报表', key: ReportEnum.overview },
    { name: '平台统计报表', key: ReportEnum.platform },
    { name: '地域统计报表', key: ReportEnum.geo },
    { name: 'RTB统计报表', key: ReportEnum.rtb },
    { name: 'PMP统计报表', key: ReportEnum.pmp },
    { name: 'AD统计报表', key: ReportEnum.ad },
    { name: 'CookieMapping', key: ReportEnum.cookieMapping },
  ])

  const [activeTabKey, setKey] = useState<string>(ReportEnum.overview)

  const Component = useMemo(() => {
    console.log('eeeee', biApi)
    return <ReportOverivew biApi={ biApi } />
  }, [])
  return (
    <div className="h-screen flex flex-col">
      <CardContentLayout
        title="统计报表"
        tabs={tabs}
        activeTabKey={activeTabKey}
        onTabChange={setKey}
      >
        { Component }
      </CardContentLayout>
    </div>
  )
}