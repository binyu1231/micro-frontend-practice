import { format } from 'd3-format'
// https://observablehq.com/@d3/d3-format

export enum NumberFormatEnum {
  thousands = ',',
}

export function numberFormat (
  num: number, 
  pattern: NumberFormatEnum | string = NumberFormatEnum.thousands
): string {
  return format(pattern)(num)
}
