import { ReactStore } from '@micro/framework'
import { IChannelManageRootProps, IChannelsDto } from './config'


export interface IChannelManageStore extends IChannelManageRootProps {
  channel: IChannelsDto[]
}


export const S = new ReactStore<IChannelManageStore>({
  channel: []
})


export const Provider = S.provider
export const useStore = S.useStore

