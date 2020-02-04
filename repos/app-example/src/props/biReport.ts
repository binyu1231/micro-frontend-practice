import { IBiReportRootProps, BiApi } from "@module-data/bi-report/lib/config";

export const biReportProps: IBiReportRootProps = {
  api: new BiApi(
    { baseUrl: 'http://biapi.yoyi.com.cn/bi-query/api' },
    { skipToken: true }
  ),
  rootPath: '/bi-report',
  access: {
    overview: true,
    platform: true,
    geo: true,
    ad: true,
    pmp: true,
    rtb: true,
    cookieMapping: true
  }
}