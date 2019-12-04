import { IBiReportRootProps, BiApi } from "@module-data/bi-report/config";

export const biReportProps: IBiReportRootProps = {
  biApi: new BiApi(
    { baseUrl: 'http://10.0.3.36:8080/bi-query/api' },
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