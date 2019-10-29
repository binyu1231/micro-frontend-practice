

import { graphic } from 'echarts'
import { map, sample, random, repeat, chunk, fill, isString, isArray } from 'lodash'

/** generate a hex color for test */
export const randomColor = () => {
  const colorBase = '0123456789abcdef'
  return '#' + map(new Array(6), () => sample(colorBase)).join('')
}

/** generate a rgb color for test */
export const randomRgbColor = (opacity = 1) => 
  `rgba(${random(255)},${random(255)},${random(255)},${opacity})`


export function randomInt (until: number, start = 0) {
  return Math.floor(randomFloat.apply(null, arguments))
}
  
export function randomFloat (until: number, start = 0) {
  return Math.random() * until + start
}

export const NEED_SET = null as any


// transform color for echarts use
export const calcColor = (color: string | string[], direction = 3) => {
  // return string color
  if (!Array.isArray(color)) return color
  // return only one color in color array
  if (color.length === 1) return color[0]
  
  // gradient color
  const gradientDirArr: number[] = fill(Array(4), 0)
  gradientDirArr[direction] = 1

  // two color space 
  const divideRatio =  1 / (color.length - 1)

  const gradientColor = new graphic.LinearGradient(
    ...gradientDirArr,
    color.map((c, i) => ({
      offset: i * divideRatio, 
      color: c
    })) as any
  )

  return gradientColor
}

export let bgColor = '#000619'

export const parse16Color = (color, opacity = 1) => {
  const pattern = color.match(/[a-f0-9]+$/)[0]
  const pLength = pattern.length
  let formatResult = pattern
  if (pLength === 1 || pLength === 2) 
    formatResult = repeat(pattern, 6 / pLength)
  else if (pLength === 3) 
    formatResult = map(pattern, alpha => alpha + alpha).join('')
  
  const rgbValue = chunk(formatResult, 2).map(a => parseInt('0x' + a.join('')))
  const rgbaString = `rgba(${rgbValue.join(',')},${opacity})`

  return rgbaString
}

const provinceShortReg = /(北京|天津|上海|重庆|河北|山西|内蒙古|辽宁|吉林|黑龙江|江苏|浙江|安徽|福建|江西|山东|河南|湖北|湖南|广东|广西|海南|四川|贵州|云南|西藏|陕西|甘肃|青海|宁夏|新疆)/g

const matchProvince = name => {
  const res = name.match(provinceShortReg)
  return res ? res[0] : name
}

export const filterProvinceName = name => {
  if (isString(name)) return matchProvince(name)
  if (isArray(name)) return map(name, matchProvince)
  return name
}

export const calcValueDivide = (values, divide = 4) => {

  const maxValue = Math.max.apply(null, values) * 1.05

  // 取中间值，根据中间值判断[分割数字]后几位是零
  let baseNumber = Math.pow(10, `${Math.floor(maxValue / 2)}`.length - 2)          // 千位以后都是0
  // 700000 - 10000 最少后四位是零
  // 3000 - 100 最少后两位是零
  baseNumber = baseNumber < 10 ? 10 : baseNumber
  // baseNumber 不能小于10
  
  const coef = baseNumber * divide
  const maxVal = Math.ceil(maxValue / coef) * coef

  return {
    max: maxVal,
    interval: maxVal / divide
  }


}