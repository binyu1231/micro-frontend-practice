import React, { SFC, useEffect, useState } from 'react'
import { Icon, Popover, Input, Checkbox, Divider, Button } from 'antd'
import './style.css'
import { TooltipPlacement } from 'antd/lib/tooltip'
import { groupArrayBy, GroupArrayItem } from './util'

const GroupTagSearchableSelect: SFC<{
  title: string,
  value: any[],
  options: { name: string, value: any }[],
  onChange: (values: any[]) => void,
  placement?: TooltipPlacement,
  groupBy?: string
}> = ({
  title, value, options, onChange, placement, groupBy
}) => {

  const [filterGroups, setFilterGroup] = useState([] as GroupArrayItem[])
  const [keyword, setKeyword] = useState('')

  useEffect(function initialize() {

    const filterOptions = options.filter(function (opt) {
      return opt.name.indexOf(keyword) > -1
    })

    const groups = groupArrayBy(filterOptions, groupBy)

    setFilterGroup(groups)
  }, [options, groupBy, keyword])

  function checkChangeHandler (item) {
    const selectedList = value.slice()
    const idx = selectedList.indexOf(item)
    if (idx < 0) {
      selectedList.push(item)
    }
    else {
      selectedList.splice(idx, 1)
    }
    
    onChange && onChange(selectedList)
  }

  return (
    <div className="ui-base_tag-searchable-select">
      <h3 className="tag-select-head">
        <span>{title}</span>
        <Popover
          trigger="click"
          placement={placement || 'rightTop'}
          content={
            <div style={{ width: 210 }}>
              <Input.Search
                placeholder="请输入关键词…"
                onSearch={setKeyword}
                style={{ width: 210, marginBottom: 5 }}
              />
              <div style={{ width: 210, height: 320, overflowY: 'scroll' }}>
                {filterGroups.map((group, i) => (
                  <div key={i}>
                    {groupBy && (
                      <Divider orientation="left">{group.name}</Divider>
                    )}
                    {group.children.map((child, j) => (
                      <div key={`${i}-${j}`}> 
                        <Checkbox
                          checked={value.includes(child)}
                          onChange={() => checkChangeHandler(child)}>
                          {child.name}
                        </Checkbox>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          }>
          <Button type="link">
            <Icon type="plus" className="plus-icon" />
          </Button>
        </Popover>
      </h3>
      <div className="tag-container">
        {value.map((item, i) => (
          <div key={i} className="tag">
            {item.name}
            <Icon type="minus" onClick={() => checkChangeHandler(item)} />
          </div>
        ))}
      </div>

    </div>
  )
}

export default GroupTagSearchableSelect



