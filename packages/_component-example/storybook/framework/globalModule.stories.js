import { GSM } from '@micro/framework'
import React, { useEffect, useState, useCallback } from 'react'
import { ExampleButton } from '@component/ui'

export default {
  title: 'framework/GlobalModule'
}

const portalModule = {
  state: {
    isLogin: false,
    username: ''
  },
  action: {
    ['updateState'] (state, payload) {
      for (let key in payload) {
        if (key in state) {
          state[key] = payload[key]
        }
      }
    }
  }
}

console.info('module has registered in the step? ', GSM.mount('portal', portalModule))

function LoginView () {

  const [loginStatus, setLoginStatus] = useState(false)

  const loginListener = useCallback((isLogin, _module) => {
    setLoginStatus(isLogin)
  }, [])

  useEffect(() => {
    GSM.track(loginListener, 'portal', 'isLogin')

    return () => {
      GSM.untrack(loginListener, 'portal', 'isLogin')
    }
  }, [])

  const log = useCallback(() => {
    GSM.dispatch('portal', 'updateState', { 
      isLogin: !loginStatus,
      username: loginStatus ? '' : 'micro-framework-user'
    })
  }, [loginStatus])

  const logout = useCallback(() => {
    GSM.dispatch('portal', 'updateState', { 
      isLogin: false,
    })
  })

  return (
    <>
      <ExampleButton onClick={log}>{ loginStatus ? '登出' : '登录' }</ExampleButton>
      <ExampleButton onClick={logout}>登出</ExampleButton>
    </>
  )
}


function UserView () {
  const [username, setUsername] = useState('')

  const usernameListener = useCallback((username, mod) => {
    console.log('receive update action')
    setUsername(username)
  }, [])



  useEffect(() => {
    GSM.track(usernameListener, 'portal', 'username')

    return () => {
      GSM.untrack(usernameListener, 'portal', 'username')
    }
  }, [])

  return (
    <div>{username}</div>
  )
}



export function GlobalStoreManager () {
  return (
    <div>
      <UserView />
      <LoginView />
    </div>
  )
}