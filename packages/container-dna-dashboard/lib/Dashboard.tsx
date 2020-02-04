import React, { FC, Component } from 'react'
import { useI18nLocale, I18nLanguages, I18nProvider } from '@micro/framework'
import { Row, Col } from 'antd'
import 'antd/lib/row/style/css'
import 'antd/lib/col/style/css'
import { TagCloud } from './components/tagCloud/TagCloud'
import { IdGraph } from './components/idGraph/IdGraph'
import { IDashboardRootProps, IDashboardAccess } from './config'

export class Root extends Component<IDashboardRootProps> {

  componentDidCatch() { }

  render() {
    return (
      <I18nProvider lang={I18nLanguages.ZH_CN}>
        <Dashboard {...this.props} />
      </I18nProvider>
    )
  }
}


const rowGutter = 12
const mb = 'mb-3'

export const Dashboard: FC<IDashboardRootProps> = ({
  access
}) => {
  access = access || {} as IDashboardAccess

  let [locale]: any[] = useI18nLocale({
    [I18nLanguages.EN_US]: {
      'tagCloud': 'Tag Cloud',
      'idGraph': 'ID Graph',
      'geo': 'Geo',
      'tagCoverage': 'Tag Coverage',
      'predefined': 'Predefined Segment',
      'demographics': 'Demographics',
      'tagStatistics': 'Tag Statistics',
      'preference': 'Preference',
      'idTrend': 'ID number trend in the last 30 days',
    },
    [I18nLanguages.ZH_CN]: {
      'tagCloud': '标签云',
      'idGraph': 'ID 图谱',
      'geo': '地域分布',
      'tagCoverage': '标签分布',
      'predefined': '行业人群',
      'demographics': '基础属性',
      'tagStatistics': '人均标签分布',
      'preference': '兴趣偏好',
      'idTrend': '近30天ID数量趋势',
    }
  })


  return (
    <div className="p-3">
      <Row gutter={rowGutter}>
        {access.tagCloud &&
          <Col
          className={mb}
            xs={24}
            md={{ span: 24, order: 0 }}
            lg={{ span: 24, order: 0 }}
            xl={{ span: 16, order: 0 }}
            xxl={{ span: 17, order: 0 }}
          >
            <TagCloud title={locale.tagCloud} />
          </Col>
        }

        {access.idGraph &&
          <Col
          className={mb}
            xs={24}
            md={{ span: 12, order: 0 }}
            lg={{ span: 12, order: 0 }}
            xl={{ span: 8, order: 0 }}
            xxl={{ span: 7, order: 0 }}>
            <IdGraph title={locale.idGraph} />
          </Col>
        }
        {access.geo &&
          <Col
          className={mb}
            xs={24}
            md={{ span: 12, order: 0 }}
            lg={{ span: 12, order: 0 }}
            xl={{ span: 8, order: 0 }}
            xxl={{ span: 7, order: 0 }}>
            <TagCloud title={locale.geo} />
          </Col>
        }
        {access.tagCoverage &&
          <Col
          className={mb}
            xs={24}
            md={{ span: 24, order: 0 }}
            lg={{ span: 12, order: 0 }}
            xl={{ span: 8, order: 0 }}
            xxl={{ span: 10, order: 0 }}>
            <TagCloud title={locale.tagCoverage} />
          </Col>
        }
        {access.predefinedSegment &&
          <Col
          className={mb}
            xs={24}
            md={{ span: 24, order: 0 }}
            lg={{ span: 12, order: 0 }}
            xl={{ span: 8, order: 0 }}
            xxl={{ span: 7, order: 0 }}>
            <TagCloud title={locale.predefined} />
          </Col>
        }
        {access.demographics &&
          <Col
          className={mb}
            xs={24}
            md={{ span: 12, order: 0 }}
            lg={{ span: 12, order: 0 }}
            xl={{ span: 8, order: 0 }}
            xxl={{ span: 7, order: 0 }}>
            <TagCloud title={locale.demographics} />
          </Col>
        }
        {access.tagStatistics &&
          <Col
          className={mb}
            xs={24}
            md={{ span: 24, order: 1 }}
            lg={{ span: 24, order: 1 }}
            xl={{ span: 8, order: 0 }}
            xxl={{ span: 10, order: 0 }}
          >
            <TagCloud title={locale.tagStatistics} />
          </Col>
        }
        {access.preference &&
          <Col
          className={mb}
            xs={24}
            md={{ span: 12, order: 0 }}
            lg={{ span: 12, order: 0 }}
            xl={{ span: 8, order: 0 }}
            xxl={{ span: 7, order: 0 }}
          >
            <TagCloud title={locale.preference} />
          </Col>
        }
        {access.idTrend &&
          <Col
            xs={24}
            md={{ span: 24, order: 10 }}
            lg={{ span: 24, order: 10 }}
            xl={{ span: 24, order: 10 }}>
            <TagCloud title={locale.idTrend} />
          </Col>
        }
      </Row>
    </div>
  )
}