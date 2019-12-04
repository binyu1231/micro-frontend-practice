import { IPortalRootProps, PortalApi } from "@module-data/portal/config";
import { SYSTEM } from "@legend/framework";
import { I18nLanguages } from "@legend/helper-react-hooks";

export const portalProps: IPortalRootProps = {
  portalApi: new PortalApi({ baseUrl: 'http://192.168.5.151:81' }),
  rootPath: '',
  systemId: SYSTEM.DNA,
  signSuccessRedirectPath: '/dashboard',
  menu: [
    { name: '$数据总览', value: '1', path: '/dashboard' },
    { name: '$统计报表', value: '2', path: '/bi-report' },
    {
      name: '$人群管理', 
      value: '3', 
      children: [
        { name: '$数据总览', value: '3-1', path: '/dashboard' },
        { name: '$统计报表', value: '3-2', path: '/dashboard' },
        { name: '$人群管理', value: '3-3', path: '/dashboard' },
      ]
    },
  ],
  accountMenu: [
    { name: '$数据总览', value: '1', link: 'https://cn.bing.com' },
    { name: '$统计报表', value: '2', link: 'https://cn.bing.com' },
    { name: '$人群管理', value: '3', link: 'https://cn.bing.com' },
  ],
  access: { login: true },
  i18nLocale: {
    [I18nLanguages.ZH_CN]: {
      '$数据总览': '数据总览',
      '$统计报表': '统计报表',
      '$人群管理': '人群管理',
    },
    [I18nLanguages.EN_US]: {
      '$数据总览': 'Dashboard',
      '$统计报表': 'Report',
      '$人群管理': 'Segments',
    }
  }
}