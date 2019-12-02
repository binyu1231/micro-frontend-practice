import React, { SFC, useState, useCallback, useEffect } from 'react'
import { SelfPaginationTable } from '@legend/ui'
import { moment, last3DayMoment, MomentFormatEnum } from '@legend/kit'
import { Table } from 'antd'

const defaultType = 'action_day'
const defaultTitle = '日期'
const defaultPage = 1
const PAGE_SIZE = 10
const defaultDate = [last3DayMoment]

const defaultParams = {
  type: 'entityQuery',
  logicType: 'bi',
  queryFields: [
    defaultType,  // 日期
  ],
  filters: [],
  orderBys: [
    {
      orderBy: defaultType,
      ascending: false,
      orderIndex: 1
    }
  ],

  since: defaultDate[0].format(MomentFormatEnum.YYYY_MM_DD),
  until: defaultDate[defaultDate.length - 1].format(MomentFormatEnum.YYYY_MM_DD),
  pageInfo: {
    pageIndex: defaultPage,
    pageSize: 1000,
    hasTotalCount: true
  },
}

export const CustomOverview: SFC<{
  dimension?: [string, string],
  columns:string[]
  formConfigure: any[]
}> = ({
  dimension
}) => {

  const [queryParams, setParams] = useState(Object.assign({}, defaultParams))

  useEffect(() => {
    if (dimension === undefined) return
    
  }, [dimension])

  const [loading, setLoading] = useState(false)

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

  const submit = useCallback(() => {

  }, [])

  return (
    <div>
      <SelfPaginationTable
        dataSource={data}
        size="middle"
        loading={loading}
      >
        <Table.Column key="name" title="姓名" dataIndex="name" />
        <Table.Column key="age" title="年龄" dataIndex="age" />
        <Table.Column key="address" title="地址" dataIndex="address" />
      </SelfPaginationTable>
    </div>
  )
}