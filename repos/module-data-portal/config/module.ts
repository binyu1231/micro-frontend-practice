import { IPackageModule } from '@legend/framework'
import { InfoDto } from './api'

export enum PortalActionTypes {
  updatePortalState = 'updatePortalState'
}

const state = {
  info: {} as InfoDto,
  userName: '',
  passWord: '',
  isLogin: false,
  access: [] as string[],
}

const action = {
  [PortalActionTypes.updatePortalState] (state: PortalModuleState, payload: {[key: string]: any }) {
    const newState: Partial<PortalModuleState> = {}

    Object.keys(payload).filter(key => state.hasOwnProperty(key))
    .forEach(stateKey => {
      newState[stateKey] = payload[stateKey]
    })

    return Object.assign({}, state, newState) as PortalModuleState
  }
}

export type PortalModuleState = typeof state
export type PortalModuleAction = typeof action

export interface IPortalModule extends IPackageModule {
  name: string,
  state: PortalModuleState,
  action: PortalModuleAction
}

export const portalModule: IPortalModule = {
  mountId: 'module-data-portal',
  name: 'portal',
  state, 
  action, 
}



