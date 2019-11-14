import React from 'react'
import { Root } from '@module-data/portal/src/root'
import { PortalModule, portalModule, IPortalRootProps } from '@module-data/portal/config'


export default {
  title: 'portal'
}

console.log(Root)

export function display () {
  console.log(222)
  return (
    <Root 
      rootPath="/"
      signSuccessRedirectPath="/" />
  )
}