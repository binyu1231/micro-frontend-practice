import React, { FC } from 'react'
import { INormalLayoutProps, NormalLayout } from './NormalLayout'
import { Card } from 'antd'

export interface ICardContentLayoutProps extends INormalLayoutProps {
  strechCard?: boolean
}

export const CardContentLayout: FC<ICardContentLayoutProps> = ({
  children,
  strechCard,
  ...otherProps
}) => {
  
  return (
    <NormalLayout {...otherProps}>
      <Card className={strechCard ? 'flex flex-col flex-1' : ''}>
        { children }
      </Card>
    </NormalLayout>
  )
}