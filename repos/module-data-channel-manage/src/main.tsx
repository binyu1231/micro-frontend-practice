import React, { FC, useState } from 'react'
import { IChannelManageRootProps, IChannelsDto } from './config'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { List, Edit } from './components'
import { Provider } from './store'

export const ChannelManage: FC<IChannelManageRootProps> = ({
  rootPath,
  api,
  access
}) => {
  return (
    <Provider store={{
      rootPath,
      api,
      access
    }}>
      <Router>
        <Switch>
          <Route
            
            path={rootPath}
            component={List}
          />
          <Route
            path={rootPath + '/edit/:id'}
            component={Edit}
          />
        </Switch>
      </Router>
    </Provider>
  )
}