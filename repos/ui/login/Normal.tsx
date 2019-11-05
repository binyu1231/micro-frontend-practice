import React, { useState, useCallback } from 'react'
import { Input, Button, message } from 'antd'
import { useI18nLocale, I18nLanguages } from '@legend/helper-react-hooks'
import 'antd/lib/input/style/css'
import 'antd/lib/button/style/css'
import 'antd/lib/message/style/css'
  

const Login: FC<any> = ({
  onSubmit 
}) => { 
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [locale] = useI18nLocale({
    [I18nLanguages.ZH_CN]: {
      'emptyNotice': '请填写用户名和密码',
      'login': '登录'
    },
    [I18nLanguages.EN_US]: {
      'emptyNotice': 'Please input username and password',
      'login': 'Login'
    }
  })

  const handleSubmit = useCallback(() => {
    if (username === '' || password === '') return message.error('请填写用户名和密码')
    onSubmit && onSubmit(username, password)

  }, [username, password, locale])
  return (
    <div>
      <Input
      value = { username }
      onChange = { e => setUsername(e.target.value) } /> 
    <Input 
      type="password" 
      value={password} 
      onChange={e => setPassword(e.target.value)}  />
      <Button block type="primary" onClick={handleSubmit}>登录</Button>
    </div>
  )
}

export const NormalLogin = Login