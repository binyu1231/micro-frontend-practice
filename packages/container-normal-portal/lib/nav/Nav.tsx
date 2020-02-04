import React, { FC, useCallback, useState, useEffect } from 'react'
import { registerModule, useGlobalModule, useI18nLocale } from '@micro/framework'
import { portalModule, PortalModuleState, PortalApi, PortalActionTypes } from '../config'
import { useHistory, RouteComponentProps } from 'react-router'
import { WebsiteNavigator, INavMenuItem, menuFlat } from '@component/ui'

registerModule(portalModule.name, portalModule)

export const Nav: FC<RouteComponentProps & {
  menu: INavMenuItem[],
  accountMenu: INavMenuItem[],
  portalApi: PortalApi,
}> = ({
  menu, accountMenu, portalApi
}) => {
  const history = useHistory()


  const { state, dispatch } = useGlobalModule<PortalModuleState, PortalActionTypes>(portalModule.name)
  const [sltValue, setSltValue] = useState(menu[0].value)
  const [locale] = useI18nLocale()


  const logout = useCallback(() => {
    // portalApi.logout()
    // .then(res => {
    //   console.log('eeee', res)
    //   // 
    // })
    dispatch(PortalActionTypes.updatePortalState, { info: {}, isLogin: false })
  }, [])

  useEffect(() => {
    if (!state.isLogin) {
      history.replace('/login')
    }
  }, [state.isLogin])

  const onNavTo = useCallback((menuItem: INavMenuItem) => {

    const { value, link, path } = menuItem

    setSltValue(value)

    if (link) window.open(link)
    else if (path) history.push(path)

  }, [])


  return (
    <div>
      <WebsiteNavigator
        head={state.userName }
        selectedKey={sltValue}
        menu={menu}
        accountMenu={accountMenu}
        onMenuClick={onNavTo}
        onLogout={logout}
        locale={locale}
      />

    </div>
  )
}