import React, { FC, useState, useCallback, useEffect } from 'react'
import { CardContentLayout } from '@legend/ui'
import { Form, Row, Col, Input, Button, Select, message } from 'antd'
import { useStore } from '../store'
import { IChannelsDto } from '../config'
import { FormComponentProps } from 'antd/lib/form'
import { Link, useHistory } from 'react-router-dom'


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 5 },
    lg: { span: 4 },
    xl: { span: 3 },
    xxl: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 10 },
    lg: { span: 8 },
    xl: { span: 8 },
    xxl: { span: 8 },

  },
}

export interface IEditProps extends FormComponentProps {

}

const _Edit: FC<IEditProps> = ({ form }) => {

  const history = useHistory()
  const [channels, setChannels] = useState<IChannelsDto[]>([])
  const { store } = useStore()

  const fetchChannels = useCallback(() => {
    store.api.channelsFetch().then(setChannels)
  }, [store])

  const handleTokenGet = useCallback(() => {
    const channelId = form.getFieldValue('channelId')
    const ch = channels.find(ch => ch.id === channelId)
    window.open(ch.redirect_url)
  }, [form, channels])

  const handleSearchCustomerName = useCallback((e) => {
    // 23447018
    store.api.customerName({ customerId: e.target.value })
      .then(res => {
        form.setFieldsValue({ customerName: res })
        if (res === '') message.warn('无此广告主')
      })
  }, [store, form])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {

      if (err) return
      store.api.accountSave(values)
        .then(res => {
          if (res.code !== 200) throw res

          message.success('创建成功')
          history.replace('/')
        })
        .catch(e => {
          message.error('创建失败:' + e.message)
        })
    })
  }, [store, form])


  useEffect(() => {
    fetchChannels()
  }, [])

  return (
      <CardContentLayout title="创建账户">
        <Form onSubmit={handleSubmit} {...formItemLayout}>
          <Row>
            <Col>
              <Form.Item
                label="广告主ID">
                {form.getFieldDecorator('customerId', {
                  rules: [{ required: true }],
                })(
                  <Input
                    onBlur={handleSearchCustomerName}
                    placeholder="请输入广告主ID. eg: 23447018" />
                )}
              </Form.Item>
              <Form.Item label="广告主名称">
                {form.getFieldDecorator('customerName', {
                  rules: [{ required: true }],
                  initialValue: ''
                })(
                  <Input disabled placeholder="输入广告主ID后自动填充" />
                )}
              </Form.Item>
              <Form.Item label="媒体名称">
                {form.getFieldDecorator('channelId', {
                  rules: [{ required: true }]
                })(
                  <Select>
                    {channels.map(ch => (
                      <Select.Option value={ch.id} key={ch.id}>{ch.channel_name}</Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="Token密钥">
                {form.getFieldDecorator('url', {
                  rules: [{ required: true }]
                })(
                  <Input
                    placeholder="请粘贴包含密钥的网页地址"
                    addonAfter={<Button onClick={handleTokenGet} type="link">获取Token</Button>}
                  />
                )}
              </Form.Item>
              <Form.Item label="账号ID">
                {form.getFieldDecorator('accountId', {
                  rules: [{ required: true }],
                })(
                  <Input placeholder="请输入账号ID" />
                )}
              </Form.Item>
              <Form.Item label="账号名称">
                {form.getFieldDecorator('accountName', {
                  rules: [{ required: true }],
                })(
                  <Input placeholder="请输入账号名称" />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={15} lg={12} xl={11} xxl={10}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link to="/">
                  <Button style={{ marginRight: 8 }}>取消</Button>
                </Link>
                <Button
                  type="primary" htmlType="submit">提交</Button>
              </div>
            </Col>
          </Row>
        </Form>
      </CardContentLayout>
  )
}

export const Edit = Form.create({})(_Edit)