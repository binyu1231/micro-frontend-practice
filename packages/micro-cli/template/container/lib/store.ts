import { ReactStore } from '@coloration/micro-framework'
import { IDemoRootProps, IListItemDto } from './core'


export interface IDemoStore extends IDemoRootProps {
  list: IListItemDto[]
}


export const S = new ReactStore<IDemoStore>({
  list: []
})


export const Provider = S.provider
export const useStore = S.useStore

