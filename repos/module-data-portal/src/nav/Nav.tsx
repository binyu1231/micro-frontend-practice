import React, { FC } from 'react'
import { registerModule, useGlobalModule } from '@legend/helper-react-hooks'
import { portalModule } from '../../config'


registerModule(portalModule.name, portalModule)
export const Nav: FC<{}> = ({}) => {
  return (
    <nav>
      <h1>Example2 Logo</h1>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>6</li>
      </ul>
    </nav>
  )
}