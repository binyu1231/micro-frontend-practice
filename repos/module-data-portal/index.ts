import React from 'react'
import ReactDOM from 'react-dom'
import singleSpaReact from 'single-spa-react'
import { Root } from './src/root'
import { configOption } from './src/config'


const lifecycles = singleSpaReact({
  React, 
  ReactDOM,
  rootComponent: Root as any,
  domElementGetter () {
    return document.getElementById(configOption.domId)
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

