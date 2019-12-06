import { Store } from '@legend/framework'
import { IChannelManageRootProps, IChannelsDto } from './config'


export interface IChannelManageStore extends IChannelManageRootProps {
  channel: IChannelsDto[]
}


export const S = new Store<IChannelManageStore>({
  channel: []
})


export const Provider = S.provider
export const useStore = S.useStore

