import React, { FC, useRef, useEffect, useLayoutEffect } from "react"
import { LineChart, BarChart, MapChart } from '@component/chart'
import { Row, Col } from "antd"
import { EmptyLayout, Footer, PanelCard } from "@component/ui"
import { NumberCard } from "../components/NumberCard"
import { PlainOption, PlainObject } from "@micro/framework"
import { FieldName } from "../config/types"

export interface IFieldData {
  names: string[],
  pv: number[],
  uv: number[],
}

export const defFieldData: IFieldData = {
  names: [],
  pv: [],
  uv: [],
}

export interface IDaysData {
  [FieldName.actionDay]: IFieldData,
  [FieldName.hourOfWeek]: IFieldData,
  [FieldName.deviceTypeWeek]: IFieldData,
  [FieldName.provinceWeek]: IFieldData,
  [FieldName.adFormatWeek]: IFieldData,
}

export const defDaysData: IDaysData = {
  [FieldName.actionDay]: defFieldData,
  [FieldName.hourOfWeek]: defFieldData,
  [FieldName.deviceTypeWeek]: defFieldData,
  [FieldName.provinceWeek]: defFieldData,
  [FieldName.adFormatWeek]: defFieldData
}

interface IDashboardProps { 
  tops: PlainOption<number>[],
  daysData: IDaysData,
}

const styles = {
  chartPanel: {
    height: 425
  }
}

const legends = ['PV', 'UV']

export const Dashboard: FC<IDashboardProps> = ({
  tops, daysData
}) => {

  const actionDay = daysData[FieldName.actionDay]
  const hourOfWeek = daysData[FieldName.hourOfWeek]
  const deviceTypeWeek = daysData[FieldName.deviceTypeWeek]
  const provinceWeek = daysData[FieldName.provinceWeek]
  const adFormatWeek = daysData[FieldName.adFormatWeek]
  
  return (
    <EmptyLayout className="pt-3 px-2">
      <Row gutter={10}>
        { tops.map(({ name, value }) => <NumberCard key={name} name={name} value={value} />)}
      </Row>
      <Row gutter={10}>
        <Col sm={24} md={12} className="mb-3">
          <PanelCard title="近7日每日PV UV" style={styles.chartPanel} expand>
            <LineChart
              legend={legends}
              value={[actionDay.pv, actionDay.uv]}
              name={actionDay.names}
            />
          </PanelCard>
        </Col>
        <Col sm={24} md={12} className="mb-3">
          <PanelCard title="近7日每小时平均PV UV" style={styles.chartPanel} expand>
            <LineChart
              legend={legends}
              value={[hourOfWeek.pv, hourOfWeek.uv]}
              name={hourOfWeek.names}
            />
          </PanelCard>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col sm={24} md={24} lg={8} className="flex-1 mb-3">
          <PanelCard title="近7日平台平均PV UV" style={styles.chartPanel} expand>
            <BarChart
              legend={legends}
              value={[deviceTypeWeek.pv, deviceTypeWeek.uv]}
              name={deviceTypeWeek.names}
            />
          </PanelCard>
        </Col>
        <Col sm={24} md={24} lg={8} className="flex-1 mb-3">
          <PanelCard title="近7日地域平均PV UV" style={styles.chartPanel} expand>
            <MapChart
              label={legends}
              value={[100, 200]}
            />
          </PanelCard>
        </Col>
        <Col sm={24} md={24} lg={8} className="flex-1 mb-3">
          <PanelCard title="近7日广告形式平均PV UV" style={styles.chartPanel} expand>
            <BarChart
              legend={legends}
              value={[adFormatWeek.pv, adFormatWeek.uv]}
              name={adFormatWeek.names}
            />
          </PanelCard>
        </Col>
      </Row>
      <Footer />
    </EmptyLayout>
  )
}