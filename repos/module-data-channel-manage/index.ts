


import React from 'react'
import ReactDOM from 'react-dom'
import singleSpaReact from 'single-spa-react'

import { ChannelManage } from './src/main'
import { channelManageModule } from './src/config'

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: ChannelManage as any,
  domElementGetter () {
    return document.getElementById(channelManageModule.mountId)
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

export * from './src/config'
export { ChannelManage }