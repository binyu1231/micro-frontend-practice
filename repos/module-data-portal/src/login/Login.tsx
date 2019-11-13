import React, { FC, useState } from 'react'
import { useHistory, RouteComponentProps } from 'react-router-dom'
import { useGlobalModule } from '@legend/helper-react-hooks'
import { portalModule, PortalActionTypes } from '../../config'
import { NormalLogin } from '@legend/ui'

const Login: FC<RouteComponentProps & {
  signSuccessRedirectPath: string
}> = ({
  signSuccessRedirectPath
}) => {

  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { state, dispatch } = useGlobalModule(portalModule.name)

  function handleLoginSubmit (username: string, password: string) {
    dispatch(PortalActionTypes.updatePortalState, { username, password })
    history.replace(signSuccessRedirectPath)
  }

  return (
    <div style={{
      position: 'fixed',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      background: '#777'
    }}>
      {/* Login View */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: '10%',
        width: 300,
        height: 300,
        margin: 'auto',
        background: '#f7f7f7'
      }}>
        <NormalLogin 
          onSubmit={(username: string, password: string) => {
            handleLoginSubmit(username, password)
          }}
        ></NormalLogin>
      </div>
    </div>
  )
}

export { Login }