import React, { FC, useState } from 'react'
import { IChannelManageRootProps, IChannelsDto } from './config'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { List, Edit } from './components'
import { Provider } from './store'

export const ChannelManage: FC<IChannelManageRootProps> = ({
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