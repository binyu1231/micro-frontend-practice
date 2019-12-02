import React, { FC, useRef, useEffect, useCallback } from 'react'
import { cloneDeep, merge } from 'lodash'
import echarts from 'echarts'
import { NEED_SET } from '../utils'
import { IChartProp } from '../utils/types'
import { themeCategory10_1 } from '../color/themeCategory'

const defaultOption = {
  // color: themeCategory10_1,
  tooltip: {
    trigger: 'item',
    formatter: (params) => {
      const { name, value, percent, color } = params
      return `
        <div>
          <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${color};"></span>
          ${name}: ${value} (${percent}%) 
        </div>
      `
    }
  },
  legend: { 
    bottom: 0,
    textStyle: {
      textShadowBlur: 2,
      textShadowColor: 'rgba(0, 0, 0, 0.2)',
      textShadowOffsetY: 1
    }
  },
  series: [
    {
      type: 'pie',
      radius: ['45%', '65%'],
      center: ['50%', '43%'],
      data: NEED_SET,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.4)'
        },

        normal: {
          shadowBlur: 6,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.2)'
        }
      },
      label: {
        textShadowBlur: 1,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffsetY: 1
      } as any
    }
  ]
}

export interface PieChartProp extends IChartProp {}
export const PieChart: FC<Partial<PieChartProp>> = ({
  legend,
  value,
  color,
  option,
  theme,
  ...otherProps
}) => {

  const ref = useRef(null)
  const instance = useRef(null)

  useEffect(() => {
    const opt: any = cloneDeep(defaultOption)
    const values: any[] = value
    merge(opt, option)
    opt.series[0].data = values.map((val, i) => ({ value: val, name: legend[i] }))

    instance.current = echarts.init(ref.current)
    render() 
    
    
  }, [ref])


  useEffect(() => {
    render()
  }, [value, legend, color, option])



  const render = useCallback(() => {
    if (instance.current === null) return
    const opt: any = cloneDeep(defaultOption)
    const values: any[] = value
    merge(opt, option)
    opt.series[0].data = values.map((val, i) => ({ value: val, name: legend[i] }))
    opt.color = color || themeCategory10_1
    instance.current.setOption(opt)

  }, [value, legend, color, option])


  return (
    <div {...otherProps} ref={ref} style={{ width: 200, height: 200 }}></div>
  )
}

