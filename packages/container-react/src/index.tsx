import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import singleSpaReact from 'single-spa-react'

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  domElementGetter () {
    return document.getElementById('container-react') as Element
  },
})

if (!window['singleSpaNavigate' as any]) { // 如果不是single-spa模式
  ReactDOM.render(
    <App />,
    document.getElementById('container-react')
  )
}



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export const bootstrap = [
  reactLifecycles.bootstrap

]
export const mount = [
  reactLifecycles.mount
]

export const unmount = [
  reactLifecycles.unmount
]

export default reactLifecycles
