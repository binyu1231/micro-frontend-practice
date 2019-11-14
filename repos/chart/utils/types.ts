export interface IChartProp {
  legend: string[] | string[][],
  value: number[] | number[][]
  color: string[] | string[][],
  option: any,
  theme: string,
  [key: string]: any
}