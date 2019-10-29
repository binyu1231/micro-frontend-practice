import React, { createContext, useReducer } from 'react'

export type AppConfigureContextType = {
  appName: string,
  permission: { [key: string]: boolean },
}

const ConfigureContext = createContext<Partial<AppConfigureContextType>>({
  appName: '',
  permission: {}
})

export function AppConfigureProvider ({ children }) {
  return (
    <ConfigureContext.Provider value={{}}>
      { children }
    </ConfigureContext.Provider>
  )
}