/**
 * Store 封装, 用于 React hooks
 * 
 * e.g.
 * interface ISomeContainerStore {
 *  isLogin: boolean
 *  userInfo: IUserInfo
 * }
 *
 * const s = new ReactStore<IChannelManageStore>({ channel: [] }, true)
 * const useStore = s.useStore
 * 
 * interface IContainerMapStore {
 *   loginStatus: boolean
 *   user: IUserInfo
 * }
 * Container = () => {
 *   const { store, updateStore } = useStore<IContainerMapStore>(
 *     (s) => ({ loginStatus: s.isLogin, user: s.userInfo })
 *   )
 *   // 如果只更新状态
 *   const { updateStore } = useStore()
 *
 *   store.loginStatus
 *   store.user
 * 
 *   updateStore({ isLogin: true })
 * }
**/

import { useState, useCallback, useEffect } from 'react'
import { PlainObject } from "@coloration/kit"


export class ReactHookStore<T extends PlainObject> {

  /**
   * @param store {T} 存储改对象上的字段, 但不是 Store 的原型
   * @param strict {boolean} 如果为 `true` 不可在调用 `updateStore` 时新增字段
   */
  constructor(store: Partial<T>, strict: boolean = false) {
    Object.assign(this.store, store)
    this.strict = strict
  }

  private strict: boolean
  private store: T = Object.create(null)
  private listeners: Function[] = []
  private mapCache: Map<Function, any> = new Map()

  private broadcast () {
    this.listeners.forEach(listen => listen())
  }
  /**
   * 使用: const { updateStore } = useStore()
   * 或者 const { store, updateStore } = useStore((store) => ({ a: store.b }))
   */
  public useStore = <K>(mapper?: (store: T) => K) => {
    
    if (mapper && !this.mapCache.has(mapper)) {
      this.mapCache.set(mapper, mapper(this.store))
    }

    const [mappedStore, trigger] = useState(mapper ? mapper(this.store): undefined)
    const updateStore = useCallback((payload: Partial<T>) => {
      
      for (let key in payload) {
        if (!this.strict || key in this.store) {
          this.store[key] = payload[key]
        }
        else {
          throw new Error(`Can\'t find field [${key}] in store`)
        }
      }
    
      // 触发更新
      this.broadcast()
    }, [])

    useEffect(() => {

      if (!mapper) return

      const listen = () => {

        const updatedMappedStore = mapper(this.store)
        const cache = this.mapCache.get(mapper)

        for (let key in cache) {

          if (Object.is(cache[key], updatedMappedStore[key])) continue
          
          trigger(updatedMappedStore)
          this.mapCache.set(mapper, updatedMappedStore)

          break
        }
      }
      
      this.listeners.push(listen)
      
      return () => {
        const listenOrder = this.listeners.indexOf(listen)
        if (listenOrder >= 0) {
          this.listeners.splice(listenOrder, 1)
        }
      }
    }, [])

    return { store: mappedStore, updateStore }
  }
}
