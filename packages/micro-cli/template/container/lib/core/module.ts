import { IContainerModule } from "@micro/framework"


export enum DemoActionType {}

const state = {}
const action = {}

export interface IDemoState extends Readonly<typeof state> {}
export interface IDemoAction extends Readonly<typeof action> {}

export interface IDemoModule extends IContainerModule {
  name: string
  state: IDemoState
  action: IDemoAction
}

export const demoModule: IDemoModule = {
  mountId: 'demo',
  name: 'demo',
  state,
  action
}