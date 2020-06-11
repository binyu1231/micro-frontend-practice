import React, { Component, FC, useCallback } from 'react'
import { BrowserRouter as Router, useHistory } from 'react-router-dom'
import { Routes } from './router/Routers'


export interface IRootProps {
  baseUrl: string
}

const Root: FC<IRootProps> = ({
  baseUrl
}) => {

  const history = useHistory()

  const go = useCallback((path) => {
    history.push(`${path}`)
  }, [history, baseUrl])
  return (
    <>
      <h3> I'm React</h3>
      <button onClick={() => go('/')}>Home</button> | 
      <button onClick={() => go('/about')}>About</button>
      <Routes />
    </>
  )
}

export class App extends Component<IRootProps> {
  
  // single-spa warn: rootComponent should implement componentDidCatch to avoid
  // accidentally unmounting the entire single-spa application.
  componentDidCatch () {

  }

  render () { 
    return <Router basename={this.props.baseUrl}>
      <Root {...this.props} />
    </Router>
  }
}