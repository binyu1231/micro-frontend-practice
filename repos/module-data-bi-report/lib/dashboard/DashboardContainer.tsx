import React, { SFC, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'

import { Dashboard, IDaysData, defDaysData } from './Dashboard'
import { useStore } from '../store'
import { QueryParameter } from '../report/QueryParameter'
import { FieldName } from '../config/types'
import { lastDayMoment, MomentFormatEnum, last7DayMoment } from '@legend/kit'
import { PlainOption } from '@legend/framework'

export interface IDashboardContainerProps extends RouteComponentProps {}

const names = [
  '近30日Device累计数量',
  '近30日Cookie累计数量',
  '近30日OTT累计数量',
  '近30日有跨屏关系Device累计数量',
  '近30日有跨屏关系OTT累计数量'
]

const lastDayStr = lastDayMoment.format(MomentFormatEnum.YYYY_MM_DD)
const last7DayStr = last7DayMoment.format(MomentFormatEnum.YYYY_MM_DD)


function formatLast7DayPvUvParam (field: FieldName) {
  const p = new QueryParameter()
  p.since = last7DayStr
  p.until = lastDayStr
  p.queryFields = [field, FieldName.ask, FieldName.uv]

  return p
}

export const DashboardContainer: SFC<IDashboardContainerProps> = () => {

  const { store: { api } } = useStore()
  const [tops, setTops] = useState<PlainOption<number>[]>([])
  const [daysData, setDaysData] = useState<IDaysData>(defDaysData)

  useEffect(function fetchTopData () {
    const topParameter = formatLast7DayPvUvParam(FieldName.week)
    /// override date
    topParameter.since = topParameter.until = lastDayStr

    api.query(topParameter).then(res => {
      setTops(res.data.data.map((d, i) => {
        return { name: names[i], value: d.uv }
      }))
    })
  }, [])

  useEffect(function () {

   const fields: FieldName[] = Object.keys(defDaysData) as any

    const daysPvUvPromises = fields.map(f => 
      api.query(formatLast7DayPvUvParam(f)))

    Promise.all(daysPvUvPromises)
    .then(res => {
      
      const data: IDaysData = {} as any

      res.forEach((r, i) => {
        const d = r.data.data
        const field = fields[i]

        data[field] = {
          names: d.map(d => d[field]),
          pv: d.map(d => d[FieldName.ask]),
          uv: d.map(d => d[FieldName.uv])
        }
        
      })
      
      setDaysData(data)
    })

  }, [])

  return (
    <Dashboard 
      tops={tops} 
      daysData={daysData}
    />
  )
}