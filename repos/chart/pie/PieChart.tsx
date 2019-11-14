import React, { FC, useRef, useEffect } from 'react'
import { cloneDeep, merge } from 'lodash'
import echarts from 'echarts'
import { NEED_SET } from '../utils'
import { IChartProp } from '../utils/types'

const defaultOption = {
  // color: NEED_SET,
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

  useEffect(() => {
    const opt: any = cloneDeep(defaultOption)
    const values: any[] = value
    merge(opt, option)
    opt.series[0].data = values.map((val, i) => ({ value: val, name: legend[i] }))

    const instance = echarts.init(ref.current)
    instance.setOption(opt)
    
  }, [ref])


  return (
    <div {...otherProps} ref={ref} style={{ width: 200, height: 200 }}>111</div>
  )
}


export default class extends React.Component<{
  legend: string[] | string[][],
  value: number[] | number[][]
  color: string[] | string[][],
  option: any,
  theme: string,
}> {


  public render() {
    const { value, legend, color, option, ...otherProps } = this.props

    const opt = cloneDeep(defaultOption)
    merge(opt, option)

    const values: any[] = value
    
    if (color) {
      (opt as any).color = color
    }

    opt.series[0].data = values.map((val, i) => ({ value: val, name: legend[i] }))
    return (
      111
    )
  }
}