export enum CrowdType {
  all = 0,
  label = 1,
  lbs = 2,
  customUpload = 3,
  lookalike = 4,
  combine = 5,
  bidden = 6,
  algorithm = 7,
  thirddmp = 8,
  converse = 9
}

export const packageTypeEnText = {
  [CrowdType.label]: 'crowd',
  [CrowdType.lbs]: 'lbs',
  [CrowdType.customUpload]: 'upload',
  [CrowdType.lookalike]: 'lookalike',
  [CrowdType.combine]: 'combination',
  [CrowdType.bidden]: 'market',
}






export const RecentDateType = {
  last1Day: '1',
  last3Days: '2',
  last7Days: '3',
  last15Days: '4',
  last30Days: '5',
  last60Days: '6'
}


export const RecentDateTypeText = {
  [RecentDateType.last1Day]: '最近一天',
  [RecentDateType.last3Days]: '最近三天',
  [RecentDateType.last7Days]: '最近七天',
  [RecentDateType.last15Days]: '最近15天',
  [RecentDateType.last30Days]: '最近30天',
  [RecentDateType.last60Days]: '最近60天',
}

export const RecentDateTypeMoment = {
  [RecentDateType.last1Day]: '最近一天',
  [RecentDateType.last3Days]: '最近三天',
  [RecentDateType.last7Days]: '最近七天',
  [RecentDateType.last15Days]: '最近15天',
  [RecentDateType.last30Days]: '最近30天',
  [RecentDateType.last60Days]: '最近60天',
}

