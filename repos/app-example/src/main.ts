

import { registerApplication, unloadApplication, start, getAppNames } from 'single-spa'
import { PortalModule, portalModule, IPortalRootProps } from '@module-data/portal/config'
import { IDashboardRootProps, dashboardAccesses } from '@module-data/dashboard/config'
// registerModule(portalModule.name, portalModule)
import './style.css'
console.log('ggggggggg')
export function mount () {

  const portalProps: Partial<IPortalRootProps> = {
    rootPath: '',
    signSuccessRedirectPath: '/dashboard'
  }

  const dashboardProps: Partial<IDashboardRootProps> = {
    rootPath: '/dashboard',
    access: {
      tagCloud: true,
      idGraph: true,
      geo: true,
      tagCoverage: true,
      predefinedSegment: true,
      demographics: true,
      tagStatistics: true,
      preference: true,
      idTrend: true,
    }
  }

  registerApplication(
    portalModule.name, 
    () => import('@module-data/portal'), 
    () => true,
    portalProps
  )

  registerApplication(
    'dashboard',
    () => import('@module-data/dashboard'),
    pathPrefix('/dashboard'),
    dashboardProps
  )
  
  // registerApplication(
  //   'label-market',
  //   () => import('@module-data/label-market'),
  //   pathPrefix('/label-market'),
  //   {
  //     rootPath: '/label-market'
  //   }
  // )
  
  function pathPrefix(prefix: string) {
    return function(location: Location) {
        return location.pathname.indexOf(prefix) === 0
    }
  }
  
  start()
}

export function unmount () {
  return Promise.all(getAppNames().map(appName => unloadApplication(appName)))
}

