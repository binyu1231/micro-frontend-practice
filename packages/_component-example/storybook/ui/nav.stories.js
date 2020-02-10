import React from 'react'
import { WebsiteNavigator } from '@component/ui'
export default {
  title: 'ui/nav'
}

export const websiteNavgator = () => {
  return (
    <WebsiteNavigator 
      menu={[
        { name: '数据总览', key: '1', link: 'https://cn.bing.com' },
        { name: '标签集市', key: '2', link: 'https://cn.bing.com' },
        { name: '人群管理', key: '3', link: 'https://cn.bing.com' },
      ]}
    />
  )
}