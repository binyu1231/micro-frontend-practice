import { IDashboardRootProps } from "@container/dna-dashboard/lib/config";

export const dashboardProps: IDashboardRootProps = {
  rootPath: '/dashboard',
  access: {
    tagCloud: true,
    idGraph: true,
    geo: true,
    tagCoverage: true,
    predefinedSegment: true,
    demographics: true,
    tagStatistics: true,
    preference: true,
    idTrend: true,
  }
}