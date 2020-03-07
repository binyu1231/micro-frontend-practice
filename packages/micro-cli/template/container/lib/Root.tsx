import React, { FC } from 'react'
import { IDemoRootProps } from './core'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { List, Edit } from './components'
import { Provider } from './core'

export const Root: FC<IDemoRootProps> = ({
  rootPath,
  api,
  access
}) => {
  return (
    <Provider store={{ rootPath, api, access }}>
      <Router basename={rootPath}>
        <Route path={'/edit/:id'} exact component={Edit} />
        <Route path="/" exact component={List} />
        <Redirect to="/" />
      </Router>
    </Provider>
  )
}