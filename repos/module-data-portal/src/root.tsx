import React, { FC, useEffect, Component } from 'react'
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from 'react-router-dom'
import { Login } from './login/Login'
import { Nav } from './nav/Nav'
import { portalModule, IPortalRootProps } from '../config/module'


export class Root extends Component<IPortalRootProps> {

  /**
   * rootComponent should implement componentDidCatch to avoid accidentally 
   * unmounting the entire single-spa application.
   */
  public componentDidCatch () {

  }
  public render () {
    const { rootPath, signSuccessRedirectPath } = this.props
    return (
      <Router>
        <Switch>
          <Route 
            path={rootPath + '/login'} 
            component={(routeProps: RouteComponentProps) => 
              <Login { ...routeProps } signSuccessRedirectPath={signSuccessRedirectPath} />} />
          <Route 
            path={rootPath + '/'} 
            component={Nav} 
          />
        </Switch>
      </Router>
    )
  }
}