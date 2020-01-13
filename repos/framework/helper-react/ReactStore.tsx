/**
 * Store 封装, 用于 React hooks
 * 
 * e.g.
 * interface IChannelManageStore {
 *  channel: IChannelsDto[]
 *  rootPath: string
 *  api: ChannelApi
 * }
 * // 可以初始化时添加
 * const s = new ReactStore<IChannelManageStore>({ channel: [] })
 * const Provider = s.provider
 * const useStore = s.useStore
 * 
 * // 也可以在 Provider 中添加
 * <Provider store={{ rootPath, api }}>
 *   <Container />
 * </Provider>
 * 
 * Container = () => {
 *   const { store, updateStore } = useStore()
 *
 *   store.channel
 *   store.rootPath
 *   store.api
 * 
 *   updateStore({ channel: [] })
 * }
**/

import React, { useState, Dispatch, SetStateAction } from 'react'
import { createContext, Context, useCallback, useContext, ReactNode } from "react"
import { PlainObject } from "../types"

interface IContext<M> { store: M, setStore: Dispatch<SetStateAction<M>> }

export class ReactStore<T extends PlainObject> {

  constructor(store: Partial<T>) {
    Object.assign(this.store, store)
    this.context = createContext<IContext<T>>({
      store: this.store,
      setStore: null
    })
  }

  private store: T = Object.create(null)
  private context: Context<IContext<T>>

  /**
   * <provider store={}></provider>
   */
  public provider = ({ children, store: dynamicStore }: { children: ReactNode, store: Partial<T> }) => {

    Object.assign(this.store, dynamicStore)
    
    const [store, setStore] = useState<T>(this.store)
    const Provider = this.context.Provider

    return (
      <Provider value={{ store, setStore }}>
        { children }
      </Provider>
    )
  }

  /**
   * 使用: const { store, updateStore } = useStore()
   */
  public useStore = () => {
    const { store, setStore } = useContext(this.context)
    const updateStore = useCallback((payload: Partial<T>) => {

      const s = Object.assign({}, store)

      for (let key in payload) {
        if (key in store) {
          s[key] = payload[key]
        }
        else {
          throw new Error(`Can\'t find field [${key}] in store`)
        }
      }

      setStore(s)
      
    }, [store, setStore])

    return { store, updateStore }
  }
}
