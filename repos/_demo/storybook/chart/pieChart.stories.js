import React from 'react'
import { PieChart } from '@legend/chart'
import { PanelCard } from '@legend/ui'
export default {
  title: 'chart'
}

export const Pie = () => <PieChart legend={['ab', 'cd']} value={[123, 231]} />
export const PieWithCard = () => (
  <PanelCard 
    title="Pie Chart" 
    expand
    style={{ width: 500, height: 300, margin: '20px auto' }}
    bodyCenter>
    <Pie />

  </PanelCard>
)