import React, { FC, ReactNode, Fragment, useState, useCallback } from 'react'
import { Menu, Icon, Dropdown } from 'antd'
import 'antd/lib/menu/style/css'
import 'antd/lib/icon/style/css'
import 'antd/lib/dropdown/style/css'

import { INavMenuItem } from './NavMenu'
import { ClickParam } from 'antd/lib/menu'

export const WebsiteNavigator: FC<{
  head?: ReactNode,
  selectedKey: string,
  menu?: INavMenuItem[],
  onLogout?: () => void,
  [key: string]: any,
}> = ({
  head, menu, selectedKey, className, onLogout, ...otherProps
}) => {

  const [slt, setSlt] = useState([selectedKey])
  const handleUserMenuClick = useCallback((params: ClickParam) => {
    if(params.key === 'logout' && onLogout) {
      onLogout && onLogout()
    }
  }, [])

  return (
    <header className="flex justify-between items-stretch border-b border-gray-300" {...otherProps}>
      <div className="flex-1">{head}</div>
      <Menu selectedKeys={slt} mode="horizontal" style={{ borderBottom: 0 }}>
        { menu && menu.map((item) => (
            <Menu.Item key={item.key}>
              {item.icon && <Icon type={item.icon} /> }
              {item.name}
            </Menu.Item>
        ))}
      </Menu>
      
        <Dropdown placement="bottomRight" overlay={
          <Menu onClick={handleUserMenuClick}>
            <Menu.Item key="4">
              <Icon type="user" className="mr-2" />
              Others
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout">
              <Icon type="poweroff" className="mr-2" />
              Logout
            </Menu.Item>
          </Menu>
        }>
          <div className="flex items-center px-2">
              <Icon type="user" />
          </div>

        </Dropdown>
    </header>
  )
}