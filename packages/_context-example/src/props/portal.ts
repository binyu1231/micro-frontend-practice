import { IPortalRootProps, PortalApi } from "@container/normal-portal/lib/config";
import { SYSTEM, I18nLanguages } from "@micro/framework";

export const portalProps: IPortalRootProps = {
  portalApi: new PortalApi({ baseUrl: 'http://192.168.5.151:81' }),
  rootPath: '',
  systemId: SYSTEM.DNA,
  signSuccessRedirectPath: '/dashboard',
  menu: [
    { name: '$数据总览', value: '0', path: '/dashboard' },
    { name: '$数据总览', value: '1', path: '/bi-report' },
    { name: '$统计报表', value: '2', path: '/bi-report/report' },
    { name: '$渠道管理', value: '4', path: '/channel' },
    { name: '$自助查询', value: '5', children: [
      { name: '$自助查询', value: '5-1', path: '/bi-report/query' }
    ] },
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
      '$渠道管理': '渠道管理',
      '$自助查询': '自助查询',
    },
    [I18nLanguages.EN_US]: {
      '$数据总览': 'Dashboard',
      '$统计报表': 'Report',
      '$人群管理': 'Segments',
      '$渠道管理': 'Channel',
      '$自助查询': 'Query',
    }
  }
}