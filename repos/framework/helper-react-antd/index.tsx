import { Select } from 'antd'
import { CommonOption } from '../types'
import { FC, SFC, Fragment, ReactNode } from 'react'
import { normal } from '../helper/func'

export const Options: SFC<{
  options: CommonOption[],
  nameField?: string,
  valField?: string,
  Option?: ReactNode,
  withIntl?: (key: string) => string
}> = ({
  options, nameField, valField, Option, withIntl
}) => {
  
  const nameKey = nameField || 'name'
  const valKey = valField || 'value'
  const OptElement: any = Option || Select.Option
  withIntl = withIntl || normal
  return <Fragment>
    { options.map((opt, i) => <OptElement key={String(i)} value={opt[valKey]}>{withIntl(opt[nameKey])}</OptElement>) }
  </Fragment>
}

