import { format } from 'd3-format'
// https://observablehq.com/@d3/d3-format

export enum NumberFormatEnum {
  thousands = ',',
  thousands2fFloat = ',.2f',
  percent = '.0%',
  percent2fFloat = '.2%'
}

export function numberFormat (
  num: any, 
  pattern: NumberFormatEnum | string = NumberFormatEnum.thousands
): string {
  return format(pattern)(Number(num))
}
