import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useGlobalModule } from '@legend/helper-react-hooks'
import { portalModule, PortalActionTypes } from '../../config'

const Login: FC<{}> = (props) => {

  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { state, dispatch } = useGlobalModule(portalModule.name)

  function handleLoginSubmit () {
    dispatch(PortalActionTypes.updatePortalState, { username: '好了', password: '好了' })
    history.replace('/')
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
        <div>
          <label htmlFor="username">用户名</label>
          <input 
            id="username" 
            type="text" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
          />
        </div>
        <div>
          <label htmlFor="password">密码</label>
          <input 
            id="password" 
            type="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button onClick={handleLoginSubmit}>登录</button>
        </div>
      </div>
    </div>
  )
}

export { Login }