import React, { SFC } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home, About } from '../views'

export interface IRoutesProps {
}
export const Routes: SFC<IRoutesProps> = () => {

  return (
    <Switch>
      <Route path="/about" component={About} />
      <Route path="/" component={Home} />
    </Switch>
  )
}
