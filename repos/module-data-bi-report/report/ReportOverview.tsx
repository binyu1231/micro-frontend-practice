import React, { FC, useState, useEffect } from 'react'
import { BiApi } from '../config'
import { FieldName } from '../config/types'
import { DEFAULT_VALUE } from './util'
import { CommonOption } from '@legend/framework'
import { CustomReport } from './CustomReport'
import { last7DaysMoment } from '@legend/kit'

export const ReportOverivew: FC<{
  biApi: BiApi
}> = ({
  biApi
}) => {

    const [creativeOptions, setCreativeOptions] = useState<CommonOption[]>([])
    const [platformOptions, setPlatformOptions] = useState<CommonOption[]>([])

    useEffect(() => {
      biApi.creativeOptionsFetcher().then(setCreativeOptions)
      biApi.platformOptionsFetcher().then(setPlatformOptions)
    }, [])
    return (
      <CustomReport
        biApi={biApi}
        range={last7DaysMoment}
        sort={{ field: FieldName.actionDay, ascending: false }}
        defaultDimension={FieldName.actionDay}
        columns={[
          '询价量',
          '竞价量',
          '竞价率',
          '竞价成功量',
          '竞价成功率',
          '曝光量',
          '点击量',
          '点击率',
          '广告主总花费',
          '代理商总花费',
          '实际总花费',
          'eCPM(实际花费)',
        ]}

        formConfigure={[
          ['流量终端', FieldName.requestTerminal, 'select', platformOptions, { initialValue: DEFAULT_VALUE }],
          ['展现形式', FieldName.displayForm, 'select', creativeOptions, { initialValue: DEFAULT_VALUE }],
        ]}
      />
    )
  }