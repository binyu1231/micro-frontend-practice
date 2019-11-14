import React, { SFC, useEffect, Component, PureComponent } from 'react'
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from 'react-router-dom'
import { Login } from './login/Login'
import { Nav } from './nav/Nav'
import { IPortalRootProps, PortalApi } from '../config'


const Root: SFC<IPortalRootProps> = ({
  rootPath, 
  signSuccessRedirectPath,
  menu,
  accountMenu,
  portalApi,
  systemId
}) => {

  return (
    <Router>
        <Switch>
          <Route 
            path={rootPath + '/login'} 
            component={(routeProps: RouteComponentProps) => 
              <Login { ...routeProps } 
                portalApi={portalApi}
                systemId={systemId}
                signSuccessRedirectPath={signSuccessRedirectPath} />} />
          <Route 
            path={rootPath + '/'} 
            component={(routeProps: RouteComponentProps) => 
              <Nav { ...routeProps } 
                portalApi={portalApi}
                menu={menu} 
                accountMenu={accountMenu} />} 
          />
        </Switch>
      </Router>
  )
}

export default class extends PureComponent<IPortalRootProps> {

  /**
   * rootComponent should implement componentDidCatch to avoid accidentally 
   * unmounting the entire single-spa application.
   */
  public componentDidCatch () {}
  
  

  public render () {
    return <Root {...this.props} />
  }
}