import React from 'react'
import ReactDOM from 'react-dom'
import singleSpaReact from 'single-spa-react'

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: () => {},
  domElementGetter
})

function domElementGetter() {
  // This is where single-spa will mount our application  
  return document.getElementById("root");
} 