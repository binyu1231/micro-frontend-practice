import { IContainerModule } from "@coloration/micro-framework"


export enum DemoActionType {}

const state = {}
const action = {}

export interface IDemoState extends Readonly<typeof state> {}
export interface IDemoAction extends Readonly<typeof action> {}

export interface IDemoModule<T> extends IContainerModule {
  name: string
  mountId: string,
  action: { [key: string]: <K = any>(state: T, payload: K) => any }
}

export const demoModule: IDemoModule<IDemoState> = {
  mountId: 'container-demo',
  name: 'container-demo',
  state,
  action
}