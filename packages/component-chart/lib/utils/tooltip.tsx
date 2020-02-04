import { numberFormat } from '@micro/kit'

export function normalTooltipFormat(params: any) {
  const { name, value, percent, color } = params
  return `
    <div>
      <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${color};"></span>
      ${name}: ${numberFormat(value)} (${percent}%) 
    </div>
  `
}