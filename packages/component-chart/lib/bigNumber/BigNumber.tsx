import React from 'react'
import { toArray, numberFormat } from '@micro/kit'
import { themeCategory10_1 } from '../color/themeCategory'

export interface IBigNumberChartProps {
  legend: string[] | string,
  value: number[] | number,
  color?: string [] | string,
  prefix?: string
  suffix?: string
}

export const BigNumber: React.SFC<IBigNumberChartProps> = ({
  legend,
  value,
  color,
  prefix,
  suffix,
  ...otherProps
}) => {

  legend = toArray(legend)
  value = toArray(value)
  color = toArray(color || themeCategory10_1)
  prefix = prefix || ''
  suffix = prefix || ''

  return (
    <div {...otherProps}>
      <h3 style={{ color: 'rgba(0,0,0,.45)', fontSize: 14 }}>{legend[0]}</h3>
      <span style={{ fontSize: 26, color: color[0] }}>
        {prefix + numberFormat(value[0]) + suffix}
      </span>
    </div>
  )
}