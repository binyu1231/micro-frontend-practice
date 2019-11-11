import React from 'react'
import { MatrixDigitalRainBackboard, MatrixDigitalRainCanvas } from '@legend/ui'

export default {
  title: 'ui/backboard'
} 

export function Matrix () {
  return <MatrixDigitalRainBackboard />
}

export function MatrixCanvas () {
  return <MatrixDigitalRainCanvas maxDimemsion={80} />
}