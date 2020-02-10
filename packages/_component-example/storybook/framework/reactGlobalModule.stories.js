import React, { useCallback, useEffect } from 'react'
import { GSM, useReactGlobalModule } from '@micro/framework'
import { ExampleButton } from '@component/ui'

export default {
  title: 'framework|react global module'
}

const moduleName = 'portal-react'
const portalModule = {
  state: {
    isLogin: false,
    username: 'EMPTY'
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

console.info(`module [${moduleName}] has registered in the step? `, GSM.mount(moduleName, portalModule))


function LoginView () {

  const { state, dispatch } = useReactGlobalModule(moduleName, state => ({ loginStatus: state.isLogin }))

  const log = useCallback(() => {
    dispatch('updateState', { 
      isLogin: !state.loginStatus,
      username: state.loginStatus ? '' : 'micro-framework-react'
    })
  }, [state.loginStatus])

  const onlyLogout = useCallback(() => {
    dispatch('updateState', { 
      isLogin: false,
    })
  }, [])

  useEffect(() => {
    console.log('login receive update', state)
  }, [state])


  return (
    <>
      <ExampleButton onClick={log}>{ state.loginStatus ? '登出' : '登录' }</ExampleButton>
      <ExampleButton onClick={onlyLogout}>登出</ExampleButton>
    </>
  )
}


function UserView () {

  const { state } = useReactGlobalModule(moduleName, state => ({ username: state.username }))

  useEffect(() => {
    console.log('[REACT GLOBAL MODULE]receive state updated')
  }, [state])

  return (
    <div>{ state.username }</div>
  )
}



export function hooks () {

  return (
    <div>
      <UserView />
      <LoginView />
    </div>
  )
}