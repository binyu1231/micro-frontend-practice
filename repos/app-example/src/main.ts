

import { registerApplication, unloadApplication, start, getAppNames } from 'single-spa'
import { portalModule, IPortalRootProps, PortalApi } from '@module-data/portal/config'
import { dashboardModule, IDashboardRootProps } from '@module-data/dashboard/config'
import { registerModule } from '@legend/helper-react-hooks'


const host = 'http://192.168.5.151:81'
// import './style.css'
require('./style.css')

const portalProps: IPortalRootProps = {
  portalApi: new PortalApi({ baseUrl: host }),
  rootPath: '',
  systemId: 3,
  signSuccessRedirectPath: '/dashboard',
  menu: [
    { name: '数据总览', value: '1', path: '/dashboard' },
    { name: '标签集市', value: '2', path: '/label-market' },
    {
      name: '人群管理', 
      value: '3', 
      children: [
        { name: '全部人群', value: '3-1', path: '/dashboard' },
        { name: '我的人群', value: '3-2', path: '/dashboard' },
        { name: '你的人群', value: '3-3', path: '/dashboard' },
      ]
    },
  ],
  accountMenu: [
    { name: '数据总览', value: '1', link: 'https://cn.bing.com' },
    { name: '标签集市', value: '2', link: 'https://cn.bing.com' },
    { name: '人群管理', value: '3', link: 'https://cn.bing.com' },
  ],
  access: { login: true }
}

const dashboardProps: IDashboardRootProps = {
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

