import React from 'react'
import ReactDOM from 'react-dom'
import singleSpaReact from 'single-spa-react'


import { Root } from './lib/root'
import { biReportModule } from './lib/config'


const lifecycles = singleSpaReact({
  React: React as any,
  ReactDOM,
  rootComponent: Root as any,
  domElementGetter () {
    return document.getElementById(biReportModule.mountId)
  }
})

export const bootstrap = [
  lifecycles.bootstrap
]

export const mount = [
  lifecycles.mount
]

export const unmount = [
  lifecycles.unmount
]


export { Root } 