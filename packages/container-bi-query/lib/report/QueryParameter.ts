import { FieldName, QueryType, QueryLogicType, FilterOperator } from "../config/types"
import { moment, MomentFormatEnum } from "@micro/kit"


export class QueryParameterFilter {
  filterName: FieldName
  operator: FilterOperator
  filterValues: string[]
  filterCategory: 1
  type: 'filterItem'
}

export class QueryParameterOrderBy {
  orderBy: FieldName
  ascending: boolean
  orderIndex: number 
}

export class QueryParameterPageInfo {
  pageIndex: number
  pageSize: number
  hasTotalCount: boolean
}

export type YYYY_MM_DD = string
export class QueryParameter {

  type: QueryType = QueryType.entityQuery
  logicType: QueryLogicType = QueryLogicType.bi
  queryFields: FieldName[] = []

  orderBys: QueryParameterOrderBy[] = []
  since: YYYY_MM_DD = moment().format(MomentFormatEnum.YYYY_MM_DD)
  until: YYYY_MM_DD = moment().format(MomentFormatEnum.YYYY_MM_DD)
  filters: QueryParameterFilter[] = []
  pageInfo: QueryParameterPageInfo
}
