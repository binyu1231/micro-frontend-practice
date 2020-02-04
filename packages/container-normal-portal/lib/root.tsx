import React, { SFC, PureComponent } from 'react'
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from 'react-router-dom'
import { Login } from './login/Login'
import { Nav } from './nav/Nav'
import { IPortalRootProps, PortalApi } from './config'
import { I18nProvider } from '@micro/framework'


const Root: SFC<IPortalRootProps> = ({
  rootPath,
  signSuccessRedirectPath,
  menu,
  accountMenu,
  portalApi,
  systemId,
  i18nLocale
}) => {

  return (
    <I18nProvider locales={i18nLocale}>
      <Router>
      <Switch>
        <Route
          path={rootPath + '/login'}
          component={(routeProps: RouteComponentProps) =>
            <Login {...routeProps}
              portalApi={portalApi}
              systemId={systemId}
              signSuccessRedirectPath={signSuccessRedirectPath} />} />
        <Route
          path={rootPath + '/'}
          component={(routeProps: RouteComponentProps) =>
            <Nav {...routeProps}
              portalApi={portalApi}
              menu={menu}
              accountMenu={accountMenu} />}
        />
      </Switch>
    </Router>
    </I18nProvider>
    
  )
}

export default class extends PureComponent<IPortalRootProps> {

  /**
   * rootComponent should implement componentDidCatch to avoid accidentally 
   * unmounting the entire single-spa application.
   */
  public componentDidCatch() { }



  public render() {
    return <Root {...this.props} />
  }
}