import * as React from 'react'
import ReactEcharts, { ObjectMap } from 'echarts-for-react'
import { cloneDeep, merge } from 'lodash'
import { normalTooltipFormat } from '../utils/tooltip'
import { themeCategory10_1 } from '../color/themeCategory'

const defaultOption: any = {
  color: themeCategory10_1,
  tooltip: {
    trigger: 'item',
    formatter: normalTooltipFormat
  },
  legend: { 
    bottom: 0,
    textStyle: {
      textShadowBlur: 2,
      textShadowColor: 'rgba(0, 0, 0, 0.2)',
      textShadowOffsetY: 1
    }
  },
  xAxis: {
    type: 'category',
    data: [],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      type: 'line',
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

export interface ILineChartProps {
  legend: string[],
  value: number[][],
  name: string[],
  color?: string[][],
  option?: ObjectMap,
  theme?: string,
}

export class LineChart extends React.Component<ILineChartProps> {

  public render() {
    const { value, legend, color, option, ...otherProps } = this.props

    const opt = cloneDeep(defaultOption)
    merge(opt, option)
    
    if (color) {
      (opt as any).color = color
    }

    opt.series = value.map((val, i) => {

      return {
        name: legend[i],
        type: 'line',
        data: val
      }
    })
    return (
      <ReactEcharts
        style={{ height: '100%' }}
        option={opt} {...otherProps} />
    )
  }
}