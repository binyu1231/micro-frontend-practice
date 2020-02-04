

import { registerApplication, unloadApplication, start, getAppNames } from 'single-spa'
import { portalModule } from '@container/normal-portal/lib/config'
import { dashboardModule } from '@container/dna-dashboard/lib/config'
import { 
  portalProps, 
  dashboardProps, 
  biReportProps,
  channelManageProps } from './props'
import { biReportModule } from '@container/bi-query/lib/config'
import { channelManageModule } from '@container/bi-channel-manage/lib/config'
import { pathPrefix, registerModule } from '@micro/framework'


// import './style.css'
require('./style.css')

export function mount () {
  // 注册数据
  registerModule(portalModule.name, portalModule)
  registerModule(dashboardModule.name, dashboardModule)

  registerApplication(
    portalModule.name, 
    () => import('@container/normal-portal'), 
    () => true,
    portalProps
  )

  registerApplication(
    dashboardModule.name,
    () => import('@container/dna-dashboard'),
    pathPrefix('/dashboard'),
    dashboardProps
  )

  registerApplication(
    biReportModule.name,
    () => import('@container/bi-query'),
    pathPrefix('/bi-report'),
    biReportProps
  )
  

  registerApplication(
    channelManageModule.name,
    () => import('@container/bi-channel-manage'),
    pathPrefix(channelManageProps.rootPath),
    channelManageProps
  )
  // registerApplication(
  //   'label-market',
  //   () => import('@module-data/label-market'),
  //   pathPrefix('/label-market'),
  //   {
  //     rootPath: '/label-market'
  //   }
  // )
  
  
  
  start()
}

export function unmount () {
  return Promise.all(getAppNames().map(appName => unloadApplication(appName)))
}

