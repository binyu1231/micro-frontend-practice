import React, { SFC, useCallback, useState } from 'react'
import { message, Popconfirm, Input, Button } from 'antd'
import { QueryParameter } from '../report/QueryParameter'
import { useStore } from '../store'
import { downloadAsCsv, todayMoment, MomentFormatEnum } from '@legend/kit'


export interface IDownloadButton {
  params: QueryParameter,
  keepPageInfo?: boolean
}

export const DownloadButton: SFC<IDownloadButton> = ({
  params,
  keepPageInfo
}) => {

  const { store: { api } } = useStore()

  const [filename, setFilename] = useState('')
  const [loading, setLoading] = useState(false)


  const downloadTable = useCallback(() => {
    const parameters = Object.assign({}, params)
    
    if (!keepPageInfo) delete parameters.pageInfo

    setLoading(false)

    api.download(parameters).then(function formatFile (content: string) {
      const name = filename === '' ? 
        todayMoment.format(MomentFormatEnum.YYYY_MM_DD_HH_MM_SS) : filename
      
        downloadAsCsv(content, name)
    })
    .catch(function handleError (e) {
      message.error('下载失败')
    })
    .then(function clearLoading () {
      setLoading(true)
    })

  }, [params, keepPageInfo])

  return (
    <Popconfirm
        placement="left"
        okText="确认"
        cancelText="取消"
        title={
          <div>
            <p>输入下载文件所需文件名:</p>
            <Input
              placeholder="默认文件名为当前时间"
              width={250}
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
            />
          </div>
        }
        onConfirm={downloadTable}
      >
        <Button
          type="primary"
          icon="download"
          loading={loading}
        >下载</Button>
      </Popconfirm>
  )
}