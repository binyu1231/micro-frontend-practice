import React, { FC, ReactNode } from 'react'
import { Header, HeaderTab } from './Header'
import { Footer } from './Footer'


export interface INormalLayoutProps {
  title?: string,
  tabs?: HeaderTab[],
  activeTabKey?: string,
  onTabChange?: (tabKey: string) => void,
  headerContent?: ReactNode
  footerContent?: ReactNode
}
export const NormalLayout: FC<INormalLayoutProps> = ({
  title, tabs, activeTabKey, onTabChange, headerContent,
  footerContent,
  children,
  ...otherProps
}) => {

    return (
      <div className="flex-1 flex flex-col bg-gray-200" {...otherProps}>
        <Header 
          title={title} 
          tabs={tabs} 
          activeTabKey={activeTabKey} 
          onTabChange={onTabChange}>
            { headerContent }
        </Header>
        <div className="flex-1 pt-3 px-3">
          {children}
        </div>
        <Footer>{footerContent}</Footer>
      </div>
    )
  }