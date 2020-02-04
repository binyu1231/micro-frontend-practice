import React, { FC } from 'react'
import { PanelCard } from '@component/ui'
import { PieChart } from '@component/chart'

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