import echarts from 'echarts'

export interface IPieChartProps {
  legend: string[]
  value: number[]
  color?: any[] 
}

export function Pie (container: HTMLDivElement, props: IPieChartProps) {

  let { value, color, legend } = props
  const instance = echarts.init(container)

  const options: any = {
    // color,
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
        data: value,
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
  
  return function (newProps?: IPieChartProps) {

    Object.assign(props, newProps)

    const { value, legend, color } = props

    options.series[0].data = value.map((val, i) => ({ value: val, name: legend[i] }))

    instance.setOption(options)
  }
}