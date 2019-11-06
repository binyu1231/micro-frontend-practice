import { Dashboard } from './Dashboard'

import React from 'react'
import ReactDOM from 'react-dom'
import singleSpaReact from 'single-spa-react'


const lifecycles = singleSpaReact({
  React, 
  ReactDOM,
  rootComponent: Dashboard as any,
  domElementGetter () {
    return document.getElementById('module-data-dashboard')
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

export { Dashboard }