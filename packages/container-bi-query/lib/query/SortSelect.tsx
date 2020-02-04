import React, { Component, Fragment } from 'react'
import { sortOptions } from './options'
import {
  Button,
  Modal,
  Row,
  Col,
  Icon,
  Tooltip,
  Select,
  message,
  Form,
  Tag
} from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const EMPTY = { ascending: 'true' }

function filterOptionWithName(inputValue, option) {
  return option.props.children.includes(inputValue)
}

export default class extends Component<any> {

  state = {
    modalVisiable: false,
    data: [] as any[],
    displayArr: [],
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value.length !== this.state.data.length) {
      let newData = nextProps.value.map(val => {
        return {
          ...val,
          ascending: val.ascending ? 'true' : String(val.ascending)
        }
      })
      this.setState({ data: newData, displayArr: this.formatDisplayArr(newData) })
    }
  }

  add = () => {
    if (this.state.data.length === this.props.options.length) return

    const data = this.state.data.slice()
    data.push({ ascending: 'true' })
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

  changeHandler = async (value, index, field) => {

    const data = this.state.data.slice()
    data[index][field] = value
    this.setState({ data })

    /// onchange 链接外部的 Form 组件
    this.emit()
  }

  emit = () => {

    const sorters = this.state.data.filter(s => s.orderBy)
    const formatSorters = sorters.map((sorter, i) => {
      return {
        orderBy: sorter.orderBy,
        orderIndex: i + 1,
        // 将排序的 number 转化为接口需要的 boolean
        ascending: JSON.parse(sorter.ascending)
      }
    })

    this.setState({ displayArr: this.formatDisplayArr(formatSorters) })

    if (this.props.onChange) {
      this.props.onChange(formatSorters)
    }
  }

  formatDisplayArr = (sorters) => {
    return sorters.map(s => {
      const opt = this.props.options.find(opt => opt.value === s.orderBy)
      return opt.name + ': ' + (Boolean(s.ascending) ? '正序' : '倒序')
    })
  }

  renderRow = (sorter, sorterIndex) => {

    return (
      <Row
        key={sorterIndex}
        style={{ marginBottom: 4 }}>
        <Col
          span={11}
          style={{ paddingRight: 4 }}>
          <Select
            showSearch
            filterOption={filterOptionWithName}
            style={{ display: 'block' }}
            onChange={(val) => this.changeHandler(val, sorterIndex, 'orderBy')}>
            {this.props.options.map((opt, i) => (
              <Option key={i} value={opt.value}>{opt.name}</Option>
            ))}
          </Select>
        </Col>
        <Col span={11} style={{ paddingRight: 4 }}>
          <Select
            onChange={(val) => this.changeHandler(val, sorterIndex, 'ascending')}
            value={sorter.ascending}
            style={{ display: 'block' }}>
            {sortOptions.map((opt, i) => (
              <Option key={String(i)} value={opt.value}>{opt.name}</Option>
            ))}
          </Select>
        </Col>
        <Col span={2}>
          <Tooltip title="删除" placement="right">
            <Icon
              style={{ marginTop: 8, marginLeft: 8, fontSize: 20, cursor: 'pointer' }}
              type='minus-circle-o'
              onClick={() => this.remove(sorterIndex)}
            />
          </Tooltip>
        </Col>
      </Row>
    )
  }


  render() {
    const hasSorter = this.state.displayArr.length > 0
    return (
      <Fragment>
        <Col 
          sm={24} 
          lg={{ span: 11, order: 0 }}
          xl={{ span: 15, order: 0 }}
          xxl={{ span: 17, order: 0 }} 
          >
          <FormItem label="排序" className="block-form-item">
            { this.state.displayArr.map((t, i) => (
              <Tag 
                key={String(i)}
                closable
                onClose={() => this.remove(i)}
                >{t}</Tag>
            )) }
            <Button
              icon={ hasSorter ? 'edit' : 'plus' }
              style={{ marginTop: 4 }}
              className="queryform-modal-button"
              onClick={() => {
                if (this.props.options.length === 0) {
                  return message.info('请至少选择一组维度和指标')
                }
                this.setState({ modalVisiable: true })
                return
              }}
            />
          </FormItem>
        </Col>
        <Modal
          title="排序条件"
          width={800}
          visible={this.state.modalVisiable}
          footer={null}
          onCancel={() => this.setState({ modalVisiable: false })}>

          <div style={{ marginBottom: 8, height: 22 }}>
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