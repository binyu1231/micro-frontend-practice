import React, { useState } from 'react'
import { Footer, Header, NormalLayout, CardContentLayout } from '@component/ui'


export default {
  title: 'ui/layout'
}

export function header() {

  const [tabKey, setTabKey] = useState('label')

  return (
    <Header
      title="人群管理"
      activeTabKey={tabKey}
      onTabChange={setTabKey}
      tabs={[
        { name: '标签圈人', key: 'label' },
        { name: '自定义上传', key: 'upload', disabled: true },
        { name: 'LBS圈人', key: 'lbs' },
      ]}
    >
      right content
    </Header>
  )
}

export function footer() {
  return <Footer>Copyright YOYI Inc. 2003-2018.</Footer>
}

export function normalLayout() {

  const [tabKey, setTabKey] = useState('label')

  return (
    <div className="h-screen flex flex-col">

      <NormalLayout
        title="人群管理"
        activeTabKey={tabKey}
        onTabChange={setTabKey}
        tabs={[
          { name: '标签圈人', key: 'label' },
          { name: '自定义上传', key: 'upload', disabled: true },
          { name: 'LBS圈人', key: 'lbs' },
        ]}
        headerContent={'header content'}
        footerContent="Copyright YOYI Inc. 2003-2018."
      >
        <div className="bg-red-500">
          test content {tabKey}
        </div>
      </NormalLayout>
    </div>
  )
}

export function cardContentLayout() {

  const [tabKey, setTabKey] = useState('label')

  return (
    <div className="h-screen flex flex-col">

      <CardContentLayout
        title="人群管理"
        activeTabKey={tabKey}
        onTabChange={setTabKey}
        tabs={[
          { name: '标签圈人', key: 'label' },
          { name: '自定义上传', key: 'upload', disabled: true },
          { name: 'LBS圈人', key: 'lbs' },
        ]}
        headerContent={'header content'}
        footerContent="Copyright YOYI Inc. 2003-2018."
      >
        <div className="bg-red-500">
          test content {tabKey}
        </div>
      </CardContentLayout>
    </div>
  )
}
