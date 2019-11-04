import React, { FC, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Login } from './login/Login'
import { Nav } from './nav/Nav'
import { portalModule } from '../config/module'


export const Root:FC<any> = (props) => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Nav} />
      </Switch>
    </Router>
  )
}