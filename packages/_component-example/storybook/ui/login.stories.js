import React from 'react'
import { NormalLogin, MatrixDigitalRainBackboard, MatrixDigitalRainCanvas } from '@component/ui'

export default {
  title: 'ui/login'
}


export const normal = () => <NormalLogin />
export const normalWithHeader = () => <NormalLogin header={222} />

export function normalWithBackboard() {
  return <NormalLogin
    header={<h2>Title</h2>}
    withCardWrapper
    backboard={<MatrixDigitalRainCanvas />} 
    onSubmit={(username, password) => { alert(`usename ${username}, password ${password}`)}}  
  />
}
