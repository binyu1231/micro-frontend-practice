import React from 'react'
import { Button } from '../lib'

export default {
  title: 'A Button'
}

// define the element
if (!window.customElements.get('a-button')) {
  window.customElements.define('a-button', Button)
}

export function button () {
  
  return <>
    <a-button>Button</a-button>
    <button className="button">normal button</button>
  </>
}