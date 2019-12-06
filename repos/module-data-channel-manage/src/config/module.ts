import { IPackageModule } from "@legend/framework"


export enum ChannelManageActionType {}

const state = {}
const action = {}

export interface IChannelManageState extends Readonly<typeof state> {}
export interface IChannelManageAction extends Readonly<typeof action> {}

export interface IChannelManageModule extends IPackageModule {
  name: string
  state: IChannelManageState
  action: IChannelManageAction
}

export const channelManageModule: IChannelManageModule = {
  mountId: 'module-data-channel-manage',
  name: 'channel-manage',
  state,
  action
}