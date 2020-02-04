/**
 * AD统计报表
*/
import React, { FC, useState, useEffect } from 'react'
import { FieldName } from '../config/types'
import { DEFAULT_VALUE, boolSelectOptions } from './util'
import { PlainOption } from '@legend/framework'
import { CustomReport } from './CustomReport'
import { last7DaysMoment } from '@legend/kit'
import { IReportProps } from './types'



export const ReportAd: FC<IReportProps> = ({
  biApi
}) => {

    const [creativeOptions, setCreativeOptions] = useState<PlainOption[]>([])
    const [terminalOptions, setTerminalOptions] = useState<PlainOption[]>([])

    useEffect(() => {
      biApi.creativeOptionsFetcher().then(setCreativeOptions)
      biApi.terminalOptionsFetcher().then(setTerminalOptions)
    }, [])

    return (
      <CustomReport
        biApi={biApi}
        range={last7DaysMoment}
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
          ['流量终端', FieldName.requestTerminal, 'select', terminalOptions, { initialValue: DEFAULT_VALUE }],
          ['展现形式', FieldName.displayForm, 'select', creativeOptions, { initialValue: DEFAULT_VALUE }],
          ['是否原生', FieldName.relevantType, 'select', boolSelectOptions, { initialValue: DEFAULT_VALUE }],
          ['代理商ID', 'agent_id'],
          ['广告主ID', 'customer_id'],
          ['计划ID', 'campaign_id'],
          ['订单ID', 'order_id'],
        ]}
      />
    )
  }