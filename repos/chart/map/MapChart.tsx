import * as React from 'react'
import ReactEcharts, { ObjectMap } from 'echarts-for-react'
// import { echartNameMap } from 'src/common/echartNameMap'
import { cloneDeep, merge } from 'lodash'
import { normalTooltipFormat } from '../utils/tooltip'
import { themeCategory10_1 } from '../color/themeCategory'
import Asker from '@coloration/asker'




const chinaGeoJson = import('echarts/map/js/china')
.then(res => {
  console.log('chinaGeoJson', chinaGeoJson)
  return res.data
})

    


const defaultOption = {
  color: themeCategory10_1,
  tooltip: {
    trigger: 'item',
    formatter: normalTooltipFormat
  },
  // visualMap: {
  //   top: '0',
  //   min: 0,
  //   calculable: true,
  //   text: [get(locale.HIGH), get(locale.LOW)],
  //   inRange: {
  //     color: ['#95daf9', '#0076ec'],
  //   },
  //   controller: {
  //     outOfRange: {
  //       color: ['#ccc']
  //     }
  //   },
  //   formatter: (item) => `${toThousands(parseInt(item))}`
  // },
  series: [{
    type: 'map',
    name: 'uv',
    mapType: 'china',
    itemStyle: {
      normal: {
        shadowBlur: 6,
        shadowColor: 'rgba(0,0,0, 0.3)',
      },
      emphasis: {
        shadowBlur: 10,
        shadowColor: 'rgba(0,0,0, 0.4)',
        areaColor: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.9,
          colorStops: [{
            offset: 0, color: '#FFEA2B' // 0% 处的颜色
          }, {
            offset: 1, color: '#E7D327' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }
      }

    },

    // nameMap: echartNameMap,
    label: {
      normal: {
        show: false,
        formatter: (param) => {
          return `${param.name}`
        }
      },
      emphasis: {
        show: true,
        color: '#555',
        textShadowColor: 'rgba(255, 255, 255, 0.8)',
        textShadowBlur: 2,
      }
    },
    data: []
  }]
}

export interface IMapChartProps {
  legend?: string[],
  label: string[],
  value: number[]
  color?: string[] | string[][],
  option?: ObjectMap,
  theme?: string,
}

export class MapChart extends React.Component<IMapChartProps> {


  public render = () => {
    const { value, legend, label, color, option, ...otherProps } = this.props
    
    

    const opt = cloneDeep(defaultOption)
    merge(opt, option)

    const values: any[] = value

    if (color) {
      (opt as any).color = color
    }

    opt.series[0].data = values.map((val, i) => ({ value: val, name: label[i] }))

    return (
      <ReactEcharts
        {...otherProps}
        option={opt}
        style={{ height: '100%' }}
      />
    )
  }
}