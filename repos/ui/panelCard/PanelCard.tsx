import React, { useState, FC } from 'react'
import { Icon, Tooltip } from 'antd'
import './panelCard.css'
import 'antd/lib/tooltip/style/css'
import 'antd/lib/icon/style/css'

export type PanelCardProps = {
  title: string,
  intro: string,
  headerContent: any,
  footer: any,
  expand: boolean,
  bodyStyle: any,
  
  bodyCenter: boolean,
  [key: string]: any
}

export const PanelCard: FC<Partial<PanelCardProps>> = ({
  title, 
  intro, 
  headerContent, 
  footer,
  expand, 
  bodyStyle, 
  children, 
  bodyCenter,
  className, 
  ...otherProps
}) => {
  const [expanding, setExpanding] = useState(false)
  const defaultTitle = title || ''

  return (
    <div className={[
      'cm-panel flex flex-col',
      expanding ? 'fullscreen' : ''
    ].join(' ')} {...otherProps}>
      <div className="cm-panel-header select-none">
        <div className="title">
          {
            intro ? (
              <Tooltip title={intro} className="flex items-center" placement="right">
                { defaultTitle }
                <Icon type="question-circle" />
              </Tooltip>
            ) : defaultTitle
          }
        </div>
        <div className="content">
          { headerContent || '' }
        </div>
        { expand && <div className="expand" onClick={() => setExpanding(!expanding)}>
          <Icon type={expanding ? 'shrink' : 'arrows-alt'} />
        </div>}
      </div>
      <div className={
        ['body flex-1', bodyCenter ? 'flex items-center justify-center' : undefined].join(' ')
      } style={bodyStyle}>
        { children }
      </div>
      <div className="footer">
        { footer }
      </div>
    

    </div>
  )
}