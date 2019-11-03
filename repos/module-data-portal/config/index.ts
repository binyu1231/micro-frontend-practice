import Module, { state, action } from 'usm-redux'

const State = state as any
const Action = action as any

export interface IPortalModuleState {
  userInfo: any,
  token: string,
  username: string,
  password: string,
}


export class PortalModule extends Module {
  @State userInfo = {}
  

  @Action
  update<T>(field: string, val: T, state: IPortalModuleState) {
    state[field] = val
  }
}

export const protalModule = PortalModule.create()


