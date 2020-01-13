import * as React from 'react'
import ReactEcharts, { ObjectMap } from 'echarts-for-react'
import { cloneDeep, merge } from 'lodash'
import { numberFormat } from '@legend/kit'

const defaultOption = {
  // color: NEED_SET,
  tooltip: {
    trigger: 'item',
    formatter: (params) => {
      const { name, value, percent, color } = params
      return `
        <div>
          <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${color};"></span>
          ${name}: ${numberFormat(value)} (${percent}%) 
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
      data: [],
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

const initState = {

}

type State = Readonly<typeof initState>

export class PieChart extends React.Component<{
  legend: string[] | string[][],
  value: number[] | number[][]
  color?: string[] | string[][],
  option?: ObjectMap,
  theme?: string,
}, State> {

  readonly state = initState

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
      <ReactEcharts
        style={{ height: '100%' }}
        option={opt} {...otherProps} />
    )
  }
}