import React from 'react'
import { SelfPaginationTable } from '@legend/ui'
import { Table } from 'antd'


export default {
  title: 'ui/table'
}

export function selfPaginationTable () {
  const data = [
    { name: 'apple1', age: '121', address: '331' },
    { name: 'apple2', age: '122', address: '332' },
    { name: 'apple3', age: '123', address: '333' },
    { name: 'apple4', age: '124', address: '334' },
    { name: 'apple5', age: '125', address: '335' },
    { name: 'apple6', age: '126', address: '336' },
    { name: 'apple7', age: '127', address: '337' },
    { name: 'apple8', age: '128', address: '338' },
  ]

  return <SelfPaginationTable
    dataSource={data}
  >
    <Table.Column key="name" title="姓名" dataIndex="name" />
    <Table.Column key="age" title="年龄" dataIndex="age" />
    <Table.Column key="address" title="地址" dataIndex="address" />
  </SelfPaginationTable>
}