

import { registerApplication, unloadApplication, start, getAppNames } from 'single-spa'
import { portalModule } from '@module-data/portal/config'
import { dashboardModule } from '@module-data/dashboard/config'
import { registerModule } from '@legend/helper-react-hooks'
import { 
  portalProps, 
  dashboardProps, 
  biReportProps,
  channelManageProps } from './props'
import { biReportModule } from '@module-data/bi-report/lib/config'
import { channelManageModule } from '@module-data/channel-manage'
import { pathPrefix } from '@legend/framework'


// import './style.css'
require('./style.css')

export function mount () {
  // 注册数据
  registerModule(portalModule.name, portalModule)
  registerModule(dashboardModule.name, dashboardModule)

  registerApplication(
    portalModule.name, 
    () => import('@module-data/portal'), 
    () => true,
    portalProps
  )

  registerApplication(
    dashboardModule.name,
    () => import('@module-data/dashboard'),
    pathPrefix('/dashboard'),
    dashboardProps
  )

  registerApplication(
    biReportModule.name,
    () => import('@module-data/bi-report'),
    pathPrefix('/bi-report'),
    biReportProps
  )
  

  registerApplication(
    channelManageModule.name,
    () => import('@module-data/channel-manage'),
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

