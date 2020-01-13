import echarts from 'echarts'

export interface ILineChartProps {
  legend: string[],
  value: number[][],
  name: string[]
  color?: string[]
}

export function Line (container: HTMLDivElement, props: ILineChartProps) {

  let { legend, value } = props

  const instance = echarts.init(container)

  const option: any = {
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

  return function (newProps?: ILineChartProps) {
    Object.assign(props, newProps)
    
    let { legend, value, name, color } = props



    // options.color = color
    
    option.series = value.map((val, i) => {

      return {
        name: legend[i],
        type: 'line',
        data: val
      }
    })

    option.xAxis.data = name

    console.log('ddd', option)
    instance.setOption(option)

  }
}