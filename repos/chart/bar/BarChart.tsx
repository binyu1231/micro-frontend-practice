import * as React from 'react'
import ReactEcharts, { ObjectMap } from 'echarts-for-react'
import { cloneDeep, merge } from 'lodash'
import { numberFormat } from '@legend/kit'
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
  series: []
}

export interface IBarChartProps {
  legend: string[],
  value: number[][],
  name: string[],
  color?: string[][],
  option?: ObjectMap,
  theme?: string,
}

export class BarChart extends React.Component<IBarChartProps> {

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
        type: 'bar',
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