

import { registerApplication, unloadApplication, start, getAppNames } from 'single-spa'
import { portalModule, IPortalRootProps, PortalApi } from '@module-data/portal/config'
import { dashboardModule, IDashboardRootProps } from '@module-data/dashboard/config'
import { registerModule, I18nLanguages } from '@legend/helper-react-hooks'
import { portalProps, dashboardProps, biReportProps } from './props'
import { biReportModule } from '@module-data/bi-report/config'


const host = 'http://192.168.5.151:81'
// import './style.css'
require('./style.css')

function pathPrefix(prefix: string) {
  return function(location: Location) {
      return window.location.pathname.indexOf(prefix) === 0
  }
}

export function mount () {

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

