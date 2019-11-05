import React, { FC } from 'react'
import { registerModule, useGlobalModule } from '@legend/helper-react-hooks'
import { portalModule } from '../../config'


registerModule(portalModule.name, portalModule)

export const Nav: FC<{}> = ({}) => {

  const { state, dispatch } = useGlobalModule(portalModule.name)
  return (
    <nav>
      <h1>Example2 Logo</h1>
      <ul>
        <li>{ state.username }</li>
        <li>{ state.password }</li>
        <li>3</li>
        <li>07</li>
      </ul>
    </nav>
  )
}