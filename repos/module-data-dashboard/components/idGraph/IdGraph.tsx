import React, { FC } from 'react'
import { PanelCard, ExampleButton } from '@legend/ui'


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