import { GSM, IGlobalModule } from './GlobalModule'
import { useState, useCallback, useEffect } from 'react'
import { PlainObject } from '../types'

const mapCache = new Map<Function, PlainObject>()

export function useReactGlobalModule<T, K> (
  moduleName: string,
  mapper: (state: T) => K
) {

  if (mapper && !mapCache.has(mapper)) {
    mapCache.set(mapper, mapper(GSM.get(moduleName).module.state as any))
  }

  const [mappedState, trigger] = useState<K>((mapper ? mapCache.get(mapper) : undefined) as any)
  const dispatch = useCallback(<T>(actionType: string, payload: T) => {
    GSM.dispatch(moduleName, actionType, payload)
  }, []) 
 
  useEffect(() => {
    function tracker (state: T, _mod: IGlobalModule) {

      const cache = mapCache.get(mapper)
      const mapped = mapper(state)

      for (let key in cache) {

        if (Object.is(cache[key], mapped[key])) continue
        
        trigger(mapped)
        mapCache.set(mapper, mapped)

        break
      }
    }
    GSM.track(tracker, moduleName)

    return () => {
      GSM.untrack(tracker, moduleName)
    }
  }, [])

  return { state: mappedState, dispatch }

}