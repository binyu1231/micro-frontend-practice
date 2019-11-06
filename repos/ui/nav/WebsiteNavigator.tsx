import React, { FC, ReactNode, Fragment, useState } from 'react'
import { Menu, Icon } from 'antd'
import 'antd/lib/menu/style/css'
import 'antd/lib/icon/style/css'
import { INavMenuItem } from './NavMenu'

export const WebsiteNavigator: FC<{
  head?: ReactNode,
  selectedKey: string,
  menu?: INavMenuItem[],
}> = ({
  menu, selectedKey
}) => {

  const [slt, setSlt] = useState([selectedKey])


  console.log(menu)

  return (
    <header className="flex justify-between border-b border-gray-300">
      <div></div>
      <Menu selectedKeys={slt} mode="horizontal" style={{ borderBottom: 0 }}>
        { menu && menu.map((item) => (
            <Menu.Item key={item.key}>
              {item.icon && <Icon type={item.icon} /> }
              {item.name}
            </Menu.Item>
        ))}
      </Menu>
    </header>
  )
}