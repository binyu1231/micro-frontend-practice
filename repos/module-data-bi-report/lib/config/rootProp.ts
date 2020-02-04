import { IPackageProp, PlainObject } from '@legend/framework'
import { BiApi } from './api';

export interface IBiReportAccess extends PlainObject<boolean> {
  /** 整体统计报表 */
  overview: boolean,
  /** 平台统计报表 */
  platform: boolean,
  /** 地域统计报表 */
  geo: boolean,
  /** RTB统计报表 */
  rtb: boolean,
  /** PMP统计报表 */
  pmp: boolean,
  /** AD统计报表 */
  ad: boolean,
  /** Cookie Mapping */
  cookieMapping: boolean,
}

export enum ReportEnum {
  overview = 'overview',
  platform = 'platform',
  geo = 'geo',
  rtb = 'rtb',
  pmp = 'pmp',
  ad = 'ad',
  cookieMapping = 'cookieMapping',

}

export interface IBiReportRootProps extends IPackageProp {
  api: BiApi,
  access: Partial<IBiReportAccess>
}