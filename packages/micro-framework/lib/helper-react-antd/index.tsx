import { Select } from 'antd'
import { PlainOption } from '../types'
import { SFC, Fragment, ReactNode } from 'react'


function normal<T> (o: T) { return o }

export const Options: SFC<{
  options: PlainOption[],
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

