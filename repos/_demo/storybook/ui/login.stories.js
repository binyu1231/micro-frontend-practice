import React from 'react'
import { NormalLogin, MatrixDigitalRainBackboard } from '@legend/ui'

export default {
  title: 'ui/login'
}


export const normal = () => <NormalLogin />
export const normalWithHeader = () => <NormalLogin header={222} />

export function normalWithBackboard() {
  return <NormalLogin
    backboard={<MatrixDigitalRainBackboard />} />
}
