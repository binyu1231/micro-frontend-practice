import { IContainerProp } from "@micro/framework"

export interface IDashboardAccess {
  /** 标签云 */
  tagCloud: boolean,
  /** ID 图谱 */
  idGraph: boolean,
  /** 地域分布 */
  geo: boolean,
  /** 标签分布 */
  tagCoverage: boolean,
  /** 行业人群 */
  predefinedSegment: boolean,
  /** 基础属性 */
  demographics: boolean,
  /** 人均标签分布 */
  tagStatistics: boolean,
  /** 兴趣偏好 */
  preference: boolean,
  /** 近30天ID数量趋势 */
  idTrend: boolean,
}

export const dashboardAccesses: IDashboardAccess = {
  /** 标签云 */
  tagCloud: true,
  /** ID 图谱 */
  idGraph: true,
  /** 地域分布 */
  geo: true,
  /** 标签分布 */
  tagCoverage: true,
  /** 行业人群 */
  predefinedSegment: true,
  /** 基础属性 */
  demographics: true,
  /** 人均标签分布 */
  tagStatistics: true,
  /** 兴趣偏好 */
  preference: true,
  /** 近30天ID数量趋势 */
  idTrend: true,
}


export interface IDashboardRootProps extends IContainerProp {
  access: Partial<IDashboardAccess>
}