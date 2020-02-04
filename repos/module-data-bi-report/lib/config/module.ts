import { IPackageModule } from '@legend/framework'

export enum BiReportActionTypes {}

const state = {}

const action = {}

export type BiReportModuleState = typeof state
export type BiReportModuleAction = typeof action

export interface IBiReportModule extends IPackageModule {
  name: string,
  state: BiReportModuleState,
  action: BiReportModuleAction
}

export const biReportModule: IBiReportModule = {
  mountId: 'module-data-bi-report',
  name: 'bi-report',
  state, 
  action, 
}



