

import { registerApplication, unloadApplication, start, getAppNames } from 'single-spa'
import { registerModule } from '@coloration/micro-framework'
import { demoModule } from 'container-demo/lib/core'
import { demoProps } from './props'

export function mount () {
  // 注册数据
  registerModule(demoModule.name, demoModule)

  registerApplication(
    demoModule.name, 
    () => import('container-demo'), 
    () => true,
    demoProps
  )
  
  start()
}

export function unmount () {
  return Promise.all(getAppNames().map(appName => unloadApplication(appName)))
}

unmount().then(mount)