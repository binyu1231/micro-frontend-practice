import { Api } from "@legend/framework/api/Api"
import { BiMetadataDto, QueryLogicType, FieldName } from "./types"
import { QueryParameter } from "../report/QueryParameter"
import { PlainObject, SqlString, CommonOption } from "@legend/framework"

export interface MetadataPayload {
  type: number,
  logicType?: QueryLogicType,
}

export interface EnumPayload {
  fieldName: string
}


export type MetadataDto = BiMetadataDto[]
export type EnumDto = CommonOption[]
export type QueryDto = {
  data: {
    data: PlainObject[],
    headers: FieldName[]
  },
  displayFields: PlainObject,
  query: SqlString,
  request: QueryParameter,
  stacktrace: string | null,
  status: string
}


export type MetadataFunc = (payload: MetadataPayload) => Promise<MetadataDto>
export type QueryFunc = (payload: QueryParameter) => Promise<QueryDto>


export interface IBiApi {
  metadata: MetadataFunc,
  query: QueryFunc
}

export class BiApi extends Api implements IBiApi {

  metadata(payload: MetadataPayload) {
    payload.logicType = payload.logicType || QueryLogicType.bi

    return this.get('/bi/getMetadataByType', payload, { getCache: true })
      .then<MetadataDto>(res => res.data)
  }

  enumStore = {}

  enum(fieldName: FieldName, defaultOption?: CommonOption) {

    /// 先从缓存读取
    if (this.enumStore.hasOwnProperty(fieldName)) {
      return Promise.resolve<EnumDto>(this.enumStore[fieldName])
    }

    /// 服务器不允许 get 方法
    return this.post('/bi/getEnums?' + Api.object2Query({ fieldName }))
      .then<EnumDto>(res => {
        const options: CommonOption[] = res.map(opt => ({ name: opt.value, value: opt.key }))
        if (defaultOption) options.unshift(defaultOption)

        return this.enumStore[fieldName] = options
      })
  }

  query(payload: QueryParameter) {
    return this.post<QueryDto>('/bi/getQuery', payload)
  }
  /** 创意下拉选项 */
  creativeOptionsFetcher() {
    return this.enum(FieldName.displayForm, { name: '不限', value: '' })
  }
  /** 平台下拉选项 */
  platformOptionsFetcher() {
    return this.enum(FieldName.adxName, { name: '不限', value: '' })
  }
  /** 地域下拉选项 */
  provinceOptionsFetcher() {
    return this.enum(FieldName.province, { name: '全国', value: '' })
  }
  /** 流量采买类型 */
  requestOptionsFetcher () {
    return this.enum(FieldName.requestTypeName)
  }
  /** 流量终端类型 */
  terninalOptionsFetcher () {
    return this.enum(FieldName.requestTerminal, { name: '不限', value: '' })
  }
}
