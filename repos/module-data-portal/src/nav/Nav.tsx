import React, { FC, useCallback } from 'react'
import { registerModule, useGlobalModule } from '@legend/helper-react-hooks'
import { portalModule } from '../../config'
import { useHistory } from 'react-router'


registerModule(portalModule.name, portalModule)

export const Nav: FC<{}> = ({}) => {
  const history = useHistory()


  const { state, dispatch } = useGlobalModule(portalModule.name)

  const logout = useCallback(() => {
    history.replace('/login')
  }, [])
  return (
    <nav>
      <h1>Example2 Logo</h1>
      <ul>
        <li>{ state.username }</li>
        <li>{ state.password }</li>
        <li>3</li>
        <li>07</li>
      </ul>
      <button onClick={logout}>444</button>
    </nav>
  )
}