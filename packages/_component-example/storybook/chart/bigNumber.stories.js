import React from 'react'
import { BigNumber } from '@component/chart'

export default {
  title: 'chart|big number'
}

export function bigNumber () {
  return <BigNumber 
    legend={['近7日PV转化量']} 
    value={[12345678]} 
    color={['black']} 
    
  />
}