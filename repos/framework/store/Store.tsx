import React, { useState, Dispatch, SetStateAction } from 'react'
import { createContext, Context, useCallback, useContext, ReactNode } from "react";
import { PlainObject } from "../types";


export interface IStoreProviderProps<S = any> { 
  children: ReactNode
  store: S
}

interface IContext<M> {
  store: M,
  setStore: Dispatch<SetStateAction<M>>
}

export class Store<T extends PlainObject> {


  constructor(store: Partial<T>) {

    
    Object.assign(this.store, store)
    this.context = createContext<IContext<T>>({
      store: this.store,
      setStore: null
    })
  }

  private store: T = {} as any
  private context: Context<IContext<T>>

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
