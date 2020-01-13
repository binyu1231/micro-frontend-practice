import React, { FC, useState, useEffect, useCallback } from 'react'
import { Table, Form, DatePicker, Button, Tag, message } from 'antd'
import moment, { Moment } from 'moment'
import { FormComponentProps } from 'antd/lib/form'
import { last30DaysMoment, numberFormat, NumberFormatEnum } from '@legend/kit'
import { ReportCookieMappingPayload, CookieMappingDto } from '../config'
import { IReportProps } from './types'

// import { toThousands, toPercent } from '@/util/format'
// import { countThousandRenderer, last30DaysMonment } from './util'


const colRightRenderer = (t) => (<div style={{ textAlign: 'right', padding: '0 5px' }}>{t}</div>)
const colThousandRight = (t) => colRightRenderer(numberFormat(t))

const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker
const PAGE_SIZE = 20
const tagStyle = {
  padding: '2px 8px', height: 'auto', marginBottom: 8
}

function disabledDate (current) {
  return current && current > moment().startOf('day')
}

export interface ICookieMappingProps extends IReportProps, FormComponentProps {

}

const CookieMappingOverview: FC<ICookieMappingProps> = ({
  form, biApi
}) => {

  const [dataSource, setDataSource] = useState<CookieMappingDto>([])
  const [loading, setLoading] = useState(false)
  const [currentTag, setCurrentTag] = useState('ALL')
  const [dataMap, setDataMap] = useState(new Map())
  const [tags, setTags] = useState<any[]>([])
  // const [total, setTotal] = useState(0)

  const columns: any[] = [
    {
      title: '日期',
      dataIndex: 'time',
      defaultSortOrder: 'descend',
      sorter: (a, b) => moment(a.bizdate).isAfter(b.bizdate) ? -1 : 1
    }, {
      title: 'Cookie总量',
      children: [
        { title: 'ADX', dataIndex: 'total', render: colThousandRight },
        { title: 'YOYI', dataIndex: 'yoyi_total', render: colThousandRight },
      ]
    }, {
      title: 'DSP流量UV覆盖情况',
      children: [
        { title: '询价UV', dataIndex: 'uv', render: colThousandRight },
        {
          title: '离线覆盖',
          dataIndex: 'uv_match',
          render: (t, row) => colRightRenderer(
            <div>
              {numberFormat(t) + ' '}
              (<span style={{ color: '#1790ff' }}>{
                row.uv === 0 ?
                  '--' :
                  numberFormat(row.uv_match / row.uv, NumberFormatEnum.percent2fFloat)
              }</span>)
            </div>
          )
        },
        {
          title: '实际覆盖',
          dataIndex: 'uv_real_match',
          render: (t, row) => colRightRenderer(currentTag === 'ALL' ? (
            <div>
              {numberFormat(t) + ' '}
              (<span style={{ color: '#1790ff' }}>{
                row.uv === 0 ?
                  '--' :
                  numberFormat(row.uv_real_match / row.uv, NumberFormatEnum.percent2fFloat)
              }</span>)
            </div>
          ) : '--')
        },
      ]
      // '#1790ff', '#30c25b'
    }, {
      title: 'DSP流量PV覆盖情况',
      children: [
        { title: '询价PV', dataIndex: 'pv', render: colThousandRight },
        {
          title: '离线覆盖',
          dataIndex: 'pv_match',
          render: (t, row) => colRightRenderer(
            <div>
              {numberFormat(t) + ' '}
              (<span style={{ color: '#1790ff' }}>{
                row.pv === 0 ?
                  '--' :
                  numberFormat(row.pv_match / row.pv, NumberFormatEnum.percent2fFloat)}</span>)
            </div>
          )
        },
        {
          title: '实际覆盖',
          dataIndex: 'pv_real_match',
          render: (t, row) => colRightRenderer(currentTag === 'ALL' ? (
            <div>
              {numberFormat(t) + ' '}
              (<span style={{ color: '#1790ff' }}>{
                row.pv === 0 ?
                  '--' :
                  numberFormat(row.pv_real_match / row.pv, NumberFormatEnum.percent2fFloat)}
              </span>)
            </div>
          ) : '--')
        }
      ]
    }
  ]

  useEffect(() => {
    getList(last30DaysMoment)
  }, [])

  const getList = useCallback(([start, end]: Moment[]) => {

    setLoading(true)
    // fetchService
    const params: ReportCookieMappingPayload = {
      since: start.format('YYYY-MM-DD'),
      until: end.format('YYYY-MM-DD'),
      logicType: 'bi'
    }


    biApi.cookieMapping(params)
    .then(res => {
      if (!Array.isArray(res)) {
        message.error('数据格式错误: not array', 1.5)
        return
      }
      console.log('ffff', res)
      const dMap = new Map(dataMap)

      res.forEach(item => {
        const name = item.exchange_name
        if (dMap.has(name)) {
          dMap.get(name).push(item)
        }
        else {
          dMap.set(name, [item])
        }
      })

      const tags = Array.from(dMap.keys())
      tags.sort((a: any, b: any) => a === 'ALL' ? -1 : a - b)


      setDataMap(dMap)
      setDataSource(dMap.get('ALL'))
      setCurrentTag('ALL')
      setTags(tags)
    })
    .catch(e => message.error(e, 1.5))
    .then(() => setLoading(false))

  }, [])

  const handleSubmit = useCallback((e) => {
    e && e.preventDefault()

    form.validateFields((err, values) => {
      if (err) return
      getList(values['range-picker'])
    })
  }, [form, getList])

  return (
    <div className="mg-b-30">
      <Form layout="inline" onSubmit={handleSubmit}>
        <div className="flex justify-end mb-1">
          <FormItem label="日期">
            {form.getFieldDecorator('range-picker', {
              rules: [{ type: 'array', required: true }],
              initialValue: last30DaysMoment
            })(
              <RangePicker
                style={{ width: 300, margin: '3px 8px 0 0' }}
                placeholder={['开始时间', '结束时间']}
                disabledDate={disabledDate}
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              style={{ width: 160, marginTop: 3 }}
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              查询
              </Button>
          </FormItem>
        </div>
      </Form>
      <div style={{ minHeight: 'calc(100vh - 220px)' }}>
        {tags.map(t => (
          currentTag === t ?
            <Tag.CheckableTag style={tagStyle} checked key={t}>{t}</Tag.CheckableTag> :
            <Tag
              onClick={() => {
                setCurrentTag(t)
                setDataSource(dataMap.get(t))
              }}
              key={t}
              style={tagStyle}
            >{t}</Tag>
        ))}

        <Table
          className="searchTable min-height"
          size="middle"
          bordered
          rowClassName={(_, i) => i % 2 === 0 ? 'table-row' : 'table-row-dark'}
          rowKey={(_, i) => String(i)}
          scroll={{ x: '100%' }}
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          pagination={{
            // current: page,
            defaultPageSize: PAGE_SIZE,
            // onChange: (page) => this.setState({ page }),
            showQuickJumper: true,
            showSizeChanger: true,
            // total,
            showTotal: t => `共计：${numberFormat(t)} 条`
          }}
        />
      </div>
    </div>
  )
}

export const ReportCookieMapping = Form.create<ICookieMappingProps>({})(CookieMappingOverview)