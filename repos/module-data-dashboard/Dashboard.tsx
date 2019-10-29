import React, { FC, Fragment } from 'react'
import { useI18nLocale, I18nLanguages } from '@legend/helper-react-hooks'
import { Row, Col } from 'antd'
import 'antd/lib/row/style/css'
import 'antd/lib/col/style/css'
import { TagCloud } from './components/tagCloud/TagCloud'
import { IdGraph } from './components/idGraph/IdGraph'

export interface BDDashboardAccess {
  /** 标签云 */
  tagCloud: boolean,
  /** ID 图谱 */
  idGraph: boolean,
  /** 地域分布 */
  geo: boolean,
  /** 标签分布 */
  tagCoverage: boolean,
  /** 行业人群 */
  predefinedSegment: boolean,
  /** 基础属性 */
  demographics: boolean,
  /** 人均标签分布 */
  tagStatistics: boolean,
  /** 兴趣偏好 */
  preference: boolean,
  /** 近30天ID数量趋势 */
  idTrend: boolean,
}

export const Dashboard: FC<{
  access: BDDashboardAccess
}> = ({
  access
}) => {
    access = access || {} as BDDashboardAccess

    const [locale] = useI18nLocale({
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
      <Row>
        {access.tagCloud &&
          <Col
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
      </Row >
    )
  }