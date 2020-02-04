import React from 'react'
import { PieChart } from '@component/chart'
import { PanelCard } from '@component/ui'
export default {
  title: 'chart|pie'
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

