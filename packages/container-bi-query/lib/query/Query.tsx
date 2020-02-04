import React, { FC, Component, Fragment } from "react"
import TagSelect from './TagSelect'
import FilterSelect from './FilterSelect'
import SortSelect from './SortSelect'
// import './styles/layout.less'
import { formatDateParams } from './util'
import { DownloadButton } from './DownloadButton'
import { numberFormat, NumberFormatEnum, moment, Moment } from '@micro/kit'
import {
  Button, Form, DatePicker, Alert, Table,
  message, Pagination, InputNumber, Radio, Row, Col,
  Input, Icon,
} from 'antd'
import { useStore } from "../store"
import { IBiApi } from "../config"
import { EnumCategory } from "../config/types"

interface IQueryContainerProps {

}

export const QueryContainer: FC<IQueryContainerProps> = () => {

  const { store: { api } } = useStore()
  

  return <div>222</div>
  return (
    <Query 
      api={api} 
      dimensionType={1}
      disabledDate={(curr) => curr > moment().subtract(1, 'days') || curr < moment().subtract(8, 'days')}
    />
  )
}

const RangePicker = DatePicker.RangePicker
const FormItem = Form.Item

const FREQUENCY_FIELD = 'frequency'
const UV_FIELD = 'uv'
const PAGE_SIZE = 10

const initialState = {
  dimensionOptions: [] as any[],
  metricOptions: [] as any[],
  targetOptions: [] as any[],
  sortOptions: [] as any[],
  filterOptions: [] as any[],
  ifFrequency: false,
  frequencyInterval: 1,
  frequencyField: 'show',


  selectedDimensions: [] as any[],
  selectedMetrics: [] as any[],
  selectedFilters: [] as any[],
  selectedSorters: [] as any[],
  columns: [] as any[],
  dataSource: [] as any[],
  loading: false,
  page: 1,
  pageSize: PAGE_SIZE,

  filters: [] as any[],
  sorters: [] as any[],
  timeRange: [] as any[],

  params: null
}

interface IQueryProps {
  api: IBiApi,
  dimensionType: number,
  disabledDate: (current: Moment) => boolean
}


class Query extends Component<IQueryProps> {

  state = initialState

  dimensionNames: string[] = []
  dimensionValues: string[] = []
  metricNames: string[] = []
  metricValues: string[] = []
  allOptions: any[] = []

  componentDidMount = async () => {

    // 获取维度 options
    // 获取指标 options
    const options = await this.props.api.metadata({
      type: this.props.dimensionType
    })
    .then(res => {
      return res.map(item => {
        return {
          ...item,
          name: item.displayName,
          value: item.fieldName
        }
      })
    })

    const dimensionOptions = options.filter(opt => opt.logicCategory === EnumCategory.dimension)
    const metricOptions = options.filter(opt => opt.logicCategory === EnumCategory.metric)
    
    const filterOptions = options
      .filter(opt => opt.value !== FREQUENCY_FIELD)

    this.allOptions = options
    this.setState({ dimensionOptions, metricOptions, filterOptions })
  }

  componentWillUnmount = () => {
    this.dimensionValues = []
    this.metricValues = []
    this.dimensionNames = []
    this.metricNames = []
  }

  check = () => {
    if (this.dimensionValues.length === 0) return '请选择维度'
    if (this.metricValues.length === 0) return '请选择指标'
    if (this.state.timeRange.length === 0) return '请选择时间'
    const [since, until] = this.state.timeRange

    if (until.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
      if (until.diff(since, 'days') > 2) {
        return '如果选择了今天，时间区间最多只能选三天!'
      }
      if (
        this.state.ifFrequency ||
        this.metricValues.includes(UV_FIELD)
      ) {
        return '如果选择了今天，维度不能选"频次"，指标不能选"独立用户"!'
      }
    }

    return null
  }

  query = () => {

    const err = this.check()

    if (err) {
      return message.error(err)
    }

    const queryFields: string[] = this.dimensionValues.slice().concat(this.metricValues)
    // params 是接口参数
    const params = {
      // 维度与指标放到 queryFields 中
      queryFields,
      // { start, until }
      ...formatDateParams(this.state.timeRange),
      filters: this.state.filters,
      orderBys: this.formatOrderBy(),
      type: 'entityQuery',
      logicType: 'bi',
      pageInfo: { pageIndex: 0, pageSize: 1000, hasTotalCount: false }
    }

    if (this.state.ifFrequency) {
      Object.assign(params, {
        identityField: 'user_id',
        type: 'frequencyQuery',
        frequencyField: this.state.frequencyField,
        frequencyInterval: this.state.frequencyInterval,
      })
    }

    Object.assign(params, {
      type: "packageQuery",
      logicType: 'bi',
    })

    this.setState({ loading: true })

    this.props.api.query(params as any).then(res => {
      this.setState({ loading: false })
      if (!res.data) return message.error(res.stacktrace)
      const dataSource = res.data.data

      if (!Array.isArray(dataSource)) {
        return message.error('服务器数据格式错误')
      }

      console.log(dataSource, queryFields)

      const columns = this.formatColumns(queryFields)


      this.setState({ columns, dataSource, params })

      return
    })
      .catch(e => {
        message.error(e)
        this.setState({ loading: false })
      })

    // this.props.onQuery && this.props.onQuery()
    return
  }

  formatOrderBy() {
    const hasDate = this.dimensionValues.find(v => v === 'action_day' || v === 'action_hour')
    const defaultSorterField = hasDate ? hasDate : this.metricValues[0]

    return this.state.sorters.length > 0 ? this.state.sorters : [{
      orderBy: defaultSorterField,
      ascending: false,
      orderIndex: 1
    }]
  }

  clear = () => {
    // this.props.onClear && this.props.onClear()
    this.setState({
      selectedDimensions: [],
      selectedMetrics: [],
      timeRange: [],
      sorters: [],
      filters: [],
      columns: [],
      dataSource: [],
      params: null
    })
  }

  reset = () => {
    // this.props.onReset && this.props.onReset()
  }

  formatColumns(values) {
    const columns = values.map(val => {

      const item = this.allOptions.find(opt => opt.value === val)
      const type = item.displayType
      const col: any = {
        title: item.name,
        dataIndex: val,
        render: (t) => <div style={{ textAlign: 'left' }}>{t}</div>
      }

      if (type === 'int') {
        col.sorter = (a, b) => Number(a[val]) - Number(b[val])
        col.render = t => numberFormat(parseInt(t))
      }
      else if (type === 'float') {
        col.sorter = (a, b) => Number(a[val]) - Number(b[val])
        col.render = t => numberFormat(t, NumberFormatEnum.thousands2fFloat)
      }

      else if (type === 'intPercent') {
        col.sorter = (a, b) => Number(a[val]) - Number(b[val])
        col.render = t => numberFormat(t, NumberFormatEnum.percent)
      }

      else if (type === 'floatPercent') {
        col.sorter = (a, b) => Number(a[val]) - Number(b[val])
        col.render = t => numberFormat(t, NumberFormatEnum.percent2fFloat)
      }
      else if (type === 'date') {
        col.sorter = (a, b) => {
          if (moment(a[val]).isBefore(b[val])) return -1
          if (moment(a[val]).isAfter(b[val])) return 1
          return 0
        }
      }
      else if (type === 'normal') {
        col.filterDropdown = ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
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
          col.filterIcon = filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
          )

        col.onFilter = (value, record) =>
          record[val]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
      }

      return col
    })

    return columns
  }

  // 改变维度
  // * 如果选择频次，表单下方会增加表单项
  dimensionChangeHandler = (options) => {
    const ifFrequency = !!options
      .find(opt => opt.value === FREQUENCY_FIELD)

    this.setState({ selectedDimensions: options })
    this.dimensionValues = options.map(opt => opt.value)
    this.dimensionNames = options.map(opt => opt.name)
    this.setState({ ifFrequency })
    this.updateSortOptions()
  }

  // 改变指标
  metricChangeHandler = (options) => {

    this.setState({ selectedMetrics: options })

    this.metricValues = options.map(opt => opt.value)
    this.metricNames = options.map(opt => opt.name)
    this.updateSortOptions()
  }

  // 改变时间
  timeRangeChangeHandler = (timeRange) => {
    this.setState({ timeRange })
  }

  // 改变过滤条件
  filterChangeHandler = (filters, condition) => {
    console.log('log filters and condition', filters, condition)
    this.setState({ filters })
  }

  // 改变排序条件
  sorterChangeHandler = (sorters) => {
    console.log('log sorters', sorters)
    this.setState({ sorters })
  }


  /// 选择的维度和指标可以排序
  updateSortOptions = () => {
    const keepDimensions = this.state.dimensionOptions
      .filter(opt => this.dimensionValues.includes(opt.value))

    const keepMetrics = this.state.metricOptions
      .filter(opt => this.metricValues.includes(opt.value))

    this.setState({
      sortOptions: keepDimensions.concat(keepMetrics)
    })
  }

  render() {
    return (
      <Form className="queryform-layout"
        layout="inline"
        style={{ minHeight: 'calc(100vh - 275px)' }}>
        <div className="layout-left">
          <div className="main-select">
            <TagSelect
              style={{ marginBottom: 10 }}
              value={this.state.selectedDimensions}
              options={this.state.dimensionOptions}
              onChange={this.dimensionChangeHandler}
              placeholder="维度" />
            <TagSelect
              style={{ marginBottom: 10 }}
              value={this.state.selectedMetrics}
              onChange={this.metricChangeHandler}
              options={this.state.metricOptions}
              placeholder="指标" />
          </div>

          <div className="">
            <Button
              style={{ display: 'block', width: '100%', marginBottom: 10 }}
              type="primary"
              onClick={this.query}
              loading={this.state.loading}
              disabled={this.state.loading}
            >查询</Button>
            <Button
              onClick={this.clear}
              style={{ display: 'block', width: '100%' }}
              disabled={this.state.loading}
            >清空</Button>
          </div>
        </div>
        <div className="layout-right">
          <div className="layout-right-top">
            <Row type="flex">
              <Col
                sm={{ span: 24, order: 0 }}
                lg={{ span: 10, order: 0 }}
                xl={{ span: 8, order: 0 }}
                xxl={{ span: 6, order: 0 }}>
                <FormItem label="时间" className="block-form-item">
                  <RangePicker
                    style={{ marginTop: 4 }}
                    value={this.state.timeRange}
                    onChange={this.timeRangeChangeHandler}
                    disabledDate={this.props.disabledDate}
                  />
                </FormItem>
              </Col>
              <SortSelect
                options={this.state.sortOptions}
                onChange={this.sorterChangeHandler}
                value={this.state.sorters}
              />
              <FilterSelect
                options={this.state.filterOptions}
                onChange={this.filterChangeHandler}
                value={this.state.filters}
              />

              {/* <FormItem label="分组">
              <Select style={{ width: 130 }} />
            </FormItem>
            <FormItem label="排序">
              <Select style={{ width: 130 }} />
            </FormItem> */}


              {this.state.ifFrequency && (
                <Fragment>
                  <Col sm={{ span: 24, order: 2 }} >
                    <FormItem label="频次">
                      <InputNumber
                        value={this.state.frequencyInterval}
                        onChange={val => this.setState({ frequencyInterval: val })}
                        style={{ width: 178 }} />
                    </FormItem>
                  </Col>
                  <Col sm={{ span: 24, order: 2 }} >
                    <FormItem label="频控">
                      <Radio.Group
                        value={this.state.frequencyField}
                        onChange={e => {
                          this.setState({ frequencyField: e.target.value })
                        }}>
                        <Radio.Button value="impression">曝光</Radio.Button>
                        <Radio.Button value="click">点击</Radio.Button>
                        <Radio.Button value="ask">询价</Radio.Button>
                      </Radio.Group>
                    </FormItem>
                  </Col>
                </Fragment>
              )}
            </Row>
          </div>
          <div className="layout-right-bottom">
            {
              this.state.dataSource.length === 0 ? (
                null
                // <Alert
                //   type="info"
                //   style={{ marginRight: 4 }}
                //   message={<h2>如何使用</h2>}
                //   description={
                //     <div>
                //       <h3>维度</h3>
                //       <ul>
                //         <li>列表项，至少有一项</li>
                //         <li>如果选择<b>“频次”</b>，需要配置类型</li>
                //       </ul>
                //       <h3>指标</h3>
                //       <ul>
                //         <li>列表项，作为查询结果至少有一项</li>
                //       </ul>
                //       <h3>时间</h3>
                //       <ul>
                //         <li>如果选择今天，最多只能选择三天</li>
                //         <li>如果选择了今天，维度不能选<b>“频次”</b>，指标不能选<b>“独立用户”</b></li>
                //       </ul>
                //     </div>
                //   }
                // />
              ) : (
                  <Table
                    className="searchTable"
                    size="middle"
                    rowKey={(_, i) => String(i)}
                    rowClassName={(_, i) => i % 2 === 0 ? 'table-row' : 'table-row-dark'}
                    scroll={{ x: true }}
                    columns={this.state.columns}
                    dataSource={this.state.dataSource}
                    loading={this.state.loading}
                    pagination={{
                      current: this.state.page,
                      pageSize: this.state.pageSize,
                      onChange: page => this.setState({ page }),
                      total: this.state.dataSource.length,
                    }}
                    footer={() => {
                      // if (this.state.dataSource.length === 0) return <div style={{ height: 32 }}></div>
                      return (
                        <React.Fragment>
                          <DownloadButton params={this.state.params} />
                          <Pagination
                            total={this.state.dataSource.length}
                            showTotal={(total, range) => `${range[0]}-${range[1]} 共计 ${total} 条`}
                            // pageSize={this.state.pageSize}
                            onShowSizeChange={(page, pageSize) => {
                              this.setState({ pageSize })
                            }}
                            onChange={page => this.setState({ page })}
                            defaultPageSize={PAGE_SIZE}
                            showQuickJumper
                            showSizeChanger
                          />
                        </React.Fragment>
                      )
                    }}
                  />
                )
            }
          </div>
        </div>
      </Form>
    )
  }
}

export default Form.create({})(Query)