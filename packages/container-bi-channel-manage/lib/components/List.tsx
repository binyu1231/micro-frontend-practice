import React, { FC, useState, useCallback, useEffect } from 'react'
import { CardContentLayout, SelfPaginationTable } from '@component/ui'
import { Row, Col, Input, Select, Button, Table, Tooltip, Icon, Modal, message } from 'antd'
import { IAccountDto } from '../config'
import { RouteComponentProps } from 'react-router'
import { useStore } from '../store'
import { Link } from 'react-router-dom'
// import 
const PAGE_SIZE = 20



export const List: FC<RouteComponentProps> = () => {

  const { store } = useStore()
  const [customerId, setCustomerId] = useState<number | ''>('')
  const [channelId, setChannelId] = useState<number | ''>('')
  const [customers, setCustomers] = useState([])
  const [channels, setChannels] = useState([])
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState<IAccountDto[]>([])
  const [rawSource, setRawSource] = useState<IAccountDto[]>([])

  const fetchList = useCallback((channelId: number | '') => {
    setLoading(true)
    /// 前端自己搜索
    store.api.accountsFetch({ accountName: '', channelId })
    .then(res => {

      setRawSource(res.data)
      setDataSource(res.data)
      
      const customers = res.data.reduce<IAccountDto[]>((acc, curr) => {
        if (acc.findIndex(cust => cust.customer_id === curr.customer_id) < 0) {
          acc.push(curr)
        }
        return acc
      }, [])

      setCustomers(customers)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])

  const handleAccountNameSearch = useCallback((accountName: string) => {
    const dataSource = rawSource.filter(item => {
      return accountName === '' ||
        item.account_name.indexOf(accountName) >= 0 || 
        item.account_id.indexOf(accountName) >= 0
    })

    setDataSource(dataSource)

  }, [rawSource])

  const handleCustomerChange = useCallback((customerId: number | '') => {
    setCustomerId(customerId)
    const dataSource = rawSource.filter(item => {
      return customerId === '' || item.customer_id === customerId
    })

    setDataSource(dataSource)
  }, [])

  const handleChannelChange = useCallback((channelId: number) => {
    setChannelId(channelId)
    
    fetchList(channelId)
  }, [fetchList])

  const handleDelete = useCallback((record: IAccountDto) => {
    Modal.confirm({
      title: '删除记录', content: '确认删除此条记录?',
      onOk () {
        const { customer_id, account_id } = record
        store.api.accountDelete({ customerId: customer_id, accountId: account_id })
        .then(() => {
          message.success('删除成功')
          fetchList(channelId)
        })
        .catch(() => {
          message.warn('操作失败')
        })
      }
    })
  }, [store, channelId, fetchList])

  useEffect(() => {
    store.api.channelsFetch().then((res) => {
      setChannels(res)
    })

    fetchList(channelId)
  }, [])

  return (
      <CardContentLayout title="渠道管理">
        <Row style={{ marginBottom: 10 }}>
          <Col span={16}>
            <Input.Search
              onSearch={handleAccountNameSearch}
              style={{ width: 220, marginRight: 10 }} placeholder="搜索账号ID或名称" />
            <label>广告主:&nbsp;</label>´
            <Select
              value={customerId}
              onChange={handleCustomerChange}
              style={{ width: 200, marginRight: 10 }}>
              <Select.Option value={''}>不限</Select.Option>
              {customers.map(cust => (
                <Select.Option
                  value={cust.customer_id}
                  key={cust.customer_id}>
                  {cust.customer_name}
                </Select.Option>
              ))}
            </Select>
            <label>渠道:&nbsp;</label>
            <Select
              value={channelId}
              style={{ width: 160, marginRight: 10 }}
              onChange={handleChannelChange}>
              <Select.Option value={''}>不限</Select.Option>

              {channels.map(ch => (
                <Select.Option value={ch.id} key={ch.id}>{ch.channel_name}</Select.Option>
              ))}
            </Select>
          </Col>
          <Col span={8}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link to="/edit/0">
                <Button type="primary" icon="plus">创建</Button>
              </Link>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <SelfPaginationTable
              loading={loading}
              pageSize={PAGE_SIZE}
              dataSource={dataSource}>
              <Table.Column align="left" key="account_id" title="账号ID" dataIndex="account_id"></Table.Column>
              <Table.Column align="left" key="account_name" title="账号名称" dataIndex="account_name"></Table.Column>
              <Table.Column align="left" key="customer_name" title="广告主名称" dataIndex="customer_name"></Table.Column>
              <Table.Column align="left" key="channel_name" title="媒体平台" dataIndex="channel_name"></Table.Column>
              <Table.Column
                key="_opt"
                title="操作"
                dataIndex="_opt"
                render={(t, r: IAccountDto) => (
                  <Tooltip title="删除">
                    <Button type="link" onClick={() => handleDelete(r)}>
                      <Icon type="delete" />
                    </Button>
                  </Tooltip>
                )}
              ></Table.Column>
            </SelfPaginationTable>
          </Col>
        </Row>
      </CardContentLayout>
  )
}