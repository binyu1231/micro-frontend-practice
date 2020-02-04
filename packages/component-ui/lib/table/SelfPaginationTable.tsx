import React, { FC, useState } from 'react'
import { Table } from 'antd'
import { TableProps } from 'antd/lib/table'
import 'antd/lib/table/style/css'
import { TablePageSize } from './enum'
import { numberFormat } from '@micro/kit'



export const SelfPaginationTable: FC<{
  pageSize?: number
} & TableProps<any>> = ({
  pageSize,
  dataSource,
  ...otherProps
}) => {

  const [page, setPage] = useState(1)
  return (
    <Table
      rowKey={(_, i) => String(i)}
      rowClassName={(_, i) => i % 2 === 0 ? '' : 'bg-gray-100'}
      dataSource={dataSource}
      pagination={{
        current: page,
        defaultPageSize: pageSize || TablePageSize.p20,
        showQuickJumper: true,
        showSizeChanger: true,
        total: dataSource.length,
        onChange: setPage,
        showTotal: n => `共计 ${numberFormat(n)} 条`
      }}
      {...otherProps} />
  )
}