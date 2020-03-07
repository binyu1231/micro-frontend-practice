


import React from 'react'
import ReactDOM from 'react-dom'
import singleSpaReact from 'single-spa-react'

import { Root } from './Root'
import { demoModule } from './core'



const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root as any,
  domElementGetter () {
    return document.getElementById(demoModule.mountId)
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

export * from './core'
export { Root }