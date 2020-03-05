

import { registerApplication, unloadApplication, start, getAppNames } from 'single-spa'
import { pathPrefix } from '@coloration/micro-framework'

import { IDemoRootProps, DemoApi, demoModule } from './core'

export const demoProps: IDemoRootProps = {
  api: new DemoApi({ baseUrl: 'a http host' }),
  rootPath: '/',
  access: { edit: true }
}

function mount () {
  registerApplication(
    demoModule.name,
    () => import('./index'),
    pathPrefix(demoProps.rootPath),
    demoProps
  )
  
  start()
}

function unmount () {
  return Promise.all(getAppNames().map(appName => unloadApplication(appName)))
}


unmount().then(() => mount())
