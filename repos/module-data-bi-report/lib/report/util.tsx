import React from 'react'
import { EnumDisplayType, FieldName, FilterOperator } from "../config/types";
import { PlainObject } from "@legend/framework";
import { moment, numberFormat, NumberFormatEnum, Moment } from "@legend/kit";
import { ReactNode } from "react";
import { Form, Select, Input, Button, Icon } from "antd";
import { QueryParameterFilter } from "./QueryParameter";


export const DEFAULT_VALUE = ''

export function numberSorterGenerator (field: string) {
  return function (a: PlainObject, b: PlainObject) {
    return Number(a[field]) - Number(b[field])
  }
}

export const sorterGenMap = new Map<
  EnumDisplayType, 
  (field: FieldName) => (a: PlainObject, b: PlainObject) => number
>([
  [
    EnumDisplayType.date, 
    (f) => (a, b) => {
      if (moment(a[f]).isBefore(b[f])) return -1
      if (moment(a[f]).isAfter(b[f])) return -1
      return 0
    }
  ],
  [ EnumDisplayType.int, numberSorterGenerator ],
  [ EnumDisplayType.float, numberSorterGenerator ],
  [ EnumDisplayType.intPercent, numberSorterGenerator ],
  [ EnumDisplayType.floatPercent, numberSorterGenerator ],
])

type AntdTableRender = (t: string, r: PlainObject, i: number) => ReactNode
export const renderMap = new Map<
  EnumDisplayType, 
  AntdTableRender
>([
  [ EnumDisplayType.int, (t) => numberFormat(t) ],
  [ EnumDisplayType.float, (t) => numberFormat(t, NumberFormatEnum.thousands2fFloat) ],
  [ EnumDisplayType.intPercent, (t) => numberFormat(t, NumberFormatEnum.percent) ],
  [ EnumDisplayType.floatPercent, (t) => numberFormat(t, NumberFormatEnum.percent2fFloat) ],
])


// column 中文对应的字段，此处数组顺序无效
export const colConfig: any[] = [
  ['询价量', 'ask'],
  ['竞价量', 'bid'],
  ['竞价率', null, 
      (_, r) => r.ask === 0 ? '--' : countPercentRenderer(r.bid / r.ask), 
      (a, b) => a.ask === 0 ? a.bid - b.bid : (a.bid / a.ask) - (b.bid / b.ask)],
  ['竞价成功量', 'win'],
  ['竞价成功率', 'wtr', countPercentRenderer],
  ['实际总花费', 'cost'],
  ['eCPM(实际花费)', 'ecpm'],
  ['曝光量', 'impression'],
  ['点击量', 'click'],
  ['点击率', 'ctr', countPercentRenderer],
  ['到达量', 'reach'],
  ['广告主总花费', 'customer_cost'],
  ['代理商总花费', 'agent_cost'],
  ['花超花费', 'lost_cost'],
]


export function countPercentRenderer (t) {
  return numberFormat(t, NumberFormatEnum.percent2fFloat)
}

export function countThousandRenderer (t) {
  return numberFormat(t, NumberFormatEnum.thousands)
}


export const normalColGenerator = (name, field, render, sorter) => {
  return { 
    title: name, 
    dataIndex: field, 
    render: render || countThousandRenderer, 
    sorter
  }
}

export function normalFilterGenerator (fieldName: string, displayName: string) {
  return {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`搜索 ${displayName}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => confirm()}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          搜索
        </Button>
        <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
          重置
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
          record[fieldName]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
  }
}


export const formItemRendererGenerator = (decorator: any, options?: any[]) => {
  return (
    name: string, 
    field: string, 
    formType, 
    selectOptions, 
    formOptions, 
    disabled: boolean = false
  ) => {
      return (
          <Form.Item label={ name } key={name}>
              {decorator(field, Object.assign({}, options, formOptions))(
                  formType === 'select' ? 
                  <Select style={{ width: 150, marginTop: 3 }} disabled={ disabled }>
                      { selectOptions.map((opt, i) => (
                          <Select.Option key={i} value={opt.value}>{opt.name}</Select.Option>    
                      ))}
                  </Select> :
                  <Input style={{ width: 120, marginTop: 3 }} />
              )}
          </Form.Item>
      )
  }
}

export const formatQueryDateParams = (date: Moment | Moment[], rule = 'YYYY-MM-DD') => {
    
  const range = Array.isArray(date) ? date : [date]
  const since = range[0].format(rule)
  const until = range[range.length - 1].format(rule)
  
  return { since, until }
}

// 接口过滤器对象生成器
export function equalFilterGenerator (name: FieldName, value: any) : QueryParameterFilter {
  return {
    filterName: name,
    operator: FilterOperator.eq, // 判断值相等
    filterValues: [String(value)],
    filterCategory: 1,
    type: 'filterItem'
  }
}

export const boolSelectOptions = [
  { name: '不限', value: DEFAULT_VALUE },
  { name: '是', value: 1 },
  { name: '否', value: 0 },
]

export const platSelectOptions = [
  { name: '不限', value: DEFAULT_VALUE },
  { name: 'app', value: 'app' },
  { name: 'ott', value: 'ott' },
  { name: 'pc', value: 'pc' },
  { name: 'wap', value: 'wap' },
]


export const compareOptions = [
  { name: '等于', value: 1 }, 
  { name: '不等于', value: 2 }, 
  { name: '包含', value: 5 }, 
  { name: '不包含', value: 6 }, 
  { name: '模糊查询', value: 10 }, 
  { name: '不小于', value: 3 }, 
  { name: '不大于', value: 4 }, 
  { name: '大于', value: 8 }, 
  { name: '小于', value: 9 }
]

export const sortOptions = [
  { name: '正序', value: 'true' }, 
  { name: '倒序', value: 'false' }, 
]
