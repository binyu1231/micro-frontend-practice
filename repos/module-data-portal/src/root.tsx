import React, { FC, useEffect, Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Login } from './login/Login'
import { Nav } from './nav/Nav'
import { portalModule } from '../config/module'


export class Root extends Component {

  /**
   * rootComponent should implement componentDidCatch to avoid accidentally 
   * unmounting the entire single-spa application.
   */
  public componentDidCatch () {

  }
  public render () {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Nav} />
        </Switch>
      </Router>
    )
  }
}