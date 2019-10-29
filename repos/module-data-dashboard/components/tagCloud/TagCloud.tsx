import React, { FC } from 'react'
import { PanelCard } from '@legend/ui'
import { PieChart } from '@legend/chart'

export const TagCloud: FC<{
  title: string
}> = ({
  title
}) => {
  return (
    <PanelCard 
      title={title} 
      expand
      bodyCenter>
      <PieChart 
        legend={['man', 'woman']} 
        value={[500, 400]}/>
    </PanelCard>
  )
}