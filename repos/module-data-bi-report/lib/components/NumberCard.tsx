import React, { SFC } from "react"
import { Col, Card } from "antd"
import { BigNumber } from "@legend/chart"
import { ColProps } from "antd/lib/col"

export interface INumberCardProps extends ColProps {
  name: string,
  value: number
}

export const NumberCard: SFC<INumberCardProps> = ({ name, value, ...otherProps }) => {
  return <Col sm={24} md={12} lg={6} className="mb-3" {...otherProps}>
    <Card bordered={false}>
      <BigNumber legend={name} value={value} />
    </Card>
  </Col>
}