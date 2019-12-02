import React, { FC } from 'react'
import { INormalLayoutProps, NormalLayout } from './NormalLayout'
import { Card } from 'antd'



export const CardContentLayout: FC<INormalLayoutProps> = ({
  children,
  ...otherProps
}) => {
  
  return (
    <NormalLayout {...otherProps}>
      <Card className="h-full">
        { children }
      </Card>
    </NormalLayout>
  )
}