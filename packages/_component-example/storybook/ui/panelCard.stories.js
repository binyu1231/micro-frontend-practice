import React from 'react'
import { PanelCard, ExampleButton } from '@component/ui'
export default {
  title: 'ui/PanelCard'
}

export function normal () {
  return (
    <PanelCard
      title="Tag Cloud"
      intro="标签云"
      expand
      bodyCenter
      style={{ width: 500, height: 300, margin: '20px auto' }}>
      <ExampleButton>Hello Tags</ExampleButton>
    </PanelCard>
  )
}