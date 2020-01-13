import React from 'react'
import { Root } from '@module-data/bi-report'
import { BiApi } from '@module-data/bi-report/config'
export default {
  title: 'module | module data/bi report'
}


export function biReport () {

  const biApi = new BiApi({ baseUrl: 'http://10.0.3.36:8080/bi-query/api' })
  return <Root biApi={biApi} />
}