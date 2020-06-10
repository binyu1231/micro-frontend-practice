import React, { Component } from 'react'

export class App extends Component {
  
  // single-spa warn: rootComponent should implement componentDidCatch to avoid
  // accidentally unmounting the entire single-spa application.
  componentDidCatch () {

  }

  render () { 
    return <div> I'm React</div> 
  }
}