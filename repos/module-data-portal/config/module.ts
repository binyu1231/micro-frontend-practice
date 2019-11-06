export enum PortalActionTypes {
  updatePortalState = 'updatePortalState'
}

const state = {
  userInfo: {} as any,
  username: '123',
  password: 'abc',
  access: [] as string[]
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

export type PortalModule = {
  name: string,
  state: PortalModuleState,
  action: PortalModuleAction
}

export const portalModule: PortalModule = {
  state, action, name: 'portal'
}

export interface IPortalRootProps {
  rootPath: string,
  signSuccessRedirectPath: string
}

