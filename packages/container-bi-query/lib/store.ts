import { ReactStore } from '@micro/framework'
import { IBiReportRootProps } from './config'


export interface IChannelManageStore extends IBiReportRootProps {}


export const S = new ReactStore<IChannelManageStore>({})

export const Provider = S.provider
export const useStore = S.useStore

