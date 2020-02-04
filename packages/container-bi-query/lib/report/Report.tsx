/**
 * 
 */
import React, { FC, useState, useMemo } from 'react'
import { CardContentLayout, HeaderTab } from '@component/ui'
import { RouteComponentProps } from 'react-router'
import { ReportEnum } from '../config'
import { ReportOverivew } from './ReportOverview'
import { ReportPlatform } from './ReportPlatform'
import { ReportGeo } from './ReportGeo'
import { ReportRtb } from './ReportRtb'
import { ReportAd } from './ReportAd'
import { ReportPmp } from './ReportPmp'
import { ReportCookieMapping } from './ReportCookieMapping'

import { IReportProps } from './types'
import { useStore } from '../store'

const keyReportMap: Map<ReportEnum, FC<IReportProps>> = new Map([
  [ReportEnum.overview, ReportOverivew],
  [ReportEnum.platform, ReportPlatform],
  [ReportEnum.geo, ReportGeo],
  [ReportEnum.rtb, ReportRtb],
  [ReportEnum.pmp, ReportPmp],
  [ReportEnum.ad, ReportAd],
  [ReportEnum.cookieMapping, ReportCookieMapping as any],
])

const tabs: HeaderTab[] = [
  { name: '整体统计报表', key: ReportEnum.overview },
  { name: '平台统计报表', key: ReportEnum.platform },
  { name: '地域统计报表', key: ReportEnum.geo },
  { name: 'RTB统计报表', key: ReportEnum.rtb },
  { name: 'PMP统计报表', key: ReportEnum.pmp },
  { name: 'AD统计报表', key: ReportEnum.ad },
  { name: 'CookieMapping', key: ReportEnum.cookieMapping },
]

export const Report: FC<RouteComponentProps> = ({

}) => {

  const { store: { api } } = useStore()

  const [activeTabKey, setKey] = useState<ReportEnum>(ReportEnum.overview)

  const Component = useMemo(() => {

    const Report = keyReportMap.get(activeTabKey) || ReportOverivew

    return <Report biApi={api} />
  }, [activeTabKey, api])

  return (
    <CardContentLayout
      title="统计报表"
      tabs={tabs}
      activeTabKey={activeTabKey}
      onTabChange={(key) => setKey(key as any)}
      strechCard
    >
      {Component}
    </CardContentLayout>
  )
}