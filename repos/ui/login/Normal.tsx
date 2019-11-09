import React, { FC, useState, useCallback, ReactNode } from 'react'
import { Input, Button, Form, message } from 'antd'
import { useI18nLocale } from '@legend/helper-react-hooks'
import { FormComponentProps } from 'antd/lib/form'
import 'antd/lib/input/style/css'
import 'antd/lib/button/style/css'
import 'antd/lib/message/style/css'
import 'antd/lib/form/style/css'

import { locales } from './i18n'

const Login: FC<{
  withCardWrapper?: boolean
  backboard?: ReactNode,
  header?: ReactNode,
  width?: number,
  height?: number,
  usernameRules?: any[],
  passwordRules?: any[],
  onSubmit?: (username: string, password: string) => void,
  [key: string]: any
} & FormComponentProps> = ({
  withCardWrapper,
  backboard,
  header,
  width,
  height,
  usernameRules,
  passwordRules,
  onSubmit,
  form,
  ...otherProps
}) => {
  const [w] = useState(width || 300)
  const [h] = useState(height || 300)
  const [locale] = useI18nLocale<any>(locales)

  const handleSubmit = useCallback(() => {
    form.validateFields(function (err, values) {
      if (err) return
      const { username, password } = values
      onSubmit && onSubmit(username, password)
    })
    
  }, [])

  return (
    <section 
      className="fixed inset-0" 
      {...otherProps}>
      <div className="absolute inset-0 z-10">{backboard}</div>
      <div 
        className="absolute inset-0 m-auto z-20"
        style={{ 
          width: withCardWrapper ? 'auto' : w,
          height: withCardWrapper ? 'auto' : h,
        }}>
        <div>{ header }</div>
        <Form>
          <Form.Item>
            { form.getFieldDecorator('username', {
              rules: usernameRules || [{ required: true, message: locale.emptyUsernameNotice }] 
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item>
            { form.getFieldDecorator('password', {
              rules: passwordRules || [{ required: true, message: locale.emptyPasswordNotice }]
            })(
              <Input
              type="password" />
            )}
          </Form.Item>
        <Button block type="primary" onClick={handleSubmit}>
          { locale.login }
        </Button>
        </Form>
      </div>
    </section>
  )
}

export const NormalLogin = Form.create({})(Login)