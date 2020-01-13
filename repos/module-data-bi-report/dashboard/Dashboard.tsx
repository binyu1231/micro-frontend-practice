import React, { FC, useRef, useEffect, useLayoutEffect } from "react"
import { BigNumber, PieChart, Pie, LineChart, BarChart, MapChart } from '@legend/chart'
import { Card, Row, Col } from "antd"
import { EmptyLayout, Footer, PanelCard } from "@legend/ui"
import { CardProps } from "antd/lib/card"

interface IDashboardProps { }

const mb = 'mb-3'
const styles = {
  chartPanel: {
    height: 425
  }
}


const NormalCard: FC<CardProps> = (props) => <Card {...props} className={'flex-1 mx-1 ' + props.className} bodyStyle={{ height: '100%' }} bordered={false} />
const NumberCard: FC<{ legend: string, value: number }> = ({ legend, value }) => {
  return <Col sm={24} md={12} lg={6} className={mb}>
    <Card bordered={false}>
      <BigNumber legend={legend} value={value} />
    </Card>
  </Col>
}

export const Dashboard: FC<IDashboardProps> = () => {

  const pie = useRef(null)
  const line = useRef(null)

  // useLayoutEffect(() => {
  //   if (!line.current) return
  //   const render = Line(
  //     line.current,
  //     {
  //       legend: ['pv', 'uv'],
  //       value: [[100, 200, 400, 250, 400, 700], [40, 170, 800, 40, 250, 500]],
  //       name: ['12-01', '12-02', '12-03', '12-04', '12-05', '12-06']
  //     },
  //   )

  //   render()
  // }, [line.current])

  useLayoutEffect(() => {
    if (!pie.current) return

    setImmediate(() => {
      const render = Pie(pie.current, { legend: ['1', '2'], value: [3, 4] })
      render()
    })
  }, [pie.current])

  return (
    <EmptyLayout className="pt-3 px-2">
      <Row gutter={10}>
        <NumberCard legend="近30日Device累计数量" value={4622991850} />
        <NumberCard legend="近30日Cookie累计数量" value={4622991850} />
        <NumberCard legend="近30日OTT累计数量" value={4622991850} />
        <NumberCard legend="近30日有跨屏关系Device累计数量" value={4622991850} />
      </Row>
      <Row gutter={10}>
        <Col sm={24} md={12} className="mb-3">
          <PanelCard title="近7天按天PV UV趋势" style={styles.chartPanel} expand>
            <LineChart
              legend={['PV', 'UV']}
              value={[[100, 200, 400, 250, 400, 700], [40, 170, 800, 40, 250, 500]]}
              name={['12-01', '12-02', '12-03', '12-04', '12-05', '12-06']}
            />
          </PanelCard>
        </Col>
        <Col sm={24} md={12} className="mb-3">
          <PanelCard title="近30日Device累计数量" style={styles.chartPanel} expand>
            <LineChart
              legend={['PV', 'UV']}
              value={[[100, 200, 400, 250, 400, 700], [40, 170, 800, 40, 250, 500]]}
              name={['12-01', '12-02', '12-03', '12-04', '12-05', '12-06']}
            />
          </PanelCard>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col sm={24} md={24} lg={8} className="flex-1 mb-3">
          <PanelCard title="近30日Device累计数量" style={styles.chartPanel} expand>
            <BarChart
              legend={['PV', 'UV']}
              value={[[100, 200, 400, 250, 400, 700], [40, 170, 800, 40, 250, 500]]}
              name={['12-01', '12-02', '12-03', '12-04', '12-05', '12-06']}
            />
          </PanelCard>
        </Col>
        <Col sm={24} md={24} lg={8} className="flex-1 mb-3">
          <PanelCard title="近30日Device累计数量" style={styles.chartPanel} expand>
            <MapChart
              label={['北京', '辽宁']}
              value={[100, 200]}
            />
          </PanelCard>
        </Col>
        <Col sm={24} md={24} lg={8} className="flex-1 mb-3">
          <PanelCard title="近30日Device累计数量" style={styles.chartPanel} expand>
            <BarChart
              legend={['PV', 'UV']}
              value={[[100, 200, 400, 250, 400, 700], [40, 170, 800, 40, 250, 500]]}
              name={['12-01', '12-02', '12-03', '12-04', '12-05', '12-06']}
            />
          </PanelCard>
        </Col>
      </Row>
      <Footer />
    </EmptyLayout>
  )
}