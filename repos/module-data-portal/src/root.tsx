import React, { FC } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Login } from './login/Login'
import { Nav } from './nav/Nav'
import { Provider } from 'react-redux'



export const Root:FC<any> = (props) => {

  
  const { store } = props.store 

  props.store.subscribe = store.subscribe.bind(store)
  return (
    <Provider store={props.store}>
      <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Nav} />
      </Switch>
    </Router>
    </Provider>
  )
}