import React, { SFC, useState, useCallback, useEffect, useRef } from 'react'
import { SelfPaginationTable } from '@legend/ui'
import { moment, Moment, last3DayMoment, MomentFormatEnum } from '@legend/kit'
import { Table, Form, Button, DatePicker, Row, Col } from 'antd'
import 'antd/lib/date-picker/style/css'
import { QueryParameter } from './QueryParameter'
import { QueryType, QueryLogicType, FieldName, displayNameMap, EnumCategory, BiMetadataDto } from '../config/types'
import { BiApi, QueryDto } from '../config'
import { PlainObject, catchError, CommonOption } from '@legend/framework'
import { formItemRendererGenerator, sorterGenMap, normalFilterGenerator, formatQueryDateParams, equalFilterGenerator, DEFAULT_VALUE, colConfig, normalColGenerator } from './util'
import { FormComponentProps } from 'antd/lib/form'
import { FormEvent } from 'react'



const PAGE_SIZE = 10
const DEFAULT_DATES = [last3DayMoment]
const DEFAULT_FIELD = FieldName.actionDay
const DEFAULT_DISPLAY_NAME = displayNameMap.get(DEFAULT_FIELD)

function disabledDate(current: Moment) {
  return current && current > moment().startOf('day')
}

const defaultParams: QueryParameter = {
  type: QueryType.entityQuery,
  logicType: QueryLogicType.bi,
  queryFields: [
    FieldName.actionDay,  // 日期
  ],
  filters: [],
  orderBys: [
    {
      orderBy: DEFAULT_FIELD,
      ascending: false,
      orderIndex: 1
    }
  ],

  since: DEFAULT_DATES[0].format(MomentFormatEnum.YYYY_MM_DD),
  until: DEFAULT_DATES[DEFAULT_DATES.length - 1].format(MomentFormatEnum.YYYY_MM_DD),
  pageInfo: {
    pageIndex: 1,
    pageSize: 1000,
    hasTotalCount: true
  },
}


export interface ICustomReportProps extends FormComponentProps {
  biApi: BiApi
  columns: string[]
  defaultDimension?: FieldName,
  formConfigure?: any[],
  range?: Moment[] | Moment,
  sort?: { field: FieldName, ascending: boolean }
}

const _CustomReport: SFC<ICustomReportProps> = ({
  defaultDimension,
  biApi,
  formConfigure,
  columns,
  range,
  sort,
  form,
}) => {

  const queryParams = useRef<QueryParameter>(Object.assign({}, defaultParams))
  const [dimensionOptions, setDimensionOptions] = useState<CommonOption[]>([])
  const [options, setOptions] = useState<BiMetadataDto[]>([])
  const formatColumns = useRef<any>([{ title: DEFAULT_DISPLAY_NAME, width: 150, dataIndex: DEFAULT_FIELD }])
  const [loading, setLoading] = useState(false)
  const [dataSource, setData] = useState<PlainObject[]>([])

  const updateDimension = useCallback((fieldName: FieldName, options: BiMetadataDto[]) => {
    const cols = formatColumns.current.slice()
    const firstCol = cols[0]
    delete firstCol.sorter
    delete firstCol.filterDropdown
    delete firstCol.filterIcon
    delete firstCol.onFilter

    const originDto = options.find(opt => opt.fieldName === fieldName)
    if (originDto) {

      if (sorterGenMap.has(originDto.displayType)) {
        firstCol.sorter = sorterGenMap.get(originDto.displayType)(fieldName)
      }
      else {
        Object.assign(firstCol, normalFilterGenerator(fieldName, originDto.displayName))
      }

      firstCol.dataIndex = fieldName
      firstCol.title = originDto.displayName

    }

    queryParams.current.queryFields[0] = fieldName
    queryParams.current.orderBys[0].orderBy = fieldName
    formatColumns.current = cols

  }, [options])


  const formatFilters = useCallback(() => {
    if (formConfigure) {
      const filters = []
      const g = equalFilterGenerator

      const values = form.getFieldsValue()
      formConfigure.forEach(conf => {
        const [label, field, formType, selectOptions, formConfig] = conf
        if (formType === 'select') {
          values[field] !== DEFAULT_VALUE && filters.push(g(field, values[field]))
        }
        else { // input
          values[field] && filters.push(g(field, values[field]))
        }
      })

      queryParams.current.filters = filters
    }
  }, [formConfigure, form])

  const getList = useCallback(() => {

    setLoading(true)
    biApi.query(queryParams.current)
      .then(res => {
        setData(res.data.data)
      })
      .catch(catchError)
      .finally(() => setLoading(false))

  }, [queryParams])

  const formItemRenderer = useCallback(
    formItemRendererGenerator(form.getFieldDecorator),
    [form.getFieldDecorator]
  )

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (err) return
      const { current } = queryParams
      if (!defaultDimension) {
        updateDimension(values.type, options)
        current.orderBys[0].orderBy = values.type
      }

      formatFilters()
      Object.assign(current, formatQueryDateParams(values.date))
      getList()
    })



  }, [form, formatFilters, getList, options])

  /// 初始化
  useEffect(() => {

    /// 设置排序
    if (sort) {
      queryParams.current.orderBys[0].orderBy = sort.field
      queryParams.current.orderBys[0].ascending = sort.ascending
    }

    /// 设置默认时间
    if (range) {
      Object.assign(queryParams.current, formatQueryDateParams(range))
    }
    /// 设置filter
    formatFilters()

    biApi.metadata({ type: 1 })
      .then(options => {

        setOptions(options)

        updateDimension(defaultDimension || DEFAULT_FIELD, options)

        if (defaultDimension === undefined) {
          const dOptions = options.filter(opt => opt.logicCategory === EnumCategory.dimension)
            .map<CommonOption>(opt => ({ name: opt.displayName, value: opt.fieldName }))

          setDimensionOptions(dOptions)
        }

        /// 设置 columns 
        /// 配置表格项，表格项有计算 columns 所以不用接口字段配置，使用中文title 配置
        // 需要用配置排序，不能用 colConfig.filter(columns.includes)
        const cols = columns
          .map(col => colConfig.find(conf => conf[0] === col))
          .filter(col => col)

        /// 前端计算的项目(竞价率, col[1] === null)需要过滤掉
        const fields: FieldName[] = cols.map(col => col[1]).filter(field => field)
        const { queryFields } = queryParams.current
        queryParams.current.queryFields = [queryFields[0]].concat(fields)

        const otherCols = cols.map(col => {
          const originDto = options.find(opt => opt.fieldName === col[1])

          
          if (originDto) {
            col[3] = sorterGenMap.get(originDto.displayType)(originDto.fieldName)
          }
          
          return normalColGenerator.apply(null, col)
        })

        formatColumns.current = [formatColumns.current[0]].concat(otherCols)

        getList()
      })


  }, [])

  return (
    <div>
      <Form layout="inline" onSubmit={handleSubmit}>
        {/* row1 */}
        {/* 如果外部没有设置维度，默认维度是可变的下拉框 */}
        <Row className="mb-1">
          <Col xl={14} md={24}>
            {!defaultDimension && formItemRenderer('维度', 'type', 'select', dimensionOptions, { initialValue: DEFAULT_FIELD })}
            {formConfigure && formConfigure.map(conf => formItemRenderer.apply(null, conf))}
          </Col>
          <Col xl={10} md={24}>
            <div className="flex justify-end">
              <Form.Item label="日期">
                {form.getFieldDecorator('date', {
                  initialValue: range
                })(Array.isArray(range) ?
                  <DatePicker.RangePicker
                    style={{ margin: '3px 8px 0 0' }}
                    disabledDate={disabledDate} /> :

                  <DatePicker
                    style={{ margin: '3px 8px 0 0' }}
                    disabledDate={disabledDate} />
                )}
              </Form.Item>
              <Button
                style={{ width: 140, marginTop: 3 }}
                type="primary"
                htmlType="submit"
                loading={loading}>查询</Button>
            </div>
          </Col>
        </Row>
      </Form>
      <SelfPaginationTable
        dataSource={dataSource}
        columns={formatColumns.current}
        size="middle"
        scroll={{ x: true }}
        loading={loading}
      >
      </SelfPaginationTable>
    </div>
  )
}

export const CustomReport = Form.create<ICustomReportProps>()(_CustomReport)