import React, { FC, useCallback } from 'react'
import { registerModule, useGlobalModule } from '@legend/helper-react-hooks'
import { portalModule } from '../../config'
import { useHistory } from 'react-router'
import { WebsiteNavigator } from '@legend/ui'

registerModule(portalModule.name, portalModule)

export const Nav: FC<{}> = ({}) => {
  const history = useHistory()


  const { state, dispatch } = useGlobalModule(portalModule.name)

  const logout = useCallback(() => {
    history.replace('/login')
  }, [])
  return (
    <div>
      <WebsiteNavigator 
        selectedKey="1"
        menu={[
          { name: '数据总览', key: '1', link: 'https://cn.bing.com' },
          { name: '标签集市', key: '2', link: 'https://cn.bing.com' },
          { name: '人群管理', key: '3', link: 'https://cn.bing.com' },
        ]}
      />
      <button onClick={logout}>444</button>
    </div>
  )
}