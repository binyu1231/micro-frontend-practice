


import React from 'react'
import ReactDOM from 'react-dom'
import singleSpaReact from 'single-spa-react'

import { App } from './App'

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  domElementGetter () {
    return document.getElementById('container-react')
  }
})

if (!window['singleSpaNavigate' as any]) { // 如果不是single-spa模式
  ReactDOM.render(
    <App />,
    document.getElementById('container-react')
  )
}

export const bootstrap = [
  (props) => {
    return Promise.resolve(props)
  },
  lifecycles.bootstrap
]

export const mount = [
  lifecycles.mount
]

export const unmount = [
  lifecycles.unmount
]

export default lifecycles
