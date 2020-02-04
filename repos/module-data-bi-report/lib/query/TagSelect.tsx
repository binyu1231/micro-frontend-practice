import React, { Component } from 'react'
import { Icon, Popover, Input, Checkbox, Divider } from 'antd'
// import './styles/tagSelect.less'
import { groupArrayBy } from './util'

const Search = Input.Search
// {
//   placeholder,
//   value,
//   onChange,
//   options,
//   ...otherProps
// }
export default class extends React.Component<any> {

  state = {
    options: [] as any[],
    filterGroups: [] as any[],
    selected: [] as any[]
  }

  componentWillReceiveProps(nextProps) {

    if (this.state.options.length === 0) {
      const { options } = nextProps
      const groups = groupArrayBy(options, 'displayGroup')
      this.setState({ options, filterGroups: groups.slice() })
    }

    if (nextProps.value && nextProps.value !== this.state.selected) {
      this.setState({ selected: nextProps.value })
    }
  }

  checkChangeHandler = (item) => {
    const selectedList = this.state.selected.slice()
    const idx = selectedList.indexOf(item)
    if (idx < 0) {
      selectedList.push(item)
    }
    else {
      selectedList.splice(idx, 1)
    }
    
    this.props.onChange && this.props.onChange(selectedList)
    // this.setState({ selected: selectedList })
  }

  searchFilterGroup = (keyWord) => {
    const remainOptions = this.state.options.filter(opt => {
      return opt.name.indexOf(keyWord) >= 0
    })

    this.setState({ filterGroups: groupArrayBy(remainOptions, 'displayGroup') })
  }

  render() {
    const {
      placeholder,
      value,
      onChange,
      options,
      ...otherProps
    } = this.props
    return (
      <div className="cm-tag-select" {...otherProps}>
        <h3 className="tag-select-head">
          <span>{placeholder}</span>
          <Popover
            trigger="click"
            placement="rightTop"
            content={
              <div style={{ width: 210 }}>
                <Search
                  placeholder="请输入关键词…"
                  onSearch={this.searchFilterGroup}
                  style={{ width: 210, marginBottom: 5 }}
                />
                <div style={{ width: 210, height: 320, overflowY: 'scroll' }}>
                  {this.state.filterGroups.map((group, i) => (
                    <div key={i}>
                      <Divider orientation="left">{group.name}</Divider>
                      {group.children.map((child, j) => (
                        <div key={`${i}-${j}`}>
                          <Checkbox
                            checked={this.state.selected.includes(child)}
                            onChange={() => this.checkChangeHandler(child)}>{child.name}</Checkbox>
                        </div>  
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            }>
            {/* <Button type={'link' as any}> */}
              <Icon type="plus" className="plus-icon" />
            {/* </Button> */}


          </Popover>
        </h3>
        <div className="tag-container">
          {this.state.selected.map((item, i) => (
              <div key={i} className="tag">
                { item.name }
                <Icon type="minus" onClick={() => this.checkChangeHandler(item)} />
              </div>
          ))}
        </div>
      </div>
    )
  }
}