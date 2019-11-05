import React, { Fragment, useLayoutEffect } from 'react'
import { unmount, mount } from '@app/example'
export default {
  title: 'app/example'
}

export const NEO = () => {
  
  useLayoutEffect(() => {
    console.log(1)
    console.log(document.getElementById('module-data-portal'))
    unmount().then(mount)
  })

  return (
    <Fragment>
      <div
        id="module-data-portal"
        data-access="1,2,3"
      ></div>
      <div
        id="module-data-label-market"
        data-access="1,2,3"
      ></div>
      <div id="segmentManagement"></div>
      <div id="labelPublish"></div>
      <div id="configCenter"></div>
    </Fragment>
  )
}

