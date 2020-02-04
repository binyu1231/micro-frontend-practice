import React, { FC } from 'react'
import { PanelCard, ExampleButton } from '@component/ui'


export const IdGraph: FC<{
  title?: string
}> = ({
  title
}) => {

  return (
    <PanelCard title={title}>
      <ExampleButton>Hola</ExampleButton>
    </PanelCard>
  )
}