import React, { FC, ReactNode, Fragment, useState, useCallback, useEffect } from 'react'
import { Menu, Icon, Dropdown } from 'antd'
import 'antd/lib/menu/style/css'
import 'antd/lib/icon/style/css'
import 'antd/lib/dropdown/style/css'

import { INavMenuItem } from './NavMenu'
import { ClickParam } from 'antd/lib/menu'

function renderMenu(menu?: INavMenuItem[]) {
  if (menu) {
    return menu.map((item) => {
      if (item.children) {
        return (
          <Menu.SubMenu key={item.value} title={item.name}>
            { renderMenu(item.children) }
          </Menu.SubMenu>
        )
      }

      return (
        <Menu.Item key={item.value}>
          {item.icon && <Icon type={item.icon} />}
          {item.name}
        </Menu.Item>
      )
    })
  }

  return null
}

function menuFlat (menu: INavMenuItem[]): INavMenuItem[] {
  // return menu
  return menu.reduce<INavMenuItem[]>((acc, curr) => {
    acc.push(curr)
    if (Array.isArray(curr.children)) acc = acc.concat(menuFlat(curr.children))
    return acc
  }, [])
}

export const WebsiteNavigator: FC<{
  head?: ReactNode,
  selectedKey: string,
  menu?: INavMenuItem[],
  accountMenu?: INavMenuItem[],
  onMenuClick?: (menuItem: INavMenuItem, params: ClickParam) => void,
  onAccountMenuClick?: (params: ClickParam) => void
  onLogout?: () => void,
  [key: string]: any,
}> = ({
  head,
  menu,
  accountMenu,
  onMenuClick,
  onAccountMenuClick,
  selectedKey,
  className,
  onLogout,
  ...otherProps
}) => {

    const [slt, setSlt] = useState([selectedKey])
    const [flatMenu, setFlatMenu] = useState(menuFlat(menu))


    useEffect(() => {
      setFlatMenu(menuFlat(menu))
    }, [menu])

    useEffect(() => {
      setSlt([selectedKey.split('-')[0]])
    }, [selectedKey])

    const handleAccountMenuClick = useCallback((params: ClickParam) => {
      if (params.key === 'logout' && onLogout) {
        onLogout && onLogout()
      }
      else {
        onAccountMenuClick && onAccountMenuClick(params)
      }
    }, [])

    const handleMenuClick = useCallback((params: ClickParam) => {
      const menuData = flatMenu.find(item => item.value === params.key)
      onMenuClick && onMenuClick(menuData, params)
    }, [])

    return (
      <header
        className="flex justify-between items-stretch border-b border-gray-300"
        {...otherProps}>
        <div className="flex-1">{head}</div>
        <Menu
          selectedKeys={slt}
          mode="horizontal"
          style={{ borderBottom: 0 }}
          onClick={handleMenuClick}
        >
          {renderMenu(menu)}
        </Menu>

        <Dropdown placement="bottomRight" overlay={
          <Menu onClick={handleAccountMenuClick}>
            {renderMenu(accountMenu)}
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