import { microDelay, PlainObject } from "@coloration/kit"

export interface IGlobalModule<T = PlainObject> {
  state: T,
  action: { [key: string]: <K = any>(state: T, payload: K) => any }
}

export type ModuleObserverListener<V> = (value: V, module: IGlobalModule) => void

class ModuleObserver<T = PlainObject> {

  stateProxy: T
  module: IGlobalModule
  static defaultListenState = '$ANY_STATE'


  constructor (mod: IGlobalModule<T>) {
    this.module = mod
    this.stateProxy = new Proxy(mod.state as any, {
      set: (obj, prop, value) => {
        if (
          typeof prop !== 'string' && typeof prop !== 'number' ||
          !(prop in obj) ||
          Object.is(value, obj[prop])
        ) {
          // 如果返回 false 会抛出异常, 这里只是作对比. 并不需要这样
          return true
        }
        
        obj[prop] = value
        this.broadcast(String(prop), value)
        
        this.broadcastFull()
        return true

      }
    })
  }

  private listenerMap: Map<string, ModuleObserverListener<any>[]> = new Map() 

  

  addListener (
    listener: ModuleObserverListener<any>, 
    stateKey: string = ModuleObserver.defaultListenState
  ) {
    if (!this.listenerMap.has(stateKey)) this.listenerMap.set(stateKey, [])
    const pool = this.listenerMap.get(stateKey)

    if (!pool.includes(listener)) {
      pool.push(listener)
      return true
    }

    return false

  }

  removeListener (
    listener: ModuleObserverListener<any>, 
    stateKey: string = ModuleObserver.defaultListenState
  ) {
    if (!this.listenerMap.has(stateKey)) return false
    const pool = this.listenerMap.get(stateKey)
    const position = pool.indexOf(listener)
    if (position < 0) return false

    pool.splice(position, 1)
    return true
  }

  dispatch<T = unknown> (actionName: string, payload: T) {
    if (actionName in this.module.action) {
      this.module.action[actionName](this.stateProxy, payload)
    }
  }

  broadcast (stateKey: string, value: any) {
    const listeners = this.listenerMap.get(stateKey)
    if (Array.isArray(listeners)) {
      listeners.forEach(l => l(value, this.module))
    }
  }

  broadcastFull = microDelay(() => {
    const fullListeners = this.listenerMap.get(ModuleObserver.defaultListenState)
    if (Array.isArray(fullListeners)) {
      fullListeners.forEach(l => l(this.stateProxy, this.module))
    }
  })

  dispose () {
    this.listenerMap = new Map()
  }


}




class GSM {
  /** no new */
  private constructor () {}
  
  private store: Map<string, ModuleObserver> = new Map()
  private static _sigleton: GSM

  static get instance () {
    if (!GSM._sigleton) GSM._sigleton = new GSM()
    // return GSM._sigleton ?? (GSM._sigleton = new GSM())
    return GSM._sigleton
  } 

  static mount (name: string, mod: IGlobalModule) {
    if (GSM.has(name)) return false
    GSM.instance.store.set(name, new ModuleObserver(mod))
    return true
  }

  static unmount (name: string) {
    const ob = GSM.get(name)
    if (!ob) return false
    ob.dispose()
    GSM.instance.store.delete(name)
    return true
  }

  static has (name: string) {
    return GSM.instance.store.has(name)
  }

  static get (name: string) {
    return GSM.instance.store.get(name)
  }

  static dispose () {
    const ins = GSM.instance
    ins.store = new Map()
  }

  static getWithError (name: string) {
    const ob = GSM.get(name)
    if (!ob) throw new Error(`Module [${name}] is not be registered`)
    return ob
  }

  static track<S = any> (callback: ModuleObserverListener<S>, name: string, stateKey?: string) {
    const ob = GSM.getWithError(name)
    ob.addListener(callback, stateKey)
  }

  static untrack<S = any> (callback: ModuleObserverListener<S>, name: string, stateKey?: string) {
    const ob = GSM.getWithError(name)
    ob.removeListener(callback, stateKey) 
  }

  static dispatch<P = any> (name: string, stateKey: string, payload: P) {
    const ob = GSM.getWithError(name)
    ob.dispatch(stateKey, payload)
  }
  
}


export { GSM } 