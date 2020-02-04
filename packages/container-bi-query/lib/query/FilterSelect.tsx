import React, { Component, Fragment } from 'react'
import { compareOptions, optionFetcher } from './options'
import {
  Button,
  Modal,
  Row,
  Col,
  Icon,
  Tooltip,
  Select,
  Input,
  Tag,
  Form
} from 'antd'

const Option = Select.Option
const FormItem = Form.Item
const EMPTY = {}
const categoryMap = {
  'dimension': 1,
  'metric': 2
}

const COMPOSE_TYPE = {
  'AND': 1,
  'OR': 2
}

function filterOptionWithName(inputValue, option) {
  // console.log(inputValue, option)
  return option.props.children.includes(inputValue)
}

export default class extends Component<any> {

  state = {
    modalVisiable: false,
    composeType: COMPOSE_TYPE.AND,
    data: [] as any[],
    subOptionsMap: {} as any,
    displayArr: [],
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value.length !== this.state.data.length) {
      console.log(nextProps.value, this.state.data)
      let newData = nextProps.value.map(val => {
        return {
          ...val,
          // ascending: val.ascending ? 'true' : String(val.ascending)
        }
      })

      this.setState({ data: newData, displayArr: this.formatDisplayArr(newData) })
    }
  }
  formatDisplayArr = (filters) => {

    return filters.map(s => {
      const subOptions = this.state.subOptionsMap[s.filterName]
      const hasTransValue = subOptions && subOptions.length > 0
      const opt = this.props.options.find(opt => opt.value === s.filterName)
      const operator: any = compareOptions.find(opt => opt.value === s.operator)
      const value = hasTransValue ?
        s.filterValues.map(value => subOptions.find((opt) => opt.value === value).name)
        : s.filterValues
      return `${opt.name} ${operator.name} ${value.join(', ')}`
    })
  }

  add = () => {
    const data = this.state.data.slice()
    data.push({})
    this.setState({ data })
  }

  remove = (index) => {
    let data = this.state.data
    if (typeof index === 'number' && index < data.length) {
      data.splice(index, 1)
    }
    else {
      data = []
    }

    this.emit()
    this.setState({ data })
  }

  fetchOptions = async (name) => {
    const subOptionsMap = Object.assign({}, this.state.subOptionsMap)
    const opts = await optionFetcher(name)
    subOptionsMap[name] = opts

    this.setState({ subOptionsMap })
  }

  changeHandler = async (value, index, field) => {
    const filters = this.state.data.slice()
    filters[index][field] = value
    this.setState({ filters })

    if (field === 'filterName') {
      this.fetchOptions(value)
      delete filters[index].operator
      delete filters[index].filterValues

      /// 需要区分维度 指标
      const category = this.props.options
        .find(opt => opt.value === value).logicCategory


      filters[index].filterCategory = categoryMap[category]
      // console.log(value, category, categoryMap, filters)
    }

    this.setState({ data: filters })

    this.emit()
  }

  inputValueChangeHandler = (val, filterIndex) => {
    const value = val.target.value + ''
    // this.onChange(val, filterIndex, 'filterValues')

    this.changeHandler(value.split(','), filterIndex, 'filterValues')
  }

  composeTypeChangeHandler = (e) => {
    this.setState({ composeType: e.target.value })
    this.emit()
  }

  emit = () => {

    // 将数据格式化为接口需要的形式
    const formatFilters = this.state.data
      .filter(f => typeof f.operator === 'number')
      .filter(f => Array.isArray(f.filterValues) || typeof f.filterValues === 'string')
      .map(f => {
        const operator = Number(f.operator)
        const filterValues =
          f.filterValues === undefined ? []
            : Array.isArray(f.filterValues) ?
              f.filterValues :
              f.filterValues.split(',')

        return {
          type: 'filterItem',
          filterCategory: f.filterCategory,
          filterName: f.filterName,
          operator: isNaN(operator) ? undefined : operator,
          filterValues
        }
      })


    if (this.props.onChange && formatFilters.length === this.state.data.length) {
      this.setState({ displayArr: this.formatDisplayArr(formatFilters) })
      this.props.onChange(formatFilters, this.state.composeType)
    }
  }



  renderRow = (filter, filterIndex) => {
    const isMultiple = filter.operator === 5 || filter.operator === 6

    return (
      <Row
        key={filterIndex}
        style={{ marginBottom: 4 }}>
        <Col
          span={6}
          style={{ paddingRight: 4 }}>
          <Select
            showSearch
            filterOption={filterOptionWithName}
            style={{ display: 'block' }}
            onChange={(val) => this.changeHandler(val, filterIndex, 'filterName')}>
            {this.props.options.map((opt, i) => (
              <Option key={i} value={opt.value}>{opt.name}</Option>
            ))}
          </Select>
        </Col>
        <Col span={4} style={{ paddingRight: 4 }}>
          <Select
            showSearch
            filterOption={filterOptionWithName}
            onChange={(val) => this.changeHandler(val, filterIndex, 'operator')}
            style={{ display: 'block' }}>
            {compareOptions.map((opt, i) => (
              <Option key={String(i)} value={opt.value}>{opt.name}</Option>
            ))}
          </Select>
        </Col>
        <Col span={12} style={{ paddingRight: 4 }}>
          {
            this.state.subOptionsMap[filter.filterName] &&
              this.state.subOptionsMap[filter.filterName].length > 0 ? (
                <Select
                  showSearch
                  filterOption={filterOptionWithName}
                  disabled={filter.disabled}
                  style={{ display: 'block' }}
                  mode={isMultiple ? 'multiple' : undefined}
                  value={filter.filterValues}
                  onChange={(val) => this.changeHandler(val, filterIndex, 'filterValues')}
                >
                  {this.state.subOptionsMap[filter.filterName].map((item, i) => (
                    <Option key={i} value={item.value}>{item.name}</Option>
                  ))}
                </Select>
              ) : (
                <Input
                  placeholder={isMultiple ? '多个值用逗号分隔' : ''}
                  style={{ display: 'block', margin: 0 }}
                  onChange={(val) => {
                    this.inputValueChangeHandler(val, filterIndex)
                  }}
                  value={Array.isArray(filter.filterValues) ? filter.filterValues.join(',') : ''}
                />
              )

          }
        </Col>
        <Col span={2}>
          <Tooltip title="删除" placement="right">
            <Icon
              style={{ marginTop: 8, marginLeft: 8, fontSize: 20, cursor: 'pointer' }}
              type='minus-circle-o'
              onClick={() => this.remove(filterIndex)}
            />
          </Tooltip>
        </Col>
      </Row>
    )
  }


  render() {
    const hasFilter = this.state.displayArr.length > 0

    return (
      <Fragment>
        <Col
          sm={24}
        >
          <FormItem label="筛选" className="block-form-item">
            {this.state.displayArr.map((t, i) => (
              <Tag
                key={String(i)}
                closable
                onClose={() => this.remove(i)}
              >{t}</Tag>
            ))}
            <Button
              icon={hasFilter ? 'edit' : 'plus'}
              style={{ marginTop: 4 }}
              className="queryform-modal-button"
              onClick={() => this.setState({ modalVisiable: true })}
            />

            {/* <Button onClick={() => this.setState({ modalVisiable: true })}>+</Button>
        <Badge
          count={this.state.rightNumber}
          style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
        /> */}
          </FormItem>
        </Col>
        <Modal
          title="筛选条件"
          width={800}
          visible={this.state.modalVisiable}
          footer={null}
          onCancel={() => this.setState({ modalVisiable: false })}>

          <div style={{ marginBottom: 8, height: 22 }}>
            {/* <label style={{ marginRight: 5 }}>
              条件关系:
            </label>
            <Radio.Group
              onChange={this.composeTypeChangeHandler}
              value={this.state.composeType}>
              <Radio value={COMPOSE_TYPE.AND}>交</Radio>
              <Radio value={COMPOSE_TYPE.OR}>并</Radio>
            </Radio.Group> */}
            <Tooltip title="添加" placement="right">
              <Icon
                style={{ float: 'right', marginRight: 35, fontSize: 20, cursor: 'pointer' }}
                type='plus-circle-o'
                onClick={this.add} />
            </Tooltip>
          </div>

          {this.state.data.map(this.renderRow)}


        </Modal>
      </Fragment>
    )
  }
}