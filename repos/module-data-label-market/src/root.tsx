import React, { FC } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { Login } from './login/Login'
import { createBrowserHistory } from 'history'
import { Nav } from './nav/Nav'

const history = createBrowserHistory()

export const Root:FC<any> = (props) => {

  console.log('dddd', props)
  return (
    <Router history={history}>
      <Switch>
        <Route path={`${props.rootPath}/`} component={Login} />
        <Route path={`${props.rootPath}/list`} component={Nav} />
      </Switch>
    </Router>
  )
}